import { ArrowRight, Flame, Compass, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen pt-28 md:pt-36 pb-16 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-[#090908]"
    >
      {/* Background spotlight */}
      <div className="spotlight top-1/4 left-1/4" />
      <div className="spotlight bottom-1/4 right-1/4" />

      {/* Atmospheric Smoke Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_60%)] animate-smoke-slow" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left: Narrative & CTAs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-8"
        >
          {/* Subtle Accent Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-[#C1A26B] animate-ping" />
            <span className="font-mono text-xs tracking-widest text-[#C1A26B] uppercase">
              Now Seating for Summer Solstice
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F3F3EF] leading-[1.05]"
          >
            Where Dark <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DFCDAA] via-[#C1A26B] to-[#8E713E]">
              Art Meets Hearth
            </span>
          </motion.h1>

          {/* Philosophy Statement */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base md:text-lg text-[#A1A19A] max-w-xl leading-relaxed font-light"
          >
            Step into <strong className="text-[#F3F3EF] font-normal">KURO</strong>—an intimate obsidian sanctuary where raw sashimi artistry converges with hyper-aged wagyu seared over glowing Japanese binchotan fire.
          </motion.p>

          {/* Key Indicators */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 md:gap-6 pt-4 max-w-lg border-y border-white/5 py-5"
          >
            <div className="flex flex-col space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest">Atmosphere</span>
              <span className="font-sans text-xs text-[#F3F3EF] font-medium flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-[#C1A26B]" /> Hearth Fire
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest">Philosophy</span>
              <span className="font-sans text-xs text-[#F3F3EF] font-medium flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-[#C1A26B]" /> Wabi-Sabi
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest">Access</span>
              <span className="font-sans text-xs text-[#F3F3EF] font-medium flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#C1A26B]" /> Reservation Only
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <button
              id="hero-btn-menu"
              onClick={() => handleScrollTo('#menu')}
              className="group px-7 py-4 bg-[#C1A26B] hover:bg-[#DFCDAA] text-black font-sans text-xs font-semibold tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <span>Explore The Menu</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
            </button>
            <button
              id="hero-btn-experience"
              onClick={() => handleScrollTo('#planner')}
              className="px-7 py-4 bg-transparent hover:bg-white/5 border border-[#C1A26B]/40 hover:border-[#C1A26B] text-[#F3F3EF] font-sans text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-300"
            >
              Secure Table Experience
            </button>
          </motion.div>
        </motion.div>

        {/* Right: Immersive Picture Frame / Artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-[4/5] group">
            
            {/* Elegant outer borders */}
            <div className="absolute -inset-4 border border-white/5 pointer-events-none rounded-sm transition-all duration-500 group-hover:border-[#C1A26B]/20" />
            
            {/* Glowing gold backdrops */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#8E713E]/20 to-transparent rounded-sm blur-md opacity-30 group-hover:opacity-60 transition-all duration-500" />
            
            {/* The Image Container */}
            <div className="absolute inset-0 bg-[#131311] border border-white/10 p-3 rounded-sm shadow-2xl transition-all duration-500 group-hover:border-[#C1A26B]/30 flex flex-col justify-between">
              
              {/* Photo Area */}
              <div className="relative w-full h-[82%] overflow-hidden rounded-sm bg-[#090908]">
                <img
                  src="/src/assets/images/kuro_hero_gastronomy_1782823862657.jpg"
                  alt="Kuro Signature Gastronomy Plating"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Visual grid watermark inside image */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(193,162,107,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(193,162,107,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
              </div>

              {/* Sub-label inside frame */}
              <div className="h-[15%] flex justify-between items-center px-2">
                <div className="space-y-0.5">
                  <span className="font-serif text-sm font-bold tracking-wider text-[#F3F3EF]">PLATE NO. 012</span>
                  <p className="font-mono text-[9px] text-[#64645C] uppercase tracking-wider">Aromatic Cold Smoke Gastronomy</p>
                </div>
                <div className="text-right">
                  <span className="font-sans text-xs font-semibold text-[#C1A26B] tracking-widest">$32.00</span>
                </div>
              </div>
            </div>

            {/* Corner styling accents */}
            <div className="absolute top-0 left-0 w-4 h-[1px] bg-[#C1A26B]" />
            <div className="absolute top-0 left-0 w-[1px] h-4 bg-[#C1A26B]" />
            <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-[#C1A26B]" />
            <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-[#C1A26B]" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
