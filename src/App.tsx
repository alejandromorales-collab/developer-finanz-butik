import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import ProjectSheet from "./pages/ProjectSheet";
import Portfolio from "./pages/Portfolio";
import Learn from "./pages/Learn";
import Login from "./pages/Login";
import DeveloperLayout from "./pages/developer/DeveloperLayout";
import MyProjects from "./pages/developer/MyProjects";
import UploadWizard from "./pages/developer/UploadWizard";
import Analytics from "./pages/developer/Analytics";
import Profile from "./pages/developer/Profile";
import ManagerLayout from "./pages/manager/ManagerLayout";
import Clients from "./pages/manager/Clients";
import BrandSettings from "./pages/manager/BrandSettings";
import Reports from "./pages/manager/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/:slug" element={<ProjectSheet />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/login" element={<Login />} />

            {/* Developer Dashboard */}
            <Route path="/developer" element={<ProtectedRoute allowedRoles={["developer"]}><DeveloperLayout /></ProtectedRoute>}>
              <Route index element={<MyProjects />} />
              <Route path="upload" element={<UploadWizard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Manager Dashboard */}
            <Route path="/manager" element={<ProtectedRoute allowedRoles={["manager"]}><ManagerLayout /></ProtectedRoute>}>
              <Route index element={<Clients />} />
              <Route path="brand" element={<BrandSettings />} />
              <Route path="reports" element={<Reports />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
