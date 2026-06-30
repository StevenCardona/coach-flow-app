import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { LogStatus } from "../../../types";

export class ExerciseLog extends Model<
  InferAttributes<ExerciseLog>,
  InferCreationAttributes<ExerciseLog>
> {
  declare id: CreationOptional<string>;
  declare workoutSessionId: string;
  declare workoutDayExerciseId: string;
  declare sets: number;
  declare reps: number;
  declare weightKg: string;
  declare previousReps: number | null;
  declare previousWeightKg: string | null;
  declare durationSeconds: number | null;
  declare status: LogStatus;
  declare observations: string | null;
}

ExerciseLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    workoutSessionId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "workout_session_id",
    },
    workoutDayExerciseId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "workout_day_exercise_id",
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weightKg: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      field: "weight_kg",
    },
    previousReps: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "previous_reps",
    },
    previousWeightKg: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      field: "previous_weight_kg",
    },
    durationSeconds: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "duration_seconds",
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
    tableName: "exercise_logs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
