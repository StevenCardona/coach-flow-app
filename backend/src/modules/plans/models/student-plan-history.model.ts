import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { PlanHistoryStatus } from "../../../types";

export class StudentPlanHistory extends Model<
  InferAttributes<StudentPlanHistory>,
  InferCreationAttributes<StudentPlanHistory>
> {
  declare id: CreationOptional<string>;
  declare studentId: string;
  declare planId: string;
  declare startDate: string;
  declare endDate: string | null;
  declare status: PlanHistoryStatus;
  declare registeredBy: string;
  declare notes: string | null;
}

StudentPlanHistory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "student_id",
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "plan_id",
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "end_date",
    },
    status: {
      type: DataTypes.ENUM(...Object.values(PlanHistoryStatus)),
      allowNull: false,
    },
    registeredBy: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "registered_by",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "student_plan_history",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
