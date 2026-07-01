"use client";

import { CfSkeleton } from "@/components/cf";
import { useAuthUser } from "@/modules/auth/hooks/use-auth-user";

import { ProfileBasicInfo } from "../components/profile-basic-info";

export function ProfilePage() {
  const { user, isLoading } = useAuthUser();

  if (isLoading || !user) {
    return <CfSkeleton variant="form" fields={5} />;
  }

  return <ProfileBasicInfo user={user} />;
}
