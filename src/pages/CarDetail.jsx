import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Users, Fuel, Zap, ChevronLeft, ChevronRight, MapPin, Shield, Check, ArrowLeft, Heart, Share2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { cars } from "../data/cars";

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [wishlist, setWishlist] = useState(false);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🚗</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Car not found</h2>
          <Link to="/fleet" className="text-gold underline">Back to Fleet</Link>
        </div>
      </div>
    );
  }

  const gallery = car.gallery || [car.image];
  const similar = cars.filter(c => c.category === car.category && c.id !== car.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-6 cursor-pointer">
          <ArrowLeft className="w-4 h-4" /> Back to Fleet
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 mb-4 bg-gray-200 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt={car.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${wishlist ? "bg-red-500 text-white" : "bg-white/90 text-gray-400"}`}
                aria-label="Add to wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlist ? "fill-white" : ""}`} />
              </button>
              {gallery.length > 1 && (
                <>
                  <button onClick={() => setActiveImg(i => (i - 1 + gallery.length) % gallery.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer" aria-label="Previous image">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={() => setActiveImg(i => (i + 1) % gallery.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer" aria-label="Next image">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${i === activeImg ? "border-gold shadow-lg" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-xl text-gray-900 mb-4">About This Car</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{car.description}</p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Horsepower", value: `${car.horsepower} HP` },
                  { label: "0-60 mph", value: car.acceleration },
                  { label: "Year", value: car.year },
                  { label: "Seats", value: `${car.seats} passengers` },
                ].map(spec => (
                  <div key={spec.label} className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-400 mb-1">{spec.label}</p>
                    <p className="font-bold text-gray-900">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-bold text-xl text-gray-900 mb-4">Included Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {car.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Cars */}
            {similar.length > 0 && (
              <div className="mt-8">
                <h2 className="font-bold text-xl text-gray-900 mb-4">Similar Cars</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similar.map(c => (
                    <Link key={c.id} to={`/car/${c.id}`} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                      <div className="h-36 overflow-hidden">
                        <img src={c.image} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="p-3">
                        <p className="font-semibold text-sm text-gray-800">{c.name}</p>
                        <p className="text-gold font-bold text-sm mt-1">${c.price}/day</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{car.brand}</p>
                    <h1 className="font-playfair font-bold text-2xl text-gray-900">{car.name}</h1>
                  </div>
                  <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-colors cursor-pointer" aria-label="Share">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < Math.floor(car.rating) ? "text-gold fill-gold" : "text-gray-200 fill-gray-200"}`} />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">{car.rating}</span>
                  <span className="text-gray-400 text-sm">({car.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-gray-900">${car.price}</span>
                    <span className="text-gray-400 text-sm mb-1">/day</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Insurance included · Free delivery</p>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    { icon: Users, label: `${car.seats} Seats` },
                    { icon: Fuel, label: car.fuel },
                    { icon: Zap, label: car.transmission },
                    { icon: MapPin, label: car.location },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="flex gap-2 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-green-50 rounded-lg px-3 py-2">
                    <Shield className="w-3.5 h-3.5 text-green-600" /> Fully Insured
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-blue-50 rounded-lg px-3 py-2">
                    <Check className="w-3.5 h-3.5 text-blue-600" /> Verified
                  </div>
                </div>

                <Link
                  to={`/booking/${car.id}`}
                  className="block w-full text-center bg-gold hover:bg-yellow-500 text-white font-bold py-4 rounded-xl text-base transition-all duration-200 shadow-lg shadow-yellow-500/20 mb-3"
                >
                  Book This Car
                </Link>
                <p className="text-center text-xs text-gray-400">Free cancellation up to 24 hours before pickup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}