import type { TrainingGoal } from "../../../types";
import { AppError } from "../../../types/error";
import { checkAndMarkOnboardingComplete } from "../helpers/onboarding-completion.helper";
import { mapFitnessGoalInput } from "../helpers/onboarding.mapper";
import { fitnessGoalRepository } from "../repositories/fitness-goal.repository";
import type {
  CreateFitnessGoalBody,
  UpdateFitnessGoalBody,
} from "../helpers/student-onboarding.validation";

export const fitnessGoalService = {
  async create(studentId: string, input: CreateFitnessGoalBody) {
    const existing = await fitnessGoalRepository.findByStudentId(studentId);

    if (existing) {
      throw new AppError(409, "Los objetivos ya fueron registrados");
    }

    const mapped = mapFitnessGoalInput(input);

    const fitnessGoal = await fitnessGoalRepository.create({
      studentId,
      trainingGoal: mapped.trainingGoal as TrainingGoal,
      weeklyTrainingHours: mapped.weeklyTrainingHours!,
      budgetForNutrition: mapped.budgetForNutrition ?? null,
      hasGymAccess: mapped.hasGymAccess!,
      trainsFromHome: mapped.trainsFromHome!,
      additionalInfo: mapped.additionalInfo ?? null,
    });

    await checkAndMarkOnboardingComplete(studentId);

    return fitnessGoal;
  },

  async update(studentId: string, input: UpdateFitnessGoalBody) {
    const existing = await fitnessGoalRepository.findByStudentId(studentId);

    if (!existing) {
      throw new AppError(404, "Objetivos no encontrados");
    }

    await fitnessGoalRepository.updateByStudentId(
      studentId,
      mapFitnessGoalInput(input),
    );

    return existing.reload();
  },

  async getByStudentId(studentId: string) {
    const fitnessGoal = await fitnessGoalRepository.findByStudentId(studentId);

    if (!fitnessGoal) {
      throw new AppError(404, "Objetivos no encontrados");
    }

    return fitnessGoal;
  },
};
