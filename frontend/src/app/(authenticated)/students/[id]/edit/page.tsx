import { Suspense } from "react";

import { CfSkeleton } from "@/components/cf";
import { StudentsPage } from "@/modules/students/pages/students-page";

export default function Page() {
  return (
    <Suspense fallback={<CfSkeleton variant="page" />}>
      <StudentsPage />
    </Suspense>
  );
}
