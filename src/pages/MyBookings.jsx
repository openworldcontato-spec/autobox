import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ChevronRight, Car, Star, Download, X } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars } from "../data/cars";
import { formatCurrency, formatDateBR } from "@/lib/formatters";

const mockBookings = [
  {
    id: "BOX-A3F9X2",
    carId: 1,
    status: "active",
    pickupDate: "2026-06-15",
    returnDate: "2026-06-18",
    days: 3,
    total: 11670,
    location: "São Paulo, SP",
    deliveryType: "Entrega em hotel",
  },
  {
    id: "BOX-B7K1P5",
    carId: 4,
    status: "completed",
    pickupDate: "2026-04-20",
    returnDate: "2026-04-22",
    days: 2,
    total: 5980,
    location: "Curitiba, PR",
    deliveryType: "Retirada no local",
  },
  {
    id: "BOX-C2M8Q6",
    carId: 7,
    status: "upcoming",
    pickupDate: "2026-07-01",
    returnDate: "2026-07-05",
    days: 4,
    total: 7560,
    location: "Campinas, SP",
    deliveryType: "Retirada no aeroporto",
  },
];

const statusConfig = {
  active: { label: "Ativa", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  upcoming: { label: "Agendada", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  completed: { label: "Concluída", bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  cancelled: { label: "Cancelada", bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500" },
};

const filterLabels = {
  all: "Todas",
  active: "Ativas",
  upcoming: "Agendadas",
  completed: "Concluídas",
};

function BookingCard({ booking, index }) {
  const car = cars.find(c => c.id === booking.carId);
  const status = statusConfig[booking.status];
  const [showCancel, setShowCancel] = useState(false);
  if (!car) return null;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-52 h-44 sm:h-auto flex-shrink-0">
          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
          <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} /> {status.label}
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4 gap-4">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">{car.brand}</p>
              <h3 className="font-bold text-gray-900 text-xl">{car.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Reserva #{booking.id}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-gray-900">{formatCurrency(booking.total)}</p>
              <p className="text-xs text-gray-400">{booking.days} dia{booking.days > 1 ? "s" : ""}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{formatDateBR(booking.pickupDate)} → {formatDateBR(booking.returnDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{booking.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Car className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{booking.deliveryType}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to={`/car/${car.id}`} className="flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary/20 px-4 py-2.5 rounded-xl hover:bg-primary/5 transition-colors">
              Ver carro <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 border border-gray-200 px-4 py-2.5 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Recibo
            </button>
            {booking.status === "upcoming" && (
              <button onClick={() => setShowCancel(true)} className="flex items-center gap-1.5 text-sm font-semibold text-red-500 border border-red-100 px-4 py-2.5 rounded-xl hover:bg-red-50 transition-colors cursor-pointer">
                <X className="w-3.5 h-3.5" /> Cancelar
              </button>
            )}
            {booking.status === "completed" && (
              <button className="flex items-center gap-1.5 text-sm font-semibold text-gold border border-yellow-200 px-4 py-2.5 rounded-xl hover:bg-yellow-50 transition-colors cursor-pointer">
                <Star className="w-3.5 h-3.5" /> Avaliar
              </button>
            )}
          </div>
        </div>
      </div>

      {showCancel && (
        <div className="border-t border-red-50 bg-red-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-red-600 font-medium">Tem certeza que deseja cancelar esta reserva?</p>
          <div className="flex gap-2">
            <button onClick={() => setShowCancel(false)} className="text-xs font-semibold text-gray-600 px-4 py-2 rounded-lg bg-white border border-gray-200 cursor-pointer">Manter</button>
            <button onClick={() => setShowCancel(false)} className="text-xs font-semibold text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer">Sim, cancelar</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function MyBookings() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? mockBookings : mockBookings.filter(b => b.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="mb-8">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-playfair text-4xl font-bold text-gray-900 mb-2">Minhas reservas</motion.h1>
          <p className="text-gray-500">Acompanhe suas reservas, recibos e cancelamentos em um só lugar.</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
          {Object.keys(filterLabels).map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer active:scale-95 ${filter === f ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}>
              {filterLabels[f]}
              {f === "all" && <span className="ml-1.5 bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded-full">{mockBookings.length}</span>}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-4xl mb-4">🚗</p>
            <h3 className="font-bold text-xl text-gray-700 mb-2">Nenhuma reserva</h3>
            <p className="text-gray-400 mb-6">Suas reservas aparecerão aqui.</p>
            <Link to="/fleet" className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors">Ver frota</Link>
          </div>
        ) : (
          <div className="space-y-5">{filtered.map((b, i) => <BookingCard key={b.id} booking={b} index={i} />)}</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
