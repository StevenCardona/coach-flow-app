import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { Gender } from "../../../types";

export class Student extends Model<
  InferAttributes<Student>,
  InferCreationAttributes<Student>
> {
  declare id: CreationOptional<string>;
  declare userId: string;
  declare coachId: string;
  declare name: string;
  declare email: string;
  declare phoneNumber: string | null;
  declare birthday: string | null;
  declare gender: Gender | null;
  declare observations: string | null;
  declare medicalCondition: string | null;
  declare personalInfoCompleted: CreationOptional<boolean>;
  declare onboardingCompleted: CreationOptional<boolean>;
  declare isActive: CreationOptional<boolean>;
  declare streamChannelId: string | null;
}

Student.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: "user_id",
    },
    coachId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "coach_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "phone_number",
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM(...Object.values(Gender)),
      allowNull: true,
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    medicalCondition: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "medical_condition",
    },
    personalInfoCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "personal_info_completed",
    },
    onboardingCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "onboarding_completed",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
    streamChannelId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "stream_channel_id",
    },
  },
  {
    sequelize,
    tableName: "students",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
