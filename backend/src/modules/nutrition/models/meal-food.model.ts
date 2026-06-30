import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { FoodCategory } from "../../../types";

export class MealFood extends Model<
  InferAttributes<MealFood>,
  InferCreationAttributes<MealFood>
> {
  declare id: CreationOptional<string>;
  declare mealId: string;
  declare name: string;
  declare category: FoodCategory;
  declare gramsAmount: string;
  declare calories: string | null;
  declare protein: string | null;
  declare carbs: string | null;
  declare fats: string | null;
  declare reason: string | null;
  declare prepNotes: string | null;
}

MealFood.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    mealId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "meal_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(...Object.values(FoodCategory)),
      allowNull: false,
    },
    gramsAmount: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      field: "grams_amount",
    },
    calories: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    protein: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    carbs: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    fats: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    prepNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "prep_notes",
    },
  },
  {
    sequelize,
    tableName: "meal_foods",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
