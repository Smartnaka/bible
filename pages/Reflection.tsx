
import React, { useState, useEffect } from 'react';
import { generateReflection } from '../services/geminiService';
import { JournalEntry } from '../types';
import { PenLine, Send, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

interface ReflectionProps {
  dailyVerse: { reference: string, text: string } | null;
  onSaveJournal: (entry: JournalEntry) => void;
}

const Reflection: React.FC<ReflectionProps> = ({ dailyVerse, onSaveJournal }) => {
  const [reflectionData, setReflectionData] = useState<{reflection: string, prompts: string[]} | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0); // 0: Reflection, 1: Prompt 1, 2: Prompt 2, 3: Prompt 3, 4: Done
  const [journalText, setJournalText] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (dailyVerse) {
      const loadReflection = async () => {
        setLoading(true);
        const data = await generateReflection(dailyVerse.text, dailyVerse.reference);
        setReflectionData(data);
        setLoading(false);
      };
      loadReflection();
    }
  }, [dailyVerse]);

  const handleSave = () => {
    if (!dailyVerse || !reflectionData || !journalText.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      scriptureId: dailyVerse.reference,
      verseReference: dailyVerse.reference,
      verseText: dailyVerse.text,
      prompt: step > 0 && step <= 3 ? reflectionData.prompts[step - 1] : "General Reflection",
      content: journalText,
    };

    onSaveJournal(entry);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      if (step < 4) setStep(step + 1);
      setJournalText('');
    }, 1500);
  };

  if (!dailyVerse) {
    return <div className="text-center py-20 font-cinzel text-[#800000]">Select a verse from the feed first.</div>;
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-12 h-12 border-4 border-[#800000] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-cinzel text-[#800000] animate-pulse">Whispering to the soul...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Progress Stepper */}
      <div className="flex justify-between items-center px-4 mb-4">
        {[0, 1, 2, 3, 4].map((s) => (
          <div 
            key={s} 
            className={`h-1.5 flex-1 mx-0.5 rounded-full transition-all duration-500 ${step >= s ? 'gold-bg shadow-sm' : 'bg-[#d4af37]/20'}`}
          />
        ))}
      </div>

      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#d4af37]/20 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <PenLine size={80} />
        </div>

        {step === 0 && reflectionData && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center">
              <span className="font-cinzel text-[10px] tracking-[0.4em] text-[#d4af37] uppercase">Deep Insight</span>
              <h2 className="font-cinzel text-xl text-[#800000] mt-1 italic">Silent Contemplation</h2>
            </div>
            <div className="space-y-4 text-[#2d2a26] text-lg leading-relaxed first-letter:text-4xl first-letter:text-[#800000] first-letter:font-cinzel">
              {reflectionData.reflection.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <button 
              onClick={() => setStep(1)}
              className="w-full gold-bg text-white py-4 rounded-xl font-cinzel tracking-widest text-sm shadow-lg hover:shadow-gold-500/50 flex items-center justify-center group"
            >
              Enter Journal <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {step > 0 && step <= 3 && reflectionData && (
          <div className="animate-fadeIn space-y-6">
            <div className="text-center">
              <span className="font-cinzel text-[10px] tracking-[0.4em] text-[#d4af37] uppercase">Prompt {step} of 3</span>
              <h3 className="font-cinzel text-lg text-[#800000] mt-1 leading-snug">
                {reflectionData.prompts[step - 1]}
              </h3>
            </div>

            <textarea
              className="w-full h-48 p-4 bg-transparent border-2 border-dashed border-[#d4af37]/30 rounded-xl focus:border-[#d4af37] focus:ring-0 text-lg font-garamond italic resize-none outline-none transition-colors"
              placeholder="Speak from your heart..."
              value={journalText}
              onChange={(e) => setJournalText(e.target.value)}
              disabled={saved}
            />

            <div className="flex space-x-3">
               <button 
                onClick={() => setStep(step - 1)}
                className="flex-1 border-2 border-[#d4af37]/40 text-[#d4af37] py-4 rounded-xl font-cinzel tracking-widest text-xs flex items-center justify-center hover:bg-[#d4af37]/5"
              >
                <ChevronLeft size={16} className="mr-1" /> Back
              </button>
              <button 
                onClick={handleSave}
                disabled={!journalText.trim() || saved}
                className={`flex-[2] py-4 rounded-xl font-cinzel tracking-widest text-xs flex items-center justify-center transition-all shadow-lg ${
                  saved ? 'bg-green-600 text-white' : 'gold-bg text-white'
                } disabled:opacity-50 disabled:grayscale`}
              >
                {saved ? <><CheckCircle2 size={18} className="mr-2" /> Recorded</> : <><Send size={18} className="mr-2" /> Preserve Entry</>}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="animate-fadeIn text-center space-y-8 py-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#d4af37] rounded-full blur-xl opacity-20 animate-pulse"></div>
              <CheckCircle2 size={80} className="text-[#d4af37] relative z-10 mx-auto" strokeWidth={1} />
            </div>
            <div>
              <h2 className="font-cinzel text-2xl text-[#800000]">Graceful Conclusion</h2>
              <p className="font-garamond italic text-[#a09e9a] mt-2">Your reflections are now part of your spiritual legacy.</p>
            </div>
            <div className="space-y-4">
                <button 
                  onClick={() => window.location.hash = '#/journal'}
                  className="w-full gold-bg text-white py-4 rounded-xl font-cinzel tracking-widest text-sm shadow-md"
                >
                  View Journal
                </button>
                <button 
                  onClick={() => setStep(0)}
                  className="w-full border-2 border-[#800000]/20 text-[#800000] py-4 rounded-xl font-cinzel tracking-widest text-sm"
                >
                  Reflect Again
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reflection;
