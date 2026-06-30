import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";

export class BodyMeasurement extends Model<
  InferAttributes<BodyMeasurement>,
  InferCreationAttributes<BodyMeasurement>
> {
  declare id: CreationOptional<string>;
  declare studentId: string;
  declare weightKg: string;
  declare heightCm: string;
  declare chestCm: string | null;
  declare waistCm: string | null;
  declare hipCm: string | null;
  declare armCm: string | null;
  declare bicepCm: string | null;
  declare measuredAt: string;
}

BodyMeasurement.init(
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
    weightKg: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      field: "weight_kg",
    },
    heightCm: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      field: "height_cm",
    },
    chestCm: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      field: "chest_cm",
    },
    waistCm: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      field: "waist_cm",
    },
    hipCm: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      field: "hip_cm",
    },
    armCm: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      field: "arm_cm",
    },
    bicepCm: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
      field: "bicep_cm",
    },
    measuredAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "measured_at",
    },
  },
  {
    sequelize,
    tableName: "body_measurements",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
