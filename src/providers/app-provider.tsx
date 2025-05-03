import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
