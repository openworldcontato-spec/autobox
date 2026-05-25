import { useMemo, useState } from "react";
import { Check, ClipboardList, Search, Trash2, XCircle } from "lucide-react";
import { AdminShell, EmptyState, StatusBadge } from "@/components/admin/AdminShell";
import { deleteReservation, getCarsByCompany, getReservationsByCompany, getSelectedCompanyId, STATUSES, statusStyles, updateReservation } from "@/lib/storage";
import { formatCurrency, formatDateBR } from "@/lib/formatters";

export default function AdminReservations() {
  const companyId = getSelectedCompanyId();
  const [reservations, setReservations] = useState(getReservationsByCompany(companyId));
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const cars = getCarsByCompany(companyId);

  const reload = () => setReservations(getReservationsByCompany(companyId));
  const changeStatus = (id, status) => {
    updateReservation(id, { status });
    reload();
  };
  const remove = (id) => {
    if (window.confirm("Excluir esta reserva?")) {
      deleteReservation(id);
      reload();
    }
  };

  const filtered = useMemo(() => reservations.filter((reservation) => {
    const car = cars.find((item) => item.id === reservation.carId);
    const text = `${reservation.customerName} ${reservation.phone} ${reservation.email} ${car?.name || ""}`.toLowerCase();
    const okFilter = filter === "all" || reservation.status === filter;
    return okFilter && text.includes(query.toLowerCase());
  }), [reservations, cars, filter, query]);

  return (
    <AdminShell title="Reservas" subtitle="Gerencie solicitações da página pública da locadora.">
      <div className="mb-5 grid gap-3 rounded-[2rem] border border-gray-100 bg-white p-4 shadow-sm lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold outline-none focus:border-gold focus:ring-4 focus:ring-yellow-100" placeholder="Buscar cliente, telefone, e-mail ou carro..." />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[["all", "Todas"], ...Object.entries(STATUSES.reservation)].map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} className={`whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-black transition-all active:scale-95 ${filter === key ? "bg-primary text-white" : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"}`}>{label}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={ClipboardList} title="Nenhuma reserva encontrada" text="As reservas feitas na página pública da locadora aparecem aqui." />
      ) : (
        <div className="space-y-4">
          {filtered.map((reservation) => {
            const car = cars.find((item) => item.id === reservation.carId);
            return (
              <div key={reservation.id} className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-black text-gray-900">{reservation.customerName}</h3>
                      <StatusBadge label={STATUSES.reservation[reservation.status]} className={statusStyles[reservation.status]} />
                    </div>
                    <p className="text-sm text-gray-500">{car?.name || "Carro removido"} • {formatDateBR(reservation.pickupDate)} até {formatDateBR(reservation.returnDate)}</p>
                    <p className="mt-1 text-sm text-gray-500">{reservation.phone} • {reservation.email}</p>
                    {reservation.notes && <p className="mt-3 rounded-2xl bg-gray-50 p-3 text-sm text-gray-600">{reservation.notes}</p>}
                  </div>
                  <div className="text-left lg:text-right">
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Total estimado</p>
                    <p className="text-3xl font-black text-gray-900">{formatCurrency(reservation.total)}</p>
                    <p className="text-xs text-gray-400">Criada em {formatDateBR(reservation.createdAt)}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                  <button onClick={() => changeStatus(reservation.id, "approved")} className="inline-flex items-center gap-2 rounded-2xl border border-green-200 px-4 py-2.5 text-sm font-black text-green-700 hover:bg-green-50"><Check className="h-4 w-4" /> Aprovar</button>
                  <button onClick={() => changeStatus(reservation.id, "completed")} className="inline-flex items-center gap-2 rounded-2xl border border-purple-200 px-4 py-2.5 text-sm font-black text-purple-700 hover:bg-purple-50"><Check className="h-4 w-4" /> Concluir</button>
                  <button onClick={() => changeStatus(reservation.id, "cancelled")} className="inline-flex items-center gap-2 rounded-2xl border border-red-200 px-4 py-2.5 text-sm font-black text-red-600 hover:bg-red-50"><XCircle className="h-4 w-4" /> Cancelar</button>
                  <button onClick={() => remove(reservation.id)} className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 px-4 py-2.5 text-sm font-black text-gray-600 hover:bg-gray-50"><Trash2 className="h-4 w-4" /> Excluir</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AdminShell>
  );
}
