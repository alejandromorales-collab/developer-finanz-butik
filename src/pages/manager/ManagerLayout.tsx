import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ManagerSidebar } from "@/components/ManagerSidebar";

const ManagerLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <ManagerSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 flex items-center border-b bg-background/95 backdrop-blur px-4">
          <SidebarTrigger className="mr-4" />
          <span className="font-heading text-sm font-semibold text-foreground">Client Manager</span>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default ManagerLayout;
