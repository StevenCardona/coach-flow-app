import type { Transaction, WhereOptions } from "sequelize";
import { Op } from "sequelize";

import { PlanHistoryStatus } from "../../../types";
import type { PaginationQuery } from "../../../types/pagination.types";
import {
  buildPaginatedResult,
  resolveSortColumn,
  resolveSortOrder,
} from "../../../helpers/pagination.util";
import { Plan } from "../../plans/models/plan.model";
import { StudentPlanHistory } from "../../plans/models/student-plan-history.model";
import { Student } from "../models/student.model";
import type {
  CreateStudentInput,
  StudentListItem,
  StudentsStats,
  UpdateStudentByCoachInput,
} from "../types/student.types";
import type { UpdatePersonalInfoInput } from "../types/student-onboarding.types";

const SORTABLE_COLUMNS: Record<string, string> = {
  name: "name",
  email: "email",
  created_at: "created_at",
  isActive: "is_active",
  birthday: "birthday",
};

export const studentRepository = {
  create(data: CreateStudentInput, transaction?: Transaction) {
    return Student.create(data, { transaction });
  },

  findById(id: string, transaction?: Transaction) {
    return Student.findByPk(id, { transaction });
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

  async findPaginatedByCoachId(coachId: string, query: PaginationQuery) {
    const where: WhereOptions = { coachId };

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    if (query.search) {
      const pattern = `%${query.search}%`;
      Object.assign(where, {
        [Op.or]: [
          { name: { [Op.iLike]: pattern } },
          { email: { [Op.iLike]: pattern } },
        ],
      });
    }

    const sortColumn = resolveSortColumn(
      query.sortBy,
      SORTABLE_COLUMNS,
      "name",
    );
    const sortOrder = resolveSortOrder(query.sortOrder);
    const offset = (query.page - 1) * query.pageSize;

    const { rows, count } = await Student.findAndCountAll({
      where,
      order: [[sortColumn, sortOrder]],
      limit: query.pageSize,
      offset,
      include: [
        {
          model: StudentPlanHistory,
          as: "planHistories",
          where: { status: PlanHistoryStatus.ACTIVE },
          required: false,
          separate: true,
          limit: 1,
          include: [{ model: Plan, as: "plan", attributes: ["id", "name"] }],
        },
      ],
      distinct: true,
    });

    const items: StudentListItem[] = rows.map((student) => {
      const plain = student.toJSON() as Record<string, unknown> & {
        planHistories?: Array<{
          plan?: { id: string; name: string };
        }>;
      };

      const activeHistory = plain.planHistories?.[0];
      const activePlan = activeHistory?.plan
        ? { id: activeHistory.plan.id, name: activeHistory.plan.name }
        : null;

      const { planHistories: _planHistories, ...studentData } = plain;

      return {
        ...studentData,
        activePlan,
      } as StudentListItem;
    });

    return buildPaginatedResult(items, count, query);
  },

  async getStatsByCoachId(coachId: string): Promise<StudentsStats> {
    const [total, active, withActivePlan, planDistributionRows] =
      await Promise.all([
        Student.count({ where: { coachId } }),
        Student.count({ where: { coachId, isActive: true } }),
        Student.count({
          where: { coachId },
          include: [
            {
              model: StudentPlanHistory,
              as: "planHistories",
              attributes: [],
              where: { status: PlanHistoryStatus.ACTIVE },
              required: true,
            },
          ],
          distinct: true,
        }),
        StudentPlanHistory.findAll({
          attributes: [
            "planId",
            [
              StudentPlanHistory.sequelize!.fn(
                "COUNT",
                StudentPlanHistory.sequelize!.fn(
                  "DISTINCT",
                  StudentPlanHistory.sequelize!.col("StudentPlanHistory.student_id"),
                ),
              ),
              "studentCount",
            ],
          ],
          where: { status: PlanHistoryStatus.ACTIVE },
          include: [
            {
              model: Student,
              as: "student",
              attributes: [],
              where: { coachId },
              required: true,
            },
            {
              model: Plan,
              as: "plan",
              attributes: ["name"],
              required: true,
            },
          ],
          group: ["StudentPlanHistory.plan_id", "plan.id", "plan.name"],
          raw: true,
        }),
      ]);

    const inactive = total - active;

    const planDistribution = (
      planDistributionRows as unknown as Array<{
        planId: string;
        studentCount: string;
        "plan.name": string;
      }>
    ).map((row) => ({
      planId: row.planId,
      planName: row["plan.name"],
      studentCount: Number(row.studentCount),
    }));

    return {
      total,
      active,
      inactive,
      withActivePlan,
      withoutActivePlan: total - withActivePlan,
      planDistribution,
    };
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

  updateByCoach(
    studentId: string,
    data: UpdateStudentByCoachInput,
    transaction?: Transaction,
  ) {
    return Student.update(data, { where: { id: studentId }, transaction });
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
