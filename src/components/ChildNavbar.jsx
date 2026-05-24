import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { avatars } from '../data/mockData';
import { Volume2, VolumeX, Shield, Users, LogOut, Lock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const ChildNavbar = () => {
  const { 
    activeChild, 
    soundEnabled, 
    setSoundEnabled, 
    setActiveChildId, 
    parentUser, 
    triggerAudio,
    speakText 
  } = useApp();

  const navigate = useNavigate();
  const [showPinModal, setShowPinModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);

  if (!activeChild) return null;
  const avatar = avatars.find(av => av.id === activeChild.avatar) || avatars[0];

  const handleSoundToggle = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    if (nextVal) {
      triggerAudio('click');
      speakText('આવાજ ચાલુ', 'gu-IN');
    }
  };

  const handleParentZoneClick = () => {
    triggerAudio('click');
    setEnteredPin('');
    setPinError(false);
    setShowPinModal(true);
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (enteredPin === parentUser.pin) {
      triggerAudio('correct');
      setShowPinModal(false);
      navigate('/parent');
    } else {
      triggerAudio('wrong');
      setPinError(true);
      setEnteredPin('');
    }
  };

  const handleSwitchProfile = () => {
    triggerAudio('click');
    setActiveChildId(null);
    navigate('/');
  };

  return (
    <>
      <header className="bg-white border-b-4 border-slate-900 sticky top-0 z-40 py-3 px-4 md:px-8 shadow-md select-none font-fredoka">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center">
          
          {/* Active Kid info */}
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full border-2 border-slate-900 flex items-center justify-center text-3xl shadow-md ${avatar.color}`}>
              {avatar.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-800">{activeChild.name}</span>
                <span className="bg-kids-orange text-white text-xs px-2 py-0.5 rounded-full font-black border border-slate-900">
                  Level {activeChild.level}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-bold">ખુશ-ખુશાલ રમત ગમત!</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-3 md:gap-6 bg-slate-50 border-2 border-slate-900 py-1.5 px-4 rounded-2xl shadow-kids-active">
            <div className="flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform" onClick={() => speakText(`${activeChild.stars} સ્ટાર્સ`, 'gu-IN')}>
              <span className="text-2xl">⭐</span>
              <span className="text-xl font-black text-yellow-600">{activeChild.stars}</span>
            </div>
            <div className="h-6 w-0.5 bg-slate-300"></div>
            <div className="flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform" onClick={() => speakText(`${activeChild.coins} કોઈન્સ`, 'gu-IN')}>
              <span className="text-2xl">🪙</span>
              <span className="text-xl font-black text-orange-600">{activeChild.coins}</span>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-3">
            {/* Sound Toggle */}
            <button 
              onClick={handleSoundToggle}
              className={`p-2.5 rounded-2xl border-2 border-slate-900 shadow-kids hover:translate-y-0.5 active:translate-y-1 transition-all ${
                soundEnabled ? 'bg-kids-yellow text-slate-800' : 'bg-slate-200 text-slate-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>

            {/* Profile Selector */}
            <button 
              onClick={handleSwitchProfile}
              className="px-4 py-2.5 rounded-2xl border-2 border-slate-900 bg-kids-blue text-white font-extrabold shadow-kids hover:translate-y-0.5 active:translate-y-1 transition-all text-sm flex items-center gap-1.5"
            >
              <Users className="w-5 h-5" /> પ્રોફાઇલ બદલો
            </button>

            {/* Parent Area Trigger */}
            <button 
              onClick={handleParentZoneClick}
              className="px-4 py-2.5 rounded-2xl border-2 border-slate-900 bg-kids-purple text-white font-extrabold shadow-kids hover:translate-y-0.5 active:translate-y-1 transition-all text-sm flex items-center gap-1.5"
            >
              <Lock className="w-5 h-5" /> પેરેન્ટ ઝોન
            </button>
          </div>

        </div>
      </header>

      {/* PARENT GATE PIN MODAL */}
      <AnimatePresence>
        {showPinModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white border-4 border-slate-900 rounded-[32px] overflow-hidden p-6 relative shadow-2xl"
            >
              <button 
                onClick={() => { triggerAudio('click'); setShowPinModal(false); }}
                className="absolute right-4 top-4 p-1 hover:bg-slate-100 rounded-full border border-transparent hover:border-slate-200 transition-all text-slate-400"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-6">
                <span className="text-5xl block mb-2">🔒</span>
                <h3 className="text-2xl font-black text-slate-800">માતા-પિતા સુરક્ષા તાળું</h3>
                <p className="text-slate-500 font-medium text-sm mt-1">
                  પેરેન્ટ ડેશબોર્ડમાં પ્રવેશ કરવા તમારો 4-અંકનો PIN દાખલ કરો
                </p>
              </div>

              {pinError && (
                <div className="p-2 mb-4 bg-red-100 border border-red-400 text-red-600 rounded-xl text-center font-bold text-sm">
                  ખોટો PIN! ફરીથી પ્રયત્ન કરો. (Incorrect PIN!)
                </div>
              )}

              <form onSubmit={handlePinSubmit} className="space-y-4">
                <div>
                  <input 
                    type="password" 
                    maxLength={4}
                    placeholder="••••"
                    value={enteredPin}
                    onChange={e => setEnteredPin(e.target.value)}
                    className="w-full text-center tracking-widest text-3xl font-black px-4 py-3 rounded-2xl border-2 border-slate-800 focus:outline-none focus:border-kids-purple bg-slate-50"
                    autoFocus
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => { triggerAudio('click'); setShowPinModal(false); }}
                    className="px-5 py-3 border-2 border-slate-800 rounded-2xl font-extrabold bg-slate-100 hover:bg-slate-200 shadow-kids"
                  >
                    રદ કરો
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-3 border-2 border-slate-800 rounded-2xl font-extrabold text-white bg-kids-purple shadow-kids-purple hover:translate-y-0.5 active:translate-y-1 transition-all"
                  >
                    વેરિફાય કરો
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
