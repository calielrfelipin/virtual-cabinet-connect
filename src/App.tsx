
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Cidadaos from "./pages/Cidadaos";
import Demandas from "./pages/Demandas";
import Equipe from "./pages/Equipe";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/cidadaos" element={
            <AppLayout>
              <Cidadaos />
            </AppLayout>
          } />
          <Route path="/demandas" element={
            <AppLayout>
              <Demandas />
            </AppLayout>
          } />
          <Route path="/equipe" element={
            <AppLayout>
              <Equipe />
            </AppLayout>
          } />
          <Route path="/relatorios" element={
            <AppLayout>
              <Relatorios />
            </AppLayout>
          } />
          <Route path="/configuracoes" element={
            <AppLayout>
              <Configuracoes />
            </AppLayout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
