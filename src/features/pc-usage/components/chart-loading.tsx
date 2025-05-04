"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartLoading() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>CPU Usage</CardTitle>
        <CardDescription>
          Shows the percentage of CPU usage in the current day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
}
