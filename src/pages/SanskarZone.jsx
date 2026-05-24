import React from 'react';
import { useApp } from '../context/AppContext';
import { habits, parentTips } from '../data/mockData';
import { ArrowLeft, Volume2, Award, Heart, CheckSquare, Square, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const SanskarZone = () => {
  const { 
    activeChild, 
    toggleHabitCheck, 
    triggerAudio, 
    speakText, 
    soundEnabled 
  } = useApp();
  
  const navigate = useNavigate();

  // Get today's date formatted as YYYY-MM-DD
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Get active child checked habits for today
  const checkedHabitList = activeChild?.checkedHabits?.[dateStr] || [];

  const handleBackToHome = () => {
    triggerAudio('click');
    navigate('/');
  };

  const handleHabitSpeak = (habit) => {
    triggerAudio('click');
    speakText(`${habit.title}. ${habit.desc}`, 'gu-IN');
  };

  const handleHabitCheckClick = (habitId) => {
    toggleHabitCheck(habitId, dateStr);
  };

  if (!activeChild) return null;

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
          <span className="text-5xl block mb-1">✨</span>
          <h2 className="text-4xl font-extrabold text-slate-800">સંસ્કાર વાટિકા (Sanskar Zone)</h2>
          <p className="text-slate-500 font-bold">રોજના સદ્ગુણો શીખીએ, ડાયરી ભરીએ અને સારા બાળકો બનીએ!</p>
        </div>

        <div className="bg-kids-pink px-4 py-2 border-2 border-slate-900 rounded-2xl text-xs font-black shadow-kids-pink flex items-center gap-1 text-white">
          <Heart className="w-4 h-4 fill-white" /> દરેક સાચી ટેવ પર +૧૦ કોઈન્સ!
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Columns: Habits card deck & Checklist */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Habits Cards grid */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              📜 આજના સદ્ગુણો (Good Habits Card Deck)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {habits.map((habit) => {
                const isChecked = checkedHabitList.includes(habit.id);
                return (
                  <motion.div
                    key={habit.id}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-kids flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-4xl p-2 bg-slate-50 border rounded-2xl">{habit.icon}</span>
                        
                        <button
                          onClick={() => handleHabitSpeak(habit)}
                          className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-350 rounded-xl transition-all shadow-sm"
                        >
                          <Volume2 className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>

                      <h4 className="text-xl font-black text-slate-800 leading-snug">{habit.title}</h4>
                      <h5 className="text-xs font-bold text-slate-450 italic mt-0.5">{habit.englishTitle}</h5>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2.5">
                        {habit.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                      <span className="text-xs text-orange-600 font-black">🪙 ઇનામ: ૧૦ કોઈન્સ</span>
                      
                      <button
                        onClick={() => handleHabitCheckClick(habit.id)}
                        className={`px-3 py-1.5 rounded-xl border-2 border-slate-900 font-black text-xs shadow-kids-active flex items-center gap-1 transition-all ${
                          isChecked ? 'bg-kids-green text-white shadow-kids-green' : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        {isChecked ? 'મેં આજે કર્યું! ✓' : 'મેં આજે કર્યું?'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Daily Checklist Progress and Parents Tips corner */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Daily Checklist Tracker */}
          <div className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-pink">
            <h3 className="text-2xl font-black text-slate-800 text-center mb-2">📋 આજની સદ્ગુણ ડાયરી</h3>
            <p className="text-xs text-slate-400 font-bold text-center mb-6">તારીખ: {dateStr}</p>
            
            <div className="space-y-4">
              {habits.map((habit) => {
                const isChecked = checkedHabitList.includes(habit.id);
                return (
                  <div
                    key={habit.id}
                    onClick={() => handleHabitCheckClick(habit.id)}
                    className={`p-3 rounded-2xl border-2 border-slate-900 cursor-pointer flex items-center justify-between transition-all ${
                      isChecked ? 'bg-kids-green-light border-kids-green shadow-kids-active' : 'bg-slate-50 border-slate-800 shadow-kids hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{habit.icon}</span>
                      <span className="font-extrabold text-sm text-slate-850">{habit.title}</span>
                    </div>

                    <button className="text-slate-800">
                      {isChecked ? (
                        <CheckSquare className="w-6 h-6 stroke-[3] text-green-700" />
                      ) : (
                        <Square className="w-6 h-6 stroke-[3]" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 text-center">
              <span className="text-xs font-bold text-slate-400">કુલ આજની કમાણી:</span>
              <p className="text-3xl font-black text-orange-600 mt-1">🪙 {checkedHabitList.length * 10} કોઈન્સ</p>
            </div>
          </div>

          {/* Parents Guidelines / Tips */}
          <div className="bg-slate-900 border-2 border-white/10 rounded-[32px] p-6 shadow-lg text-white">
            <h3 className="text-xl font-extrabold flex items-center gap-1 text-kids-purple-light">
              💡 વાલી માર્ગદર્શિકા (Parent Tips)
            </h3>
            <p className="text-slate-400 text-xs mt-1 mb-4">માતા-પિતા બાળકોના વિકાસ માટે:</p>

            <ul className="space-y-3">
              {parentTips.map((tip, index) => (
                <li key={index} className="flex gap-2.5 items-start text-sm text-slate-300 font-medium">
                  <span className="text-kids-purple-light text-md">✨</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
