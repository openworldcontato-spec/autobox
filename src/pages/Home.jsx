import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import SearchBar from "../components/home/SearchBar";
import BrandLogos from "../components/home/BrandLogos";
import FeaturedCars from "../components/home/FeaturedCars";
import HowItWorks from "../components/home/HowItWorks";
import Testimonials from "../components/home/Testimonials";
import PricingSection from "../components/home/PricingSection";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/formatters";

function CTABanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="navy-gradient rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="relative">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Pronto para dirigir?</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-white mb-4">
              Seu próximo carro premium está aqui
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Reserve em minutos, pague em BRL e acompanhe tudo pela navegação estilo app. Bem mais século 21.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/fleet" className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-2xl sm:rounded-full transition-all duration-200 shadow-2xl shadow-yellow-500/30 active:scale-[0.98]">
                Ver frota <ArrowRight className="w-4 h-4" />
              </Link>
              <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 glass text-white font-semibold px-8 py-4 rounded-2xl sm:rounded-full hover:bg-white/20 transition-all duration-200 active:scale-[0.98]">
                <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SearchBar />
      <BrandLogos />
      <FeaturedCars />
      <HowItWorks />
      <Testimonials />
      <PricingSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
