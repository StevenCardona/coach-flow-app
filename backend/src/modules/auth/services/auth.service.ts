import { sequelize } from "../../../config/db/db";
import { Role } from "../../../types";
import { coachService } from "../../coaches/services/coach.service";
import type { RegisterCoachInput } from "../types/register-coach.types";
import { userService } from "./user.service";

export const authService = {
  async registerCoach(clerkId: string, input: RegisterCoachInput) {
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
};
