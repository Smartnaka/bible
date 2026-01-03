
import React from 'react';
import { JournalEntry } from '../types';
import { Book, Calendar, Quote } from 'lucide-react';

interface JournalProps {
  entries: JournalEntry[];
}

const Journal: React.FC<JournalProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
        <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37]">
          <Book size={32} />
        </div>
        <h2 className="font-cinzel text-[#800000] text-xl">Empty Vessel</h2>
        <p className="text-[#a09e9a] italic max-w-[200px]">Begin your reflection journey to fill these pages with wisdom.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="text-center">
        <span className="font-cinzel text-[10px] tracking-[0.4em] text-[#d4af37] uppercase">The Registry of Heart</span>
        <h2 className="font-cinzel text-2xl text-[#800000] mt-1">Spiritual Journal</h2>
      </div>

      <div className="space-y-12 relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-4 bottom-0 w-[1px] bg-gradient-to-b from-[#d4af37] to-transparent"></div>

        {entries.map((entry, idx) => (
          <article key={entry.id} className="relative pl-14 group">
            {/* Timeline Dot */}
            <div className="absolute left-4 top-2 w-4 h-4 rounded-full gold-bg border-4 border-[#fdfbf7] z-10 shadow-sm group-hover:scale-125 transition-transform"></div>
            
            <div className="bg-white/60 p-6 rounded-2xl border border-[#d4af37]/10 shadow-sm group-hover:shadow-md transition-shadow">
              <div className="flex items-center text-[#a09e9a] text-xs font-cinzel mb-3">
                <Calendar size={12} className="mr-1" />
                {new Date(entry.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>

              <div className="mb-4">
                <h3 className="font-cinzel text-[#800000] leading-snug">{entry.verseReference}</h3>
                <p className="text-[#a09e9a] text-sm italic line-clamp-2 mt-1">"{entry.verseText}"</p>
              </div>

              <div className="bg-[#fefcf9] p-4 rounded-xl border-l-4 border-[#d4af37]">
                <p className="text-[#800000] font-cinzel text-[10px] uppercase tracking-wider mb-2">Reflecting on:</p>
                <p className="text-[#5d5a56] text-xs font-semibold mb-3 italic">"{entry.prompt}"</p>
                <div className="text-[#2d2a26] text-lg leading-relaxed font-garamond italic whitespace-pre-wrap">
                  {entry.content}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Journal;
