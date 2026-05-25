import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Fuel, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { cars, categories } from "../../data/cars";
import { formatCurrency } from "@/lib/formatters";

const badgeStyles = {
  gold: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  red: "bg-red-50 text-red-600 border border-red-200",
  purple: "bg-purple-50 text-purple-600 border border-purple-200",
  green: "bg-green-50 text-green-700 border border-green-200",
  blue: "bg-blue-50 text-blue-700 border border-blue-200",
};

function CarCard({ car, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex-shrink-0 w-72 sm:w-80">
      <div className="relative h-48 overflow-hidden">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {car.badge && <div className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${badgeStyles[car.badgeColor]}`}>{car.badge}</div>}
        <div className="absolute bottom-3 right-3 glass text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          {formatCurrency(car.price)}<span className="opacity-70">/dia</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">{car.brand}</p>
            <h3 className="font-bold text-gray-900 text-base leading-tight">{car.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="font-semibold text-gray-800">{car.rating}</span>
            <span className="text-gray-400">({car.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 border-t border-gray-50 pt-3">
          <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-gray-400" />{car.seats} lugares</span>
          <span className="flex items-center gap-1.5"><Fuel className="w-3.5 h-3.5 text-gray-400" />{car.fuel}</span>
          <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-gray-400" />{car.acceleration}</span>
        </div>

        <Link to={`/car/${car.id}`} className="block w-full text-center bg-primary hover:bg-navy text-white font-semibold text-sm py-3 rounded-xl transition-colors duration-200 active:scale-[0.98]">
          Ver detalhes
        </Link>
      </div>
    </motion.div>
  );
}

export default function FeaturedCars() {
  const [activeCategory, setActiveCategory] = useState("all");
  const scrollRef = useRef(null);
  const filtered = activeCategory === "all" ? cars : cars.filter(c => c.category === activeCategory);
  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir * 350, behavior: "smooth" });

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">
              Nossa coleção
            </motion.p>
            <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-playfair text-4xl font-bold text-gray-900">
              Escolhidos para você
            </motion.h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scroll(-1)} className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer" aria-label="Rolar para esquerda">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll(1)} className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer" aria-label="Rolar para direita">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 mb-8">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 active:scale-95 ${activeCategory === cat.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 hover:border-gray-300 border border-gray-200"}`}>
              <span>{cat.icon}</span>{cat.label}
            </button>
          ))}
        </div>

        <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
          {filtered.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
        </div>

        <div className="text-center mt-10">
          <Link to="/fleet" className="inline-flex items-center gap-2 border-2 border-primary text-primary font-bold px-8 py-3.5 rounded-full hover:bg-primary hover:text-white transition-all duration-200">
            Ver frota completa <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
