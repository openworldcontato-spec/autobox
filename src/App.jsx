import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./lib/PageNotFound";
import BottomNav from "@/components/layout/BottomNav";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import SignupCompany from "./pages/SignupCompany.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminCompany from "./pages/AdminCompany.jsx";
import AdminCars from "./pages/AdminCars.jsx";
import AdminReservations from "./pages/AdminReservations.jsx";
import AdminPlans from "./pages/AdminPlans.jsx";
import PublicCompany from "./pages/PublicCompany.jsx";
import CompanyDirectory from "./pages/CompanyDirectory.jsx";
import SuperAdmin from "./pages/SuperAdmin.jsx";

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/planos" element={<Pricing />} />
          <Route path="/cadastro-empresa" element={<SignupCompany />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/painel" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/empresa" element={<AdminCompany />} />
          <Route path="/admin/carros" element={<AdminCars />} />
          <Route path="/admin/frota" element={<Navigate to="/admin/carros" replace />} />
          <Route path="/admin/reservas" element={<AdminReservations />} />
          <Route path="/admin/planos" element={<AdminPlans />} />
          <Route path="/super-admin" element={<SuperAdmin />} />
          <Route path="/locadora/:slug" element={<PublicCompany />} />
          <Route path="/locadoras" element={<CompanyDirectory />} />

          {/* Rotas antigas preservadas para não quebrar navegação já publicada */}
          <Route path="/fleet" element={<CompanyDirectory />} />
          <Route path="/frota" element={<CompanyDirectory />} />
          <Route path="/bookings" element={<Navigate to="/admin/reservas" replace />} />
          <Route path="/reservas" element={<Navigate to="/admin/reservas" replace />} />
          <Route path="/booking/:id" element={<Navigate to="/locadora/alpha-flex" replace />} />
          <Route path="/reserva/:id" element={<Navigate to="/locadora/alpha-flex" replace />} />
          <Route path="/car/:id" element={<Navigate to="/locadora/alpha-flex" replace />} />
          <Route path="/carro/:id" element={<Navigate to="/locadora/alpha-flex" replace />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <BottomNav />
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
