import type { Transaction } from "sequelize";
import { Op } from "sequelize";

import { InvitationStatus } from "../../../types";
import { Invitation } from "../models/invitation.model";
import type { CreateInvitationAuditInput } from "../types/student.types";

export const invitationRepository = {
  create(data: CreateInvitationAuditInput, transaction?: Transaction) {
    return Invitation.create(
      {
        coachId: data.coachId,
        studentId: data.studentId,
        email: data.email,
        clerkInvitationId: data.clerkInvitationId,
        status: InvitationStatus.PENDING,
        expiresAt: data.expiresAt,
        token: null,
      },
      { transaction },
    );
  },

  findPendingByStudentId(studentId: string, transaction?: Transaction) {
    return Invitation.findOne({
      where: {
        studentId,
        status: InvitationStatus.PENDING,
      },
      order: [["created_at", "DESC"]],
      transaction,
    });
  },

  markAccepted(studentId: string, transaction?: Transaction) {
    return Invitation.update(
      { status: InvitationStatus.ACCEPTED },
      {
        where: {
          studentId,
          status: InvitationStatus.PENDING,
        },
        transaction,
      },
    );
  },

  findPendingByClerkInvitationId(clerkInvitationId: string) {
    return Invitation.findOne({
      where: {
        clerkInvitationId,
        status: InvitationStatus.PENDING,
      },
    });
  },

  findPendingInvitationsByStudentId(studentId: string) {
    return Invitation.findAll({
      where: {
        studentId,
        status: InvitationStatus.PENDING,
        clerkInvitationId: { [Op.not]: null },
      },
    });
  },
};
