import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { avatars, parentTips, stories, habits } from '../data/mockData';
import { ParentNavbar } from '../components/ParentNavbar';
import { Shield, Users, Clock, BookOpen, Settings, BarChart2, Check, RefreshCw, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const ParentDashboard = () => {
  const {
    childProfiles,
    screenTimeLimit,
    setScreenTimeLimit,
    voiceSpeed,
    setVoiceSpeed,
    deleteChildProfile,
    createChildProfile,
    triggerAudio,
    speakText,
    parentUser
  } = useApp();

  // Active panel: 'progress' or 'profiles' or 'settings'
  const [activePanel, setActivePanel] = useState('progress');

  // Add child profile states inside dashboard
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(5);
  const [newChildAvatar, setNewChildAvatar] = useState(avatars[0].id);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleCreateChild = (e) => {
    e.preventDefault();
    if (!newChildName) return;
    createChildProfile(newChildName, newChildAge, newChildAvatar);
    setNewChildName('');
    setShowAddForm(false);
    triggerAudio('correct');
  };

  const handleDeleteChild = (id, name) => {
    if (window.confirm(`શું તમે ખરેખર ${name} ની પ્રોફાઇલ કાઢી નાખવા માંગો છો? (Are you sure you want to delete ${name}'s profile?)`)) {
      triggerAudio('wrong');
      deleteChildProfile(id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-fredoka flex flex-col select-none">
      <ParentNavbar />

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Sidebar controls */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm space-y-2">
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">મેનુ ઓપ્શન્સ (Dashboard Menu)</h4>
            
            <button
              onClick={() => { triggerAudio('click'); setActivePanel('progress'); }}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-left flex items-center gap-3 transition-all ${
                activePanel === 'progress' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BarChart2 className="w-5 h-5" /> પ્રગતિ અહેવાલ (Progress)
            </button>

            <button
              onClick={() => { triggerAudio('click'); setActivePanel('profiles'); }}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-left flex items-center gap-3 transition-all ${
                activePanel === 'profiles' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Users className="w-5 h-5" /> બાળ પ્રોફાઇલ મેનેજર (Profiles)
            </button>

            <button
              onClick={() => { triggerAudio('click'); setActivePanel('settings'); }}
              className={`w-full py-3 px-4 rounded-2xl font-bold text-left flex items-center gap-3 transition-all ${
                activePanel === 'settings' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-5 h-5" /> પેરેંટલ નિયંત્રણો (Settings)
            </button>
          </div>

          {/* User quick profile */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-white/5 shadow-sm text-center">
            <span className="text-4xl block mb-2">👤</span>
            <h4 className="font-extrabold text-lg">{parentUser?.name || 'માતા-પિતા'}</h4>
            <p className="text-xs text-slate-400 font-medium">{parentUser?.email}</p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-bold text-slate-400">
              PIN: {parentUser?.pin}
            </div>
          </div>
        </div>

        {/* Right Side: Main Panels */}
        <div className="lg:col-span-3">
          
          {/* PANEL 1: PROGRESS TRACKING */}
          {activePanel === 'progress' && (
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold text-slate-800">બાળકોની પ્રગતિ અને વિશ્લેષણ 📊</h3>
              <p className="text-slate-500 font-medium">બધા બાળકોના શિક્ષણ, રમત અને કમાણીનો ચાર્ટ અહીં જુઓ.</p>

              {childProfiles.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-[32px] p-12 text-center shadow-sm">
                  <span className="text-6xl block mb-4">🧸</span>
                  <p className="text-xl font-bold text-slate-650">વિશ્લેષણ માટે કોઈ બાળ પ્રોફાઇલ ઉપલબ્ધ નથી!</p>
                  <p className="text-slate-400 text-xs mt-1">બાળ પ્રોફાઇલ ઉમેરવા ડેશબોર્ડના 'પ્રોફાઇલ મેનેજર' નો ઉપયોગ કરો.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {childProfiles.map(child => {
                    const avatar = avatars.find(av => av.id === child.avatar) || avatars[0];
                    const storiesCount = child.completedStories?.length || 0;
                    const gamesCount = child.gamesPlayed || 0;
                    const quizzesCount = child.completedQuizzes?.length || 0;

                    // Calculate average score percentages
                    const accuracy = storiesCount > 0 ? Math.min(100, Math.round((quizzesCount / storiesCount) * 100)) : 0;

                    return (
                      <div key={child.id} className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-6">
                        
                        {/* Profile Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-full border border-slate-350 flex items-center justify-center text-3xl shadow-sm ${avatar.color}`}>
                              {avatar.icon}
                            </div>
                            <div>
                              <h4 className="text-2xl font-black text-slate-800">{child.name}</h4>
                              <p className="text-xs text-slate-400 font-bold">ઉંમર: {child.age} વર્ષ | લેવલ: {child.level}</p>
                            </div>
                          </div>
                          <div className="flex gap-4">
                            <div className="text-center bg-slate-50 py-1.5 px-4 rounded-2xl border border-slate-200">
                              <span className="text-xs font-bold text-slate-400 block">કુલ સ્ટાર્સ:</span>
                              <span className="text-xl font-black text-yellow-600">⭐ {child.stars}</span>
                            </div>
                            <div className="text-center bg-slate-50 py-1.5 px-4 rounded-2xl border border-slate-200">
                              <span className="text-xs font-bold text-slate-400 block">કુલ કોઈન્સ:</span>
                              <span className="text-xl font-black text-orange-600">🪙 {child.coins}</span>
                            </div>
                          </div>
                        </div>

                        {/* Custom SVGs Progress Chart row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Radial Progress SVG: Stories completed */}
                          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center">
                            <span className="text-xs font-black text-slate-450 uppercase mb-3">વાર્તાઓ પૂર્ણ (Stories Read)</span>
                            <div className="relative w-28 h-28 flex items-center justify-center">
                              {/* SVG Circle chart */}
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="56" cy="56" r="45" stroke="#E2E8F0" strokeWidth="8" fill="transparent" />
                                <circle cx="56" cy="56" r="45" stroke="#38BDF8" strokeWidth="8" fill="transparent" 
                                  strokeDasharray="283" 
                                  strokeDashoffset={283 - (283 * Math.min(10, storiesCount)) / 10} 
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="absolute text-2xl font-black text-slate-800">{storiesCount} / ૧૦</span>
                            </div>
                            <p className="text-xs text-slate-400 font-bold mt-3">૧૦ મુખ્ય વાર્તાઓમાંથી પ્રગતિ</p>
                          </div>

                          {/* SVG Bar Chart: Games Played vs Quizzes solved */}
                          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center flex flex-col justify-between">
                            <span className="text-xs font-black text-slate-450 uppercase mb-3 block">પ્રવૃત્તિ વિશ્લેષણ (Activity)</span>
                            
                            <div className="h-28 flex justify-center items-end gap-6 select-none px-4">
                              {/* Bar 1: Games */}
                              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                                <span className="text-xs font-black text-kids-purple-dark">{gamesCount}</span>
                                <div 
                                  className="w-8 bg-kids-purple rounded-t-lg transition-all duration-500 border border-kids-purple-dark"
                                  style={{ height: `${Math.min(100, (gamesCount * 10))}%` }}
                                ></div>
                                <span className="text-[10px] font-bold text-slate-400">ગેમ્સ રમી</span>
                              </div>
                              {/* Bar 2: Quizzes */}
                              <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                                <span className="text-xs font-black text-kids-orange-dark">{quizzesCount}</span>
                                <div 
                                  className="w-8 bg-kids-orange rounded-t-lg transition-all duration-500 border border-kids-orange-dark"
                                  style={{ height: `${Math.min(100, (quizzesCount * 10))}%` }}
                                ></div>
                                <span className="text-[10px] font-bold text-slate-400">ક્વિઝ</span>
                              </div>
                            </div>
                          </div>

                          {/* Badges checklist */}
                          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                            <span className="text-xs font-black text-slate-450 uppercase mb-3 block text-center">અચીવમેન્ટ મેડલ્સ (Badges)</span>
                            <div className="grid grid-cols-2 gap-2 text-center h-28 overflow-y-auto">
                              {child.badges?.includes('star_explorer') ? (
                                <div className="p-1.5 bg-yellow-50 border border-yellow-200 text-yellow-600 rounded-xl font-bold text-xs flex flex-col items-center">
                                  <span>🏅</span> તારા ખોજક
                                </div>
                              ) : (
                                <div className="p-1.5 bg-slate-100 text-slate-350 border border-slate-200 rounded-xl font-bold text-xs flex flex-col items-center opacity-60">
                                  <span>🔒</span> લૉક
                                </div>
                              )}
                              
                              {child.badges?.includes('star_champion') ? (
                                <div className="p-1.5 bg-yellow-50 border border-yellow-200 text-yellow-600 rounded-xl font-bold text-xs flex flex-col items-center">
                                  <span>👑</span> તારા સમ્રાટ
                                </div>
                              ) : (
                                <div className="p-1.5 bg-slate-100 text-slate-350 border border-slate-200 rounded-xl font-bold text-xs flex flex-col items-center opacity-60">
                                  <span>🔒</span> લૉક
                                </div>
                              )}

                              {child.badges?.includes('story_lover') ? (
                                <div className="p-1.5 bg-sky-50 border border-sky-200 text-sky-600 rounded-xl font-bold text-xs flex flex-col items-center">
                                  <span>📖</span> વાર્તા રસિક
                                </div>
                              ) : (
                                <div className="p-1.5 bg-slate-100 text-slate-350 border border-slate-200 rounded-xl font-bold text-xs flex flex-col items-center opacity-60">
                                  <span>🔒</span> લૉક
                                </div>
                              )}

                              {child.badges?.includes('game_master') ? (
                                <div className="p-1.5 bg-purple-50 border border-purple-200 text-purple-600 rounded-xl font-bold text-xs flex flex-col items-center">
                                  <span>🧠</span> ગેમ જીનિયસ
                                </div>
                              ) : (
                                <div className="p-1.5 bg-slate-100 text-slate-350 border border-slate-200 rounded-xl font-bold text-xs flex flex-col items-center opacity-60">
                                  <span>🔒</span> લૉક
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* PANEL 2: PROFILES MANAGER */}
          {activePanel === 'profiles' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-3xl font-extrabold text-slate-800">બાળ પ્રોફાઇલ મેનેજર 👥</h3>
                  <p className="text-slate-500 font-medium">બાળકોની પ્રોફાઇલ્સ એડિટ કરો, કાઢી નાખો અથવા નવી ઉમેરો.</p>
                </div>
                <button
                  onClick={() => { triggerAudio('click'); setShowAddForm(!showAddForm); }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm flex items-center gap-1 hover:bg-slate-850"
                >
                  <Plus className="w-4 h-4" /> નવી પ્રોફાઇલ ઉમેરો
                </button>
              </div>

              {/* Add form toggler */}
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-slate-200 rounded-[28px] p-6 shadow-sm"
                >
                  <h4 className="text-xl font-black text-slate-800 mb-4">ઉમેરો બાળક વિગત:</h4>
                  
                  <form onSubmit={handleCreateChild} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                      <label className="block text-slate-650 font-bold mb-1.5 text-sm">બાળકનું નામ (Child Name)</label>
                      <input 
                        type="text"
                        required
                        placeholder="ઉદા. મિન્કી શર્મા"
                        value={newChildName}
                        onChange={e => setNewChildName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-350 focus:outline-none focus:border-slate-850 text-sm bg-slate-50 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-650 font-bold mb-1.5 text-sm">ઉંમર (Age)</label>
                      <select
                        value={newChildAge}
                        onChange={e => setNewChildAge(parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-350 focus:outline-none focus:border-slate-850 text-sm bg-slate-50 font-bold"
                      >
                        {[3,4,5,6,7].map(a => <option key={a} value={a}>{a} વર્ષ</option>)}
                      </select>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-kids-green border border-kids-green text-white font-extrabold text-sm rounded-xl hover:translate-y-[-1px] transition-transform shadow-kids-green"
                      >
                        સેવ કરો
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Profiles list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {childProfiles.map(child => {
                  const avatar = avatars.find(av => av.id === child.avatar) || avatars[0];
                  return (
                    <div key={child.id} className="bg-white border border-slate-200 p-5 rounded-3xl shadow-sm flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-14 h-14 rounded-full border border-slate-300 flex items-center justify-center text-3xl ${avatar.color}`}>
                          {avatar.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-800">{child.name}</h4>
                          <span className="text-xs text-slate-400 font-bold">ઉંમર: {child.age} વર્ષ | લેવલ: {child.level}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteChild(child.id, child.name)}
                        className="p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors"
                        title="Delete Child Profile"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* PANEL 3: PARENT CONTROLS & SETTINGS */}
          {activePanel === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-3xl font-extrabold text-slate-800">પેરેંટલ નિયંત્રણો અને સેટીંગ્સ ⚙️</h3>
              <p className="text-slate-500 font-medium">તમારા બાળકના સ્ક્રીન સમય મર્યાદા અને અવાજ કસ્ટમાઇઝેશન કરો.</p>

              <div className="bg-white border border-slate-200 rounded-[32px] p-6 md:p-8 shadow-sm space-y-8">
                
                {/* Screen Time setting */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-kids-orange-dark" /> દૈનિક સ્ક્રીન ટાઈમ મર્યાદા (Screen Time Limit)
                    </label>
                    <span className="px-3 py-1 bg-kids-orange-light text-kids-orange-dark border border-kids-orange rounded-full font-black text-sm">
                      {screenTimeLimit} મિનિટ (Minutes)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">આ લિમિટ પૂરી થતા બાળકની સ્ક્રીન પર ઓટોમેટીક લોક લોગીન પેનલ ચાલુ થશે.</p>
                  
                  <input
                    type="range"
                    min={10}
                    max={120}
                    step={5}
                    value={screenTimeLimit}
                    onChange={e => setScreenTimeLimit(parseInt(e.target.value))}
                    className="w-full accent-kids-orange cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-400 font-mono">
                    <span>૧૦ મિનિટ</span>
                    <span>૩૦ મિનિટ</span>
                    <span>૬૦ મિનિટ</span>
                    <span>૧૨૦ મિનિટ</span>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Voice Speed Settings */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-lg font-black text-slate-800 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-kids-blue-dark" /> વાર્તા વાચક અવાજની ઝડપ (TTS Speed)
                    </label>
                    <span className="px-3 py-1 bg-kids-blue-light text-kids-blue-dark border border-kids-blue rounded-full font-black text-sm">
                      {voiceSpeed}x સ્પીડ
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">બાળકો સરળતાથી સમજી શકે તે માટે વાર્તા સ્પીચની ઝડપ સેટ કરો.</p>

                  <input
                    type="range"
                    min={0.5}
                    max={1.5}
                    step={0.1}
                    value={voiceSpeed}
                    onChange={e => setVoiceSpeed(parseFloat(e.target.value))}
                    className="w-full accent-kids-blue cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-bold text-slate-400 font-mono">
                    <span>૦.૫x (ધીમી)</span>
                    <span>૧.૦x (સામાન્ય)</span>
                    <span>૧.૫x (ઝડપી)</span>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Security and Safety tips */}
                <div className="p-4 bg-yellow-50 border border-yellow-250 rounded-2xl flex gap-3 text-yellow-800 select-text">
                  <span className="text-2xl">⚠️</span>
                  <div className="space-y-1">
                    <h5 className="font-extrabold text-sm">નવું સેટ કરવા માટેની સલાહ:</h5>
                    <p className="text-xs leading-relaxed font-medium">
                      અવાજ ટેસ્ટ કરવા માટે હોમ પેજ પર સિંહરાજ પર ક્લિક કરો. દૈનિક લિમિટ ચેન્જ કર્યા પછી બાળકના હોમ પેજ પર સમય મર્યાદા બદલાઈ જશે.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
