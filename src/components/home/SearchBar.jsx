import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Car, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [carType, setCarType] = useState("all");

  const handleSearch = () => {
    navigate(`/fleet?location=${location}&pickup=${pickupDate}&return=${returnDate}&type=${carType}`);
  };

  return (
    <section className="relative -mt-8 z-10 px-4 sm:px-6 lg:px-8 pb-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl shadow-black/10 p-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {/* Location */}
            <div className="flex items-center gap-3 px-4 py-3 border-b sm:border-b lg:border-b-0 lg:border-r border-gray-100">
              <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Location</p>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="City or Airport"
                  className="w-full text-sm text-gray-800 font-medium placeholder-gray-400 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Pickup */}
            <div className="flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r lg:border-r border-gray-100">
              <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Pick-up</p>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={e => setPickupDate(e.target.value)}
                  className="w-full text-sm text-gray-800 font-medium focus:outline-none bg-transparent cursor-pointer"
                />
              </div>
            </div>

            {/* Return */}
            <div className="flex items-center gap-3 px-4 py-3 border-b sm:border-b sm:border-r-0 lg:border-b-0 lg:border-r border-gray-100">
              <Calendar className="w-5 h-5 text-gold flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Return</p>
                <input
                  type="date"
                  value={returnDate}
                  onChange={e => setReturnDate(e.target.value)}
                  className="w-full text-sm text-gray-800 font-medium focus:outline-none bg-transparent cursor-pointer"
                />
              </div>
            </div>

            {/* Car Type + Search */}
            <div className="flex items-center gap-2 px-4 py-3">
              <Car className="w-5 h-5 text-gold flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Type</p>
                <select
                  value={carType}
                  onChange={e => setCarType(e.target.value)}
                  className="w-full text-sm text-gray-800 font-medium focus:outline-none bg-transparent cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="supercar">Supercar</option>
                  <option value="luxury">Luxury</option>
                  <option value="sports">Sports</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="ml-2 w-12 h-12 bg-gold hover:bg-yellow-500 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-yellow-500/30 cursor-pointer flex-shrink-0"
                aria-label="Search cars"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}