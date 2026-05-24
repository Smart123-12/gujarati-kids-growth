import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Compass, Heart, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const KidsHome = () => {
  const { 
    activeChild, 
    speakText, 
    triggerAudio, 
    updateChildRewards,
    timeSpentToday,
    screenTimeLimit,
    isLockedByScreenTime,
    resetScreenLimitLock,
    parentUser
  } = useApp();
  
  const navigate = useNavigate();

  // Mascot quotes
  const quotes = [
    "કેમ છો દોસ્ત! આજે તું કઈ નવી વાર્તા વાંચીશ? 📖",
    "કિડ્સ ગ્રોથ વર્લ્ડમાં તારું સ્વાગત છે! ચલો રમીએ! 🦁",
    "નવા સ્ટાર્સ કમાવા તૈયાર છો ને? ચલો કમળ નો 'ક' શીખીએ! 🌟",
    "વડીલોને પગે લાગવું એ જ આપણો ખરો સંસ્કાર છે! 🙏",
    "યાદશક્તિ વધારવા માટે આજે મેમરી ગેમ રમીએ! 🧠",
  ];

  const [mascotBubble, setMascotBubble] = useState(quotes[0]);
  const [chestOpened, setChestOpened] = useState(false);
  const [chestClaimed, setChestClaimed] = useState(false);

  // Screen limit unlock PIN state
  const [showUnlockPinModal, setShowUnlockPinModal] = useState(false);
  const [unlockPin, setUnlockPin] = useState('');
  const [unlockError, setUnlockError] = useState(false);

  useEffect(() => {
    // Speak welcome on load
    if (activeChild) {
      setTimeout(() => {
        speakText(`નમસ્તે ${activeChild.name}! ગુજરાતી કિડ્સ ગ્રોથ વર્લ્ડ માં તારું સ્વાગત છે!`, 'gu-IN');
      }, 800);
    }
  }, []);

  const handleMascotClick = () => {
    triggerAudio('click');
    const randomIdx = Math.floor(Math.random() * quotes.length);
    setMascotBubble(quotes[randomIdx]);
    speakText(quotes[randomIdx], 'gu-IN');
  };

  const handleOpenChest = () => {
    if (chestClaimed) {
      speakText('તમે આજનો ખજાનો મેળવી લીધો છે!', 'gu-IN');
      return;
    }
    triggerAudio('levelUp');
    setChestOpened(true);
    setChestClaimed(true);
    updateChildRewards(activeChild.id, 50, 20, 'chest'); // 50 stars and 20 coins
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    speakText('અભિનંદન! તમને પચાસ સ્ટાર્સ અને વીસ કોઈન્સ મળ્યા!', 'gu-IN');
  };

  const handleUnlockScreenSubmit = (e) => {
    e.preventDefault();
    if (unlockPin === parentUser.pin) {
      triggerAudio('correct');
      resetScreenLimitLock();
      setShowUnlockPinModal(false);
      setUnlockPin('');
      setUnlockError(false);
    } else {
      triggerAudio('wrong');
      setUnlockError(true);
      setUnlockPin('');
    }
  };

  if (!activeChild) return null;

  // Render Lock overlay if screen limit is reached
  if (isLockedByScreenTime) {
    return (
      <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center p-6 text-white font-fredoka">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg bg-slate-800 border-4 border-kids-orange rounded-[40px] p-8 text-center shadow-2xl relative"
        >
          <span className="text-8xl block mb-4 animate-bounce-slow">🌙</span>
          <h2 className="text-4xl font-black mb-2 text-kids-orange">ઊંઘવાનો સમય થઈ ગયો!</h2>
          <h3 className="text-2xl font-bold mb-4">Time to Take a Break!</h3>
          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            મમ્મી-પપ્પાએ સેટ કરેલો આજનો રમવાનો સમય પૂર્ણ થઈ ગયો છે. હવે આપણે આંખોને આરામ આપીને કાલે સવારે ફરીથી રમીશું!
          </p>

          <button
            onClick={() => { triggerAudio('click'); setShowUnlockPinModal(true); }}
            className="btn-kids-orange px-8 py-3 text-lg border-white shadow-kids-orange"
          >
            માતા-પિતા માટે અનલોક (Parent Unlock)
          </button>

          {/* Inline PIN verification modal */}
          <AnimatePresence>
            {showUnlockPinModal && (
              <div className="absolute inset-0 bg-slate-850 rounded-[40px] z-10 flex flex-col justify-center items-center p-6 bg-slate-900 border-4 border-kids-purple">
                <span className="text-4xl block mb-2">🔑</span>
                <h4 className="text-xl font-bold mb-1">કંટ્રોલ અનલોક કરો</h4>
                <p className="text-slate-400 text-xs mb-4">4-અંકનો પેરેન્ટ PIN દાખલ કરો</p>

                {unlockError && <div className="text-red-400 text-xs font-bold mb-2">ખોટો PIN! ફરી પ્રયત્ન કરો.</div>}

                <form onSubmit={handleUnlockScreenSubmit} className="w-full max-w-xs space-y-4">
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="••••"
                    value={unlockPin}
                    onChange={e => setUnlockPin(e.target.value)}
                    className="w-full text-center tracking-widest text-2xl font-black py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-white focus:outline-none focus:border-kids-purple"
                    autoFocus
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { triggerAudio('click'); setShowUnlockPinModal(false); }}
                      className="px-4 py-2 border border-slate-700 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-sm"
                    >
                      પાછા જાવ
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl font-bold bg-kids-purple text-white hover:bg-kids-purple-dark text-sm border-2 border-slate-850 shadow-kids-purple"
                    >
                      અનલોક કરો
                    </button>
                  </div>
                </form>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // Calculate screen progress percentage
  const totalSeconds = screenTimeLimit * 60;
  const progressPercent = Math.min(100, Math.round((timeSpentToday / totalSeconds) * 100));

  return (
    <div className="min-h-[calc(100vh-80px)] bg-kids-cream py-8 px-4 md:px-8 font-fredoka relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Mascot & Dynamic Speech bubble */}
        <div className="lg:col-span-1 flex flex-col items-center">
          {/* Animated Mascot Area */}
          <div className="relative w-full max-w-xs flex flex-col items-center select-none">
            {/* Speech bubble */}
            <motion.div 
              initial={{ scale: 0.8, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
              className="bg-white border-3 border-slate-900 p-4 rounded-[24px] shadow-kids relative mb-6 w-full text-center"
            >
              <p className="text-xl font-black text-slate-800 leading-snug">{mascotBubble}</p>
              {/* Triangle pointer */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-slate-900"></div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-t-[11px] border-t-white"></div>
            </motion.div>

            {/* Mascot Character Illustration */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -3, 3, -3, 0] }}
              onClick={handleMascotClick}
              className="cursor-pointer text-[140px] filter drop-shadow-md select-none relative animate-float"
            >
              🦁
              {/* Crown symbol */}
              <span className="absolute top-2 left-6 text-4xl animate-bounce-slow">👑</span>
            </motion.div>
            
            <p className="text-xs text-slate-400 font-bold mt-2">સિંહરાજ (Guju) પર ક્લિક કરો!</p>
          </div>

          {/* Interactive Treasure Chest */}
          <div className="mt-8 bg-white border-2 border-slate-900 p-5 rounded-3xl shadow-kids w-full max-w-xs text-center">
            <h3 className="text-xl font-black text-slate-800 mb-2">🎁 આજનો દૈનિક ખજાનો</h3>
            <p className="text-slate-500 text-xs font-semibold mb-4">રોજ લોગિન કરી ફ્રી સ્ટાર્સ અને કોઈન્સ મેળવો!</p>
            
            <motion.button 
              whileHover={{ scale: chestClaimed ? 1 : 1.05 }}
              onClick={handleOpenChest}
              className={`text-7xl block mx-auto mb-4 select-none outline-none ${chestClaimed ? 'cursor-default opacity-85' : 'cursor-pointer hover:animate-wiggle'}`}
            >
              {chestOpened ? '🔓' : '🔒'}
            </motion.button>

            <button 
              disabled={chestClaimed}
              onClick={handleOpenChest}
              className={`w-full py-2.5 rounded-2xl border-2 border-slate-900 font-black text-sm shadow-kids ${
                chestClaimed ? 'bg-slate-200 text-slate-400 shadow-kids-active border-slate-300' : 'bg-kids-yellow text-slate-800 shadow-kids-yellow'
              }`}
            >
              {chestClaimed ? 'મેળવી લીધેલ છે!' : 'ખજાનો ખોલો!'}
            </button>
          </div>
        </div>

        {/* Right Columns: Main Gateways & Daily challenges */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Daily Challenges */}
          <div className="bg-white border-2 border-slate-900 p-6 rounded-[32px] shadow-kids">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
                🎯 આજના પડકારો (Daily Tasks)
              </h3>
              <span className="text-xs px-3 py-1 bg-kids-yellow text-yellow-800 rounded-full font-black border border-yellow-400">
                બોનસ સ્ટાર્સ!
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-kids-yellow-light border border-kids-yellow rounded-2xl">
                <span className="text-2xl">📚</span>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-sm">વાર્તાઓની દુનિયામાં ૧ નવું જ્ઞાન મેળવો</p>
                  <p className="text-xs text-slate-500">ઇનામ: +૩૦ સ્ટાર્સ</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-amber-200 border border-amber-400 rounded-lg text-amber-800 font-black">ચાલુ</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-kids-purple-light border border-kids-purple rounded-2xl">
                <span className="text-2xl">🧠</span>
                <div className="flex-1">
                  <p className="font-bold text-slate-800 text-sm">કોઈ પણ ૧ બ્રેઈન ગેમ રમો અને સ્કોર કરો</p>
                  <p className="text-xs text-slate-500">ઇનામ: +૧૫ સ્ટાર્સ</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-purple-200 border border-purple-400 rounded-lg text-purple-800 font-black">ચાલુ</span>
              </div>
            </div>
          </div>

          {/* Big Gateways Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* GATEWAY 1: STORIES */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => { triggerAudio('click'); navigate('/stories'); }}
              className="bg-kids-yellow-light border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-yellow hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between aspect-[1.3] relative overflow-hidden group select-none"
            >
              <div className="text-5xl">📖</div>
              <div>
                <h4 className="text-2xl font-black text-slate-800">વાર્તા લોક</h4>
                <p className="text-sm text-slate-600 font-bold mt-1">Story Land</p>
                <p className="text-xs text-slate-500 mt-2 font-medium">સંસ્કાર, પશુ-પક્ષી અને મનોરંજક વાર્તાઓ સાંભળો!</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-900 bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                ➡️
              </div>
            </motion.div>

            {/* GATEWAY 2: LEARNING */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => { triggerAudio('click'); navigate('/learning'); }}
              className="bg-kids-blue-light border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-blue hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between aspect-[1.3] relative overflow-hidden group select-none"
            >
              <div className="text-5xl">✏️</div>
              <div>
                <h4 className="text-2xl font-black text-slate-800">ગુજરાતી શાળા</h4>
                <p className="text-sm text-slate-600 font-bold mt-1">Learning Room</p>
                <p className="text-xs text-slate-500 mt-2 font-medium">કક્કો, બારાખડી, અંક, કલર અને શાકભાજીના અવાજો!</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-900 bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                ➡️
              </div>
            </motion.div>

            {/* GATEWAY 3: GAMES */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => { triggerAudio('click'); navigate('/games'); }}
              className="bg-kids-orange-light border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-orange hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between aspect-[1.3] relative overflow-hidden group select-none"
            >
              <div className="text-5xl">🎮</div>
              <div>
                <h4 className="text-2xl font-black text-slate-800">મગજ વિકાસ બાગ</h4>
                <p className="text-sm text-slate-600 font-bold mt-1">Game Park</p>
                <p className="text-xs text-slate-500 mt-2 font-medium">મેમરી ગેમ, અંક ગણતરી અને પઝલની મજેદાર રમતો!</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-900 bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                ➡️
              </div>
            </motion.div>

            {/* GATEWAY 4: SANSKAR */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => { triggerAudio('click'); navigate('/sanskar'); }}
              className="bg-kids-pink-light border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-pink hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between aspect-[1.3] relative overflow-hidden group select-none"
            >
              <div className="text-5xl">✨</div>
              <div>
                <h4 className="text-2xl font-black text-slate-800">સંસ્કાર વાટિકા</h4>
                <p className="text-sm text-slate-600 font-bold mt-1">Sanskar Zone</p>
                <p className="text-xs text-slate-500 mt-2 font-medium">સદગુણ ડાયરી, આભાર કાર્ડ અને આજના સારા આચરણ!</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-900 bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                ➡️
              </div>
            </motion.div>

            {/* GATEWAY 5: VISUAL CLASSROOM */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={() => { triggerAudio('click'); navigate('/classroom'); }}
              className="bg-kids-purple-light border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-purple hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between aspect-[1.3] relative overflow-hidden group select-none sm:col-span-2"
            >
              <div className="text-5xl">🎬</div>
              <div>
                <h4 className="text-2xl font-black text-slate-800">વિઝ્યુઅલ ક્લાસરૂમ</h4>
                <p className="text-sm text-slate-600 font-bold mt-1">Visual Classroom</p>
                <p className="text-xs text-slate-500 mt-2 font-medium">અવાજ, વિઝ્યુલાઇઝેશન અને એનિમેશન દ્વારા જ્ઞાન! (Not word only)</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-slate-900 bg-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                ➡️
              </div>
            </motion.div>

          </div>

          {/* Screen Time Progress Bar */}
          <div className="bg-white border-2 border-slate-900 p-4 rounded-2xl shadow-kids flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">⏱️</span>
              <span className="font-bold text-slate-600 text-sm">રમવાનો બાકી સમય:</span>
            </div>
            <div className="flex-1 w-full sm:mx-4 h-5 bg-slate-100 rounded-full border border-slate-300 overflow-hidden relative">
              <div 
                className="h-full bg-kids-orange transition-all duration-1000"
                style={{ width: `${100 - progressPercent}%` }}
              ></div>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-slate-800">
                {Math.max(0, screenTimeLimit - Math.floor(timeSpentToday / 60))} મિનિટ બાકી
              </span>
            </div>
            <span className="text-xs text-slate-400 font-bold font-mono">લિમિટ: {screenTimeLimit} મિનિટ</span>
          </div>

        </div>

      </div>
    </div>
  );
};
