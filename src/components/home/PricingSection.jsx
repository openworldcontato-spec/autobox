import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { pricingPlans } from "../../data/cars";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-semibold text-sm uppercase tracking-widest mb-2"
          >
            Membership Plans
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-4xl font-bold text-gray-900 mb-4"
          >
            Choose Your Plan
          </motion.h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Join thousands of members who enjoy exclusive access to our luxury fleet. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? "navy-gradient text-white shadow-2xl shadow-navy/30 scale-105"
                  : "bg-white border border-gray-100 shadow-lg"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Zap className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.highlight ? "text-gray-300" : "text-gray-500"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                {plan.price === 0 ? (
                  <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-gray-900"}`}>Free</span>
                ) : (
                  <div>
                    <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-gray-900"}`}>${plan.price}</span>
                    <span className={`text-sm ml-1 ${plan.highlight ? "text-gray-300" : "text-gray-400"}`}>/month</span>
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.highlight ? "bg-gold/20" : "bg-green-50"}`}>
                      <Check className={`w-3 h-3 ${plan.highlight ? "text-gold" : "text-green-600"}`} />
                    </div>
                    <span className={plan.highlight ? "text-gray-200" : "text-gray-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/fleet"
                className={`block w-full text-center font-bold py-3.5 rounded-xl transition-all duration-200 ${
                  plan.highlight
                    ? "bg-gold hover:bg-yellow-500 text-white shadow-lg shadow-yellow-500/30"
                    : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}