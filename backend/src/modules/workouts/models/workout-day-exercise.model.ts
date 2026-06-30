import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { Intensity } from "../../../types";

export class WorkoutDayExercise extends Model<
  InferAttributes<WorkoutDayExercise>,
  InferCreationAttributes<WorkoutDayExercise>
> {
  declare id: CreationOptional<string>;
  declare workoutDayId: string;
  declare exerciseId: string;
  declare setsDefault: number;
  declare repsDefault: number;
  declare weightKgDefault: string;
  declare restSeconds: number;
  declare intensity: Intensity;
  declare order: number;
  declare coachNotes: string | null;
}

WorkoutDayExercise.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workoutDayId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "workout_day_id",
    },
    exerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "exercise_id",
    },
    setsDefault: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "sets_default",
    },
    repsDefault: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "reps_default",
    },
    weightKgDefault: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      field: "weight_kg_default",
    },
    restSeconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "rest_seconds",
    },
    intensity: {
      type: DataTypes.ENUM(...Object.values(Intensity)),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "order",
    },
    coachNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "coach_notes",
    },
  },
  {
    sequelize,
    tableName: "workout_day_exercises",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
