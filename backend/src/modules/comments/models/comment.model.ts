import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { CommentEntityType } from "../../../types";

export class Comment extends Model<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<string>;
  declare authorId: string;
  declare entityType: CommentEntityType;
  declare entityId: string;
  declare content: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "author_id",
    },
    entityType: {
      type: DataTypes.ENUM(...Object.values(CommentEntityType)),
      allowNull: false,
      field: "entity_type",
    },
    entityId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "entity_id",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "comments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
