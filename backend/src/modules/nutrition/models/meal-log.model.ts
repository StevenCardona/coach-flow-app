import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { LogStatus } from "../../../types";

export class MealLog extends Model<
  InferAttributes<MealLog>,
  InferCreationAttributes<MealLog>
> {
  declare id: CreationOptional<string>;
  declare studentId: string;
  declare mealId: string;
  declare logDate: string;
  declare status: LogStatus;
  declare observations: string | null;
}

MealLog.init(
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
    mealId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "meal_id",
    },
    logDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "log_date",
    },
    status: {
      type: DataTypes.ENUM(...Object.values(LogStatus)),
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "meal_logs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
