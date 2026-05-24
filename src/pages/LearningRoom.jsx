import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { alphabets, numbers, fruits, animals } from '../data/mockData';
import { ArrowLeft, BookOpen, Volume2, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const LearningRoom = () => {
  const { triggerAudio, speakText, updateChildRewards, activeChild } = useApp();
  const navigate = useNavigate();

  // Active tab: 'alphabets' or 'numbers' or 'fruits' or 'animals'
  const [activeTab, setActiveTab] = useState('alphabets');
  const [selectedItem, setSelectedItem] = useState(null); // Active clicked flashcard

  const handleBackToHome = () => {
    triggerAudio('click');
    navigate('/');
  };

  const handleCardClick = (item, type) => {
    triggerAudio('click');
    setSelectedItem(item);

    let speechText = '';
    if (type === 'alphabet') {
      speechText = `${item.letter}, ${item.word}`;
      // Every card click gives child 1 star as interactive reward (up to some point)
      updateChildRewards(activeChild?.id, 1, 0);
    } else if (type === 'number') {
      speechText = `${item.num}, ${item.gujaratiName}`;
      updateChildRewards(activeChild?.id, 1, 0);
    } else if (type === 'fruit' || type === 'animal') {
      speechText = item.name;
      updateChildRewards(activeChild?.id, 1, 0);
    }
    
    speakText(speechText, 'gu-IN');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-kids-cream font-fredoka py-8 px-4 md:px-8 relative select-none">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <button 
          onClick={handleBackToHome}
          className="px-5 py-2.5 border-2 border-slate-800 bg-slate-100 hover:bg-slate-200 font-bold flex items-center gap-1 shadow-kids text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> હોમ સ્ક્રીન
        </button>

        <div className="text-center flex-1">
          <span className="text-5xl block mb-1">✏️</span>
          <h2 className="text-4xl font-extrabold text-slate-800">ગુજરાતી શિક્ષણ શાળા (Learning Room)</h2>
          <p className="text-slate-500 font-bold">અહીં આપણે કક્કો, અંક, અને આપણી આસપાસના શબ્દો શીખીશું!</p>
        </div>

        <div className="bg-kids-yellow-light border border-kids-yellow px-4 py-2 rounded-2xl text-xs font-bold text-yellow-800 shadow-kids-active">
          કાર્ડ પર ક્લિક કરી અવાજ સાંભળો! 🔊
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => { triggerAudio('click'); setActiveTab('alphabets'); setSelectedItem(null); }}
          className={`px-5 py-3 rounded-2xl border-2 border-slate-900 font-black shadow-kids text-sm transition-all ${
            activeTab === 'alphabets' ? 'bg-kids-yellow text-slate-800 shadow-kids-yellow -translate-y-0.5' : 'bg-white hover:bg-slate-50'
          }`}
        >
          🔤 કક્કો (Alphabets)
        </button>

        <button
          onClick={() => { triggerAudio('click'); setActiveTab('numbers'); setSelectedItem(null); }}
          className={`px-5 py-3 rounded-2xl border-2 border-slate-900 font-black shadow-kids text-sm transition-all ${
            activeTab === 'numbers' ? 'bg-kids-blue text-white shadow-kids-blue -translate-y-0.5' : 'bg-white hover:bg-slate-50'
          }`}
        >
          🔢 અંક ૧ થી ૧૦ (Numbers)
        </button>

        <button
          onClick={() => { triggerAudio('click'); setActiveTab('fruits'); setSelectedItem(null); }}
          className={`px-5 py-3 rounded-2xl border-2 border-slate-900 font-black shadow-kids text-sm transition-all ${
            activeTab === 'fruits' ? 'bg-kids-orange text-white shadow-kids-orange -translate-y-0.5' : 'bg-white hover:bg-slate-50'
          }`}
        >
          🍎 ફળો (Fruits)
        </button>

        <button
          onClick={() => { triggerAudio('click'); setActiveTab('animals'); setSelectedItem(null); }}
          className={`px-5 py-3 rounded-2xl border-2 border-slate-900 font-black shadow-kids text-sm transition-all ${
            activeTab === 'animals' ? 'bg-kids-pink text-white shadow-kids-pink -translate-y-0.5' : 'bg-white hover:bg-slate-50'
          }`}
        >
          🦁 પ્રાણીઓ (Animals)
        </button>
      </div>

      {/* Main Learning Arena Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Grid list of cards */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            
            {/* ALPHABETS LIST */}
            {activeTab === 'alphabets' && (
              <motion.div 
                key="alphabets"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
              >
                {alphabets.map(item => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(item, 'alphabet')}
                    className={`bg-white border-2 border-slate-900 p-4 rounded-2xl text-center shadow-kids hover:shadow-md cursor-pointer transition-all ${
                      selectedItem?.id === item.id ? 'bg-kids-yellow-light border-kids-yellow shadow-kids-yellow' : ''
                    }`}
                  >
                    <span className="text-4xl md:text-5xl font-black block text-slate-800">{item.letter}</span>
                    <span className="text-xs text-slate-400 font-bold block mt-1">{item.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* NUMBERS LIST */}
            {activeTab === 'numbers' && (
              <motion.div 
                key="numbers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
              >
                {numbers.map(item => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(item, 'number')}
                    className={`bg-white border-2 border-slate-900 p-4 rounded-2xl text-center shadow-kids hover:shadow-md cursor-pointer transition-all ${
                      selectedItem?.id === item.id ? 'bg-kids-blue-light border-kids-blue shadow-kids-blue' : ''
                    }`}
                  >
                    <span className="text-4xl md:text-5xl font-black block text-slate-800">{item.num}</span>
                    <span className="text-xs text-slate-450 font-bold block mt-1">{item.gujaratiName} ({item.englishNum})</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* FRUITS LIST */}
            {activeTab === 'fruits' && (
              <motion.div 
                key="fruits"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {fruits.map(item => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(item, 'fruit')}
                    className={`bg-white border-2 border-slate-900 p-5 rounded-3xl text-center shadow-kids hover:shadow-md cursor-pointer transition-all ${
                      selectedItem?.id === item.id ? 'bg-kids-orange-light border-kids-orange shadow-kids-orange' : ''
                    }`}
                  >
                    <span className="text-5xl block select-none">{item.emoji}</span>
                    <span className="text-xl font-black block text-slate-800 mt-2">{item.name}</span>
                    <span className="text-xs text-slate-400 font-bold block mt-0.5">{item.english} ({item.phonetic})</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ANIMALS LIST */}
            {activeTab === 'animals' && (
              <motion.div 
                key="animals"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
              >
                {animals.map(item => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCardClick(item, 'animal')}
                    className={`bg-white border-2 border-slate-900 p-5 rounded-3xl text-center shadow-kids hover:shadow-md cursor-pointer transition-all ${
                      selectedItem?.id === item.id ? 'bg-kids-pink-light border-kids-pink shadow-kids-pink' : ''
                    }`}
                  >
                    <span className="text-5xl block select-none">{item.emoji}</span>
                    <span className="text-xl font-black block text-slate-800 mt-2">{item.name}</span>
                    <span className="text-xs text-slate-400 font-bold block mt-0.5">{item.english} ({item.phonetic})</span>
                  </motion.div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Right Column: High-fidelity Detailed Flashcard Reader */}
        <div className="lg:col-span-1">
          <div className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-orange text-center sticky top-28 min-h-[380px] flex flex-col justify-center items-center">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full space-y-4"
              >
                {/* Emojis or big letters */}
                <div className="w-32 h-32 bg-slate-50 border-2 border-slate-950 rounded-[28px] mx-auto flex items-center justify-center text-7xl shadow-md select-none relative group">
                  {activeTab === 'alphabets' && selectedItem.emoji}
                  {activeTab === 'alphabets' && <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full border border-slate-800 bg-kids-yellow flex items-center justify-center text-xs font-bold shadow-sm">{selectedItem.letter}</span>}
                  
                  {activeTab === 'numbers' && <span className="text-7xl font-black text-slate-850">{selectedItem.num}</span>}
                  {activeTab === 'fruits' && selectedItem.emoji}
                  {activeTab === 'animals' && selectedItem.emoji}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-3xl font-black text-slate-800">
                      {activeTab === 'alphabets' && selectedItem.word}
                      {activeTab === 'numbers' && selectedItem.gujaratiName}
                      {activeTab === 'fruits' && selectedItem.name}
                      {activeTab === 'animals' && selectedItem.name}
                    </h3>
                    
                    <button
                      onClick={() => speakText(
                        activeTab === 'alphabets' ? `${selectedItem.letter}, ${selectedItem.word}` :
                        activeTab === 'numbers' ? `${selectedItem.num}, ${selectedItem.gujaratiName}` : selectedItem.name,
                        'gu-IN'
                      )}
                      className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-350 rounded-xl transition-all shadow-sm"
                    >
                      <Volume2 className="w-4 h-4 text-slate-650" />
                    </button>
                  </div>
                  
                  <p className="text-sm font-bold text-slate-400">
                    {activeTab === 'alphabets' && `Spelling: ${selectedItem.wordEnglish} (${selectedItem.name})`}
                    {activeTab === 'numbers' && `English: ${selectedItem.englishName} (${selectedItem.englishNum})`}
                    {activeTab === 'fruits' && `English: ${selectedItem.english} (Phonetic: ${selectedItem.phonetic})`}
                    {activeTab === 'animals' && `English: ${selectedItem.english} (Phonetic: ${selectedItem.phonetic})`}
                  </p>
                </div>

                {/* Specific features per tab inside card */}
                {activeTab === 'numbers' && (
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-300">
                    <span className="block text-xs font-black text-slate-400 mb-1">ગણતરી કરો (Count):</span>
                    <p className="text-2xl tracking-wider select-none leading-relaxed">
                      {selectedItem.emoji}
                    </p>
                  </div>
                )}

                {activeTab === 'alphabets' && (
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-300">
                    <span className="block text-xs font-black text-slate-400 mb-1">ઉચ્ચારણ સહાયક:</span>
                    <p className="text-xl font-bold text-slate-800">
                      "{selectedItem.letter}" થી "{selectedItem.word}"
                    </p>
                    <span className="block text-xs text-slate-400 mt-1 font-mono">{selectedItem.soundText}</span>
                  </div>
                )}

                <p className="text-xs text-slate-400 font-bold">બહુ સરસ! વધુ એક નવો શબ્દ શીખ્યા! ✨</p>
              </motion.div>
            ) : (
              <div className="text-slate-400 select-none py-12">
                <BookOpen className="w-16 h-16 mx-auto mb-4 stroke-slate-300" />
                <h3 className="text-lg font-bold text-slate-500">કોઈ પણ કાર્ડ પસંદ કરો</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
                  ડાબી બાજુ આપેલા કાર્ડ પર ક્લિક કરી તેનું ઉચ્ચારણ અને વિગતો અહીં જુઓ.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
