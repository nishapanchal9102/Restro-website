import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Plus, Check, Award, Compass, Heart } from 'lucide-react';
import { GUESTBOOK_ENTRIES } from '../data';
import { GuestbookEntry } from '../types';

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTag, setSelectedTag] = useState('Gastronomer');
  const [isSuccess, setIsSuccess] = useState(false);

  const availableTags = ['Gastronomer', 'Vibe Enthusiast', 'Connoisseur', 'Design Critic', 'Secret Agent'];

  // Load entries on mount from localStorage or use initial data
  useEffect(() => {
    const localEntries = localStorage.getItem('kuro_guestbook');
    if (localEntries) {
      try {
        setEntries(JSON.parse(localEntries));
      } catch (e) {
        setEntries(GUESTBOOK_ENTRIES);
      }
    } else {
      setEntries(GUESTBOOK_ENTRIES);
      localStorage.setItem('kuro_guestbook', JSON.stringify(GUESTBOOK_ENTRIES));
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    const newEntry: GuestbookEntry = {
      id: `gb-${Date.now()}`,
      name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      tag: selectedTag
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    localStorage.setItem('kuro_guestbook', JSON.stringify(updatedEntries));

    // Success animation triggers
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setComment('');
      setRating(5);
    }, 2500);
  };

  return (
    <section id="reviews" className="relative py-24 px-6 md:px-12 bg-[#0C0C0B] border-t border-white/5 overflow-hidden">
      <div className="spotlight bottom-1/4 left-1/4" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <span className="h-[1px] w-8 bg-[#C1A26B]/50" />
            <span className="font-mono text-xs tracking-widest text-[#C1A26B] uppercase">Vibe Council</span>
            <span className="h-[1px] w-8 bg-[#C1A26B]/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F3F3EF]">
            Guest Chronicles
          </h2>
          <p className="font-sans text-sm md:text-base text-[#A1A19A]">
            Read testimonials from those who have crossed into the obsidian, and leave your own digital signature on our stone slab registry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Sign Register Guestbook (5 cols) */}
          <div className="lg:col-span-5 bg-[#131311] border border-white/5 p-6 md:p-8 rounded-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-5">
                <h3 className="font-serif text-xl font-bold text-[#F3F3EF] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#C1A26B]" /> Sign the Slab
                </h3>
                <p className="font-sans text-xs text-[#64645C] mt-0.5">Your review is immediately compiled & rendered.</p>
              </div>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Signature / Name</label>
                      <input
                        id="guestbook-name"
                        type="text"
                        required
                        placeholder="e.g. Yuki Sato"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0A0A09] border border-white/5 hover:border-white/10 focus:border-[#C1A26B] rounded-sm text-sm text-[#F3F3EF] outline-none transition-all duration-300"
                      />
                    </div>

                    {/* Interactive Star Rating */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Sensory Score</label>
                      <div className="flex items-center space-x-2">
                        {Array.from({ length: 5 }).map((_, index) => {
                          const starValue = index + 1;
                          const isActive = starValue <= (hoverRating || rating);
                          return (
                            <button
                              key={index}
                              type="button"
                              id={`star-${starValue}`}
                              onClick={() => setRating(starValue)}
                              onMouseEnter={() => setHoverRating(starValue)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="focus:outline-none transition-transform duration-100 active:scale-125 cursor-pointer"
                            >
                              <Star
                                className={`w-7 h-7 transition-colors ${
                                  isActive
                                    ? 'text-[#C1A26B] fill-[#C1A26B] drop-shadow-[0_0_8px_rgba(193,162,107,0.3)]'
                                    : 'text-white/10 hover:text-white/35'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Patron Tag Selection */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Patron Designation</label>
                      <div className="flex flex-wrap gap-1.5">
                        {availableTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            id={`tag-${tag.replace(/\s+/g, '-').toLowerCase()}`}
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest border transition-all duration-300 rounded-sm cursor-pointer ${
                              selectedTag === tag
                                ? 'bg-[#C1A26B]/15 border-[#C1A26B] text-[#C1A26B]'
                                : 'bg-transparent border-white/5 text-[#A1A19A] hover:border-white/15'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Chronicle Description</label>
                      <textarea
                        id="guestbook-comment"
                        required
                        rows={3}
                        placeholder="Describe the texture, flavor, fire, or digital design codes of your visit..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0A0A09] border border-white/5 hover:border-white/10 focus:border-[#C1A26B] rounded-sm text-sm text-[#F3F3EF] outline-none transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="btn-submit-guestbook"
                      className="w-full py-4 bg-[#C1A26B] hover:bg-[#DFCDAA] text-black font-sans text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-lg shadow-[#C1A26B]/10 hover:shadow-[#C1A26B]/20 cursor-pointer"
                    >
                      Carve Signature on Slate
                    </button>
                  </motion.form>
                ) : (
                  /* Success Feedback */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                  >
                    <div className="p-3 bg-[#C1A26B]/15 rounded-full border border-[#C1A26B]/30 text-[#C1A26B] animate-bounce">
                      <Check className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#F3F3EF]">Chronicle Recorded</h4>
                      <p className="font-sans text-xs text-[#A1A19A] mt-1">Thank you for locking your frequency into our stone archives.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Scrollable list of testimonial feeds (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Scrollable list container */}
            <div className="max-h-[500px] overflow-y-auto pr-2 space-y-4 scroll-smooth">
              <AnimatePresence initial={false}>
                {entries.map((entry) => (
                  <motion.div
                    key={entry.id}
                    id={`review-item-${entry.id}`}
                    initial={{ opacity: 0, y: -20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="bg-[#131311] border border-white/5 p-5 md:p-6 rounded-sm space-y-4 hover:border-[#C1A26B]/15 transition-all duration-300 relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      {/* Name & custom tag */}
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/5 border border-white/5 rounded-sm">
                          <Compass className="w-4 h-4 text-[#C1A26B]" />
                        </div>
                        <div>
                          <span className="font-serif text-sm font-bold text-[#F3F3EF] block">{entry.name}</span>
                          <span className="font-mono text-[9px] uppercase tracking-wider text-[#C1A26B]">
                            {entry.tag}
                          </span>
                        </div>
                      </div>

                      {/* Stars & date */}
                      <div className="flex sm:flex-col items-start sm:items-end justify-between gap-1">
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < entry.rating ? 'text-[#C1A26B] fill-[#C1A26B]' : 'text-white/10'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[9px] text-[#64645C] uppercase tracking-wider block">
                          {entry.date}
                        </span>
                      </div>

                    </div>

                    {/* Comment text */}
                    <p className="font-sans text-xs md:text-sm text-[#A1A19A] leading-relaxed italic">
                      "{entry.comment}"
                    </p>

                    {/* Bottom layout accents */}
                    <div className="absolute bottom-2 right-4 flex items-center space-x-1 text-[8px] font-mono text-[#64645C] uppercase tracking-widest">
                      <Heart className="w-2.5 h-2.5 text-[#C1A26B]" />
                      <span>Verified Patron</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Total reviews and stats badge */}
            <div className="p-4 bg-white/5 border border-white/5 rounded-sm flex justify-between items-center text-[10px] font-mono uppercase text-[#64645C] tracking-widest">
              <span>ACTIVE REGISTRY VOLUME: {entries.length} PATRONS</span>
              <span className="flex items-center gap-1 text-[#C1A26B]">
                <Award className="w-3.5 h-3.5" /> 4.98 AVERAGE SCORE
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
