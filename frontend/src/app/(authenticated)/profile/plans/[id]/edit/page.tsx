import { Suspense } from "react";

import { CfSkeleton } from "@/components/cf";
import { PlansPage } from "@/modules/coach/plans/pages/plans-page";

export default function Page() {
  return (
    <Suspense fallback={<CfSkeleton variant="page" />}>
      <PlansPage />
    </Suspense>
  );
}
