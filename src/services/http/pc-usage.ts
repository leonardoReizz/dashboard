import { httpClient } from "./client";
import { PCUsageRequest, PCUsageResponse } from "./types/pc-usage";

export const pcUsageService = {
  fetch: async (query: PCUsageRequest): Promise<PCUsageResponse[]> => {
    const response = await httpClient.get<PCUsageResponse[]>(
      `/pc-usage?startDate=${query.startDate}&endDate=${query.endDate}`,
    );
    return response.data;
  },
};
