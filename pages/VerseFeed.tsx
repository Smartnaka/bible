
import React, { useEffect, useState } from 'react';
import { Bookmark, Heart, Share2, Sparkles, Bell } from 'lucide-react';
import { fetchDailyVerse } from '../services/geminiService';
import { FavoriteVerse, Scripture } from '../types';

interface VerseFeedProps {
  dailyVerse: { reference: string, text: string, theme: string } | null;
  setDailyVerse: (v: any) => void;
  favorites: FavoriteVerse[];
  onToggleFavorite: (s: Scripture) => void;
}

const VerseFeed: React.FC<VerseFeedProps> = ({ dailyVerse, setDailyVerse, favorites, onToggleFavorite }) => {
  const [loading, setLoading] = useState(!dailyVerse);

  useEffect(() => {
    if (!dailyVerse) {
      const getVerse = async () => {
        setLoading(true);
        const v = await fetchDailyVerse();
        setDailyVerse(v);
        setLoading(false);
      };
      getVerse();
    }
  }, [dailyVerse, setDailyVerse]);

  const isFavorited = dailyVerse ? favorites.some(f => f.scripture.reference === dailyVerse.reference) : false;

  const handleToggleFav = () => {
    if (dailyVerse) {
      onToggleFavorite({
        id: dailyVerse.reference,
        reference: dailyVerse.reference,
        text: dailyVerse.text,
        translation: 'KJV'
      });
    }
  };

  const scheduleTestNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Lumina Daily Reflection", {
        body: `New scripture ready for today: ${dailyVerse?.reference}`,
        icon: "https://picsum.photos/100/100"
      });
    } else {
      alert("Please enable notifications to receive daily reminders.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
        <p className="font-cinzel text-[#800000] animate-pulse">Illuminating Scripture...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <section className="relative group">
        <div className="absolute -top-4 -left-4 w-12 h-12 text-[#d4af37]/40 pointer-events-none">
            <Sparkles size={48} />
        </div>
        
        <div className="illuminated-border bg-[#fefcf9] p-8 relative">
          <div className="text-center mb-6">
            <span className="font-cinzel text-xs text-[#d4af37] tracking-[0.3em] uppercase">Scripture of the Day</span>
            <h2 className="font-cinzel text-xl text-[#800000] mt-1">{dailyVerse?.reference}</h2>
            <p className="text-[#a09e9a] text-sm italic">— {dailyVerse?.theme} —</p>
          </div>

          <div className="relative">
            <span className="absolute -top-4 -left-2 font-cinzel text-7xl text-[#d4af37]/20 select-none">"</span>
            <p className="text-2xl leading-relaxed text-center font-medium italic text-[#2d2a26] relative z-10 first-letter:text-5xl first-letter:font-cinzel first-letter:text-[#800000] first-letter:mr-1 first-letter:float-left first-letter:leading-[0.8]">
              {dailyVerse?.text}
            </p>
            <span className="absolute -bottom-10 -right-2 font-cinzel text-7xl text-[#d4af37]/20 select-none">"</span>
          </div>

          <div className="flex justify-center space-x-6 mt-12 border-t border-[#d4af37]/20 pt-6">
            <button 
              onClick={handleToggleFav}
              className={`flex flex-col items-center space-y-1 transition-transform active:scale-95 ${isFavorited ? 'text-red-600' : 'text-[#a09e9a]'}`}
            >
              <Heart fill={isFavorited ? "currentColor" : "none"} size={20} />
              <span className="text-[10px] uppercase font-cinzel tracking-widest">Save</span>
            </button>
            <button 
              onClick={() => {
                if(navigator.share) {
                  navigator.share({ title: 'Daily Scripture', text: `${dailyVerse?.text} - ${dailyVerse?.reference}` });
                }
              }}
              className="flex flex-col items-center space-y-1 text-[#a09e9a] transition-transform active:scale-95"
            >
              <Share2 size={20} />
              <span className="text-[10px] uppercase font-cinzel tracking-widest">Share</span>
            </button>
            <button 
              onClick={scheduleTestNotification}
              className="flex flex-col items-center space-y-1 text-[#a09e9a] transition-transform active:scale-95"
            >
              <Bell size={20} />
              <span className="text-[10px] uppercase font-cinzel tracking-widest">Remind</span>
            </button>
          </div>
        </div>
      </section>

      <div className="bg-[#800000]/5 rounded-2xl p-6 border border-[#800000]/10 flex items-center justify-between">
        <div>
          <h3 className="font-cinzel text-[#800000] text-sm">Guided Reflection</h3>
          <p className="text-sm text-[#5d5a56] font-garamond italic">Dive deeper into today's wisdom.</p>
        </div>
        <a href="#/reflection" className="gold-bg text-white px-5 py-2 rounded-full font-cinzel text-xs tracking-widest hover:brightness-110 transition-all shadow-md">
          Begin
        </a>
      </div>
    </div>
  );
};

export default VerseFeed;
