import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { avatars } from '../data/mockData';
import { Lock, Mail, User, PlusCircle, Check, ArrowRight, Play, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Auth = () => {
  const { 
    parentUser, 
    childProfiles, 
    registerParent, 
    loginParent, 
    createChildProfile, 
    setActiveChildId,
    triggerAudio 
  } = useApp();

  // Screen selection: 'parent-login' or 'parent-register' or 'child-select' or 'child-create'
  const [screen, setScreen] = useState(() => {
    return parentUser ? 'child-select' : 'parent-register';
  });

  // Parent form fields
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  // Child form fields
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState(5);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0].id);

  // Form submission
  const handleParentRegister = (e) => {
    e.preventDefault();
    if (!email || !name || !password || !pin) {
      setError('કૃપા કરીને બધી વિગતો ભરો! (Please fill all details)');
      triggerAudio('wrong');
      return;
    }
    if (pin.length !== 4 || isNaN(pin)) {
      setError('PIN બરાબર 4 અંકનો હોવો જોઈએ! (PIN must be 4 digits)');
      triggerAudio('wrong');
      return;
    }
    registerParent(email, name, password, pin);
    triggerAudio('levelUp');
    setError('');
    setScreen('child-create');
  };

  const handleParentLogin = (e) => {
    e.preventDefault();
    setError('');
    const success = loginParent(email, password);
    if (success) {
      triggerAudio('correct');
      setScreen('child-select');
    } else {
      setError('ખોટો ઇમેઇલ અથવા પાસવર્ડ! (Invalid email or password)');
      triggerAudio('wrong');
    }
  };

  const handleChildCreate = (e) => {
    e.preventDefault();
    if (!childName) {
      setError('બાળકનું નામ જરૂરી છે! (Child name is required)');
      triggerAudio('wrong');
      return;
    }
    createChildProfile(childName, childAge, selectedAvatar);
    setChildName('');
    setError('');
    setScreen('child-select');
  };

  const selectChild = (id) => {
    triggerAudio('click');
    setActiveChildId(id);
  };

  return (
    <div className="min-h-screen bg-kids-cream bubbly-bg py-12 px-4 flex flex-col justify-center items-center font-fredoka">
      
      {/* Title Header */}
      <motion.div 
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8 select-none"
      >
        <span className="text-5xl md:text-6xl block mb-2 filter drop-shadow-md">✨ ગુજરાતી Kids Growth ✨</span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-kids-orange-dark">ગુજરાતી કિડ્સ ગ્રોથ વર્લ્ડ</h1>
        <p className="text-slate-600 mt-2 font-medium">બાળકો માટે સંસ્કાર, ગમત અને શિક્ષણની દુનિયા!</p>
      </motion.div>

      {/* Main card box */}
      <motion.div 
        layout
        className="w-full max-w-2xl bg-white border-4 border-slate-900 rounded-[36px] shadow-kids-orange overflow-hidden p-6 md:p-10 relative z-10"
      >
        <AnimatePresence mode="wait">
          
          {/* PARENT REGISTER SCREEN */}
          {screen === 'parent-register' && (
            <motion.div
              key="register"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">માતા-પિતા નોંધણી (Parent Register)</h2>
              <p className="text-center text-slate-500 mb-4">સૌ પ્રથમ તમારા બાળકનું એકાઉન્ટ બનાવવા રજીસ્ટ્રેશન કરો</p>

              {/* Demo quick check */}
              <div className="mb-6 p-4 bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-2xl text-center select-none">
                <p className="text-xs font-bold text-yellow-800 mb-2">💡 બિનજરૂરી રજીસ્ટ્રેશન ટાળવા ડેમો એકાઉન્ટ વાપરો:</p>
                <button
                  type="button"
                  onClick={() => {
                    triggerAudio('click');
                    setError('');
                    setScreen('parent-login');
                    setTimeout(() => {
                      setEmail('demo@parent.com');
                      setPassword('demo123');
                    }, 50);
                  }}
                  className="px-4 py-2 bg-yellow-400 text-yellow-950 font-black rounded-xl text-xs hover:bg-yellow-350 active:scale-95 transition-all shadow-sm border border-yellow-600"
                >
                  ડેમો લોગિન ઓપન કરો (Quick Demo) 🌟
                </button>
              </div>

              {error && <div className="p-3 bg-red-100 border-2 border-red-400 rounded-2xl text-red-700 font-bold text-center mb-4">{error}</div>}

              <form onSubmit={handleParentRegister} className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-lg">માતા-પિતાનું નામ (Your Name)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="ઉદા. સતીશ પટેલ" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-400 focus:border-kids-orange focus:outline-none font-medium text-lg bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-lg">ઇમેઇલ એડ્રેસ (Email Address)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-slate-400" />
                    <input 
                      type="email" 
                      placeholder="example@mail.com" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-400 focus:border-kids-orange focus:outline-none font-medium text-lg bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-bold mb-2 text-lg">પાસવર્ડ (Password)</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 text-slate-400" />
                      <input 
                        type="password" 
                        placeholder="••••••" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-400 focus:border-kids-orange focus:outline-none font-medium text-lg bg-slate-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-2 text-lg">4-અંકનો પેરેન્ટ PIN (Parent Control PIN)</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-4 text-slate-400" />
                      <input 
                        type="text" 
                        maxLength={4}
                        placeholder="1234" 
                        value={pin}
                        onChange={e => setPin(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-400 focus:border-kids-orange focus:outline-none font-medium text-lg bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-full btn-kids-orange py-4 mt-6">
                  નોંધણી કરો અને આગળ વધો <ArrowRight className="w-6 h-6" />
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-slate-600 font-medium">
                  પહેલાથી નોંધણી કરેલી છે?{' '}
                  <button 
                    onClick={() => { triggerAudio('click'); setError(''); setScreen('parent-login'); }}
                    className="text-kids-orange-dark font-extrabold hover:underline"
                  >
                    અહીં લોગિન કરો (Parent Login)
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {/* PARENT LOGIN SCREEN */}
          {screen === 'parent-login' && (
            <motion.div
              key="login"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">માતા-પિતા પ્રવેશ (Parent Login)</h2>
              <p className="text-center text-slate-500 mb-4">પેરેન્ટ એકાઉન્ટમાં લોગિન કરવા લાયક માહિતી ભરો</p>

              {/* Demo Quick Fill Banner */}
              <div className="mb-6 p-4 bg-yellow-50 border-2 border-dashed border-yellow-400 rounded-2xl text-center select-none">
                <p className="text-xs font-bold text-yellow-800 mb-2">💡 ડેમો ટેસ્ટિંગ માટેની વિગતો (Demo Credentials):</p>
                <button
                  type="button"
                  onClick={() => {
                    triggerAudio('click');
                    setEmail('demo@parent.com');
                    setPassword('demo123');
                    setError('');
                  }}
                  className="px-4 py-2 bg-yellow-400 text-yellow-950 font-black rounded-xl text-xs hover:bg-yellow-350 active:scale-95 transition-all shadow-sm border border-yellow-600"
                >
                  અહીં ક્લિક કરો: ઓટો-ફિલ ડેમો એકાઉન્ટ 🌟
                </button>
              </div>

              {error && <div className="p-3 bg-red-100 border-2 border-red-400 rounded-2xl text-red-700 font-bold text-center mb-4">{error}</div>}

              <form onSubmit={handleParentLogin} className="space-y-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-lg">ઇમેઇલ એડ્રેસ (Email Address)</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-slate-400" />
                    <input 
                      type="email" 
                      placeholder="example@mail.com" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-400 focus:border-kids-orange focus:outline-none font-medium text-lg bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-2 text-lg">પાસવર્ડ (Password)</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 text-slate-400" />
                    <input 
                      type="password" 
                      placeholder="••••••" 
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-2xl border-2 border-slate-400 focus:border-kids-orange focus:outline-none font-medium text-lg bg-slate-50"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full btn-kids-orange py-4 mt-6">
                  પ્રવેશ કરો (Login) <Play className="w-6 h-6 fill-white" />
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-slate-600 font-medium">
                  નવું એકાઉન્ટ બનાવવું છે?{' '}
                  <button 
                    onClick={() => { triggerAudio('click'); setError(''); setScreen('parent-register'); }}
                    className="text-kids-orange-dark font-extrabold hover:underline"
                  >
                    અહીં રજીસ્ટ્રેશન કરો (Register)
                  </button>
                </p>
              </div>
            </motion.div>
          )}

          {/* CHILD SELECT SCREEN */}
          {screen === 'child-select' && (
            <motion.div
              key="select"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-extrabold text-slate-800">રમવા માટે કોણ તૈયાર છે?</h2>
                <button 
                  onClick={() => { triggerAudio('click'); setScreen('child-create'); }}
                  className="btn-kids-green px-4 py-2 text-sm rounded-2xl flex items-center gap-1 shadow-kids-green"
                >
                  <PlusCircle className="w-4 h-4" /> ઉમેરો
                </button>
              </div>

              {childProfiles.length === 0 ? (
                <div className="text-center py-12 bg-kids-yellow-light border-4 border-dashed border-kids-yellow rounded-3xl">
                  <span className="text-6xl block mb-4">🧸</span>
                  <p className="text-xl font-bold text-slate-600 mb-4">હજુ સુધી કોઈ બાળકની પ્રોફાઇલ બનેલી નથી!</p>
                  <button 
                    onClick={() => { triggerAudio('click'); setScreen('child-create'); }}
                    className="btn-kids-yellow py-3 px-8"
                  >
                    પ્રથમ પ્રોફાઇલ બનાવો <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {childProfiles.map((child) => {
                    const avatar = avatars.find(av => av.id === child.avatar) || avatars[0];
                    return (
                      <motion.div
                        key={child.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectChild(child.id)}
                        className="bg-white border-3 border-slate-900 rounded-3xl p-5 shadow-kids-orange hover:shadow-lg transition-all cursor-pointer flex items-center gap-4 relative overflow-hidden group"
                      >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-4xl border-2 border-slate-800 ${avatar.color}`}>
                          {avatar.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-slate-800">{child.name}</h3>
                          <span className="px-2 py-0.5 bg-slate-100 rounded-lg text-sm border border-slate-300 font-bold text-slate-500">
                            ઉંમર: {child.age} વર્ષ
                          </span>
                          <div className="flex gap-4 mt-2">
                            <span className="text-sm font-bold text-yellow-600">⭐ {child.stars} સ્ટાર્સ</span>
                            <span className="text-sm font-bold text-orange-600">🪙 {child.coins} કોઈન્સ</span>
                          </div>
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-kids-yellow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-4 h-4 text-slate-800 fill-slate-800 ml-0.5" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-200">
                <p className="text-slate-500 font-semibold">અન્ય સેટીંગ્સ માટે:</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { triggerAudio('click'); setScreen('parent-register'); }}
                    className="px-4 py-2 border-2 border-slate-800 rounded-2xl font-bold bg-slate-100 hover:bg-slate-200 shadow-kids flex items-center gap-1 text-sm"
                  >
                    એકાઉન્ટ બદલો (Switch Parent)
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* CHILD CREATE SCREEN */}
          {screen === 'child-create' && (
            <motion.div
              key="child-create"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-3xl font-extrabold text-slate-800 text-center mb-2">નવું બાળ પ્રોફાઇલ ઉમેરો 🌟</h2>
              <p className="text-center text-slate-500 mb-6">અલગ કલર અને કાર્ટૂન કેરેક્ટર સાથે સેટ કરો</p>

              {error && <div className="p-3 bg-red-100 border-2 border-red-400 rounded-2xl text-red-700 font-bold text-center mb-4">{error}</div>}

              <form onSubmit={handleChildCreate} className="space-y-6">
                <div>
                  <label className="block text-slate-700 font-black mb-2 text-lg">બાળકનું નામ (Child Name)</label>
                  <input 
                    type="text" 
                    placeholder="ઉદા. ચિન્ટુ પટેલ" 
                    value={childName}
                    onChange={e => setChildName(e.target.value)}
                    className="w-full px-5 py-3 rounded-2xl border-2 border-slate-800 focus:border-kids-orange focus:outline-none font-bold text-lg bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-black mb-2 text-lg">ઉંમર પસંદ કરો (Select Age)</label>
                  <div className="flex gap-4">
                    {[3, 4, 5, 6, 7].map(age => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => { triggerAudio('click'); setChildAge(age); }}
                        className={`w-12 h-12 rounded-full border-2 border-slate-800 font-black text-xl flex items-center justify-center transition-all ${
                          childAge === age ? 'bg-kids-orange text-white shadow-kids-orange -translate-y-1' : 'bg-white text-slate-700 shadow-kids'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                  <span className="block text-slate-400 text-sm mt-2">આ ઉંમરના આધારે રમતગમતના પ્રશ્નો કસ્ટમાઇઝ થશે</span>
                </div>

                <div>
                  <label className="block text-slate-700 font-black mb-3 text-lg">એક કાર્ટૂન પાત્ર પસંદ કરો (Select Avatar)</label>
                  <div className="grid grid-cols-5 gap-3">
                    {avatars.map(av => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => { triggerAudio('click'); setSelectedAvatar(av.id); }}
                        className={`aspect-square rounded-2xl border-2 border-slate-800 text-4xl flex items-center justify-center transition-all ${
                          selectedAvatar === av.id ? `${av.color} -translate-y-1 scale-105 shadow-md` : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        {av.icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-4">
                  <button 
                    type="button"
                    onClick={() => { triggerAudio('click'); setScreen(childProfiles.length > 0 ? 'child-select' : 'parent-register'); }}
                    className="px-6 py-3 border-2 border-slate-800 bg-slate-100 rounded-3xl font-extrabold text-lg text-slate-600 shadow-kids"
                  >
                    પાછા જાવ (Cancel)
                  </button>
                  <button type="submit" className="btn-kids-green py-3 shadow-kids-green">
                    રમત શરૂ કરો! <Check className="w-6 h-6" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>

      {/* Background clouds animations */}
      <div className="absolute top-10 left-10 text-slate-200/40 select-none animate-bounce-slow text-8xl">☁️</div>
      <div className="absolute bottom-10 right-10 text-slate-200/40 select-none animate-bounce-slow text-[100px]" style={{ animationDelay: '1s' }}>☁️</div>
      <div className="absolute top-1/2 right-12 text-slate-200/40 select-none animate-bounce-slow text-7xl" style={{ animationDelay: '1.5s' }}>☁️</div>
    </div>
  );
};
