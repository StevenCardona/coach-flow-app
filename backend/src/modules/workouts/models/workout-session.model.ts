import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { SessionStatus } from "../../../types";

export class WorkoutSession extends Model<
  InferAttributes<WorkoutSession>,
  InferCreationAttributes<WorkoutSession>
> {
  declare id: CreationOptional<string>;
  declare studentId: string;
  declare workoutDayId: string;
  declare startedAt: Date;
  declare finishedAt: Date | null;
  declare status: SessionStatus;
  declare observations: string | null;
}

WorkoutSession.init(
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
    workoutDayId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "workout_day_id",
    },
    startedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "started_at",
    },
    finishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "finished_at",
    },
    status: {
      type: DataTypes.ENUM(...Object.values(SessionStatus)),
      allowNull: false,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "workout_sessions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
