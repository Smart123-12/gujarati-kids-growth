import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, RefreshCw, Award, Timer, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const GamePark = () => {
  const { triggerAudio, speakText, incrementGamesPlayed, activeChild } = useApp();
  const navigate = useNavigate();

  // Active Screen: 'hub' or 'memory' or 'counting' or 'shapes' or 'colors'
  const [activeGame, setActiveGame] = useState('hub');

  const handleBackToHome = () => {
    triggerAudio('click');
    navigate('/');
  };

  // --- GAME 1: MEMORY CARDS STATE ---
  const memoryItems = [
    { icon: '🦁', matchId: 'lion' },
    { icon: '🦁', matchId: 'lion' },
    { icon: '🐒', matchId: 'monkey' },
    { icon: '🐒', matchId: 'monkey' },
    { icon: '🦚', matchId: 'peacock' },
    { icon: '🦚', matchId: 'peacock' },
    { icon: '🐘', matchId: 'elephant' },
    { icon: '🐘', matchId: 'elephant' },
    { icon: '🐰', matchId: 'rabbit' },
    { icon: '🐰', matchId: 'rabbit' },
    { icon: '🐢', matchId: 'turtle' },
    { icon: '🐢', matchId: 'turtle' },
  ];

  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryTimer, setMemoryTimer] = useState(0);
  const [memoryRunning, setMemoryRunning] = useState(false);
  const [memoryFinished, setMemoryFinished] = useState(false);

  useEffect(() => {
    let interval = null;
    if (memoryRunning && !memoryFinished) {
      interval = setInterval(() => {
        setMemoryTimer(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [memoryRunning, memoryFinished]);

  const initMemoryGame = () => {
    triggerAudio('click');
    // Shuffle cards
    const shuffled = [...memoryItems]
      .map((item, idx) => ({ ...item, id: idx }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedIds([]);
    setMemoryMoves(0);
    setMemoryTimer(0);
    setMemoryRunning(true);
    setMemoryFinished(false);
    speakText('પ્રાણીઓની જોડી મેળવો!', 'gu-IN');
  };

  const handleCardClick = (idx) => {
    if (!memoryRunning || memoryFinished) return;
    if (flippedIndices.length === 2) return;
    if (flippedIndices.includes(idx) || matchedIds.includes(cards[idx].matchId)) return;

    triggerAudio('click');
    const newFlipped = [...flippedIndices, idx];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(m => m + 1);
      const first = cards[newFlipped[0]];
      const second = cards[newFlipped[1]];

      if (first.matchId === second.matchId) {
        // Matched!
        triggerAudio('correct');
        setMatchedIds(prev => {
          const next = [...prev, first.matchId];
          if (next.length === memoryItems.length / 2) {
            setMemoryFinished(true);
            incrementGamesPlayed();
            confetti({ particleCount: 60 });
            speakText('ખૂબ સરસ! રમત પૂર્ણ થઈ ગઈ!', 'gu-IN');
          }
          return next;
        });
        setFlippedIndices([]);
      } else {
        // Not matched
        setTimeout(() => {
          triggerAudio('wrong');
          setFlippedIndices([]);
        }, 1000);
      }
    }
  };

  // --- GAME 2: FRUIT COUNTING STATE ---
  const countingFruits = ['🍎', '🍌', '🥭', '🍇', '🍉', '🍓'];
  const numbersData = [
    { value: 1, gujNum: '૧', name: 'એક' },
    { value: 2, gujNum: '૨', name: 'બે' },
    { value: 3, gujNum: '૩', name: 'ત્રણ' },
    { value: 4, gujNum: '૪', name: 'ચાર' },
    { value: 5, gujNum: '૫', name: 'પાંચ' },
    { value: 6, gujNum: '૬', name: 'છ' },
    { value: 7, gujNum: '૭', name: 'સાત' },
    { value: 8, gujNum: '૮', name: 'આઠ' },
    { value: 9, gujNum: '૯', name: 'નવ' },
    { value: 10, gujNum: '૧૦', name: 'દસ' },
  ];

  const [countingTarget, setCountingTarget] = useState(3);
  const [countingEmoji, setCountingEmoji] = useState('🍎');
  const [countingOptions, setCountingOptions] = useState([]);
  const [countingAnswered, setCountingAnswered] = useState(false);
  const [countingSuccess, setCountingSuccess] = useState(false);
  const [countingScore, setCountingScore] = useState(0);
  const [countingRound, setCountingRound] = useState(1);
  const [countingFinished, setCountingFinished] = useState(false);

  const initCountingGame = () => {
    triggerAudio('click');
    setCountingScore(0);
    setCountingRound(1);
    setCountingFinished(false);
    generateCountingRound();
    speakText('ફળો ગણો અને સાચો નંબર કહો!', 'gu-IN');
  };

  const generateCountingRound = () => {
    const randomCount = Math.floor(Math.random() * 8) + 2; // 2 to 9
    const randomEmoji = countingFruits[Math.floor(Math.random() * countingFruits.length)];
    setCountingTarget(randomCount);
    setCountingEmoji(randomEmoji);

    // Generate options
    const correctOption = numbersData.find(n => n.value === randomCount);
    const options = [correctOption];
    
    while (options.length < 3) {
      const distractorVal = Math.floor(Math.random() * 9) + 1; // 1 to 9
      if (!options.find(o => o.value === distractorVal)) {
        options.push(numbersData.find(n => n.value === distractorVal));
      }
    }

    setCountingOptions(options.sort(() => Math.random() - 0.5));
    setCountingAnswered(false);
    setCountingSuccess(false);
  };

  const handleCountingSelect = (optionValue) => {
    if (countingAnswered) return;
    setCountingAnswered(true);

    if (optionValue === countingTarget) {
      triggerAudio('correct');
      setCountingScore(s => s + 1);
      setCountingSuccess(true);
      speakText('વાહ! સાચો જવાબ!', 'gu-IN');
    } else {
      triggerAudio('wrong');
      setCountingSuccess(false);
      speakText('ઓહ! ખોટો જવાબ.', 'gu-IN');
    }
  };

  const handleCountingNext = () => {
    triggerAudio('click');
    if (countingRound < 5) {
      setCountingRound(r => r + 1);
      generateCountingRound();
    } else {
      setCountingFinished(true);
      incrementGamesPlayed();
      confetti({ particleCount: 50 });
      speakText(`અભિનંદન! તમે પાંચ માંથી ${countingScore} સાચા જવાબ આપ્યા!`, 'gu-IN');
    }
  };

  // --- GAME 3: SHAPE MATCHER STATE ---
  const shapesDataset = [
    { name: 'ગોળ', english: 'Circle', shapeIcon: '🔵' },
    { name: 'ચોરસ', english: 'Square', shapeIcon: '🟦' },
    { name: 'ત્રિકોણ', english: 'Triangle', shapeIcon: '🔺' },
    { name: 'તારો', english: 'Star', shapeIcon: '⭐' }
  ];

  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedShapeText, setSelectedShapeText] = useState(null);
  const [shapeMatches, setShapeMatches] = useState({});
  const [shapeScore, setShapeScore] = useState(0);
  const [shapeFinished, setShapeFinished] = useState(false);

  const initShapesGame = () => {
    triggerAudio('click');
    setShapeMatches({});
    setShapeScore(0);
    setShapeFinished(false);
    setSelectedShape(null);
    setSelectedShapeText(null);
    speakText('આકારને તેના સાચા નામ સાથે જોડો!', 'gu-IN');
  };

  const handleShapeSelect = (shape) => {
    triggerAudio('click');
    if (shapeMatches[shape.name]) return; // already matched
    setSelectedShape(shape);
    if (selectedShapeText) {
      checkShapeMatch(shape, selectedShapeText);
    }
  };

  const handleShapeTextSelect = (shapeTextName) => {
    triggerAudio('click');
    if (Object.values(shapeMatches).includes(shapeTextName)) return; // already matched
    setSelectedShapeText(shapeTextName);
    if (selectedShape) {
      checkShapeMatch(selectedShape, shapeTextName);
    }
  };

  const checkShapeMatch = (shape, shapeTextName) => {
    if (shape.name === shapeTextName) {
      // Correct!
      triggerAudio('correct');
      const nextMatches = { ...shapeMatches, [shape.name]: shapeTextName };
      setShapeMatches(nextMatches);
      setShapeScore(s => s + 1);
      setSelectedShape(null);
      setSelectedShapeText(null);
      speakText(shape.name, 'gu-IN');

      if (Object.keys(nextMatches).length === shapesDataset.length) {
        setShapeFinished(true);
        incrementGamesPlayed();
        confetti({ particleCount: 50 });
      }
    } else {
      // Incorrect
      triggerAudio('wrong');
      setSelectedShape(null);
      setSelectedShapeText(null);
      speakText('ફરીથી પ્રયત્ન કરો!', 'gu-IN');
    }
  };

  // --- GAME 4: BALLOON BURST (COLOR MATCH) STATE ---
  const balloonsDataset = [
    { color: 'લાલ', english: 'Red', hexClass: 'bg-red-500 shadow-red-700 shadow-lg' },
    { color: 'લીલો', english: 'Green', hexClass: 'bg-green-500 shadow-green-700 shadow-lg' },
    { color: 'વાદળી', english: 'Blue', hexClass: 'bg-blue-500 shadow-blue-700 shadow-lg' },
    { color: 'પીળો', english: 'Yellow', hexClass: 'bg-yellow-400 shadow-yellow-600 shadow-lg text-slate-800' }
  ];

  const [balloonTarget, setBalloonTarget] = useState(null);
  const [balloons, setBalloons] = useState([]);
  const [balloonScore, setBalloonScore] = useState(0);
  const [balloonCount, setBalloonCount] = useState(1);
  const [balloonFinished, setBalloonFinished] = useState(false);

  const initBalloonsGame = () => {
    triggerAudio('click');
    setBalloonScore(0);
    setBalloonCount(1);
    setBalloonFinished(false);
    generateBalloonRound();
  };

  const generateBalloonRound = () => {
    const randomTarget = balloonsDataset[Math.floor(Math.random() * balloonsDataset.length)];
    setBalloonTarget(randomTarget);
    setBalloons([...balloonsDataset].sort(() => Math.random() - 0.5));
    speakText(`${randomTarget.color} કલરનો ફુગ્ગો ફોડો!`, 'gu-IN');
  };

  const handleBalloonClick = (balloon) => {
    if (balloonFinished) return;
    
    if (balloon.color === balloonTarget.color) {
      // Burst correct!
      triggerAudio('correct');
      setBalloonScore(s => s + 1);
      speakText('સરસ! ફુગ્ગો ફૂટ્યો!', 'gu-IN');
    } else {
      triggerAudio('wrong');
      speakText('અરેરે! ખોટો ફુગ્ગો.', 'gu-IN');
    }

    if (balloonCount < 5) {
      setBalloonCount(c => c + 1);
      generateBalloonRound();
    } else {
      setBalloonFinished(true);
      incrementGamesPlayed();
      confetti({ particleCount: 50 });
      speakText(`રમત પૂર્ણ! તમે પાંચ માંથી ${balloonScore} ફુગ્ગા બરાબર ફોડ્યા!`, 'gu-IN');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-kids-cream font-fredoka py-8 px-4 md:px-8 relative select-none">
      
      {/* Page Navigation header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        {activeGame !== 'hub' ? (
          <button 
            onClick={() => { triggerAudio('click'); setActiveGame('hub'); }}
            className="px-5 py-2.5 border-2 border-slate-800 bg-slate-100 hover:bg-slate-200 font-bold flex items-center gap-1 shadow-kids text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> રમતોની યાદી
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
          <span className="text-5xl block mb-1">🧠</span>
          <h2 className="text-4xl font-extrabold text-slate-800">મગજનો વિકાસ બાગ (Brain Game Park)</h2>
          <p className="text-slate-500 font-bold">બુદ્ધિશાળી ગેમ્સ રમીને સ્કોર કરો અને અચીવમેન્ટ બેજ મેળવો!</p>
        </div>

        <div className="bg-kids-yellow px-4 py-2 border-2 border-slate-900 rounded-2xl text-xs font-black shadow-kids-yellow flex items-center gap-1 text-slate-800">
          <Award className="w-4 h-4" /> દરેક રમત પર +૧૫ સ્ટાર્સ!
        </div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* GAME SELECTION HUB */}
        {activeGame === 'hub' && (
          <motion.div
            key="hub"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto pt-6"
          >
            {/* Game 1 Memory match */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={initMemoryGame}
              className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-yellow hover:shadow-lg transition-all cursor-pointer flex gap-4 items-center"
            >
              <span className="text-6xl p-4 bg-kids-yellow-light border-2 border-slate-900 rounded-3xl">🐱</span>
              <div>
                <h3 className="text-2xl font-black text-slate-800">યાદશક્તિ રમત (Memory Match)</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Difficulty: મધ્યમ (Medium)</p>
                <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                  પ્રાણીઓના જોડી કાર્ડ શોધો અને ટાઈમ પૂરો થતા પહેલા રમત જીતો!
                </p>
              </div>
            </motion.div>

            {/* Game 2 Fruit count */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={initCountingGame}
              className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-blue hover:shadow-lg transition-all cursor-pointer flex gap-4 items-center"
            >
              <span className="text-6xl p-4 bg-kids-blue-light border-2 border-slate-900 rounded-3xl">🍒</span>
              <div>
                <h3 className="text-2xl font-black text-slate-800">ફળો ગણો (Counting Game)</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Difficulty: સરળ (Easy)</p>
                <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                  પડદા પરના ફળો ગણો અને તેનો સાચો નંબર શોધીને સ્ટાર્સ મેળવો!
                </p>
              </div>
            </motion.div>

            {/* Game 3 Shapes match */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={initShapesGame}
              className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-orange hover:shadow-lg transition-all cursor-pointer flex gap-4 items-center"
            >
              <span className="text-6xl p-4 bg-kids-orange-light border-2 border-slate-900 rounded-3xl">⭐</span>
              <div>
                <h3 className="text-2xl font-black text-slate-800">આકાર જોડકાં (Shape Matching)</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Difficulty: સરળ (Easy)</p>
                <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                  વિવિધ આકારોને ઓળખો અને તેના સાચા નામો સાથે મેળ કરો!
                </p>
              </div>
            </motion.div>

            {/* Game 4 Balloons burst */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              onClick={initBalloonsGame}
              className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-pink hover:shadow-lg transition-all cursor-pointer flex gap-4 items-center"
            >
              <span className="text-6xl p-4 bg-kids-pink-light border-2 border-slate-900 rounded-3xl">🎈</span>
              <div>
                <h3 className="text-2xl font-black text-slate-800">ફુગ્ગા ફોડો (Color Balloon Burst)</h3>
                <p className="text-xs text-slate-400 font-bold mt-1">Difficulty: સરળ (Easy)</p>
                <p className="text-slate-500 text-sm font-medium mt-2 leading-relaxed">
                  પૂછેલા કલરનો ફુગ્ગો ટાર્ગેટ કરી ફોડો અને ગમ્મત મેળવો!
                </p>
              </div>
            </motion.div>

          </motion.div>
        )}

        {/* 1. MEMORY MATCH CARDS ARENA */}
        {activeGame === 'memory' && (
          <motion.div
            key="memory-game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white border-3 border-slate-900 p-6 rounded-[36px] shadow-lg text-center"
          >
            {/* Header info */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
              <span className="font-extrabold text-slate-600 flex items-center gap-1">
                <Activity className="w-4 h-4 text-kids-orange" /> ચાલ: {memoryMoves}
              </span>
              <span className="font-extrabold text-slate-600 flex items-center gap-1">
                <Timer className="w-4 h-4 text-kids-blue" /> સમય: {memoryTimer} સેકન્ડ
              </span>
            </div>

            {!memoryFinished ? (
              <div className="grid grid-cols-4 gap-3">
                {cards.map((card, index) => {
                  const isFlipped = flippedIndices.includes(index) || matchedIds.includes(card.matchId);
                  return (
                    <motion.div
                      key={card.id}
                      whileHover={{ scale: isFlipped ? 1 : 1.05 }}
                      onClick={() => handleCardClick(index)}
                      className={`aspect-square rounded-2xl border-2 border-slate-900 text-4xl flex items-center justify-center cursor-pointer transition-all ${
                        isFlipped ? 'bg-kids-yellow-light rotate-0' : 'bg-slate-800 text-transparent border-slate-900 shadow-kids'
                      }`}
                    >
                      <span className={isFlipped ? 'block' : 'invisible'}>{card.icon}</span>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 space-y-6">
                <span className="text-8xl block animate-bounce-slow">🎉</span>
                <h3 className="text-3xl font-black text-slate-800">બહુ સરસ, બધી જોડી મળી ગઈ!</h3>
                <div className="p-4 bg-slate-50 border border-slate-350 rounded-2xl max-w-xs mx-auto">
                  <p className="font-bold text-slate-500">રમત આંકડા:</p>
                  <p className="text-xl font-black text-slate-800 mt-1">બનેલા મુવ્સ: {memoryMoves}</p>
                  <p className="text-xl font-black text-slate-800">સમય: {memoryTimer} સેકન્ડ</p>
                  <p className="text-lg font-black text-yellow-600 mt-2">⭐ +૧૫ સ્ટાર્સ જીત્યા!</p>
                </div>
                <button
                  onClick={initMemoryGame}
                  className="btn-kids-yellow shadow-kids-yellow"
                >
                  ફરી રમો <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* 2. FRUIT COUNTING GAME ARENA */}
        {activeGame === 'counting' && (
          <motion.div
            key="counting-game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white border-3 border-slate-900 p-6 rounded-[36px] shadow-lg text-center"
          >
            {/* Progress stats */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
              <span className="font-bold text-slate-400">રાઉન્ડ: {countingRound} / ૫</span>
              <span className="font-black text-kids-blue">ફળ ગણતરી રમત</span>
              <span className="font-bold text-green-600">સાચા: {countingScore}</span>
            </div>

            {!countingFinished ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-black text-slate-800">પડદા પરના ફળો ગણો:</h3>
                
                {/* Visual fruits box */}
                <div className="bg-slate-50 border-2 border-slate-950 p-6 rounded-3xl min-h-[140px] flex items-center justify-center flex-wrap gap-2 text-5xl select-none">
                  {Array.from({ length: countingTarget }).map((_, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {countingEmoji}
                    </motion.span>
                  ))}
                </div>

                {/* Option Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  {countingOptions.map((opt) => {
                    const isAnswered = countingAnswered;
                    const isCorrectOpt = opt.value === countingTarget;
                    
                    let btnClass = 'bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 shadow-kids';
                    if (isAnswered) {
                      if (isCorrectOpt) {
                        btnClass = 'bg-kids-green text-white border-2 border-slate-900 shadow-kids-green';
                      } else {
                        btnClass = 'bg-slate-100 border-slate-300 text-slate-300 opacity-60 shadow-none';
                      }
                    }

                    return (
                      <button
                        key={opt.value}
                        disabled={isAnswered}
                        onClick={() => handleCountingSelect(opt.value)}
                        className={`py-4 rounded-2xl font-black text-3xl transition-all ${btnClass}`}
                      >
                        {opt.gujNum}
                        <span className="block text-xs font-black mt-1 font-fredoka">{opt.name}</span>
                      </button>
                    );
                  })}
                </div>

                {countingAnswered && (
                  <div className="pt-4 text-center">
                    <button
                      onClick={handleCountingNext}
                      className="btn-kids-blue shadow-kids-blue px-10 py-3 text-lg"
                    >
                      {countingRound < 5 ? 'આગળનો રાઉન્ડ' : 'પરિણામ જુઓ'} ➡️
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 space-y-6">
                <span className="text-8xl block animate-bounce-slow">✨</span>
                <h3 className="text-3xl font-black text-slate-800">અદ્ભુત સ્કોર!</h3>
                <div className="p-4 bg-slate-50 border border-slate-350 rounded-2xl max-w-xs mx-auto">
                  <p className="font-bold text-slate-500">ગણતરી રિપોર્ટ:</p>
                  <p className="text-3xl font-black text-kids-blue mt-2">{countingScore} / ૫ સાચા</p>
                  <p className="text-lg font-black text-yellow-600 mt-2">⭐ +૧૫ સ્ટાર્સ કમાયા!</p>
                </div>
                <button
                  onClick={initCountingGame}
                  className="btn-kids-blue shadow-kids-blue"
                >
                  ફરીથી રમો <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* 3. SHAPE MATCHER GAME ARENA */}
        {activeGame === 'shapes' && (
          <motion.div
            key="shapes-game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white border-3 border-slate-900 p-6 rounded-[36px] shadow-lg text-center"
          >
            <div className="pb-4 border-b border-slate-200 mb-6">
              <span className="font-black text-kids-orange text-lg">આકાર અને નામનું જોડકું</span>
            </div>

            {!shapeFinished ? (
              <div className="space-y-6">
                <p className="text-slate-550 font-bold mb-4">ડાબી બાજુનો એક આકાર પસંદ કરી, જમણી બાજુ તેના સાચા નામ પર ક્લિક કરો!</p>
                
                <div className="grid grid-cols-2 gap-8 items-start">
                  
                  {/* Left Column: Shape Icons */}
                  <div className="space-y-3">
                    <span className="block text-xs font-black text-slate-400">૧. આકાર પસંદ કરો:</span>
                    {shapesDataset.map((item) => {
                      const isMatched = shapeMatches[item.name];
                      const isSelected = selectedShape?.name === item.name;
                      
                      let cardClass = 'bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 shadow-kids cursor-pointer';
                      if (isMatched) cardClass = 'bg-kids-green-light border-kids-green text-green-700 opacity-60 cursor-default';
                      else if (isSelected) cardClass = 'bg-kids-orange-light border-kids-orange shadow-kids-orange scale-105';

                      return (
                        <div
                          key={item.name}
                          onClick={() => handleShapeSelect(item)}
                          className={`p-4 rounded-2xl flex items-center justify-center text-5xl transition-all ${cardClass}`}
                        >
                          {item.shapeIcon}
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Shape Names */}
                  <div className="space-y-3">
                    <span className="block text-xs font-black text-slate-400">૨. નામ પસંદ કરો:</span>
                    {shapesDataset.map((item) => {
                      const isMatched = Object.values(shapeMatches).includes(item.name);
                      const isSelected = selectedShapeText === item.name;
                      
                      let cardClass = 'bg-slate-50 hover:bg-slate-100 border-2 border-slate-900 shadow-kids cursor-pointer';
                      if (isMatched) cardClass = 'bg-kids-green border-white text-white opacity-60 cursor-default';
                      else if (isSelected) cardClass = 'bg-kids-orange text-white border-2 border-slate-900 shadow-kids-orange scale-105';

                      return (
                        <div
                          key={item.name}
                          onClick={() => handleShapeTextSelect(item.name)}
                          className={`p-4.5 rounded-2xl font-black text-2xl transition-all ${cardClass}`}
                        >
                          {item.name}
                          <span className="block text-xs font-semibold font-fredoka">{item.english}</span>
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>
            ) : (
              <div className="py-8 space-y-6">
                <span className="text-8xl block animate-bounce-slow">🎨</span>
                <h3 className="text-3xl font-black text-slate-800">અદ્ભુત ચતુરાઈ!</h3>
                <p className="text-slate-550 font-bold max-w-xs mx-auto">તમે બધા આકારો બરાબર મેળવી લીધા છે!</p>
                <div className="p-4 bg-slate-50 border border-slate-350 rounded-2xl max-w-xs mx-auto">
                  <p className="text-lg font-black text-yellow-600">⭐ +૧૫ સ્ટાર્સ કમાયા!</p>
                </div>
                <button
                  onClick={initShapesGame}
                  className="btn-kids-orange shadow-kids-orange"
                >
                  ફરીથી રમો <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* 4. BALLOON BURST GAME ARENA */}
        {activeGame === 'colors' && (
          <motion.div
            key="balloons-game"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white border-3 border-slate-900 p-6 rounded-[36px] shadow-lg text-center overflow-hidden"
          >
            {/* Status header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-6">
              <span className="font-bold text-slate-400">બચી ગયેલા બલૂન: {balloonCount} / ૫</span>
              <span className="font-black text-kids-pink text-lg">કલર બલૂન બર્સ્ટ</span>
              <span className="font-bold text-green-600">સ્કોર: {balloonScore}</span>
            </div>

            {!balloonFinished ? (
              <div className="space-y-8 relative">
                <div className="p-4 bg-kids-yellow-light border border-kids-yellow rounded-2xl">
                  <span className="block text-xs font-bold text-slate-400 mb-1">આ કલરનો ફુગ્ગો ફોડો (Target):</span>
                  <h3 className="text-4xl font-black text-slate-800 tracking-wide">
                    "{balloonTarget?.color}"
                  </h3>
                  <span className="block text-xs font-bold text-slate-500 mt-1">({balloonTarget?.english})</span>
                </div>

                {/* Bouncing Balloons Row */}
                <div className="flex justify-center gap-4 py-8 items-end min-h-[180px] select-none">
                  {balloons.map((balloon, idx) => (
                    <motion.div
                      key={balloon.color + idx}
                      whileHover={{ scale: 1.1, y: -10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleBalloonClick(balloon)}
                      className={`w-20 h-24 rounded-full border-2 border-slate-900 cursor-pointer flex flex-col justify-center items-center text-xs text-white font-black select-none ${balloon.hexClass} relative animate-float`}
                      style={{ animationDelay: `${idx * 0.2}s` }}
                    >
                      <span>🎈</span>
                      {/* balloon tail knot */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border border-slate-900"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 space-y-6">
                <span className="text-8xl block animate-bounce-slow">🎈💥</span>
                <h3 className="text-3xl font-black text-slate-800">અદ્ભુત ફુગ્ગા બ્લાસ્ટ!</h3>
                <div className="p-4 bg-slate-50 border border-slate-350 rounded-2xl max-w-xs mx-auto">
                  <p className="font-bold text-slate-500">બલૂન સ્કોર:</p>
                  <p className="text-3xl font-black text-kids-pink mt-2">{balloonScore} / ૫ સાચા</p>
                  <p className="text-lg font-black text-yellow-600 mt-2">⭐ +૧૫ સ્ટાર્સ કમાયા!</p>
                </div>
                <button
                  onClick={initBalloonsGame}
                  className="btn-kids-pink shadow-kids-pink"
                >
                  ફરીથી રમો <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
      
    </div>
  );
};
