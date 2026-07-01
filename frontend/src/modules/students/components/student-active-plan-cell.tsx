"use client";

import { ArrowLeftRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { StudentListItem } from "@/lib/types/entities";

export interface StudentActivePlanCellProps {
  student: StudentListItem;
  onAssignPlan: (student: StudentListItem) => void;
}

export function StudentActivePlanCell({
  student,
  onAssignPlan,
}: StudentActivePlanCellProps) {
  const planName = student.activePlan?.name ?? "Sin plan";

  return (
    <div className="flex items-center gap-1.5">
      <span className="truncate">{planName}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 shrink-0 text-muted-foreground hover:text-foreground"
        aria-label="Cambiar plan"
        onClick={() => onAssignPlan(student)}
      >
        <ArrowLeftRight className="size-3.5" />
      </Button>
    </div>
  );
}
