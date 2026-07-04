import React, { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, Clock, Coffee, Sparkles, MapPin, CheckCircle, Ticket } from 'lucide-react';
import { TABLES } from '../data';
import { TableOption, TableArea } from '../types';

export default function ReservationSection() {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('2026-07-04');
  const [time, setTime] = useState('19:00');
  const [selectedArea, setSelectedArea] = useState<TableArea>('Main Hearth');
  const [selectedTableId, setSelectedTableId] = useState<string>('mh-2');
  const [specialRequest, setSpecialRequest] = useState('');
  
  // Confirmation state
  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Available areas
  const areas: TableArea[] = ['Sushi Bar', 'Main Hearth', 'Ambient Mezzanine', 'Private Garden'];

  // Filtered tables based on selected Area
  const areaTables = useMemo(() => {
    return TABLES.filter(table => table.area === selectedArea);
  }, [selectedArea]);

  // Selected table object
  const currentTable = useMemo(() => {
    return TABLES.find(t => t.id === selectedTableId);
  }, [selectedTableId]);

  // Handle changing area
  const handleAreaChange = (area: TableArea) => {
    setSelectedArea(area);
    // Auto-select first table in that area
    const firstTable = TABLES.find(t => t.area === area);
    if (firstTable) {
      setSelectedTableId(firstTable.id);
    }
  };

  const handleTableSelect = (table: TableOption) => {
    setSelectedTableId(table.id);
    setSelectedArea(table.area);
    // Sync guest capacity recommendation
    if (table.capacity >= 1) {
      setGuests(Math.min(table.capacity, 6));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Generate custom booking reference
    const ref = `KR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsBooked(true);
  };

  return (
    <section id="planner" className="relative py-24 px-6 md:px-12 bg-[#090908] border-t border-white/5 overflow-hidden">
      <div className="spotlight bottom-0 right-1/4" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <span className="h-[1px] w-8 bg-[#C1A26B]/50" />
            <span className="font-mono text-xs tracking-widest text-[#C1A26B] uppercase">Ritual Reservation</span>
            <span className="h-[1px] w-8 bg-[#C1A26B]/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F3F3EF]">
            Interactive Seating Experience
          </h2>
          <p className="font-sans text-sm md:text-base text-[#A1A19A]">
            No pre-allocated spots. Select your exact coordinates across our distinct zones—front and center fireside, elevated mezzanine, or the whispering garden.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isBooked ? (
            <motion.div
              key="booking-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Column: Interactive Map (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-[#131311] border border-white/5 p-6 md:p-8 rounded-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#F3F3EF]">Zone Coordinator</h3>
                    <p className="font-sans text-xs text-[#64645C] mt-0.5">Select a zone to map active table positions.</p>
                  </div>

                  {/* Area select pills */}
                  <div className="flex flex-wrap gap-1">
                    {areas.map((area) => (
                      <button
                        key={area}
                        id={`btn-area-${area.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => handleAreaChange(area)}
                        className={`px-3 py-1.5 text-[10px] md:text-xs font-mono uppercase tracking-widest border transition-all duration-300 rounded-sm cursor-pointer ${
                          selectedArea === area
                            ? 'bg-[#C1A26B]/15 border-[#C1A26B] text-[#C1A26B]'
                            : 'bg-transparent border-white/5 text-[#A1A19A] hover:border-white/15 hover:text-white'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                {/* The Virtual Map Stage */}
                <div className="relative w-full aspect-[16/10] bg-[#0A0A09] border border-white/5 rounded-sm overflow-hidden flex items-center justify-center">
                  
                  {/* Grid overlay for Blueprint feel */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:25px_25px]" />
                  
                  {/* Outer Map Details (Heads up display) */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-[10px] font-mono text-[#64645C] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#C1A26B] inline-block" />
                    <span>Selected Seating</span>
                    <span className="w-2 h-2 rounded-full bg-white/10 inline-block ml-3" />
                    <span>Mapped Tables</span>
                  </div>

                  {/* Kitchen Marker */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 px-8 py-1.5 bg-white/5 border border-white/10 rounded-sm font-mono text-[9px] uppercase tracking-widest text-[#64645C] text-center">
                    Binchotan Hearth / Kitchen Area
                  </div>

                  {/* Render Tables absolutely on coordinates */}
                  <div className="absolute inset-0">
                    {TABLES.map((table) => {
                      const isSelected = selectedTableId === table.id;
                      const isInSelectedArea = selectedArea === table.area;
                      
                      return (
                        <motion.button
                          key={table.id}
                          id={`map-table-${table.id}`}
                          onClick={() => handleTableSelect(table)}
                          style={{
                            left: `${table.coordinates.x}%`,
                            top: `${table.coordinates.y}%`,
                          }}
                          whileHover={{ scale: 1.15 }}
                          className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full flex flex-col items-center justify-center transition-all duration-500 cursor-pointer ${
                            isSelected
                              ? 'bg-[#C1A26B] text-black border-2 border-[#DFCDAA] shadow-lg shadow-[#C1A26B]/30'
                              : isInSelectedArea
                              ? 'bg-white/5 border border-[#C1A26B]/50 text-[#C1A26B] hover:bg-[#C1A26B]/15'
                              : 'bg-white/[0.02] border border-white/5 text-white/20 hover:border-white/10'
                          }`}
                        >
                          <span className="text-[10px] md:text-xs font-mono font-bold">
                            {table.id.split('-')[1].toUpperCase()}
                          </span>
                          <span className="text-[8px] font-sans opacity-70">
                            {table.capacity}P
                          </span>

                          {/* Connection radar ring if selected */}
                          {isSelected && (
                            <span className="absolute -inset-1.5 rounded-full border border-[#C1A26B]/40 animate-ping pointer-events-none" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Area Description */}
                <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                  <h4 className="font-serif text-sm font-bold text-[#F3F3EF] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C1A26B]" />
                    {currentTable?.area} &bull; {currentTable?.name}
                  </h4>
                  <p className="font-sans text-xs text-[#A1A19A] mt-1 leading-relaxed">
                    {currentTable?.description} Seating Capacity: {currentTable?.capacity} {currentTable?.capacity === 1 ? 'person' : 'people'}.
                  </p>
                </div>
              </div>

              {/* Right Column: Reservation Form (5 cols) */}
              <form
                id="reservation-form"
                onSubmit={handleSubmit}
                className="lg:col-span-5 bg-[#131311] border border-white/5 p-6 md:p-8 rounded-sm flex flex-col justify-between space-y-6"
              >
                <div className="border-b border-white/5 pb-5">
                  <h3 className="font-serif text-xl font-bold text-[#F3F3EF]">Secure Coordinates</h3>
                  <p className="font-sans text-xs text-[#64645C] mt-0.5">Reservations are immediately booked & integrated.</p>
                </div>

                <div className="space-y-4 flex-grow">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Full Name</label>
                    <input
                      id="input-res-name"
                      type="text"
                      required
                      placeholder="e.g. Liam Sterling"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A0A09] border border-white/5 hover:border-white/10 focus:border-[#C1A26B] rounded-sm text-sm text-[#F3F3EF] outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Electronic Mail</label>
                    <input
                      id="input-res-email"
                      type="email"
                      required
                      placeholder="e.g. liam@sterling.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A0A09] border border-white/5 hover:border-white/10 focus:border-[#C1A26B] rounded-sm text-sm text-[#F3F3EF] outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Guests and Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block flex items-center gap-1">
                        <Users className="w-3 h-3" /> Guests
                      </label>
                      <select
                        id="select-res-guests"
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-[#0A0A09] border border-white/5 hover:border-white/10 focus:border-[#C1A26B] rounded-sm text-sm text-[#F3F3EF] outline-none transition-all duration-300 cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num} className="bg-[#090908]">{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Date
                      </label>
                      <input
                        id="input-res-date"
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0A0A09] border border-white/5 hover:border-white/10 focus:border-[#C1A26B] rounded-sm text-sm text-[#F3F3EF] outline-none transition-all duration-300 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Seating Frequency (Time)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['17:00', '19:00', '21:30'].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          id={`btn-time-${slot.replace(':', '')}`}
                          onClick={() => setTime(slot)}
                          className={`py-2 text-xs font-mono border rounded-sm transition-all duration-300 cursor-pointer ${
                            time === slot
                              ? 'bg-[#C1A26B] border-[#C1A26B] text-black font-semibold'
                              : 'bg-[#0A0A09] border-white/5 text-[#A1A19A] hover:border-white/15 hover:text-white'
                          }`}
                        >
                          {slot === '17:00' ? '5:00 PM' : slot === '19:00' ? '7:00 PM' : '9:30 PM'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special note */}
                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] uppercase text-[#64645C] tracking-widest block">Dietary Preferences / Requests</label>
                    <textarea
                      id="input-res-requests"
                      rows={2}
                      placeholder="e.g. Food allergies, anniversary, low table..."
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0A0A09] border border-white/5 hover:border-white/10 focus:border-[#C1A26B] rounded-sm text-sm text-[#F3F3EF] outline-none transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  id="btn-confirm-booking"
                  className="w-full py-4 bg-gradient-to-r from-[#C1A26B] to-[#8E713E] hover:from-[#DFCDAA] hover:to-[#C1A26B] text-black font-sans text-xs font-bold tracking-widest uppercase rounded-sm transition-all duration-300 shadow-lg shadow-[#C1A26B]/10 hover:shadow-[#C1A26B]/20 cursor-pointer"
                >
                  Authorize Table Booking
                </button>
              </form>
            </motion.div>
          ) : (
            /* Booking Confirmation Ticket view */
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl mx-auto bg-[#131311] border border-[#C1A26B]/30 rounded-sm overflow-hidden shadow-2xl relative"
            >
              {/* Gold light burst */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#C1A26B]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Hologram aesthetic lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(193,162,107,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

              {/* Ticket Top: Success header */}
              <div className="p-8 text-center space-y-4 border-b border-dashed border-white/10">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#C1A26B]/15 rounded-full border border-[#C1A26B]/30 text-[#C1A26B]">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-[#F3F3EF]">Access Authorized</h3>
                  <p className="font-mono text-xs text-[#C1A26B] tracking-widest uppercase">Kuro Ritual Passport</p>
                </div>
              </div>

              {/* Ticket Body: Pass details */}
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Guest Patron</span>
                    <p className="font-sans text-sm text-[#F3F3EF] font-medium truncate mt-0.5">{name}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Passport Reference</span>
                    <p className="font-mono text-sm text-[#C1A26B] font-bold mt-0.5">{bookingRef}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Coordinates Area</span>
                    <p className="font-sans text-sm text-[#F3F3EF] font-medium mt-0.5">{currentTable?.area}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Table Seated</span>
                    <p className="font-sans text-sm text-[#F3F3EF] font-medium mt-0.5">{currentTable?.name} ({guests}P Max)</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Date (Solstice)</span>
                    <p className="font-sans text-sm text-[#F3F3EF] font-medium mt-0.5">{date}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Seating Time</span>
                    <p className="font-sans text-sm text-[#F3F3EF] font-medium mt-0.5">
                      {time === '17:00' ? '5:00 PM' : time === '19:00' ? '7:00 PM' : '9:30 PM'}
                    </p>
                  </div>
                </div>

                {specialRequest && (
                  <div className="p-3.5 bg-white/[0.02] border border-white/5 rounded-sm">
                    <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Dietary Endorsements</span>
                    <p className="font-sans text-xs text-[#A1A19A] mt-1 leading-relaxed italic">"{specialRequest}"</p>
                  </div>
                )}

                {/* A simulated elegant modern barcode/QR block */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] uppercase text-[#64645C] tracking-widest">Entry Verification</span>
                    <p className="font-sans text-[11px] text-[#A1A19A] leading-relaxed">Present this digital ticket upon arriving at the sanctuary entrance.</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 bg-white rounded-sm w-16 h-16 shrink-0 shadow-lg">
                    {/* Simulated vector QR layout */}
                    <div className="grid grid-cols-4 gap-0.5 w-full h-full bg-black p-0.5">
                      <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div>
                      <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                      <div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                      <div className="bg-white"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Footer: Reset Booking button */}
              <div className="p-6 bg-[#1C1C19] border-t border-white/5 text-center">
                <button
                  id="btn-new-booking"
                  onClick={() => {
                    setIsBooked(false);
                    setName('');
                    setSpecialRequest('');
                  }}
                  className="px-5 py-2.5 bg-transparent border border-[#C1A26B]/30 hover:border-[#C1A26B] text-[#C1A26B] font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-300 cursor-pointer"
                >
                  Create Another Reservation
                </button>
              </div>

              {/* Left and Right half-circle ticket punches */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-3 w-6 h-6 bg-[#090908] rounded-full border-r border-white/5" />
              <div className="absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 bg-[#090908] rounded-full border-l border-white/5" />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
