import type { Transaction } from "sequelize";

import { BodyMeasurement } from "../models/body-measurement.model";
import type { CreateBodyMeasurementInput } from "../types/student-onboarding.types";

export const bodyMeasurementRepository = {
  create(data: CreateBodyMeasurementInput, transaction?: Transaction) {
    return BodyMeasurement.create(data, { transaction });
  },

  findAllByStudentId(studentId: string) {
    return BodyMeasurement.findAll({
      where: { studentId },
      order: [
        ["measured_at", "DESC"],
        ["created_at", "DESC"],
      ],
    });
  },

  findByStudentAndId(studentId: string, id: string) {
    return BodyMeasurement.findOne({ where: { id, studentId } });
  },

  updateById(
    id: string,
    data: Partial<CreateBodyMeasurementInput>,
    transaction?: Transaction,
  ) {
    return BodyMeasurement.update(data, { where: { id }, transaction });
  },
};
