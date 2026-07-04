import React, { useState, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, Clock, Heart, Flame, Sparkles, X, Plus, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onAddToTastingBoard: (item: MenuItem) => void;
  onRemoveFromTastingBoard: (id: string) => void;
  tastingBoardIds: string[];
}

export default function MenuSection({
  onAddToTastingBoard,
  onRemoveFromTastingBoard,
  tastingBoardIds,
}: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'plates' | 'signatures' | 'sips'>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const handleTastingClick = (e: MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    if (tastingBoardIds.includes(item.id)) {
      onRemoveFromTastingBoard(item.id);
    } else {
      onAddToTastingBoard(item);
    }
  };

  const getHeatLevelStars = (level: number) => {
    return Array.from({ length: 3 }).map((_, i) => (
      <Flame
        key={i}
        className={`w-3.5 h-3.5 ${
          i < level ? 'text-[#C1A26B] fill-[#C1A26B]' : 'text-white/10'
        }`}
      />
    ));
  };

  return (
    <section id="menu" className="relative py-24 px-6 md:px-12 bg-[#0C0C0B] overflow-hidden">
      <div className="spotlight top-1/2 left-1/3" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center space-x-2"
          >
            <span className="h-[1px] w-8 bg-[#C1A26B]/50" />
            <span className="font-mono text-xs tracking-widest text-[#C1A26B] uppercase">Tasting Chronicles</span>
            <span className="h-[1px] w-8 bg-[#C1A26B]/50" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-bold text-[#F3F3EF]"
          >
            The Culinary Canvas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-sans text-sm md:text-base text-[#A1A19A]"
          >
            Each plate is an exploration of texture, fire, and smoke. Select an item to reveal its secrets and build your custom tasting sequence.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex space-x-1 bg-white/5 border border-white/10 p-1 rounded-sm">
            {(['all', 'plates', 'signatures', 'sips'] as const).map((tab) => (
              <button
                key={tab}
                id={`tab-menu-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs md:text-sm font-sans tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#C1A26B] text-black font-semibold shadow-lg'
                    : 'text-[#A1A19A] hover:text-[#F3F3EF] hover:bg-white/5'
                }`}
              >
                {tab === 'all' ? 'Full Canvas' : tab === 'plates' ? 'Artisanal Plates' : tab === 'signatures' ? 'Chef Signatures' : 'Curated Sips'}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const isAdded = tastingBoardIds.includes(item.id);
              return (
                <motion.div
                  key={item.id}
                  id={`menu-item-${item.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedItem(item)}
                  className="group bg-[#131311] border border-white/5 p-4 rounded-sm flex flex-col justify-between cursor-pointer hover:border-[#C1A26B]/20 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Item Image */}
                    <div className="relative w-full aspect-square overflow-hidden rounded-sm bg-[#090908]">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                      
                      {/* Interactive Save to Tasting Board Icon */}
                      <button
                        id={`btn-tasting-${item.id}`}
                        onClick={(e) => handleTastingClick(e, item)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
                          isAdded
                            ? 'bg-[#C1A26B] border-[#C1A26B] text-black'
                            : 'bg-[#090908]/70 border-white/10 text-white/70 hover:text-[#C1A26B] hover:border-[#C1A26B]'
                        }`}
                      >
                        {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>

                      {/* Floating tag */}
                      {item.tags.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex gap-1">
                          <span className="px-2 py-0.5 bg-[#090908]/80 backdrop-blur-sm border border-white/10 font-mono text-[9px] uppercase tracking-wider text-[#C1A26B]">
                            {item.tags[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-lg font-bold text-[#F3F3EF] group-hover:text-[#C1A26B] transition-colors duration-300">
                          {item.name}
                        </h3>
                        <span className="font-mono text-sm font-semibold text-[#C1A26B]">
                          ${item.price}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#A1A19A] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[#64645C] text-[10px] font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {item.preparationTime}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#C1A26B]/70 hover:text-[#C1A26B] transition-colors">
                      Secrets <Info className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Food Details Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              id="menu-detail-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090908]/90 backdrop-blur-md"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl bg-[#131311] border border-[#C1A26B]/25 rounded-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 relative shadow-2xl"
              >
                {/* Close Button */}
                <button
                  id="btn-close-modal"
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 p-1.5 bg-[#090908]/80 border border-white/10 hover:border-[#C1A26B] rounded-full text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left col: Big Image */}
                <div className="md:col-span-5 relative h-56 md:h-full min-h-[250px] bg-[#090908]">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#131311]/90 md:to-transparent" />
                </div>

                {/* Right col: Details */}
                <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Category Label */}
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] uppercase text-[#C1A26B] tracking-widest bg-[#C1A26B]/10 px-2 py-0.5 rounded-sm">
                        {selectedItem.category === 'plates' ? 'Artisanal Plate' : selectedItem.category === 'signatures' ? 'Chef Signature' : 'Curated Sip'}
                      </span>
                      {selectedItem.tags.map((t) => (
                        <span key={t} className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest border border-[#64645C]/30 px-2 py-0.5 rounded-sm">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Title & Price */}
                    <div className="flex justify-between items-baseline">
                      <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#F3F3EF]">
                        {selectedItem.name}
                      </h2>
                      <span className="font-mono text-xl font-bold text-[#C1A26B]">
                        ${selectedItem.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-sm text-[#A1A19A] leading-relaxed">
                      {selectedItem.description}
                    </p>

                    {/* Interactive Culinary stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="p-3 bg-white/5 border border-white/5 rounded-sm space-y-1">
                        <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Flavor Profile</span>
                        <p className="font-sans text-xs text-[#F3F3EF] font-medium flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#C1A26B]" /> {selectedItem.flavorProfile}
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/5 rounded-sm space-y-1">
                        <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Spice Level</span>
                        <div className="flex items-center gap-1 pt-0.5">
                          {selectedItem.heatLevel === 0 ? (
                            <span className="font-sans text-xs text-[#A1A19A]/80">None</span>
                          ) : (
                            getHeatLevelStars(selectedItem.heatLevel)
                          )}
                        </div>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/5 rounded-sm space-y-1">
                        <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Prep Time</span>
                        <p className="font-sans text-xs text-[#F3F3EF] font-medium flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#C1A26B]" /> {selectedItem.preparationTime}
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/5 rounded-sm space-y-1">
                        <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Energy Estimate</span>
                        <p className="font-sans text-xs text-[#F3F3EF] font-medium">
                          {selectedItem.calorieCount} kcal
                        </p>
                      </div>
                    </div>

                    {/* Allergens warning */}
                    {selectedItem.allergens.length > 0 && (
                      <div className="pt-2">
                        <p className="font-sans text-xs text-[#64645C]">
                          <strong className="text-white/40 font-normal">Allergens:</strong> {selectedItem.allergens.join(', ')}
                        </p>
                      </div>
                    )}

                    {/* Chef Pairing Tip */}
                    <div className="p-3 bg-[#C1A26B]/5 border border-[#C1A26B]/20 rounded-sm">
                      <p className="font-sans text-xs text-[#C1A26B] leading-relaxed">
                        <strong className="uppercase font-mono text-[9px] tracking-wider block mb-0.5">Chef's Sommelier Pairing Recommendation:</strong>
                        Best paired with {selectedItem.category === 'sips' ? 'Black Gold Nigiri' : 'The Obsidian Mist'} cocktail to maximize molecular contrast.
                      </p>
                    </div>
                  </div>

                  {/* Add to tasting board CTA inside modal */}
                  <div className="pt-4 border-t border-white/5">
                    <button
                      id="btn-tasting-toggle-modal"
                      onClick={(e) => handleTastingClick(e, selectedItem)}
                      className={`w-full py-3 font-sans text-xs font-semibold tracking-widest uppercase rounded-sm flex justify-center items-center gap-2 transition-all duration-300 ${
                        tastingBoardIds.includes(selectedItem.id)
                          ? 'bg-transparent border border-[#C1A26B] text-[#C1A26B] hover:bg-[#C1A26B]/10'
                          : 'bg-[#C1A26B] text-black hover:bg-[#DFCDAA]'
                      }`}
                    >
                      {tastingBoardIds.includes(selectedItem.id) ? (
                        <>
                          <Check className="w-4 h-4" /> Remove From Tasting Sequence
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> Add To My Tasting Board
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
