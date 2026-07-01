"use client";

import * as React from "react";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export interface CfTab {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface CfTabsProps {
  tabs: CfTab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function CfTabs({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
}: CfTabsProps) {
  const resolvedDefault = defaultValue ?? tabs[0]?.value;

  return (
    <Tabs
      orientation="horizontal"
      defaultValue={resolvedDefault}
      value={value}
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <TabsList className="w-full justify-start">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} disabled={tab.disabled}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
