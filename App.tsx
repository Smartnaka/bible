
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import VerseFeed from './pages/VerseFeed';
import Reflection from './pages/Reflection';
import Journal from './pages/Journal';
import Favorites from './pages/Favorites';
import { JournalEntry, FavoriteVerse, Scripture } from './types';

const App: React.FC = () => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [favorites, setFavorites] = useState<FavoriteVerse[]>([]);
  const [dailyVerse, setDailyVerse] = useState<{reference: string, text: string, theme: string} | null>(null);

  useEffect(() => {
    // Load local storage
    const savedJournal = localStorage.getItem('lumina_journal');
    const savedFavorites = localStorage.getItem('lumina_favorites');
    if (savedJournal) setJournalEntries(JSON.parse(savedJournal));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    // Request notification permission on mount
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lumina_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('lumina_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addJournalEntry = (entry: JournalEntry) => {
    setJournalEntries([entry, ...journalEntries]);
  };

  const toggleFavorite = (scripture: Scripture) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.scripture.reference === scripture.reference);
      if (exists) {
        return prev.filter(f => f.scripture.reference !== scripture.reference);
      } else {
        return [...prev, { id: Date.now().toString(), scripture, savedAt: new Date().toISOString() }];
      }
    });
  };

  return (
    <Router>
      <div className="max-w-md mx-auto min-h-screen pb-24 relative shadow-2xl bg-white/30 backdrop-blur-sm">
        {/* Decorative Header */}
        <header className="pt-8 pb-4 px-6 text-center">
            <h1 className="font-cinzel text-3xl gold-gradient tracking-tighter">LUMINA</h1>
            <p className="font-script text-2xl text-[#800000] -mt-1 opacity-80">Sacred Reflections</p>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-2"></div>
        </header>

        <main className="px-6">
          <Routes>
            <Route 
              path="/" 
              element={
                <VerseFeed 
                  dailyVerse={dailyVerse} 
                  setDailyVerse={setDailyVerse} 
                  favorites={favorites} 
                  onToggleFavorite={toggleFavorite} 
                />
              } 
            />
            <Route 
              path="/reflection" 
              element={
                <Reflection 
                  dailyVerse={dailyVerse} 
                  onSaveJournal={addJournalEntry} 
                />
              } 
            />
            <Route 
              path="/journal" 
              element={<Journal entries={journalEntries} />} 
            />
            <Route 
              path="/favorites" 
              element={<Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />} 
            />
          </Routes>
        </main>

        <Navigation />
      </div>
    </Router>
  );
};

export default App;
