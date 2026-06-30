import { sequelize } from "../../../config/db/db";
import { Role } from "../../../types";
import { AppError } from "../../../types/error";
import { coachService } from "../../coaches/services/coach.service";
import { invitationRepository } from "../../students/repositories/invitation.repository";
import { studentService } from "../../students/services/student.service";
import type { RegisterInput } from "../types/register.types";
import { userService } from "./user.service";

export const authService = {
  async register(clerkId: string, input: RegisterInput) {
    switch (input.role) {
      case Role.COACH:
        return this.registerCoach(clerkId, input);
      case Role.STUDENT:
        return this.registerStudent(clerkId, input);
      default:
        throw new AppError(400, "Rol no soportado");
    }
  },

  async registerCoach(clerkId: string, input: RegisterInput) {
    return sequelize.transaction(async (transaction) => {
      const user = await userService.createUser(
        {
          clerkId,
          email: input.email,
          name: input.name,
          role: Role.COACH,
        },
        transaction,
      );

      const coach = await coachService.createCoach(
        {
          userId: user.id,
          name: input.name,
          email: input.email,
        },
        transaction,
      );

      return { user, coach };
    });
  },

  async registerStudent(clerkId: string, input: RegisterInput) {
    return sequelize.transaction(async (transaction) => {
      const user = await userService.completeRegistration(
        clerkId,
        input.email,
        transaction,
      );

      if (!user) {
        throw new AppError(404, "No se pudo completar el registro del estudiante");
      }

      const student = await studentService.getByUserId(user.id, transaction);

      if (!student) {
        throw new AppError(404, "Perfil de estudiante no encontrado");
      }

      if (student.email !== input.email) {
        throw new AppError(400, "El email no coincide con el pre-registro");
      }

      await invitationRepository.markAccepted(student.id, transaction);

      return { user, student };
    });
  },
};
