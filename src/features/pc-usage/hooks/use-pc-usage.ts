import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { pcUsageService } from "@/services/http/pc-usage";

export function usePCUsage() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());

  const { data, isLoading } = useQuery({
    queryKey: ["pc-usage", startDate],
    queryFn: () => {
      if (startDate) {
        const start = new Date(startDate.setHours(0, 0, 0, 0)).toISOString();
        const end = new Date(startDate.setHours(23, 59, 59, 999)).toISOString();
        return pcUsageService.fetch({
          startDate: start,
          endDate: end,
        });
      }
    },
  });

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
  };

  return { data, isLoading, handleStartDateChange, startDate };
}
