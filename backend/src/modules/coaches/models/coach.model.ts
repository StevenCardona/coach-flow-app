import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";

export class Coach extends Model<
  InferAttributes<Coach>,
  InferCreationAttributes<Coach>
> {
  declare id: CreationOptional<string>;
  declare userId: string | null;
  declare name: string;
  declare email: string;
  declare isActive: CreationOptional<boolean>;
}

Coach.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
      field: "user_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "coaches",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
