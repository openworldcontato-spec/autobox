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

function CTABanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="navy-gradient rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="relative">
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">Ready to Drive?</p>
            <h2 className="font-playfair text-4xl font-bold text-white mb-4">
              Your Dream Car Awaits
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Book in minutes. Drive in hours. Experience the extraordinary today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/fleet"
                className="inline-flex items-center gap-2 bg-gold hover:bg-yellow-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-2xl shadow-yellow-500/30"
              >
                Browse Fleet <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+18005551234"
                className="inline-flex items-center gap-2 glass text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-200"
              >
                <Phone className="w-4 h-4" /> Call Us
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