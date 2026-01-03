
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, PenTool, Bookmark } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Feed' },
    { path: '/reflection', icon: BookOpen, label: 'Reflect' },
    { path: '/journal', icon: PenTool, label: 'Journal' },
    { path: '/favorites', icon: Bookmark, label: 'Saved' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#fdfbf7] border-t-2 border-[#d4af37]/30 px-6 py-3 flex justify-around items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              isActive ? 'text-[#800000]' : 'text-[#a09e9a]'
            }`}
          >
            <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-[#d4af37]/10' : ''}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={`text-[10px] font-cinzel uppercase tracking-widest ${isActive ? 'font-bold' : ''}`}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
