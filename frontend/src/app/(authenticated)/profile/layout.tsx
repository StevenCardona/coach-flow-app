import type { ReactNode } from "react";

import { ProfileSettingsLayout } from "@/modules/coach/profile/components/profile-settings-layout";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <ProfileSettingsLayout>{children}</ProfileSettingsLayout>;
}
