import type { Transaction } from "sequelize";

import { Student } from "../models/student.model";
import type { CreateStudentInput } from "../types/student.types";
import type { UpdatePersonalInfoInput } from "../types/student-onboarding.types";

export const studentRepository = {
  create(data: CreateStudentInput, transaction?: Transaction) {
    return Student.create(data, { transaction });
  },

  findById(id: string) {
    return Student.findByPk(id);
  },

  findByUserId(userId: string, transaction?: Transaction) {
    return Student.findOne({ where: { userId }, transaction });
  },

  findByCoachId(coachId: string) {
    return Student.findAll({
      where: { coachId },
      order: [["created_at", "DESC"]],
    });
  },

  findByCoachAndId(coachId: string, studentId: string) {
    return Student.findOne({ where: { id: studentId, coachId } });
  },

  setActive(studentId: string, isActive: boolean, transaction?: Transaction) {
    return Student.update(
      { isActive },
      { where: { id: studentId }, transaction },
    );
  },

  deleteById(studentId: string, transaction?: Transaction) {
    return Student.destroy({ where: { id: studentId }, transaction });
  },

  updatePersonalInfo(
    studentId: string,
    data: UpdatePersonalInfoInput,
    transaction?: Transaction,
  ) {
    return Student.update(data, { where: { id: studentId }, transaction });
  },

  setOnboardingCompleted(
    studentId: string,
    completed: boolean,
    transaction?: Transaction,
  ) {
    return Student.update(
      { onboardingCompleted: completed },
      { where: { id: studentId }, transaction },
    );
  },
};
