import { Link } from "react-router-dom";
import { ArrowRight, Car, CheckCircle2, ClipboardList, CreditCard, Globe2, MessageCircle, Plus } from "lucide-react";
import { AdminShell, StatusBadge } from "@/components/admin/AdminShell";
import { getCompanyById, getReservationsByCompany, getSelectedCompanyId, getCarsByCompany, summarizeCompany, STATUSES, statusStyles } from "@/lib/storage";
import { formatCurrency, formatDateBR } from "@/lib/formatters";

const cardClasses = "rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm";

export default function AdminDashboard() {
  const companyId = getSelectedCompanyId();
  const company = getCompanyById(companyId) || {};
  const summary = summarizeCompany(companyId) || {};
  const cars = getCarsByCompany(companyId) || [];
  const reservations = (getReservationsByCompany(companyId) || []).slice(0, 4);

  const actions = (
    <>
      <Link to="/admin/carros" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-navy"><Plus className="h-4 w-4" /> Novo carro</Link>
      <Link to={`/locadora/${company.slug || ""}`} className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-black text-gray-700 hover:border-gold"><Globe2 className="h-4 w-4" /> Ver página</Link>
    </>
  );

  return (
    <AdminShell title="Dashboard" subtitle={`Operação atual: ${company.name || "Sem empresa"}`} actions={actions}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Carros cadastrados", value: summary.cars, icon: Car, helper: `${summary.availableCars} disponíveis` },
          { label: "Reservas", value: summary.reservations, icon: ClipboardList, helper: `${summary.pendingReservations} pendentes` },
          { label: "Receita aprovada", value: summary.revenueLabel, icon: CreditCard, helper: "Reservas aprovadas/concluídas" },
          { label: "Plano SaaS", value: formatCurrency(company.planPrice || 0), icon: CheckCircle2, helper: "AutoBox Pro mensal" },
        ].map(({ label, value, icon: Icon, helper }) => (
          <div key={label} className={cardClasses}>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-50 text-gold"><Icon className="h-6 w-6" /></div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">{label}</p>
            <p className="mt-1 text-3xl font-black text-gray-900">{value}</p>
            <p className="mt-2 text-sm text-gray-500">{helper}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className={cardClasses}>
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-gray-900">Reservas recentes</h2>
              <p className="text-sm text-gray-500">Aprovar, cancelar ou concluir está em Reservas.</p>
            </div>
            <Link to="/admin/reservas" className="text-sm font-black text-gold hover:text-yellow-600">Ver tudo</Link>
          </div>
          <div className="space-y-3">
            {reservations.map((reservation) => {
              const car = cars.find((item) => item.id === reservation.carId);
              return (
                <div key={reservation.id} className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-black text-gray-900">{reservation.customerName}</p>
                    <p className="text-sm text-gray-500">{car?.name || "Carro removido"} • {formatDateBR(reservation.pickupDate)} até {formatDateBR(reservation.returnDate)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge label={STATUSES.reservation[reservation.status]} className={statusStyles[reservation.status]} />
                    <span className="text-sm font-black text-gray-900">{formatCurrency(reservation.total)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={cardClasses}>
          <h2 className="text-xl font-black text-gray-900">Checklist da locadora</h2>
          <div className="mt-5 space-y-3">
            {[
              { done: Boolean(company.logo || company.logoDataUrl), label: "Logo configurado" },
              { done: Boolean(company.whatsapp?.includes("+55")), label: "WhatsApp no padrão +55" },
              { done: cars.length > 0, label: "Frota cadastrada" },
              { done: Boolean(company.howItWorks), label: "Texto Como funciona" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-2xl bg-gray-50 p-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${item.done ? "bg-green-50 text-green-700" : "bg-gray-200 text-gray-500"}`}>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-sm font-bold text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>
          <Link to="/admin/empresa" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-black text-white hover:bg-navy">
            Ajustar empresa <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-[2rem] border border-yellow-200 bg-yellow-50 p-6">
        <div className="flex gap-4">
          <MessageCircle className="mt-1 h-6 w-6 shrink-0 text-yellow-700" />
          <div>
            <p className="font-black text-yellow-900">Sem confusão de monetização</p>
            <p className="mt-1 text-sm text-yellow-800">O plano {company.planName || "AutoBox Pro"} ({formatCurrency(company.planPrice || 0)}/mês) é cobrado da locadora. Diária, semanal, mensal, caução e pacotes são cadastrados pela própria locadora.</p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}