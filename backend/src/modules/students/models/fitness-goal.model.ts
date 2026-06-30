import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { TrainingGoal } from "../../../types";

export class FitnessGoal extends Model<
  InferAttributes<FitnessGoal>,
  InferCreationAttributes<FitnessGoal>
> {
  declare id: CreationOptional<string>;
  declare studentId: string;
  declare trainingGoal: TrainingGoal;
  declare weeklyTrainingHours: number;
  declare budgetForNutrition: string | null;
  declare hasGymAccess: boolean;
  declare trainsFromHome: boolean;
  declare additionalInfo: string | null;
}

FitnessGoal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: "student_id",
    },
    trainingGoal: {
      type: DataTypes.ENUM(...Object.values(TrainingGoal)),
      allowNull: false,
      field: "training_goal",
    },
    weeklyTrainingHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "weekly_training_hours",
    },
    budgetForNutrition: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "budget_for_nutrition",
    },
    hasGymAccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "has_gym_access",
    },
    trainsFromHome: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "trains_from_home",
    },
    additionalInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "additional_info",
    },
  },
  {
    sequelize,
    tableName: "fitness_goals",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
