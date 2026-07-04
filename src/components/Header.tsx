import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Menu', href: '#menu' },
    { name: 'Table Experience', href: '#planner' },
    { name: 'Mood Matcher', href: '#quiz' },
    { name: 'Story & Reviews', href: '#reviews' }
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-[#090908]/85 backdrop-blur-md border-b border-white/5 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="font-serif text-2xl font-bold tracking-widest text-[#F3F3EF]">
            KURO
          </span>
          <span className="w-1.5 h-1.5 bg-[#C1A26B] rounded-full animate-pulse"></span>
        </motion.div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo(item.href);
              }}
              className="font-sans text-sm tracking-wider text-[#A1A19A] hover:text-[#C1A26B] transition-colors duration-300 relative py-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C1A26B] transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:block">
          <motion.button
            id="header-btn-reserve"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleScrollTo('#planner')}
            className="px-5 py-2.5 bg-gradient-to-r from-[#C1A26B] to-[#8E713E] hover:from-[#DFCDAA] hover:to-[#C1A26B] text-black font-sans text-xs font-semibold tracking-widest uppercase rounded-sm flex items-center space-x-2 transition-all duration-300 shadow-lg shadow-[#C1A26B]/10 hover:shadow-[#C1A26B]/20"
          >
            <span>Book A Table</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            id="btn-mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#F3F3EF] focus:outline-none p-1.5 rounded-md hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#090908] border-b border-white/5 py-6 px-6"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(item.href);
                  }}
                  className="font-sans text-base tracking-wider text-[#A1A19A] hover:text-[#C1A26B] transition-colors py-2 block border-b border-white/5"
                >
                  {item.name}
                </a>
              ))}
              <button
                id="mobile-btn-reserve"
                onClick={() => handleScrollTo('#planner')}
                className="w-full mt-4 py-3 bg-gradient-to-r from-[#C1A26B] to-[#8E713E] text-black font-sans text-sm font-semibold tracking-widest uppercase rounded-sm flex justify-center items-center space-x-2"
              >
                <span>Book A Table</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
