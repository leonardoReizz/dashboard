import { Outlet } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";

export function LayoutWithSidebar() {
  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <div className="h-full w-full p-4">
        <Outlet />
      </div>
    </div>
  );
}
