import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Trash2, Calendar, Star, Sparkles, Check } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import FlavorQuiz from './components/FlavorQuiz';
import Philosophy from './components/Philosophy';
import ReservationSection from './components/ReservationSection';
import GuestbookSection from './components/GuestbookSection';
import Footer from './components/Footer';
import { MenuItem } from './types';

export default function App() {
  const [tastingBoard, setTastingBoard] = useState<MenuItem[]>([]);
  const [isBoardOpen, setIsBoardOpen] = useState(false);

  // Load tasting board on mount from localStorage
  useEffect(() => {
    const localBoard = localStorage.getItem('kuro_tasting_board');
    if (localBoard) {
      try {
        setTastingBoard(JSON.parse(localBoard));
      } catch (e) {
        setTastingBoard([]);
      }
    }
  }, []);

  const handleAddToTastingBoard = (item: MenuItem) => {
    // Check if already exists
    if (tastingBoard.some((b) => b.id === item.id)) return;
    const updated = [...tastingBoard, item];
    setTastingBoard(updated);
    localStorage.setItem('kuro_tasting_board', JSON.stringify(updated));
    // Auto open board to provide instant feedback
    setIsBoardOpen(true);
  };

  const handleRemoveFromTastingBoard = (id: string) => {
    const updated = tastingBoard.filter((item) => item.id !== id);
    setTastingBoard(updated);
    localStorage.setItem('kuro_tasting_board', JSON.stringify(updated));
  };

  const handleClearTastingBoard = () => {
    setTastingBoard([]);
    localStorage.removeItem('kuro_tasting_board');
  };

  // Synchronize board items with the booking form's dietary request
  const handleLockSequenceWithReservation = () => {
    setIsBoardOpen(false);
    
    // Smooth scroll to reservation
    const element = document.querySelector('#planner');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    // Auto inject the sequence into reservation form field with a small delay
    setTimeout(() => {
      const requestField = document.getElementById('input-res-requests') as HTMLTextAreaElement;
      if (requestField) {
        const dishNames = tastingBoard.map(d => d.name).join(', ');
        requestField.value = `Pre-ordering tasting sequence: ${dishNames}.`;
        
        // Trigger React's input event so state updates
        const event = new Event('input', { bubbles: true });
        requestField.dispatchEvent(event);
      }
    }, 800);
  };

  const boardTotalPrice = tastingBoard.reduce((total, item) => total + item.price, 0);
  const tastingBoardIds = tastingBoard.map((item) => item.id);

  return (
    <div className="min-h-screen bg-[#090908] text-[#F3F3EF] selection:bg-[#C1A26B]/30 relative font-sans">
      
      {/* Background visual watermarks */}
      <div className="absolute top-0 inset-x-0 h-screen bg-[radial-gradient(ellipse_at_top,rgba(193,162,107,0.06)_0%,transparent_75%)] pointer-events-none z-0" />
      
      {/* Global Header */}
      <Header />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        
        <MenuSection
          onAddToTastingBoard={handleAddToTastingBoard}
          onRemoveFromTastingBoard={handleRemoveFromTastingBoard}
          tastingBoardIds={tastingBoardIds}
        />

        <FlavorQuiz
          onAddToTastingBoard={handleAddToTastingBoard}
          tastingBoardIds={tastingBoardIds}
        />

        <Philosophy />

        <ReservationSection />

        <GuestbookSection />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Tasting Board Trigger Button */}
      <motion.button
        id="btn-floating-tasting"
        onClick={() => setIsBoardOpen(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 p-4 bg-[#C1A26B] hover:bg-[#DFCDAA] text-black rounded-full shadow-2xl flex items-center justify-center cursor-pointer group"
      >
        <ShoppingBag className="w-6 h-6" />
        
        {/* Badge count */}
        {tastingBoard.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-[#090908] text-[#C1A26B] border border-[#C1A26B]/40 text-xs font-mono font-bold rounded-full flex items-center justify-center animate-bounce">
            {tastingBoard.length}
          </span>
        )}

        {/* Hover label */}
        <span className="absolute right-16 bg-[#131311] text-[#F3F3EF] border border-white/5 text-xs font-mono py-1.5 px-3 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-widest whitespace-nowrap">
          My Tasting Board
        </span>
      </motion.button>

      {/* Slide-out Tasting Board Sidebar Panel */}
      <AnimatePresence>
        {isBoardOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              id="tasting-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBoardOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            />

            {/* Sidebar Body */}
            <motion.aside
              id="tasting-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 z-50 w-full sm:w-[440px] h-full bg-[#131311] border-l border-white/5 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-[#C1A26B]" />
                  <h3 className="font-serif text-lg font-bold text-[#F3F3EF]">Tasting Sequence</h3>
                  <span className="font-mono text-xs text-[#C1A26B] bg-[#C1A26B]/10 px-2 py-0.5 rounded-sm">
                    {tastingBoard.length}
                  </span>
                </div>
                <button
                  id="btn-close-sidebar"
                  onClick={() => setIsBoardOpen(false)}
                  className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-white/80 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {tastingBoard.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#64645C] py-20">
                    <ShoppingBag className="w-12 h-12 stroke-[1px] text-white/10 animate-pulse" />
                    <div className="space-y-1">
                      <p className="font-serif text-sm font-bold text-[#A1A19A]">Board is Empty</p>
                      <p className="font-sans text-xs max-w-[240px]">Filter dishes on our Menu or complete our Mood Quiz to add tasting sequences.</p>
                    </div>
                  </div>
                ) : (
                  tastingBoard.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-sm group hover:border-[#C1A26B]/10 transition-colors"
                    >
                      <div className="flex items-center space-x-3 truncate">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-sm bg-[#090908] shrink-0"
                        />
                        <div className="truncate space-y-0.5">
                          <h4 className="font-serif text-sm font-bold text-[#F3F3EF] truncate">{item.name}</h4>
                          <span className="font-mono text-[9px] text-[#C1A26B] uppercase tracking-wider block">
                            {item.flavorProfile}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="font-mono text-sm text-[#F3F3EF]">${item.price}</span>
                        <button
                          id={`btn-remove-sidebar-${item.id}`}
                          onClick={() => handleRemoveFromTastingBoard(item.id)}
                          className="text-[#64645C] hover:text-[#C1A26B] transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Panel */}
              {tastingBoard.length > 0 && (
                <div className="p-6 border-t border-white/5 bg-[#0A0A09] space-y-4">
                  {/* Summary math */}
                  <div className="space-y-1.5 font-sans text-xs">
                    <div className="flex justify-between text-[#A1A19A]">
                      <span>Selected Bites ({tastingBoard.length})</span>
                      <span>${boardTotalPrice}</span>
                    </div>
                    <div className="flex justify-between text-[#A1A19A]">
                      <span>Experience Service Fee</span>
                      <span className="text-emerald-500 uppercase font-mono text-[10px]">Included</span>
                    </div>
                    <div className="flex justify-between text-[#F3F3EF] font-bold text-sm pt-2 border-t border-white/5">
                      <span>Total Culinary Savor</span>
                      <span className="font-mono text-[#C1A26B]">${boardTotalPrice}</span>
                    </div>
                  </div>

                  {/* Operational disclaimer */}
                  <p className="font-sans text-[10px] text-[#64645C] leading-relaxed">
                    By locking this sequence, these items will be queued in the kitchen for preparation immediately upon your seated arrival.
                  </p>

                  {/* Actions */}
                  <div className="grid grid-cols-12 gap-3 pt-2">
                    <button
                      id="btn-sidebar-clear"
                      onClick={handleClearTastingBoard}
                      className="col-span-3 py-3 border border-white/5 hover:border-[#64645C] text-[#64645C] hover:text-[#F3F3EF] font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex justify-center items-center cursor-pointer"
                      title="Clear Board"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      id="btn-sidebar-reserve"
                      onClick={handleLockSequenceWithReservation}
                      className="col-span-9 py-3 bg-[#C1A26B] hover:bg-[#DFCDAA] text-black font-sans text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer"
                    >
                      <span>Lock & Book Table</span>
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
