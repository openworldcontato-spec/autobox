import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, ArrowRight, Shield, Award, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=80",
    car: "Lamborghini Huracán",
    tagline: "Alugue carros premium no Brasil",
    price: 3890,
    cta: "Ver supercarros",
  },
  {
    image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1920&q=80",
    car: "Rolls-Royce Ghost",
    tagline: "Chegue com presença de verdade",
    price: 5290,
    cta: "Reservar luxo",
  },
  {
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80",
    car: "Porsche 911 Turbo S",
    tagline: "Performance sem burocracia",
    price: 2990,
    cta: "Dirigir agora",
  },
];

const stats = [
  { icon: Award, value: "150+", label: "Veículos premium" },
  { icon: Star, value: "4,9★", label: "Avaliação média" },
  { icon: Shield, value: "100%", label: "Seguro incluso" },
  { icon: Clock, value: "24/7", label: "Suporte" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, [autoPlay]);

  const prev = () => { setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length); setAutoPlay(false); };
  const next = () => { setCurrent(c => (c + 1) % heroSlides.length); setAutoPlay(false); };

  return (
    <section className="relative min-h-[760px] lg:h-screen lg:min-h-[650px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img src={heroSlides[current].image} alt={heroSlides[current].car} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-28 pb-52 lg:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 glass text-white text-xs font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
              {heroSlides[current].car}
            </div>

            <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
              {heroSlides[current].tagline}
            </h1>

            <p className="text-2xl text-gold font-semibold mb-3">A partir de {formatCurrency(heroSlides[current].price)}/dia</p>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Reserve em minutos, pague em BRL e receba o carro em endereço, aeroporto ou hotel. Zero novela, só operação redonda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/fleet" className="group inline-flex items-center justify-center gap-2 bg-gold hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-2xl sm:rounded-full transition-all duration-200 shadow-2xl shadow-yellow-500/30 text-base active:scale-[0.98]">
                {heroSlides[current].cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/fleet" className="inline-flex items-center justify-center gap-2 glass text-white font-semibold px-8 py-4 rounded-2xl sm:rounded-full hover:bg-white/20 transition-all duration-200 text-base active:scale-[0.98]">
                Ver toda a frota
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="absolute bottom-8 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8">
          <div className="max-w-7xl mx-auto">
            <div className="glass rounded-2xl px-5 py-4 grid grid-cols-2 lg:grid-cols-4 gap-5">
              {stats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-none">{value}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-10">
        <button onClick={prev} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer" aria-label="Slide anterior">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer" aria-label="Próximo slide">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="hidden sm:flex absolute bottom-32 right-6 flex-col gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => { setCurrent(i); setAutoPlay(false); }} className={`rounded-full transition-all duration-300 cursor-pointer ${i === current ? "w-1.5 h-6 bg-gold" : "w-1.5 h-1.5 bg-white/40"}`} aria-label={`Ir para slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
