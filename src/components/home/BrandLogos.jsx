import { motion } from "framer-motion";

const brands = [
  { name: "Lamborghini", logo: "🏎️" },
  { name: "Ferrari", logo: "🐎" },
  { name: "Rolls-Royce", logo: "⚜️" },
  { name: "Porsche", logo: "🏁" },
  { name: "Bentley", logo: "👑" },
  { name: "McLaren", logo: "🔺" },
  { name: "Aston Martin", logo: "🌹" },
  { name: "Tesla", logo: "⚡" },
];

export default function BrandLogos() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
          Premium Brands in Our Fleet
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform duration-200">{brand.logo}</span>
              <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-700 transition-colors">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}