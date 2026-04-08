import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, MapPin, Calendar, CreditCard, User, Shield, Star } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { cars } from "../data/cars";

const steps = ["Your Details", "Dates & Location", "Extras", "Payment", "Confirm"];

const extras = [
  { id: "gps", name: "Premium GPS", price: 15, icon: "🗺️" },
  { id: "insurance", name: "Full Coverage Insurance", price: 45, icon: "🛡️" },
  { id: "driver", name: "Professional Driver", price: 150, icon: "👨‍✈️" },
  { id: "baby", name: "Child Safety Seat", price: 10, icon: "👶" },
  { id: "wifi", name: "In-Car Wi-Fi", price: 12, icon: "📡" },
  { id: "delivery", name: "Hotel Delivery", price: 35, icon: "🏨" },
];

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              i < current ? "bg-green-500 text-white" : i === current ? "bg-gold text-white shadow-lg shadow-yellow-500/30" : "bg-gray-100 text-gray-400"
            }`}>
              {i < current ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs mt-1.5 font-medium hidden sm:block ${i === current ? "text-gold" : i < current ? "text-green-500" : "text-gray-400"}`}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${i < current ? "bg-green-500" : "bg-gray-100"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === Number(id));
  const [step, setStep] = useState(0);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [days, setDays] = useState(3);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", pickupDate: "", returnDate: "", deliveryAddress: "", cardNumber: "", expiry: "", cvv: "", name: "" });

  if (!car) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-xl text-gray-600">Car not found.</p>
        <Link to="/fleet" className="text-gold underline mt-2 block">Browse Fleet</Link>
      </div>
    </div>
  );

  const toggleExtra = (extraId) => {
    setSelectedExtras(prev => prev.includes(extraId) ? prev.filter(e => e !== extraId) : [...prev, extraId]);
  };

  const extrasTotal = extras.filter(e => selectedExtras.includes(e.id)).reduce((sum, e) => sum + e.price, 0);
  const carTotal = car.price * days;
  const grandTotal = carTotal + extrasTotal * days;

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-10 text-center max-w-md w-full shadow-2xl"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-2">Your {car.name} is reserved.</p>
          <div className="bg-gray-50 rounded-xl p-4 my-6 text-left">
            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Booking ID</span><span className="font-bold text-gray-800">#DRV-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span></div>
            <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Car</span><span className="font-semibold text-gray-800">{car.name}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Total</span><span className="font-bold text-gold text-lg">${grandTotal.toLocaleString()}</span></div>
          </div>
          <div className="flex gap-3">
            <Link to="/bookings" className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-navy transition-colors">View My Bookings</Link>
            <Link to="/" className="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm hover:border-gray-300 transition-colors">Go Home</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="mb-8">
          <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-1">Book Your Car</h1>
          <p className="text-gray-500 text-sm">Complete your reservation for the {car.name}</p>
        </div>

        <StepIndicator current={step} total={steps.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 0: Personal Details */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2"><User className="w-5 h-5 text-gold" />Personal Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: "firstName", label: "First Name", placeholder: "John" },
                      { key: "lastName", label: "Last Name", placeholder: "Doe" },
                      { key: "email", label: "Email Address", placeholder: "john@example.com", col: "col-span-2" },
                      { key: "phone", label: "Phone Number", placeholder: "+1 (555) 000-0000", col: "col-span-2" },
                    ].map(f => (
                      <div key={f.key} className={f.col || ""}>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor={f.key}>{f.label}</label>
                        <input
                          id={f.key}
                          type="text"
                          value={form[f.key]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 1: Dates */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2"><Calendar className="w-5 h-5 text-gold" />Dates & Location</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="pickupDate">Pick-up Date</label>
                      <input id="pickupDate" type="date" value={form.pickupDate} onChange={e => setForm(p => ({ ...p, pickupDate: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="returnDate">Return Date</label>
                      <input id="returnDate" type="date" value={form.returnDate} onChange={e => setForm(p => ({ ...p, returnDate: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="deliveryAddress">Delivery Address (optional)</label>
                      <input id="deliveryAddress" type="text" value={form.deliveryAddress} onChange={e => setForm(p => ({ ...p, deliveryAddress: e.target.value }))} placeholder="Hotel, address, or airport" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor="days">Rental Duration</label>
                      <div className="flex items-center gap-4">
                        <button onClick={() => setDays(d => Math.max(1, d - 1))} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gold transition-colors cursor-pointer text-lg font-bold text-gray-600">-</button>
                        <span className="text-2xl font-bold text-gray-900 w-16 text-center">{days} {days === 1 ? "day" : "days"}</span>
                        <button onClick={() => setDays(d => d + 1)} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gold transition-colors cursor-pointer text-lg font-bold text-gray-600">+</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Extras */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5">Add Extras</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {extras.map(extra => (
                      <button
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${selectedExtras.includes(extra.id) ? "border-gold bg-yellow-50" : "border-gray-100 bg-gray-50 hover:border-gray-200"}`}
                      >
                        <span className="text-2xl">{extra.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-gray-800">{extra.name}</p>
                          <p className="text-xs text-gray-400">+${extra.price}/day</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedExtras.includes(extra.id) ? "bg-gold border-gold" : "border-gray-300"}`}>
                          {selectedExtras.includes(extra.id) && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2"><CreditCard className="w-5 h-5 text-gold" />Payment Details</h2>
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-5 mb-6 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                    <p className="text-xs text-gray-400 mb-1">Card Number</p>
                    <p className="text-lg font-mono tracking-widest mb-4">{form.cardNumber || "•••• •••• •••• ••••"}</p>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{form.name || "Cardholder Name"}</span>
                      <span>{form.expiry || "MM/YY"}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { key: "name", label: "Cardholder Name", placeholder: "John Doe", col: "col-span-2" },
                      { key: "cardNumber", label: "Card Number", placeholder: "1234 5678 9012 3456" },
                      { key: "expiry", label: "Expiry Date", placeholder: "MM/YY" },
                      { key: "cvv", label: "CVV", placeholder: "123" },
                    ].map(f => (
                      <div key={f.key} className={f.col || ""}>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5" htmlFor={`pay-${f.key}`}>{f.label}</label>
                        <input
                          id={`pay-${f.key}`}
                          type="text"
                          value={form[f.key]}
                          onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                          placeholder={f.placeholder}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                    <Shield className="w-4 h-4 text-green-500" />
                    Your payment information is encrypted and secure
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="font-bold text-lg text-gray-900 mb-5">Review & Confirm</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <img src={car.image} alt={car.name} className="w-20 h-16 object-cover rounded-lg" />
                      <div>
                        <p className="font-bold text-gray-900">{car.name}</p>
                        <p className="text-sm text-gray-500">{days} days × ${car.price}/day</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                          <span className="text-xs font-semibold text-gray-700">{car.rating}</span>
                        </div>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="font-bold text-xl text-gray-900">${carTotal.toLocaleString()}</p>
                      </div>
                    </div>
                    {selectedExtras.length > 0 && (
                      <div className="p-4 border border-gray-100 rounded-xl space-y-2">
                        <p className="font-semibold text-sm text-gray-700 mb-2">Extras</p>
                        {extras.filter(e => selectedExtras.includes(e.id)).map(e => (
                          <div key={e.id} className="flex justify-between text-sm text-gray-600">
                            <span>{e.icon} {e.name}</span>
                            <span>+${e.price * days}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="flex justify-between text-xl font-black text-gray-900">
                        <span>Total</span>
                        <span className="text-gold">${grandTotal.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">All taxes and fees included</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="flex items-center gap-2 bg-gold hover:bg-yellow-500 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-yellow-500/20 cursor-pointer"
                >
                  Continue <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setConfirmed(true)}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-xl transition-colors shadow-lg cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Confirm Booking
                </button>
              )}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
              <img src={car.image} alt={car.name} className="w-full h-40 object-cover rounded-xl mb-4" />
              <p className="text-xs text-gray-400 uppercase tracking-wide">{car.brand}</p>
              <h3 className="font-bold text-gray-900 text-lg mb-3">{car.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600"><span>Car rental ({days} days)</span><span className="font-semibold">${carTotal.toLocaleString()}</span></div>
                {extrasTotal > 0 && <div className="flex justify-between text-gray-600"><span>Extras ({days} days)</span><span className="font-semibold">${(extrasTotal * days).toLocaleString()}</span></div>}
                <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span><span className="text-gold">${grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center gap-2 text-xs text-green-700">
                <Shield className="w-4 h-4 flex-shrink-0" /> Full insurance coverage included
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}