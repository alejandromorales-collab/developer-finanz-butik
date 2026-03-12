import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AgentSidebar } from "@/components/AgentSidebar";

const AgentLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AgentSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 flex items-center border-b bg-background/95 backdrop-blur px-4">
          <SidebarTrigger className="mr-4" />
          <span className="font-heading text-sm font-semibold text-foreground">Agent Portal</span>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default AgentLayout;
