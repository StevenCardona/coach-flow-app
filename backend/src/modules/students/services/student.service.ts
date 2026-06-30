import type { Transaction } from "sequelize";

import { sequelize } from "../../../config/db/db";
import { Role } from "../../../types";
import { AppError } from "../../../types/error";
import { clerkService } from "../../auth/services/clerk.service";
import { userService } from "../../auth/services/user.service";
import { invitationRepository } from "../repositories/invitation.repository";
import { studentRepository } from "../repositories/student.repository";
import type {
  CreateStudentByCoachInput,
  CreateStudentInput,
} from "../types/student.types";

export const studentService = {
  createStudent(input: CreateStudentInput, transaction?: Transaction) {
    return studentRepository.create(input, transaction);
  },

  getByUserId(userId: string, transaction?: Transaction) {
    return studentRepository.findByUserId(userId, transaction);
  },

  getByCoachId(coachId: string) {
    return studentRepository.findByCoachId(coachId);
  },

  async getByCoachAndId(coachId: string, studentId: string) {
    const student = await studentRepository.findByCoachAndId(coachId, studentId);

    if (!student) {
      throw new AppError(404, "Estudiante no encontrado");
    }

    return student;
  },

  async createStudentByCoach(coachId: string, input: CreateStudentByCoachInput) {
    const { user, student } = await sequelize.transaction(async (transaction) => {
      const createdUser = await userService.createPendingUser(
        {
          email: input.email,
          name: input.name,
          role: Role.STUDENT,
        },
        transaction,
      );

      const createdStudent = await studentRepository.create(
        {
          userId: createdUser.id,
          coachId,
          name: input.name,
          email: input.email,
          phoneNumber: input.phoneNumber ?? null,
          birthday: input.birthday ?? null,
          gender: input.gender ?? null,
          observations: input.observations ?? null,
          medicalCondition: input.medicalCondition ?? null,
        },
        transaction,
      );

      return { user: createdUser, student: createdStudent };
    });

    try {
      const clerkInvitation = await clerkService.sendInvitation(input.email, {
        role: Role.STUDENT,
        studentId: student.id,
      });

      const rawExpiresAt = (clerkInvitation as { expiresAt?: number | null })
        .expiresAt;
      const expiresAt = rawExpiresAt
        ? new Date(rawExpiresAt)
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      const invitation = await invitationRepository.create({
        coachId,
        studentId: student.id,
        email: input.email,
        clerkInvitationId: clerkInvitation.id,
        expiresAt,
      });

      return {
        user,
        student,
        invitation,
        clerkSynced: true,
      };
    } catch (error) {
      await sequelize.transaction(async (transaction) => {
        await studentRepository.deleteById(student.id, transaction);
        await userService.deleteUser(user.id, transaction);
      });

      const clerkMessage =
        error instanceof Error ? error.message : "Error desconocido en Clerk";

      throw new AppError(
        502,
        `Estudiante no creado: falló el envío de invitación en Clerk. Se revirtió la creación en la base de datos. Detalle: ${clerkMessage}`,
      );
    }
  },

  async deactivateStudent(coachId: string, studentId: string) {
    const student = await this.getByCoachAndId(coachId, studentId);
    const user = await userService.getById(student.userId);

    if (!user) {
      throw new AppError(404, "Usuario asociado no encontrado");
    }

    if (!user.isActive && !student.isActive) {
      throw new AppError(400, "El estudiante ya está inactivo");
    }

    await sequelize.transaction(async (transaction) => {
      await userService.setActive(user.id, false, transaction);
      await studentRepository.setActive(student.id, false, transaction);
    });

    if (user.clerkId) {
      try {
        await clerkService.banUser(user.clerkId);
      } catch (error) {
        await sequelize.transaction(async (transaction) => {
          await userService.setActive(user.id, true, transaction);
          await studentRepository.setActive(student.id, true, transaction);
        });

        const clerkMessage =
          error instanceof Error ? error.message : "Error desconocido en Clerk";

        throw new AppError(
          502,
          `No se pudo inactivar en Clerk. Se revirtió el estado en la base de datos. Detalle: ${clerkMessage}`,
        );
      }

      return {
        studentId: student.id,
        clerkSynced: true,
        message: "Estudiante inactivado en la base de datos y bloqueado en Clerk",
      };
    }

    return {
      studentId: student.id,
      clerkSynced: false,
      message:
        "Estudiante inactivado en la base de datos. Sin cuenta Clerk vinculada",
    };
  },

  async deleteStudent(coachId: string, studentId: string) {
    const student = await this.getByCoachAndId(coachId, studentId);
    const user = await userService.getById(student.userId);

    if (!user) {
      throw new AppError(404, "Usuario asociado no encontrado");
    }

    const pendingInvitations =
      await invitationRepository.findPendingInvitationsByStudentId(student.id);

    if (user.clerkId) {
      try {
        await clerkService.deleteUser(user.clerkId);
      } catch (error) {
        const clerkMessage =
          error instanceof Error ? error.message : "Error desconocido en Clerk";

        throw new AppError(
          502,
          `No se pudo eliminar en Clerk. La base de datos no fue modificada. Detalle: ${clerkMessage}`,
        );
      }
    }

    for (const invitation of pendingInvitations) {
      if (invitation.clerkInvitationId) {
        try {
          await clerkService.revokeInvitation(invitation.clerkInvitationId);
        } catch {
          // Non-blocking: student deletion proceeds even if revoke fails
        }
      }
    }

    await sequelize.transaction(async (transaction) => {
      await studentRepository.deleteById(student.id, transaction);
      await userService.deleteUser(user.id, transaction);
    });

    return {
      studentId: student.id,
      clerkDeleted: Boolean(user.clerkId),
      invitationsRevoked: pendingInvitations.length,
      message: user.clerkId
        ? "Estudiante eliminado en Clerk y en la base de datos"
        : "Estudiante pendiente eliminado en la base de datos e invitaciones revocadas si aplicaba",
    };
  },
};
