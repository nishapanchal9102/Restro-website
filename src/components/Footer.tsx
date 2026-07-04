import { Compass, Flame, Shield, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="relative bg-[#090908] border-t border-white/5 pt-20 pb-10 px-6 md:px-12 overflow-hidden">
      <div className="spotlight bottom-0 left-1/2 -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/5">
          
          {/* Logo & Statement (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-3xl font-extrabold tracking-widest text-[#F3F3EF]">
                KURO
              </span>
              <span className="w-2 h-2 bg-[#C1A26B] rounded-full animate-pulse"></span>
            </div>
            <p className="font-sans text-xs md:text-sm text-[#A1A19A] leading-relaxed max-w-sm">
              An intimate obsidian sanctuary where raw sashimi craftsmanship meets hyper-aged Miyazaki Wagyu seared over 1000&deg;C binchotan embers.
            </p>
          </div>

          {/* Coordinates (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Coordinates</span>
            <div className="space-y-1.5 font-sans text-xs text-[#A1A19A]">
              <p className="text-[#F3F3EF] font-medium">Kuro Tokyo Sanctuary</p>
              <p>10-2 Akasaka, Minato City</p>
              <p>Tokyo, 107-0052, Japan</p>
              <p className="text-[#C1A26B] font-mono mt-2">latitude: 35.6722 / longitude: 139.7350</p>
            </div>
          </div>

          {/* Frequencies (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Frequencies</span>
            <div className="space-y-1.5 font-sans text-xs text-[#A1A19A]">
              <p className="text-[#F3F3EF] font-medium">Sunset to Midnight Only</p>
              <p>Wednesday &ndash; Sunday</p>
              <p>17:00 &ndash; 00:00 JST</p>
              <p className="mt-2 text-[#64645C]">Closed Mon & Tue for Palate Calibration</p>
            </div>
          </div>

          {/* Sips & Seals (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Certificates</span>
            <div className="space-y-3 font-mono text-[9px] uppercase tracking-wider text-[#A1A19A]">
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#C1A26B]" /> A5 Wagyu Authed</span>
              <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-[#C1A26B]" /> Woodfire Certified</span>
              <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-[#C1A26B]" /> Michelin Guide 2026</span>
            </div>
          </div>

        </div>

        {/* Bottom Panel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-sans text-xs text-[#64645C]">&copy; 2026 KURO Culinary Arts. All rights reserved.</p>
            <p className="font-mono text-[9px] text-[#64645C] tracking-widest uppercase">
              Designed in synchronicity by vibe coders.
            </p>
          </div>

          {/* Scroll to Top button */}
          <motion.button
            id="btn-scroll-top"
            onClick={handleScrollTop}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-white/5 hover:bg-[#C1A26B] border border-white/5 hover:border-[#C1A26B] text-[#A1A19A] hover:text-black rounded-sm transition-all duration-300 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </footer>
  );
}
