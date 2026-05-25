import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Star, Users, Fuel, Zap, X, Grid3X3, List } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars, categories } from "../data/cars";
import { formatCurrency } from "@/lib/formatters";

const badgeStyles = {
  gold: "bg-yellow-50 text-yellow-700 border-yellow-200",
  red: "bg-red-50 text-red-600 border-red-200",
  purple: "bg-purple-50 text-purple-600 border-purple-200",
  green: "bg-green-50 text-green-700 border-green-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
};

function CarListItem({ car }) {
  return (
    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-0">
      <div className="relative w-full sm:w-64 h-52 sm:h-auto flex-shrink-0">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
        {car.badge && <div className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeStyles[car.badgeColor]}`}>{car.badge}</div>}
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-2 gap-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">{car.brand}</p>
              <h3 className="font-bold text-gray-900 text-xl">{car.name}</h3>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-gold fill-gold" />
              <span className="font-bold text-gray-800">{car.rating}</span>
              <span className="text-gray-400 text-sm">({car.reviews})</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{car.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{car.seats} lugares</span>
            <span className="flex items-center gap-1.5"><Fuel className="w-4 h-4" />{car.fuel}</span>
            <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" />{car.acceleration} 0–100</span>
            <span className="capitalize">{car.transmission}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 gap-4">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-gray-900">{formatCurrency(car.price)}</span>
            <span className="text-gray-400 text-sm">/dia</span>
          </div>
          <Link to={`/car/${car.id}`} className="bg-primary hover:bg-navy text-white font-semibold px-5 py-3 rounded-xl transition-colors whitespace-nowrap active:scale-[0.98]">
            Reservar
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function CarGridItem({ car }) {
  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {car.badge && <div className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border ${badgeStyles[car.badgeColor]}`}>{car.badge}</div>}
        <div className="absolute bottom-3 right-3 glass text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          {formatCurrency(car.price)}<span className="opacity-70">/dia</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{car.brand}</p>
            <h3 className="font-bold text-gray-900">{car.name}</h3>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="font-bold text-gray-800">{car.rating}</span>
          </div>
        </div>
        <div className="flex gap-3 text-xs text-gray-400 mb-4">
          <span>{car.seats} lugares</span><span>·</span><span>{car.fuel}</span><span>·</span><span>{car.acceleration}</span>
        </div>
        <Link to={`/car/${car.id}`} className="block w-full text-center bg-primary hover:bg-navy text-white font-semibold text-sm py-3 rounded-xl transition-colors active:scale-[0.98]">
          Ver detalhes
        </Link>
      </div>
    </motion.div>
  );
}

export default function Fleet() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(6000);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...cars];
    if (search) result = result.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase()));
    if (activeCategory !== "all") result = result.filter(c => c.category === activeCategory);
    result = result.filter(c => c.price <= maxPrice);
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, activeCategory, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="navy-gradient pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">Nossa frota</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
            {filtered.length} veículos premium
          </motion.h1>
          <p className="text-gray-400">Encontre o carro certo para evento, viagem, conteúdo ou aquele rolê nível board meeting.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar por marca, modelo ou cidade…" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all" />
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:border-gold/50 cursor-pointer">
              <option value="popular">Mais populares</option>
              <option value="rating">Melhor avaliados</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:border-gold/50 transition-colors cursor-pointer whitespace-nowrap">
              <SlidersHorizontal className="w-4 h-4" /> Filtros
            </button>
            <div className="hidden sm:flex rounded-xl overflow-hidden border border-gray-200">
              <button onClick={() => setViewMode("grid")} className={`px-3 py-3 cursor-pointer ${viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-500"}`} aria-label="Ver em grade"><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setViewMode("list")} className={`px-3 py-3 cursor-pointer ${viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-500"}`} aria-label="Ver em lista"><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mb-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">Filtros avançados</h3>
                  <button onClick={() => setShowFilters(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer" aria-label="Fechar filtros"><X className="w-4 h-4" /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600 mb-2 block">Diária máxima: <span className="text-gold font-bold">{formatCurrency(maxPrice)}</span></label>
                    <input type="range" min={1000} max={6000} step={100} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-yellow-500" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1"><span>{formatCurrency(1000)}</span><span>{formatCurrency(6000)}</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 mb-8">
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 active:scale-95 ${activeCategory === cat.id ? "bg-primary text-white shadow-lg" : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300"}`}>
              <span>{cat.icon}</span>{cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🏎️</p>
            <h3 className="font-bold text-xl text-gray-700 mb-2">Nenhum carro encontrado</h3>
            <p className="text-gray-400">Ajuste os filtros e tente novamente.</p>
          </div>
        ) : viewMode === "grid" ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>{filtered.map(car => <CarGridItem key={car.id} car={car} />)}</AnimatePresence>
          </motion.div>
        ) : (
          <div className="space-y-5"><AnimatePresence>{filtered.map(car => <CarListItem key={car.id} car={car} />)}</AnimatePresence></div>
        )}
      </div>
      <Footer />
    </div>
  );
}
