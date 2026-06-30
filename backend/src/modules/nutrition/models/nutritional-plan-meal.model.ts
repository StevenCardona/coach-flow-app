import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { MealType } from "../../../types";

export class NutritionalPlanMeal extends Model<
  InferAttributes<NutritionalPlanMeal>,
  InferCreationAttributes<NutritionalPlanMeal>
> {
  declare id: CreationOptional<string>;
  declare nutritionalPlanDayId: string;
  declare mealType: MealType;
  declare name: string;
  declare scheduledTime: string | null;
  declare description: string | null;
  declare coachNotes: string | null;
}

NutritionalPlanMeal.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nutritionalPlanDayId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "nutritional_plan_day_id",
    },
    mealType: {
      type: DataTypes.ENUM(...Object.values(MealType)),
      allowNull: false,
      field: "meal_type",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scheduledTime: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "scheduled_time",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    coachNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "coach_notes",
    },
  },
  {
    sequelize,
    tableName: "nutritional_plan_meals",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
