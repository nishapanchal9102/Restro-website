import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Fish, Flame, GlassWater, Trees, Sparkles, Leaf, 
  Moon, Sparkle, Compass, ArrowRight, ArrowLeft, RefreshCw, Check, Star 
} from 'lucide-react';
import { QUIZ_QUESTIONS, MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface FlavorQuizProps {
  onAddToTastingBoard: (item: MenuItem) => void;
  tastingBoardIds: string[];
}

export default function FlavorQuiz({ onAddToTastingBoard, tastingBoardIds }: FlavorQuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingText, setAnalyzingText] = useState('Calibrating palate keys...');
  const [recommendedItem, setRecommendedItem] = useState<MenuItem | null>(null);
  const [matchRationale, setMatchRationale] = useState('');

  // Icon mapping helper
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Fish': return <Fish className="w-5 h-5 text-[#C1A26B]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#C1A26B]" />;
      case 'GlassWater': return <GlassWater className="w-5 h-5 text-[#C1A26B]" />;
      case 'Trees': return <Trees className="w-5 h-5 text-[#C1A26B]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#C1A26B]" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-[#C1A26B]" />;
      case 'Moon': return <Moon className="w-5 h-5 text-[#C1A26B]" />;
      case 'Sparkle': return <Sparkle className="w-5 h-5 text-[#C1A26B]" />;
      case 'Compass': return <Compass className="w-5 h-5 text-[#C1A26B]" />;
      default: return <Sparkles className="w-5 h-5 text-[#C1A26B]" />;
    }
  };

  const handleSelectOption = (value: string) => {
    setAnswers(prev => ({ ...prev, [step]: value }));
  };

  const handleNext = () => {
    if (step < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      triggerAnalysis();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const triggerAnalysis = () => {
    setIsAnalyzing(true);
    setAnalyzingText('Deciphering sensory texture codes...');
    
    setTimeout(() => {
      setAnalyzingText('Aligning hearth smoke temperature...');
      
      setTimeout(() => {
        setAnalyzingText('Harvesting dynamic pairings...');
        
        setTimeout(() => {
          computeRecommendation();
          setIsAnalyzing(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const computeRecommendation = () => {
    const texture = answers[1]; // plates (sushi/raw), signatures (wagyu/hot), sips (cocktail)
    const aromatic = answers[2]; // smoky, fresh, rich
    
    let recommendation: MenuItem;
    let explanation = '';

    // Advanced recommendation matrix
    if (texture === 'sips') {
      recommendation = MENU_ITEMS.find(item => item.category === 'sips') || MENU_ITEMS[2];
      explanation = "Because you seek 'sip-able, smoky, and botanical' liquid art matched with " + aromatic + " notes, our master mixologists have synchronized 'The Obsidian Mist' molecular cocktail to guide your evening.";
    } else if (texture === 'signatures' && aromatic === 'smoky') {
      recommendation = MENU_ITEMS.find(item => item.id === 'wagyu-1') || MENU_ITEMS[1];
      explanation = "As you crave seared heat, buttery textures, and deep woodfire smoke, the highly prized 'A5 Kuro Wagyu' lightly brushed in aged soy and raw truffles represents your absolute culinary frequency.";
    } else if (texture === 'plates' && aromatic === 'fresh') {
      recommendation = MENU_ITEMS.find(item => item.id === 'sushi-1') || MENU_ITEMS[0];
      explanation = "Seeking pure, raw ocean textures paired with clean, refreshing citrus frequencies leads you directly to the modern 'Black Gold Nigiri', finished with premium white truffle glaze.";
    } else if (texture === 'signatures') {
      recommendation = MENU_ITEMS.find(item => item.id === 'signature-2') || MENU_ITEMS[4];
      explanation = "Your choice for buttery hearth plates coupled with complex sweet/savoury notes aligns with the 'Cedar Miso Sablefish', slowly roasted on cedar wood to lock in aromatic evergreen oils.";
    } else {
      recommendation = MENU_ITEMS.find(item => item.id === 'plate-2') || MENU_ITEMS[3];
      explanation = "The seeking of bold artisanal bites and unique aromatic profiles maps perfectly to our sashimi-grade 'Charcoal Roasted Octopus', caramelized with activated charcoal sake-honey.";
    }

    setRecommendedItem(recommendation);
    setMatchRationale(explanation);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({});
    setRecommendedItem(null);
  };

  // Progress percentage calculation
  const progressPercent = (step / QUIZ_QUESTIONS.length) * 100;

  const currentQuestion = QUIZ_QUESTIONS[step - 1];

  return (
    <section id="quiz" className="relative py-24 px-6 md:px-12 bg-[#0C0C0B] border-t border-white/5 overflow-hidden">
      <div className="spotlight top-1/4 right-1/3" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <span className="h-[1px] w-8 bg-[#C1A26B]/50" />
            <span className="font-mono text-xs tracking-widest text-[#C1A26B] uppercase">Palate Tuning</span>
            <span className="h-[1px] w-8 bg-[#C1A26B]/50" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#F3F3EF]">
            Palate Matcher
          </h2>
          <p className="font-sans text-sm md:text-base text-[#A1A19A]">
            Align your sensory frequency. Answer these three ambient questions to unlock a tailormade plate and table recommendation based on your mood.
          </p>
        </div>

        {/* Quiz Canvas */}
        <div className="bg-[#131311] border border-white/5 p-6 md:p-10 rounded-sm relative min-h-[420px] flex flex-col justify-between shadow-2xl">
          
          <AnimatePresence mode="wait">
            {/* 1. Palate analyzing loading state */}
            {isAnalyzing ? (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 space-y-6 text-center"
              >
                <div className="relative">
                  <RefreshCw className="w-12 h-12 text-[#C1A26B] animate-spin" />
                  <div className="absolute -inset-2 rounded-full border border-[#C1A26B]/20 animate-pulse pointer-events-none" />
                </div>
                <div className="space-y-1.5">
                  <p className="font-mono text-sm text-[#C1A26B] tracking-wider uppercase animate-pulse">
                    {analyzingText}
                  </p>
                  <p className="font-sans text-xs text-[#64645C]">Calculating molecular texture variables...</p>
                </div>
              </motion.div>
            ) : recommendedItem ? (
              /* 2. Palate recommended result state */
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 py-4"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  
                  {/* Left: Recommended dish photo */}
                  <div className="w-full md:w-2/5 aspect-square rounded-sm overflow-hidden bg-[#090908] border border-white/10 relative group">
                    <img
                      src={recommendedItem.image}
                      alt={recommendedItem.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-[#C1A26B] text-black font-mono text-[9px] font-bold tracking-widest uppercase rounded-sm flex items-center gap-1">
                      <Star className="w-3 h-3 fill-black" /> Palate Match
                    </div>
                  </div>

                  {/* Right: Recommendation rationale & details */}
                  <div className="w-full md:w-3/5 space-y-4">
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-[#C1A26B] uppercase tracking-widest">Your Personalized Signature</span>
                      <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#F3F3EF]">{recommendedItem.name}</h3>
                    </div>

                    <p className="font-sans text-sm text-[#A1A19A] leading-relaxed italic border-l-2 border-[#C1A26B]/40 pl-4 py-1">
                      {matchRationale}
                    </p>

                    <p className="font-sans text-xs text-[#64645C] leading-relaxed">
                      {recommendedItem.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-mono uppercase text-[#A1A19A]">
                      <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[#C1A26B]" /> {recommendedItem.flavorProfile}</span>
                      <span className="text-white/10">|</span>
                      <span>Prep: {recommendedItem.preparationTime}</span>
                      <span className="text-white/10">|</span>
                      <span className="text-[#C1A26B]">${recommendedItem.price}</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Result controls */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                  <button
                    id="btn-quiz-add-tasting"
                    onClick={() => onAddToTastingBoard(recommendedItem)}
                    disabled={tastingBoardIds.includes(recommendedItem.id)}
                    className="flex-grow py-3.5 bg-[#C1A26B] hover:bg-[#DFCDAA] disabled:bg-transparent disabled:border disabled:border-white/10 disabled:text-[#A1A19A] text-black font-sans text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {tastingBoardIds.includes(recommendedItem.id) ? (
                      <>
                        <Check className="w-4 h-4" /> Locked on Dining Board
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" /> Add Match to Tasting Board
                      </>
                    )}
                  </button>
                  <button
                    id="btn-quiz-reset"
                    onClick={handleReset}
                    className="px-6 py-3.5 bg-transparent hover:bg-white/5 border border-white/15 hover:border-white/30 text-white font-mono text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Re-tune Palate
                  </button>
                </div>
              </motion.div>
            ) : (
              /* 3. Question Card rendering */
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                {/* Step indicator */}
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-[#64645C]">
                  <span>Palette Step {step} of {QUIZ_QUESTIONS.length}</span>
                  <span className="text-[#C1A26B]">{Math.round(progressPercent)}% Calibrated</span>
                </div>

                {/* Progress bar */}
                <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#C1A26B] transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Question title */}
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#F3F3EF] leading-snug">
                  {currentQuestion.text}
                </h3>

                {/* Question Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[step] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        id={`btn-quiz-opt-${option.value}`}
                        onClick={() => handleSelectOption(option.value)}
                        className={`p-5 rounded-sm border text-left flex flex-col justify-between space-y-4 transition-all duration-300 min-h-[140px] cursor-pointer ${
                          isSelected
                            ? 'bg-[#C1A26B]/10 border-[#C1A26B] text-white shadow-lg'
                            : 'bg-[#0A0A09] border-white/5 hover:border-white/10 text-white hover:bg-[#131311]'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <div className={`p-2 rounded-sm ${isSelected ? 'bg-[#C1A26B] text-black' : 'bg-white/5 text-[#A1A19A]'}`}>
                            {getIcon(option.icon)}
                          </div>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#C1A26B]" />}
                        </div>

                        <div className="space-y-1">
                          <span className="font-sans text-sm font-semibold tracking-wide block">{option.label}</span>
                          <span className="font-sans text-[11px] text-[#A1A19A] block leading-relaxed">{option.description}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <button
                    type="button"
                    id="btn-quiz-back"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-[#A1A19A] hover:text-white disabled:opacity-30 disabled:hover:text-[#A1A19A] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  <button
                    type="button"
                    id="btn-quiz-next"
                    onClick={handleNext}
                    disabled={!answers[step]}
                    className="px-6 py-3 bg-[#C1A26B] hover:bg-[#DFCDAA] disabled:bg-[#1C1C19] disabled:text-[#64645C] text-black font-sans text-xs font-bold tracking-widest uppercase rounded-sm flex items-center gap-1.5 transition-all duration-300 cursor-pointer"
                  >
                    {step === QUIZ_QUESTIONS.length ? (
                      <>Generate Palette <Sparkles className="w-3.5 h-3.5" /></>
                    ) : (
                      <>Proceed <ArrowRight className="w-3.5 h-3.5" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
