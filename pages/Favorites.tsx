
import React from 'react';
import { FavoriteVerse, Scripture } from '../types';
import { Heart, Trash2, ArrowRight } from 'lucide-react';

interface FavoritesProps {
  favorites: FavoriteVerse[];
  onToggleFavorite: (s: Scripture) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onToggleFavorite }) => {
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 text-center">
        <div className="w-16 h-16 bg-[#800000]/10 rounded-full flex items-center justify-center text-[#800000]">
          <Heart size={32} />
        </div>
        <h2 className="font-cinzel text-[#800000] text-xl">Sacred Silence</h2>
        <p className="text-[#a09e9a] italic max-w-[200px]">Mark scriptures with the heart to preserve them here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="text-center">
        <span className="font-cinzel text-[10px] tracking-[0.4em] text-[#d4af37] uppercase">Collected Wisdom</span>
        <h2 className="font-cinzel text-2xl text-[#800000] mt-1">Saved Scriptures</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {favorites.map((fav) => (
          <div key={fav.id} className="illuminated-border bg-white p-6 relative group overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-cinzel text-[#800000] text-lg">{fav.scripture.reference}</h3>
              <button 
                onClick={() => onToggleFavorite(fav.scripture)}
                className="text-[#800000]/30 hover:text-red-600 transition-colors p-1"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <p className="text-xl italic font-garamond leading-relaxed text-[#2d2a26] mb-6">
              "{fav.scripture.text}"
            </p>

            <div className="flex justify-end">
                <button 
                  onClick={() => window.location.hash = '#/reflection'}
                  className="flex items-center text-[#d4af37] font-cinzel text-[10px] tracking-[0.2em] uppercase hover:underline"
                >
                  Reflect Now <ArrowRight size={14} className="ml-1" />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
