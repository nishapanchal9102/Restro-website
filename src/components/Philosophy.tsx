import { motion } from 'motion/react';
import { Sparkles, Flame, ShieldAlert, Award } from 'lucide-react';

export default function Philosophy() {
  return (
    <section id="philosophy" className="relative py-24 px-6 md:px-12 bg-[#090908] border-t border-white/5 overflow-hidden">
      <div className="spotlight top-1/2 left-1/4 animate-pulse" />
      
      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left: Beautiful Collage */}
        <div className="lg:col-span-5 grid grid-cols-12 gap-4 relative">
          
          {/* Main big image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-9 aspect-[3/4] bg-[#131311] border border-white/10 p-2.5 rounded-sm shadow-2xl"
          >
            <div className="w-full h-full overflow-hidden rounded-sm relative">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
                alt="Chef seared binchotan embers"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-75 hover:scale-105 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Secondary overlapping image */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-7 col-start-6 -mt-36 z-10 aspect-square bg-[#131311] border border-[#C1A26B]/20 p-2 rounded-sm shadow-2xl"
          >
            <div className="w-full h-full overflow-hidden rounded-sm relative">
              <img
                src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80"
                alt="Artisanal sushi roll craft"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-90 hover:scale-105 hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Abstract coordinates frame */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[#C1A26B]/20 pointer-events-none" />
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-white/5 pointer-events-none" />
        </div>

        {/* Right: Text Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="h-[1px] w-6 bg-[#C1A26B]/50" />
              <span className="font-mono text-xs tracking-widest text-[#C1A26B] uppercase">Our Legacy</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-extrabold text-[#F3F3EF] leading-tight">
              The Art of Shadow <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFCDAA] to-[#C1A26B]">
                & Culinary Fire
              </span>
            </h2>
          </div>

          <p className="font-sans text-sm md:text-base text-[#A1A19A] leading-relaxed font-light">
            At Kuro, we view the dining table as an ephemeral stage. The Japanese concept of <strong className="text-[#F3F3EF] font-normal">Wabi-Sabi</strong>—finding absolute beauty in simplicity and imperfection—drives every plate, pour, and shadow. 
          </p>

          <p className="font-sans text-sm md:text-base text-[#A1A19A] leading-relaxed font-light">
            We source our A5 wagyu beef directly from Miyazaki farmers, our stone-ground matcha from the mist-shrouded fields of Uji, and our single-origin cedar wood directly from northern forests. By celebrating the raw and the scorched, we invoke a deep ancestral culinary memory.
          </p>

          {/* Columns of milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#F3F3EF]">
                <Flame className="w-4.5 h-4.5 text-[#C1A26B]" />
                <span>The Binchotan Wood</span>
              </div>
              <p className="font-sans text-xs text-[#64645C] leading-relaxed">
                White oak wood carbonized at 1000&deg;C. It generates pure infrared heat, sealing moisture instantly without any chemical odor.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#F3F3EF]">
                <Award className="w-4.5 h-4.5 text-[#C1A26B]" />
                <span>Zero-Waste Plating</span>
              </div>
              <p className="font-sans text-xs text-[#64645C] leading-relaxed">
                Every scrap, core, and rind is dehydrated and transformed into active charcoal garnishes, smoke bases, or organic table glaze.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
