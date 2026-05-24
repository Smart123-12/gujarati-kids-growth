import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Play, Pause, RefreshCw, Volume2, Sparkles, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const VisualClassroom = () => {
  const { triggerAudio, speakText, activeChild } = useApp();
  const navigate = useNavigate();

  // Active Lecture: 'hub' or 'counting' or 'colors' or 'tracing' or 'solar'
  const [activeLecture, setActiveLecture] = useState('hub');

  const handleBackToHome = () => {
    triggerAudio('click');
    navigate('/');
  };

  // --- 1. COUNTING VISUALIZER STATE ---
  const [countTarget, setCountTarget] = useState(5);
  const [itemsList, setItemsList] = useState([]);
  const [isPlayingCount, setIsPlayingCount] = useState(false);

  const startCountingVisual = () => {
    triggerAudio('click');
    setIsPlayingCount(true);
    setItemsList([]);
    
    // Count one by one with delay
    let current = 0;
    const interval = setInterval(() => {
      if (current < countTarget) {
        current++;
        const nextItem = {
          id: current,
          x: Math.random() * 80 + 10, // random X percent
          y: -10,
          emoji: ['🍎', '🍒', '🍊', '🍓', '🎈', '⭐'][Math.floor(Math.random() * 6)]
        };
        setItemsList(prev => [...prev, nextItem]);
        
        // Speak written number in Gujarati
        const gujNames = ['એક', 'બે', 'ત્રણ', 'ચાર', 'પાંચ', 'છ', 'સાત', 'આઠ', 'આઠ', 'નવ', 'દસ'];
        speakText(String(current), 'gu-IN');
      } else {
        clearInterval(interval);
        setIsPlayingCount(false);
        setTimeout(() => {
          speakText(`અહીં કુલ ${countTarget} વસ્તુઓ છે!`, 'gu-IN');
        }, 800);
      }
    }, 900);
  };

  // --- 2. COLOR RAIN STATE ---
  const [selectedColor, setSelectedColor] = useState({ name: 'લાલ', hex: '#EF4444', emoji: '🔴' });
  const [rainDrops, setRainDrops] = useState([]);

  const triggerColorRain = (colorObj) => {
    triggerAudio('click');
    setSelectedColor(colorObj);
    speakText(`${colorObj.name} કલર!`, 'gu-IN');
    
    // Create random rain drops falling
    const drops = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      speed: Math.random() * 1.5 + 1
    }));
    setRainDrops(drops);
  };

  // --- 3. ALPHABET TRACING STATE ---
  const [tracingLetter, setTracingLetter] = useState('ક');
  const [tracingStep, setTracingStep] = useState(0); // 0: idle, 1: tracing curve 1, 2: tracing curve 2, 3: completed
  const [tracingRunning, setTracingRunning] = useState(false);

  const startTracingVisual = () => {
    triggerAudio('click');
    setTracingRunning(true);
    setTracingStep(1);
    speakText(`ચલો કક્કો લખતા શીખીએ! કમળ નો ક`, 'gu-IN');

    // Simple delay tracing guide
    setTimeout(() => {
      setTracingStep(2);
      triggerAudio('click');
    }, 1500);

    setTimeout(() => {
      setTracingStep(3);
      triggerAudio('levelUp');
      setTracingRunning(false);
      speakText(`વાહ! સુંદર લખાયો. ક કમળ નો ક!`, 'gu-IN');
    }, 3000);
  };

  // --- 4. SOLAR SYSTEM STATE ---
  const [selectedCelestial, setSelectedCelestial] = useState(null);
  const celestialsInfo = {
    sun: {
      name: 'સૂર્યદાદા (The Sun)',
      desc: 'સૂર્યદાદા એક મોટો તારો છે! તે આખા જંગલ અને પૃથ્વીને સુંદર અજવાળું અને ગરમી આપે છે. સૂર્યદાદા સવારે પૂર્વ દિશામાંથી ઉગે છે.',
      englishDesc: 'The Sun is a massive star! It provides light and warmth to the Earth and all forest animals. It rises in the East.',
      emoji: '☀️'
    },
    earth: {
      name: 'પૃથ્વી માતા (The Earth)',
      desc: 'આપણી સુંદર પૃથ્વી જ્યાં આપણે બધા પ્રાણીઓ અને માણસો સાથે રહીએ છીએ. પૃથ્વી ગોળ-ગોળ ફરે છે, જેના કારણે દિવસ અને રાત થાય છે!',
      englishDesc: 'Our beautiful planet where all animals and humans live. The Earth rotates which creates day and night!',
      emoji: '🌍'
    },
    moon: {
      name: 'ચંદામામા (The Moon)',
      desc: 'મીઠા ચંદામામા રાત્રે આકાશમાં શીતળ પ્રકાશ ફેલાવે છે. ચંદામામા પૃથ્વીની આસપાસ ગોળ-ગોળ ચક્કર લગાવે છે અને રોજ તેમનો આકાર બદલે છે!',
      englishDesc: 'Sweet moon shines cool light in the night sky. Moon orbits the Earth and changes its shape daily!',
      emoji: '🌙'
    }
  };

  const handleCelestialClick = (key) => {
    triggerAudio('click');
    const info = celestialsInfo[key];
    setSelectedCelestial(info);
    speakText(`${info.name}. ${info.desc}`, 'gu-IN');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-kids-cream font-fredoka py-8 px-4 md:px-8 relative select-none">
      
      {/* Page Navigation header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {activeLecture !== 'hub' ? (
          <button 
            onClick={() => { triggerAudio('click'); setActiveLecture('hub'); setSelectedCelestial(null); }}
            className="px-5 py-2.5 border-2 border-slate-800 bg-slate-100 hover:bg-slate-200 font-bold flex items-center gap-1 shadow-kids text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> લેક્ચર યાદી
          </button>
        ) : (
          <button 
            onClick={handleBackToHome}
            className="px-5 py-2.5 border-2 border-slate-800 bg-slate-100 hover:bg-slate-200 font-bold flex items-center gap-1 shadow-kids text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> હોમ સ્ક્રીન
          </button>
        )}

        <div className="text-center flex-1">
          <span className="text-5xl block mb-1">🎬</span>
          <h2 className="text-4xl font-extrabold text-slate-800">વિઝ્યુઅલ કલાસરૂમ (Visual Classroom)</h2>
          <p className="text-slate-500 font-bold">શાબ્દિક લખાણ વગર કાર્ટૂન એનિમેશન અને સાંભળવા દ્વારા સીધું જ્ઞાન મેળવો!</p>
        </div>

        <div className="bg-kids-orange px-4 py-2 border-2 border-slate-900 rounded-2xl text-xs font-black shadow-kids-orange flex items-center gap-1 text-white">
          <Sparkles className="w-4 h-4 animate-spin" /> ચિત્રો સાથે શિક્ષણ!
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* LECTURES SELECTION HUB */}
        {activeLecture === 'hub' && (
          <motion.div
            key="hub"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto pt-6"
          >
            {/* Lecture 1: Counting */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={() => { triggerAudio('click'); setActiveLecture('counting'); setItemsList([]); }}
              className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-yellow hover:shadow-lg transition-all cursor-pointer flex gap-4 items-center"
            >
              <span className="text-6xl p-4 bg-kids-yellow-light border-2 border-slate-900 rounded-3xl">🍎🌦️</span>
              <div>
                <h3 className="text-2xl font-black text-slate-800">અંક ગણતરી ફળ વરસાદ</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Topic: Visual Math Counting</p>
                <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                  ફળોનો જીવંત વરસાદ કરો અને ગણતરીના એનિમેશન સાથે નંબરો શીખો!
                </p>
              </div>
            </motion.div>

            {/* Lecture 2: Color mixer */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={() => { triggerAudio('click'); setActiveLecture('colors'); setRainDrops([]); }}
              className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-blue hover:shadow-lg transition-all cursor-pointer flex gap-4 items-center"
            >
              <span className="text-6xl p-4 bg-kids-blue-light border-2 border-slate-900 rounded-3xl">🎨🌧️</span>
              <div>
                <h3 className="text-2xl font-black text-slate-800">રંગોનો રંગીન વરસાદ</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Topic: Color Visualizer</p>
                <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                  વિવિધ રંગો પસંદ કરી આખી સ્ક્રીનમાં સુંદર કલરનો વરસાદ ફેલાવો!
                </p>
              </div>
            </motion.div>

            {/* Lecture 3: Alphabet Tracing */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={() => { triggerAudio('click'); setActiveLecture('tracing'); setTracingStep(0); }}
              className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-orange hover:shadow-lg transition-all cursor-pointer flex gap-4 items-center"
            >
              <span className="text-6xl p-4 bg-kids-orange-light border-2 border-slate-900 rounded-3xl">🖋️✨</span>
              <div>
                <h3 className="text-2xl font-black text-slate-800">કક્કો લેખન વિઝ્યુલાઇઝર</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Topic: Stroke Tracing Guide</p>
                <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                  Outlined લખાણ પર પેનનો ટ્રેસર બોલ કઈ રીતે ફરે છે તે જીવંત જુઓ!
                </p>
              </div>
            </motion.div>

            {/* Lecture 4: Solar system */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={() => { triggerAudio('click'); setActiveLecture('solar'); setSelectedCelestial(null); }}
              className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-pink hover:shadow-lg transition-all cursor-pointer flex gap-4 items-center"
            >
              <span className="text-6xl p-4 bg-kids-pink-light border-2 border-slate-900 rounded-3xl">🪐🌍</span>
              <div>
                <h3 className="text-2xl font-black text-slate-800">સૂર્યમંડળ વિઝ્યુઅલ</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Topic: Space Science Orbit</p>
                <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                  પૃથ્વી, સૂર્ય અને ચંદ્રની કક્ષા ભ્રમણ orbits વિઝ્યુઅલ સ્વરૂપે લાઈવ જુઓ!
                </p>
              </div>
            </motion.div>

          </motion.div>
        )}

        {/* 1. COUNTING VISUALIZER ARENA */}
        {activeLecture === 'counting' && (
          <motion.div
            key="counting-lecture"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white border-3 border-slate-900 p-6 rounded-[36px] shadow-lg text-center"
          >
            <h3 className="text-2xl font-black text-slate-800 mb-2">🍒 અંક ગણતરી વરસાદ</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">નીચેથી મનપસંદ નંબર પસંદ કરી "વરસાદ ચાલુ કરો" બટન દબાવો!</p>

            {/* Count Selector Box */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <button
                  key={n}
                  disabled={isPlayingCount}
                  onClick={() => { triggerAudio('click'); setCountTarget(n); }}
                  className={`w-10 h-10 rounded-full border border-slate-800 font-black flex items-center justify-center transition-all ${
                    countTarget === n ? 'bg-kids-yellow text-slate-800 shadow-sm scale-105' : 'bg-slate-50 hover:bg-slate-100 text-slate-650'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {/* Rain Visual Output canvas */}
            <div className="w-full h-80 bg-slate-900 border-2 border-slate-905 rounded-3xl relative overflow-hidden flex items-center justify-center select-none shadow-inner mb-6">
              {itemsList.length === 0 ? (
                <span className="text-slate-500 text-sm font-bold">અહીં વરસાદ દેખાશે 🌧️</span>
              ) : (
                itemsList.map(item => (
                  <motion.span
                    key={item.id}
                    initial={{ y: -50, scale: 0, opacity: 0 }}
                    animate={{ y: 220, scale: 1.2, opacity: 1 }}
                    transition={{ type: 'spring', duration: 1.2 }}
                    className="absolute text-5xl filter drop-shadow-md select-none"
                    style={{ left: `${item.x}%` }}
                  >
                    {item.emoji}
                  </motion.span>
                ))
              )}
              {/* Bottom Ground reference */}
              <div className="absolute bottom-0 inset-x-0 h-4 bg-slate-800 border-t border-slate-700"></div>
            </div>

            <button
              disabled={isPlayingCount}
              onClick={startCountingVisual}
              className="btn-kids-yellow px-10 py-3 shadow-kids-yellow"
            >
              વરસાદ ચાલુ કરો! <Play className="w-5 h-5 fill-slate-800" />
            </button>
          </motion.div>
        )}

        {/* 2. COLOR RAIN ARENA */}
        {activeLecture === 'colors' && (
          <motion.div
            key="colors-lecture"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white border-3 border-slate-900 p-6 rounded-[36px] shadow-lg text-center"
          >
            <h3 className="text-2xl font-black text-slate-800 mb-2">🎨 કલર રેઈનબો વિઝ્યુલાઇઝર</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">કોઈ પણ કલર પર ક્લિક કરી સ્ક્રીન કલેક્ટિંગ બોક્સમાં કલરની બૂંદો વરસાવો!</p>

            {/* Colors picker */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { name: 'લાલ', hex: '#EF4444', emoji: '🔴' },
                { name: 'લીલો', hex: '#22C55E', emoji: '🟢' },
                { name: 'વાદળી', hex: '#3B82F6', emoji: '🔵' },
                { name: 'પીળો', hex: '#EAB308', emoji: '🟡' },
                { name: 'નારંગી', hex: '#F97316', emoji: '🟠' },
                { name: 'ગુલાબી', hex: '#EC4899', emoji: '🌸' }
              ].map(c => (
                <button
                  key={c.name}
                  onClick={() => triggerColorRain(c)}
                  className={`px-4 py-2 border-2 border-slate-800 rounded-xl font-bold flex items-center gap-1.5 transition-all text-slate-800`}
                  style={{ backgroundColor: c.hex + '15', borderColor: c.hex }}
                >
                  <span className="text-lg">{c.emoji}</span> {c.name}
                </button>
              ))}
            </div>

            {/* Simulated Color Rain Area */}
            <div className="w-full h-80 bg-slate-900 border-2 border-slate-950 rounded-3xl relative overflow-hidden flex items-center justify-center">
              {rainDrops.length === 0 ? (
                <span className="text-slate-500 text-sm font-bold">કલર વરસાદ જોવા કલર સિલેક્ટ કરો 🌧️</span>
              ) : (
                rainDrops.map(drop => (
                  <motion.div
                    key={drop.id}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 320, opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: drop.speed,
                      repeat: Infinity,
                      delay: drop.delay,
                      ease: 'linear'
                    }}
                    className="absolute w-1 h-8 rounded-full"
                    style={{ 
                      left: `${drop.x}%`,
                      backgroundColor: selectedColor.hex,
                      boxShadow: `0 0 8px ${selectedColor.hex}`
                    }}
                  />
                ))
              )}
              {/* Splashes on bottom */}
              <div 
                className="absolute bottom-0 inset-x-0 h-4 transition-all duration-500"
                style={{ backgroundColor: selectedColor.hex + '40' }}
              ></div>
            </div>

            <p className="text-xs text-slate-400 font-bold mt-4">કલર Rain: visual particles reflecting real-time values!</p>
          </motion.div>
        )}

        {/* 3. ALPHABET TRACING ARENA */}
        {activeLecture === 'tracing' && (
          <motion.div
            key="tracing-lecture"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white border-3 border-slate-900 p-6 rounded-[36px] shadow-lg text-center"
          >
            <h3 className="text-2xl font-black text-slate-800 mb-2">🖋️ કક્કો લેખન વિઝ્યુલાઇઝર</h3>
            <p className="text-slate-550 text-sm font-medium mb-6">પેન કઈ રીતે ફરીને અક્ષર બનાવે છે તે લાઈવ જુઓ!</p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Select Tracing letter */}
              <div className="md:col-span-1 flex flex-row md:flex-col justify-center gap-2">
                {['ક', 'ખ', 'ગ', 'ઘ'].map(l => (
                  <button
                    key={l}
                    disabled={tracingRunning}
                    onClick={() => { triggerAudio('click'); setTracingLetter(l); setTracingStep(0); }}
                    className={`w-12 h-12 rounded-2xl border border-slate-800 font-black text-2xl flex items-center justify-center transition-all ${
                      tracingLetter === l ? 'bg-kids-orange text-white shadow-sm' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              {/* Tracing Canvas Frame */}
              <div className="md:col-span-3 bg-slate-50 border-2 border-slate-950 h-80 rounded-3xl flex items-center justify-center relative overflow-hidden select-none">
                
                {/* Massive Outlined text */}
                <span className="text-[170px] font-black text-slate-200 select-none stroke-current opacity-70 leading-none">
                  {tracingLetter}
                </span>

                {/* Animated Pen Tracer Ball */}
                {tracingStep === 1 && (
                  <motion.div
                    animate={{
                      x: [-40, 20, -10],
                      y: [-50, -10, 50],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute w-8 h-8 rounded-full bg-kids-orange border-2 border-white shadow-md flex items-center justify-center text-xs"
                  >
                    ✏️
                  </motion.div>
                )}

                {tracingStep === 2 && (
                  <motion.div
                    animate={{
                      x: [20, 20],
                      y: [-80, 80],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute w-8 h-8 rounded-full bg-kids-blue border-2 border-white shadow-md flex items-center justify-center text-xs"
                  >
                    ✏️
                  </motion.div>
                )}

                {/* Status guides overlay */}
                <div className="absolute bottom-4 inset-x-0 text-center text-xs font-black text-slate-400">
                  {tracingStep === 0 && 'સ્ટાર્ટ બટન દબાવો'}
                  {tracingStep === 1 && 'પગલું ૧: ડાબો વળાંક દોરવો (Tracing Curve)'}
                  {tracingStep === 2 && 'પગલું ૨: ઉભી લાઇન દોરવી (Vertical Line)'}
                  {tracingStep === 3 && 'લેખન પૂર્ણ! સરસ! (Tracing Completed!) ✨'}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                disabled={tracingRunning}
                onClick={startTracingVisual}
                className="btn-kids-orange px-10 py-3 shadow-kids-orange"
              >
                લેખન વિઝ્યુઅલ પ્લે કરો <Play className="w-5 h-5 fill-white" />
              </button>
            </div>
          </motion.div>
        )}

        {/* 4. SOLAR SYSTEM ORBITS ARENA */}
        {activeLecture === 'solar' && (
          <motion.div
            key="solar-lecture"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto bg-white border-3 border-slate-900 p-6 rounded-[36px] shadow-lg text-center overflow-hidden select-none"
          >
            <h3 className="text-2xl font-black text-slate-800 mb-2">🪐 બ્રહ્માંડ કક્ષા ભ્રમણ (Solar System Visual)</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">સૂર્ય, પૃથ્વી અથવા ચંદ્ર પર ક્લિક કરીને તેના વિષે સુંદર માહિતી અને લેક્ચર સાંભળો!</p>

            {/* Orbit Space canvas */}
            <div className="w-full h-80 bg-slate-950 border-2 border-slate-900 rounded-3xl relative overflow-hidden flex items-center justify-center mb-6">
              
              {/* Stars particles background */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>

              {/* Orbit Line guides */}
              <div className="absolute w-56 h-56 rounded-full border border-slate-800 border-dashed animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute w-20 h-20 rounded-full border border-slate-850 border-dashed animate-spin right-1/4" style={{ animationDuration: '5s' }}></div>

              {/* 1. SUN (Center) */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => handleCelestialClick('sun')}
                className="absolute text-6xl filter drop-shadow-[0_0_15px_rgba(234,179,8,0.6)] cursor-pointer z-10"
              >
                ☀️
              </motion.button>

              {/* 2. EARTH (Orbits Sun) */}
              <motion.button
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute w-60 h-60 rounded-full flex items-center justify-end z-10 pointer-events-none"
              >
                <motion.span
                  whileHover={{ scale: 1.15 }}
                  onClick={(e) => { e.stopPropagation(); handleCelestialClick('earth'); }}
                  className="text-4xl pointer-events-auto cursor-pointer filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                >
                  🌍
                </motion.span>
              </motion.button>

              {/* 3. MOON (Orbits Earth) - Bounded or simulated alongside */}
              <div className="absolute top-10 right-12 text-3xl cursor-pointer hover:scale-110" onClick={() => handleCelestialClick('moon')}>
                🌙
              </div>
            </div>

            {/* Selected Info display panel */}
            <AnimatePresence mode="wait">
              {selectedCelestial ? (
                <motion.div
                  key={selectedCelestial.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-slate-50 border border-slate-350 p-5 rounded-2xl text-left"
                >
                  <h4 className="text-xl font-black text-slate-800 flex items-center gap-1.5">
                    <span className="text-2xl">{selectedCelestial.emoji}</span> {selectedCelestial.name}
                  </h4>
                  <p className="text-md font-bold text-slate-700 leading-normal mt-2">
                    {selectedCelestial.desc}
                  </p>
                  <p className="text-xs text-slate-400 font-bold leading-normal mt-2 italic font-mono">
                    English: {selectedCelestial.englishDesc}
                  </p>
                </motion.div>
              ) : (
                <div className="p-5 bg-slate-50 border border-slate-200 text-slate-400 font-bold rounded-2xl">
                  માહિતી મેળવવા સૂર્ય ☀️, પૃથ્વી 🌍 કે ચંદ્ર 🌙 પર ક્લિક કરો!
                </div>
              )}
            </AnimatePresence>

          </motion.div>
        )}

      </AnimatePresence>
      
    </div>
  );
};
