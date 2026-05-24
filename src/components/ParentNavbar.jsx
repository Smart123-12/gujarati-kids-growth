import React from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, Home, Settings, Shield } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export const ParentNavbar = () => {
  const { logoutParent, triggerAudio } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    triggerAudio('click');
    logoutParent();
    navigate('/');
  };

  const handleBackToKids = () => {
    triggerAudio('click');
    navigate('/');
  };

  return (
    <header className="bg-slate-900 text-white py-4 px-6 md:px-8 shadow-lg flex flex-col sm:flex-row justify-between items-center select-none font-fredoka">
      <div className="flex items-center gap-3 mb-3 sm:mb-0">
        <div className="w-10 h-10 rounded-xl bg-kids-purple flex items-center justify-center text-xl border-2 border-white/20">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold tracking-wide">પેરેન્ટ ડેશબોર્ડ (Parent Center)</h2>
          <p className="text-xs text-slate-400 font-medium">બાળકના વિકાસ પર મોનિટરિંગ</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={handleBackToKids}
          className="px-4 py-2 border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-all rounded-xl font-bold flex items-center gap-1.5 text-sm"
        >
          <Home className="w-4 h-4" /> કિડ્સ ઝોનમાં પાછા (Kids Zone)
        </button>

        <button 
          onClick={handleLogout}
          className="px-4 py-2 border border-red-900 bg-red-950/40 hover:bg-red-950 text-red-400 hover:text-red-300 transition-all rounded-xl font-bold flex items-center gap-1.5 text-sm"
        >
          <LogOut className="w-4 h-4" /> લોગ આઉટ (Logout)
        </button>
      </div>
    </header>
  );
};
