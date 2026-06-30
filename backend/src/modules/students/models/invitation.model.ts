import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import { sequelize } from "../../../config/db/db";
import { InvitationStatus } from "../../../types";

export class Invitation extends Model<
  InferAttributes<Invitation>,
  InferCreationAttributes<Invitation>
> {
  declare id: CreationOptional<string>;
  declare coachId: string;
  declare studentId: string | null;
  declare email: string;
  declare token: string | null;
  declare clerkInvitationId: string | null;
  declare status: InvitationStatus;
  declare expiresAt: Date;
}

Invitation.init(
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
    studentId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "student_id",
      references: { model: "students", key: "id" },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    clerkInvitationId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "clerk_invitation_id",
    },
    status: {
      type: DataTypes.ENUM(...Object.values(InvitationStatus)),
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "expires_at",
    },
  },
  {
    sequelize,
    tableName: "invitations",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
