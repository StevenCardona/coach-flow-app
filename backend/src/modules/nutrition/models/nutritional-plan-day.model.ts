import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { DayOfWeek } from "../../../types";

export class NutritionalPlanDay extends Model<
  InferAttributes<NutritionalPlanDay>,
  InferCreationAttributes<NutritionalPlanDay>
> {
  declare id: CreationOptional<string>;
  declare nutritionalPlanId: string;
  declare dayOfWeek: DayOfWeek;
  declare generalNotes: string | null;
}

NutritionalPlanDay.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nutritionalPlanId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "nutritional_plan_id",
    },
    dayOfWeek: {
      type: DataTypes.ENUM(...Object.values(DayOfWeek)),
      allowNull: false,
      field: "day_of_week",
    },
    generalNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "general_notes",
    },
  },
  {
    sequelize,
    tableName: "nutritional_plan_days",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
