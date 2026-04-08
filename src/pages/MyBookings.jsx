import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, ChevronRight, Car, Star, Download, X } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars } from "../data/cars";

const mockBookings = [
  {
    id: "DRV-A3F9X2",
    carId: 1,
    status: "active",
    pickupDate: "2024-04-15",
    returnDate: "2024-04-18",
    days: 3,
    total: 2697,
    location: "Beverly Hills, CA",
    deliveryType: "Hotel Delivery",
  },
  {
    id: "DRV-B7K1P5",
    carId: 4,
    status: "completed",
    pickupDate: "2024-03-20",
    returnDate: "2024-03-22",
    days: 2,
    total: 1298,
    location: "Los Angeles, CA",
    deliveryType: "Self Pickup",
  },
  {
    id: "DRV-C2M8Q6",
    carId: 7,
    status: "upcoming",
    pickupDate: "2024-05-01",
    returnDate: "2024-05-05",
    days: 4,
    total: 1196,
    location: "Austin, TX",
    deliveryType: "Airport Pickup",
  },
];

const statusConfig = {
  active: { label: "Active", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  upcoming: { label: "Upcoming", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  completed: { label: "Completed", bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" },
  cancelled: { label: "Cancelled", bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500" },
};

function BookingCard({ booking, index }) {
  const car = cars.find(c => c.id === booking.carId);
  const status = statusConfig[booking.status];
  const [showCancel, setShowCancel] = useState(false);

  if (!car) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-52 h-44 sm:h-auto flex-shrink-0">
          <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
          <div className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">{car.brand}</p>
              <h3 className="font-bold text-gray-900 text-xl">{car.name}</h3>
              <p className="text-xs text-gray-400 mt-0.5">Booking #{booking.id}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-gray-900">${booking.total.toLocaleString()}</p>
              <p className="text-xs text-gray-400">{booking.days} days</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
              <span>{booking.pickupDate} → {booking.returnDate}</span>
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
            <Link to={`/car/${car.id}`} className="flex items-center gap-1.5 text-sm font-semibold text-primary border border-primary/20 px-4 py-2 rounded-xl hover:bg-primary/5 transition-colors">
              View Car <ChevronRight className="w-3.5 h-3.5" />
            </Link>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 border border-gray-200 px-4 py-2 rounded-xl hover:border-gray-300 transition-colors cursor-pointer">
              <Download className="w-3.5 h-3.5" /> Receipt
            </button>
            {booking.status === "upcoming" && (
              <button onClick={() => setShowCancel(true)} className="flex items-center gap-1.5 text-sm font-semibold text-red-500 border border-red-100 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer">
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            )}
            {booking.status === "completed" && (
              <button className="flex items-center gap-1.5 text-sm font-semibold text-gold border border-yellow-200 px-4 py-2 rounded-xl hover:bg-yellow-50 transition-colors cursor-pointer">
                <Star className="w-3.5 h-3.5" /> Rate Experience
              </button>
            )}
          </div>
        </div>
      </div>

      {showCancel && (
        <div className="border-t border-red-50 bg-red-50 p-4 flex items-center justify-between">
          <p className="text-sm text-red-600 font-medium">Are you sure you want to cancel this booking?</p>
          <div className="flex gap-2">
            <button onClick={() => setShowCancel(false)} className="text-xs font-semibold text-gray-600 px-4 py-2 rounded-lg bg-white border border-gray-200 cursor-pointer">Keep Booking</button>
            <button onClick={() => setShowCancel(false)} className="text-xs font-semibold text-white px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 cursor-pointer">Yes, Cancel</button>
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
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-playfair text-4xl font-bold text-gray-900 mb-2">My Bookings</motion.h1>
          <p className="text-gray-500">Manage all your reservations in one place</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
          {["all", "active", "upcoming", "completed"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filter === f ? "bg-primary text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "all" && <span className="ml-1.5 bg-gray-100 text-gray-500 text-xs px-1.5 py-0.5 rounded-full">{mockBookings.length}</span>}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-4xl mb-4">🚗</p>
            <h3 className="font-bold text-xl text-gray-700 mb-2">No {filter !== "all" ? filter : ""} bookings</h3>
            <p className="text-gray-400 mb-6">Your bookings will appear here</p>
            <Link to="/fleet" className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors">
              Browse Fleet
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((b, i) => <BookingCard key={b.id} booking={b} index={i} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}