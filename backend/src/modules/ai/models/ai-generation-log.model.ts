import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { AiEntityType } from "../../../types";

export class AiGenerationLog extends Model<
  InferAttributes<AiGenerationLog>,
  InferCreationAttributes<AiGenerationLog>
> {
  declare id: CreationOptional<string>;
  declare entityType: AiEntityType;
  declare entityId: string;
  declare requestedBy: string;
  declare provider: string;
  declare model: string;
  declare promptSummary: string;
  declare tokensUsed: number | null;
  declare success: boolean;
}

AiGenerationLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    entityType: {
      type: DataTypes.ENUM(...Object.values(AiEntityType)),
      allowNull: false,
      field: "entity_type",
    },
    entityId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "entity_id",
    },
    requestedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "requested_by",
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    promptSummary: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "prompt_summary",
    },
    tokensUsed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "tokens_used",
    },
    success: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "ai_generation_logs",
    timestamps: true,
    updatedAt: false,
    createdAt: "created_at",
  },
);
