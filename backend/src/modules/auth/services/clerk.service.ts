import { clerkClient } from "../../../config/clerk";
import { CLERK_INVITATION_REDIRECT_URL } from "../../../config/env";

export const clerkService = {
  async sendInvitation(
    email: string,
    publicMetadata?: Record<string, unknown>,
  ) {
    return clerkClient.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: CLERK_INVITATION_REDIRECT_URL || undefined,
      publicMetadata,
    });
  },

  async banUser(clerkId: string) {
    return clerkClient.users.banUser(clerkId);
  },

  async unbanUser(clerkId: string) {
    return clerkClient.users.unbanUser(clerkId);
  },

  async deleteUser(clerkId: string) {
    return clerkClient.users.deleteUser(clerkId);
  },

  async revokeInvitation(clerkInvitationId: string) {
    return clerkClient.invitations.revokeInvitation(clerkInvitationId);
  },
};
