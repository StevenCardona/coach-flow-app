import type { Gender } from "../../../types";
import { AppError } from "../../../types/error";
import { checkAndMarkOnboardingComplete } from "../helpers/onboarding-completion.helper";
import { toPersonalInfoResponse } from "../helpers/onboarding.mapper";
import { studentRepository } from "../repositories/student.repository";
import type {
  CreatePersonalInfoBody,
  UpdatePersonalInfoBody,
} from "../helpers/student-onboarding.validation";

export const studentPersonalInfoService = {
  async get(studentId: string) {
    const student = await studentRepository.findById(studentId);

    if (!student) {
      throw new AppError(404, "Estudiante no encontrado");
    }

    return toPersonalInfoResponse(student);
  },

  async create(studentId: string, input: CreatePersonalInfoBody) {
    const student = await studentRepository.findById(studentId);

    if (!student) {
      throw new AppError(404, "Estudiante no encontrado");
    }

    if (student.personalInfoCompleted) {
      throw new AppError(409, "La información personal ya fue registrada");
    }

    await studentRepository.updatePersonalInfo(studentId, {
      phoneNumber: input.phoneNumber,
      birthday: input.birthday,
      gender: input.gender as Gender,
      observations: input.observations ?? null,
      medicalCondition: input.medicalCondition ?? null,
      personalInfoCompleted: true,
    });

    const updated = await studentRepository.findById(studentId);

    if (!updated) {
      throw new AppError(404, "Estudiante no encontrado");
    }

    await checkAndMarkOnboardingComplete(studentId);

    return toPersonalInfoResponse(updated);
  },

  async update(studentId: string, input: UpdatePersonalInfoBody) {
    const student = await studentRepository.findById(studentId);

    if (!student) {
      throw new AppError(404, "Estudiante no encontrado");
    }

    if (!student.personalInfoCompleted) {
      throw new AppError(404, "La información personal no ha sido registrada");
    }

    await studentRepository.updatePersonalInfo(studentId, {
      ...(input.phoneNumber !== undefined ? { phoneNumber: input.phoneNumber } : {}),
      ...(input.birthday !== undefined ? { birthday: input.birthday } : {}),
      ...(input.gender !== undefined
        ? { gender: input.gender as Gender | null }
        : {}),
      ...(input.observations !== undefined
        ? { observations: input.observations }
        : {}),
      ...(input.medicalCondition !== undefined
        ? { medicalCondition: input.medicalCondition }
        : {}),
    });

    const updated = await studentRepository.findById(studentId);

    if (!updated) {
      throw new AppError(404, "Estudiante no encontrado");
    }

    return toPersonalInfoResponse(updated);
  },
};
