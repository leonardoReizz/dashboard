import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { SidebarProvider } from "@/components/ui/sidebar";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        {children}
        <Toaster />
      </SidebarProvider>
    </QueryClientProvider>
  );
}
