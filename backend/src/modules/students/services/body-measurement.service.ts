import { AppError } from "../../../types/error";
import { checkAndMarkOnboardingComplete } from "../helpers/onboarding-completion.helper";
import { mapBodyMeasurementInput } from "../helpers/onboarding.mapper";
import { bodyMeasurementRepository } from "../repositories/body-measurement.repository";
import type {
  CreateBodyMeasurementBody,
  UpdateBodyMeasurementBody,
} from "../helpers/student-onboarding.validation";

export const bodyMeasurementService = {
  async create(studentId: string, input: CreateBodyMeasurementBody) {
    const mapped = mapBodyMeasurementInput(input);

    const measurement = await bodyMeasurementRepository.create({
      studentId,
      weightKg: mapped.weightKg!,
      heightCm: mapped.heightCm!,
      measuredAt: mapped.measuredAt!,
      chestCm: mapped.chestCm ?? null,
      waistCm: mapped.waistCm ?? null,
      hipCm: mapped.hipCm ?? null,
      armCm: mapped.armCm ?? null,
      bicepCm: mapped.bicepCm ?? null,
    });

    await checkAndMarkOnboardingComplete(studentId);

    return measurement;
  },

  async update(
    studentId: string,
    measurementId: string,
    input: UpdateBodyMeasurementBody,
  ) {
    const record = await bodyMeasurementRepository.findByStudentAndId(
      studentId,
      measurementId,
    );

    if (!record) {
      throw new AppError(404, "Medida no encontrada");
    }

    await bodyMeasurementRepository.updateById(
      measurementId,
      mapBodyMeasurementInput(input),
    );

    return record.reload();
  },

  async listByStudentId(studentId: string) {
    return bodyMeasurementRepository.findAllByStudentId(studentId);
  },
};
