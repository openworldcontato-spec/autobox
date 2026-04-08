import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PricingSection from "../components/home/PricingSection";
import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";
import { useState } from "react";

const faqData = [
  { q: "Can I cancel my membership anytime?", a: "Yes, you can cancel your membership at any time with no questions asked. Your plan remains active until the end of the billing period." },
  { q: "Is insurance included in the rental price?", a: "Basic insurance is included for all members. Elite and Prestige members get premium coverage with zero deductibles." },
  { q: "How does the delivery service work?", a: "Elite and Prestige members can request delivery to any address within 30 miles of our fleet locations. Our team will bring the car to you and collect it at the end of your rental." },
  { q: "What happens if I damage the car?", a: "With our Explorer plan, standard deductibles apply. Elite members have reduced deductibles, and Prestige members enjoy zero-deductible coverage for peace of mind." },
  { q: "Can I upgrade or downgrade my plan?", a: "Absolutely. You can change your plan at any time from your account settings. Changes take effect at the start of the next billing cycle." },
];

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer">
        <span className="font-semibold text-gray-800 text-sm pr-4">{q}</span>
        <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${open ? "text-gold" : "text-gray-300"}`} />
      </button>
      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} className="overflow-hidden">
          <p className="px-6 pb-4 text-gray-500 text-sm leading-relaxed">{a}</p>
        </motion.div>
      )}
    </div>
  );
}

const comparisonFeatures = [
  { feature: "Fleet Access", explorer: "Standard", elite: "Full Fleet", prestige: "Unlimited" },
  { feature: "Insurance", explorer: "Basic", elite: "Premium", prestige: "Zero Deductible" },
  { feature: "Support", explorer: "Standard", elite: "Priority", prestige: "Dedicated Agent" },
  { feature: "Car Delivery", explorer: false, elite: true, prestige: true },
  { feature: "Loyalty Points", explorer: false, elite: true, prestige: true },
  { feature: "Free Cancellation", explorer: "48h notice", elite: "24h notice", prestige: "Anytime" },
  { feature: "Chauffeur Option", explorer: false, elite: false, prestige: true },
  { feature: "VIP Lounge Access", explorer: false, elite: false, prestige: true },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="navy-gradient pt-32 pb-16 px-4 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold text-sm font-semibold uppercase tracking-widest mb-2">Simple Pricing</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-playfair text-5xl font-bold text-white mb-4">
          Transparent Plans
        </motion.h1>
        <p className="text-gray-400 max-w-lg mx-auto">No hidden fees. Cancel anytime. Start with our free plan and upgrade whenever you're ready.</p>
      </div>

      <PricingSection />

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-10">Full Feature Comparison</h2>
          <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="navy-gradient text-white">
                  <th className="text-left py-4 px-6 font-semibold text-sm">Feature</th>
                  <th className="py-4 px-4 font-semibold text-sm text-center">Explorer</th>
                  <th className="py-4 px-4 font-semibold text-sm text-center bg-gold/20">Elite</th>
                  <th className="py-4 px-4 font-semibold text-sm text-center">Prestige</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-3.5 px-6 text-sm font-medium text-gray-700">{row.feature}</td>
                    {["explorer", "elite", "prestige"].map((plan) => (
                      <td key={plan} className={`py-3.5 px-4 text-center text-sm ${plan === "elite" ? "bg-yellow-50/50" : ""}`}>
                        {row[plan] === true ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          </span>
                        ) : row[plan] === false ? (
                          <span className="text-gray-300 text-lg">—</span>
                        ) : (
                          <span className="text-gray-600 font-medium">{row[plan]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqData.map(item => <FAQ key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}