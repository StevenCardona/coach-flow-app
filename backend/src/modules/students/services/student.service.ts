import type { Transaction } from "sequelize";

import { sequelize } from "../../../config/db/db";
import { hashPassword } from "../../../helpers/password.helper";
import { Role } from "../../../types";
import type { PaginationQuery } from "../../../types/pagination.types";
import { AppError } from "../../../types/error";
import { userService } from "../../auth/services/user.service";
import { studentRepository } from "../repositories/student.repository";
import type {
  CreateStudentByCoachInput,
  CreateStudentInput,
  UpdateStudentByCoachInput,
} from "../types/student.types";

const STUDENT_CREDENTIALS_MESSAGE =
  "El alumno puede iniciar sesión con su correo como usuario y contraseña. Deberá cambiar la contraseña al ingresar.";

export const studentService = {
  createStudent(input: CreateStudentInput, transaction?: Transaction) {
    return studentRepository.create(input, transaction);
  },

  getByUserId(userId: string, transaction?: Transaction) {
    return studentRepository.findByUserId(userId, transaction);
  },

  getById(studentId: string, transaction?: Transaction) {
    return studentRepository.findById(studentId, transaction);
  },

  getByCoachId(coachId: string) {
    return studentRepository.findByCoachId(coachId);
  },

  listByCoach(coachId: string, query: PaginationQuery) {
    return studentRepository.findPaginatedByCoachId(coachId, query);
  },

  getStatsByCoach(coachId: string) {
    return studentRepository.getStatsByCoachId(coachId);
  },

  async getByCoachAndId(coachId: string, studentId: string) {
    const student = await studentRepository.findByCoachAndId(coachId, studentId);

    if (!student) {
      throw new AppError(404, "Estudiante no encontrado");
    }

    return student;
  },

  async updateStudentByCoach(
    coachId: string,
    studentId: string,
    input: UpdateStudentByCoachInput,
  ) {
    const student = await this.getByCoachAndId(coachId, studentId);
    const user = await userService.getById(student.userId);

    if (!user) {
      throw new AppError(404, "Usuario asociado no encontrado");
    }

    await sequelize.transaction(async (transaction) => {
      await studentRepository.updateByCoach(studentId, input, transaction);

      if (input.name && input.name !== student.name) {
        await userService.updateProfile(
          user.id,
          { name: input.name },
          transaction,
        );
      }
    });

    return this.getByCoachAndId(coachId, studentId);
  },

  async createStudentByCoach(coachId: string, input: CreateStudentByCoachInput) {
    const passwordHash = await hashPassword(input.email);

    const { user, student } = await sequelize.transaction(async (transaction) => {
      const createdUser = await userService.createUser(
        {
          email: input.email,
          name: input.name,
          passwordHash,
          mustChangePassword: true,
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

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
        isActive: user.isActive,
      },
      student: {
        id: student.id,
        userId: student.userId,
        coachId: student.coachId,
        name: student.name,
        email: student.email,
      },
      credentials: {
        email: input.email,
        initialPassword: input.email,
        message: STUDENT_CREDENTIALS_MESSAGE,
      },
    };
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

    return {
      studentId: student.id,
      message: "Estudiante inactivado correctamente",
    };
  },

  async deleteStudent(coachId: string, studentId: string) {
    const student = await this.getByCoachAndId(coachId, studentId);
    const user = await userService.getById(student.userId);

    if (!user) {
      throw new AppError(404, "Usuario asociado no encontrado");
    }

    await sequelize.transaction(async (transaction) => {
      await studentRepository.deleteById(student.id, transaction);
      await userService.deleteUser(user.id, transaction);
    });

    return {
      studentId: student.id,
      message: "Estudiante eliminado correctamente",
    };
  },
};
