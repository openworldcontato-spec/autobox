import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../../data/cars";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-24 navy-gradient relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">
            Histórias de clientes
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-playfair text-4xl font-bold text-white">
            O que dizem sobre a AutoBox
          </motion.h2>
        </div>

        <div className="hidden lg:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="glass rounded-2xl p-8 relative">
              <Quote className="w-8 h-8 text-gold/30 mb-4" />
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">“{t.text}”</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-gold fill-gold" />)}
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-gold/30" />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
                <div className="ml-auto"><span className="text-gold text-xs font-medium">{t.car}</span></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="glass rounded-2xl p-8">
                <Quote className="w-8 h-8 text-gold/30 mb-4" />
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">“{testimonials[current].text}”</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[current].rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-gold fill-gold" />)}
                </div>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <img src={testimonials[current].avatar} alt={testimonials[current].name} className="w-10 h-10 rounded-full object-cover ring-2 ring-gold/30" />
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonials[current].name}</p>
                    <p className="text-gray-400 text-xs">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white cursor-pointer" aria-label="Anterior">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {testimonials.map((_, i) => <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === current ? "bg-gold w-6" : "bg-white/30"}`} aria-label={`Depoimento ${i + 1}`} />)}
            <button onClick={() => setCurrent(c => (c + 1) % testimonials.length)} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white cursor-pointer" aria-label="Próximo">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
