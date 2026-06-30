import * as React from "react";

import { cn } from "@/lib/utils";

type TitleSize = "page" | "section" | "card";

const sizeClasses: Record<TitleSize, string> = {
  page: "text-2xl font-semibold tracking-tight",
  section: "text-lg font-semibold tracking-tight",
  card: "text-base font-medium",
};

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: TitleSize;
}

export function Title({
  as: Component = "h2",
  size = "section",
  className,
  ...props
}: TitleProps) {
  return (
    <Component
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
}
