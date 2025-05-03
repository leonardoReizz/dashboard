export interface PCUsageResponse {
  id: number;
  coresUsage: number;
  totalCores: number;
  memoryUsage: number;
  totalMemory: number;
  diskUsage: number;
  totalDisk: number;
  updatedAt: string;
  createdAt: string;
}

export interface PCUsageRequest {
  startDate: string;
  endDate: string;
}
