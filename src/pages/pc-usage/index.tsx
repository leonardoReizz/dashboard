import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CPUChart } from "@/features/pc-usage/components/cpu-chart";
import { DiskChart } from "@/features/pc-usage/components/disk-chart";
import { MemoryChart } from "@/features/pc-usage/components/memory-chart";
import { usePCUsage } from "@/features/pc-usage/hooks/use-pc-usage";
import { cn } from "@/lib/utils";

export function PCUsage() {
  const { data, startDate, handleStartDateChange } = usePCUsage();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h5 className="text-2xl font-bold">PC Usage</h5>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                startDate && "text-muted-foreground",
              )}
            >
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={handleStartDateChange}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Memory Usage</CardTitle>
            </CardHeader>
            <CardContent>
              {Math.round(Number(data?.[data.length - 1]?.memoryUsage))} MB /{" "}
              {Math.round(Number(data?.[data.length - 1]?.totalMemory))} MB
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Cpu Usage</CardTitle>
            </CardHeader>
            <CardContent>
              {data?.[data.length - 1]?.coresUsage} /{" "}
              {data?.[data.length - 1]?.totalCores} Cores
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Cpu Usage</CardTitle>
            </CardHeader>
            <CardContent>
              {Math.round(Number(data?.[data.length - 1]?.diskUsage))} GB /{" "}
              {Math.round(Number(data?.[data.length - 1]?.totalDisk))} GB
            </CardContent>
          </Card>
        </div>
        <MemoryChart
          data={(data || [])?.map((t) => {
            return {
              date: t.createdAt,
              memory: Math.round(t.memoryUsage),
            };
          })}
        />
        <CPUChart
          data={(data || [])?.map((t) => {
            return {
              date: t.createdAt,
              cpu: t.coresUsage,
            };
          })}
        />
        <DiskChart
          data={(data || [])?.map((t) => {
            return {
              date: t.createdAt,
              cpu: t.diskUsage,
            };
          })}
        />
      </div>
    </div>
  );
}
