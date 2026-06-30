import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { ExerciseCategory, MuscleGroup } from "../../../types";

export class Exercise extends Model<
  InferAttributes<Exercise>,
  InferCreationAttributes<Exercise>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string | null;
  declare pictureUrl: string | null;
  declare videoUrl: string | null;
  declare muscleGroup: MuscleGroup;
  declare category: ExerciseCategory;
  declare isActive: CreationOptional<boolean>;
  declare createdBy: string | null;
}

Exercise.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pictureUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "picture_url",
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "video_url",
    },
    muscleGroup: {
      type: DataTypes.ENUM(...Object.values(MuscleGroup)),
      allowNull: false,
      field: "muscle_group",
    },
    category: {
      type: DataTypes.ENUM(...Object.values(ExerciseCategory)),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_active",
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "created_by",
    },
  },
  {
    sequelize,
    tableName: "exercises",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
