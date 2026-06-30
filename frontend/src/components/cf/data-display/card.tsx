import * as React from "react";

import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as ShadcnCard,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CardProps extends React.ComponentProps<typeof ShadcnCard> {
  animated?: boolean;
}

export function Card({ animated = false, className, ...props }: CardProps) {
  return (
    <ShadcnCard
      className={cn(
        "rounded-lg border-border bg-card",
        animated && "card-enter",
        className,
      )}
      {...props}
    />
  );
}

export {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
