import { motion } from "framer-motion";
import { Search, CalendarCheck, Car, MapPin } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Choose Your Dream Car",
    desc: "Browse our curated fleet of 150+ luxury and exotic vehicles. Filter by type, price, and availability.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "Book Instantly",
    desc: "Select your dates, add extras, and confirm your booking in under 2 minutes. Fully secure payment.",
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    icon: MapPin,
    step: "03",
    title: "We Deliver To You",
    desc: "Your car is delivered to your hotel, airport, or any address. White-glove service, every time.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Car,
    step: "04",
    title: "Drive & Enjoy",
    desc: "Hit the road in your dream car. 24/7 roadside assistance and concierge support included.",
    color: "bg-purple-50 text-purple-600",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold font-semibold text-sm uppercase tracking-widest mb-2"
          >
            Simple & Fast
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl font-bold text-gray-900"
          >
            How It Works
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ icon: Icon, step, title, desc, color }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center group"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] right-0 h-px border-t-2 border-dashed border-gray-200 z-0" />
              )}
              <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold text-gray-300 tracking-widest mb-2">{step}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}