import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";

export class Plan extends Model<
  InferAttributes<Plan>,
  InferCreationAttributes<Plan>
> {
  declare id: CreationOptional<string>;
  declare coachId: string;
  declare name: string;
  declare description: string | null;
  declare amount: string;
  declare durationDays: number;
  declare isVirtual: boolean;
  declare isActive: CreationOptional<boolean>;
}

Plan.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    durationDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "duration_days",
    },
    isVirtual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: "is_virtual",
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
    tableName: "plans",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
