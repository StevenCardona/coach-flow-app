import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";

export class NutritionalPlan extends Model<
  InferAttributes<NutritionalPlan>,
  InferCreationAttributes<NutritionalPlan>
> {
  declare id: CreationOptional<string>;
  declare studentId: string;
  declare coachId: string;
  declare name: string;
  declare description: string | null;
  declare isActive: CreationOptional<boolean>;
  declare startDate: string | null;
  declare endDate: string | null;
  declare sourceTemplateId: string | null;
  declare aiGenerated: CreationOptional<boolean>;
}

NutritionalPlan.init(
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
    coachId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "coach_id",
      references: { model: "coaches", key: "id" },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "end_date",
    },
    sourceTemplateId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "source_template_id",
    },
    aiGenerated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "ai_generated",
    },
  },
  {
    sequelize,
    tableName: "nutritional_plans",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
