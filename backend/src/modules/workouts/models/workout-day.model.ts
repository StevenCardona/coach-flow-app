import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { DayOfWeek, MuscleGroup } from "../../../types";

export class WorkoutDay extends Model<
  InferAttributes<WorkoutDay>,
  InferCreationAttributes<WorkoutDay>
> {
  declare id: CreationOptional<string>;
  declare workoutPlanId: string;
  declare name: string;
  declare dayOfWeek: DayOfWeek;
  declare muscleGroup: MuscleGroup;
  declare order: number;
  declare isActive: CreationOptional<boolean>;
}

WorkoutDay.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workoutPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "workout_plan_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayOfWeek: {
      type: DataTypes.ENUM(...Object.values(DayOfWeek)),
      allowNull: false,
      field: "day_of_week",
    },
    muscleGroup: {
      type: DataTypes.ENUM(...Object.values(MuscleGroup)),
      allowNull: false,
      field: "muscle_group",
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
  },
  {
    sequelize,
    tableName: "workout_days",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
