import { format } from "date-fns";
import { CalendarIcon, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardStats } from "@/features/pc-usage/components/card";
import { CardLoading } from "@/features/pc-usage/components/card-loading";
import { ChartLoading } from "@/features/pc-usage/components/chart-loading";
import { CPUChart } from "@/features/pc-usage/components/cpu-chart";
import { DiskChart } from "@/features/pc-usage/components/disk-chart";
import { MemoryChart } from "@/features/pc-usage/components/memory-chart";
import { usePCUsage } from "@/features/pc-usage/hooks/use-pc-usage";
import { cn } from "@/lib/utils";

export function PCUsage() {
  const {
    isPending,
    data,
    startDate,
    handleStartDateChange,
    refetch,
    isRefetching,
  } = usePCUsage();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <h5 className="text-2xl font-bold">PC Usage</h5>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  startDate && "text-muted-foreground",
                )}
              >
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
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
          <Button
            size="icon"
            variant="outline"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            <RefreshCcw className={cn(isRefetching && "animate-spin")} />
          </Button>
        </div>
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full gap-4">
          {isPending ? (
            <CardLoading title="Memory Usage" />
          ) : (
            <CardStats
              title="Memory Usage"
              content={`${Math.round(Number(data?.[data.length - 1]?.memoryUsage))} MB / ${Math.round(Number(data?.[data.length - 1]?.totalMemory))} MB`}
            />
          )}
          {isPending ? (
            <CardLoading title="Cpu Usage" />
          ) : (
            <CardStats
              title="Cpu Usage"
              content={`${data?.[data.length - 1]?.coresUsage}% of ${data?.[data.length - 1]?.totalCores} Total Cores`}
            />
          )}
          {isPending ? (
            <CardLoading title="Disk Usage" />
          ) : (
            <CardStats
              title="Disk Usage"
              content={`${Math.round(Number(data?.[data.length - 1]?.diskUsage))} GB / ${Math.round(Number(data?.[data.length - 1]?.totalDisk))} GB`}
            />
          )}
        </div>

        {isPending ? (
          <ChartLoading />
        ) : (
          <MemoryChart
            data={(data || [])?.map((t) => {
              return {
                date: t.createdAt,
                memory: Math.round(t.memoryUsage),
              };
            })}
          />
        )}
        {isPending ? (
          <ChartLoading />
        ) : (
          <CPUChart
            data={(data || [])?.map((t) => {
              return {
                date: t.createdAt,
                cpu: t.coresUsage,
              };
            })}
          />
        )}

        {isPending ? (
          <ChartLoading />
        ) : (
          <DiskChart
            data={(data || [])?.map((t) => {
              return {
                date: t.createdAt,
                cpu: t.diskUsage,
              };
            })}
          />
        )}
      </div>
    </div>
  );
}
