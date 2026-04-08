import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="navy-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-black">D</span>
              </div>
              <span className="font-playfair font-bold text-xl">
                Drive<span className="text-gradient">Elite</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The world's most exclusive car rental experience. Drive the car of your dreams today.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <button key={i} className="w-8 h-8 glass rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors cursor-pointer" aria-label="Social link">
                  <Icon className="w-3.5 h-3.5 text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Fleet</h4>
            <ul className="space-y-2.5">
              {["Supercars", "Luxury Sedans", "Sports Cars", "Electric Vehicles", "SUVs"].map(item => (
                <li key={item}>
                  <Link to="/fleet" className="text-gray-400 hover:text-gold text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {["About Us", "How It Works", "Pricing", "Blog", "Careers", "Contact"].map(item => (
                <li key={item}>
                  <Link to="/" className="text-gray-400 hover:text-gold text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Get exclusive deals and new arrivals in your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm px-4 py-2.5 rounded-full focus:outline-none focus:border-gold/50 focus:bg-white/15 transition-all"
              />
              <button className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity cursor-pointer" aria-label="Subscribe">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">© 2024 DriveElite. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
              <Link key={item} to="/" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}