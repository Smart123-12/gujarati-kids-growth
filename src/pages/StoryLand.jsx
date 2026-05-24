import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { stories, storyCategories } from '../data/mockData';
import { BookOpen, Volume2, Bookmark, CheckCircle, ArrowLeft, HelpCircle, Check, X, Award, Eye, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const StoryLand = () => {
  const { 
    activeChild, 
    addCompletedStory, 
    addCompletedQuiz, 
    triggerAudio, 
    speakText 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeStory, setActiveStory] = useState(null); // Active story object
  
  // Toggles for read helper
  const [showPhonetic, setShowPhonetic] = useState(false);
  const [showEnglish, setShowEnglish] = useState(true);
  
  // Active reading paragraph index for highlight
  const [speakingIndex, setSpeakingIndex] = useState(-1);

  // Quiz state
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Bookmarks state (persisted locally)
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem(`gkgw_bookmarks_${activeChild?.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const toggleBookmark = (e, storyId) => {
    e.stopPropagation();
    triggerAudio('click');
    let nextBookmarks;
    if (bookmarks.includes(storyId)) {
      nextBookmarks = bookmarks.filter(id => id !== storyId);
    } else {
      nextBookmarks = [...bookmarks, storyId];
    }
    setBookmarks(nextBookmarks);
    localStorage.setItem(`gkgw_bookmarks_${activeChild?.id}`, JSON.stringify(nextBookmarks));
  };

  const handleStartRead = (story) => {
    triggerAudio('click');
    setActiveStory(story);
    setSpeakingIndex(-1);
    setQuizMode(false);
    setQuizFinished(false);
    setCurrentQuestionIdx(0);
    setScore(0);
    
    // Announce story
    speakText(`વાર્તાનું નામ છે, ${story.title}`, 'gu-IN');
  };

  const handleSpeakParagraph = (text, idx, lang = 'gu-IN') => {
    triggerAudio('click');
    setSpeakingIndex(idx);
    speakText(text, lang);
  };

  const handleStopSpeech = () => {
    triggerAudio('click');
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingIndex(-1);
  };

  const handleStartQuiz = () => {
    triggerAudio('click');
    setQuizMode(true);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setScore(0);
    setQuizFinished(false);
    speakText('ચાલો પ્રશ્નોતરી રમીએ!', 'gu-IN');
  };

  const handleOptionSelect = (optIdx) => {
    if (selectedOptionIdx !== null) return; // already answered this question
    setSelectedOptionIdx(optIdx);
    
    const isCorrect = optIdx === activeStory.quiz[currentQuestionIdx].answer;
    if (isCorrect) {
      triggerAudio('correct');
      setScore(prev => prev + 1);
      speakText('ખૂબ સરસ! સાચો જવાબ.', 'gu-IN');
    } else {
      triggerAudio('wrong');
      speakText('અરેરે! ખોટો જવાબ.', 'gu-IN');
    }
  };

  const handleNextQuestion = () => {
    triggerAudio('click');
    setSelectedOptionIdx(null);
    
    const nextIdx = currentQuestionIdx + 1;
    if (nextIdx < activeStory.quiz.length) {
      setCurrentQuestionIdx(nextIdx);
    } else {
      // Quiz finished
      setQuizFinished(true);
      const finalScorePercent = Math.round((score / activeStory.quiz.length) * 100);
      
      // Save completions
      addCompletedStory(activeStory.id);
      addCompletedQuiz(activeStory.id, finalScorePercent);
      
      triggerAudio('levelUp');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      speakText(`અભિનંદન! તમે બધા પ્રશ્નોના ઉત્તર આપ્યા. તમારો સ્કોર છે ${score} માંથી ${activeStory.quiz.length}`, 'gu-IN');
    }
  };

  const handleBackToLibrary = () => {
    triggerAudio('click');
    handleStopSpeech();
    setActiveStory(null);
  };

  // Filter stories based on selected category
  const filteredStories = stories.filter(story => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'bookmarks') return bookmarks.includes(story.id);
    return story.category === selectedCategory;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-kids-cream font-fredoka py-8 px-4 md:px-8 relative">
      
      <AnimatePresence mode="wait">
        
        {/* STORY LIBRARY VIEW */}
        {!activeStory && (
          <motion.div
            key="library"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            {/* Page Header */}
            <div className="text-center mb-8">
              <span className="text-5xl block mb-2 select-none">📖</span>
              <h2 className="text-4xl font-extrabold text-slate-800">વાર્તાઓની અનોખી દુનિયા (Story Land)</h2>
              <p className="text-slate-500 font-bold mt-1">દરેક વાર્તા એક નવો સંસ્કાર અને બુદ્ધિ આપશે!</p>
            </div>

            {/* Category Selector Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => { triggerAudio('click'); setSelectedCategory('all'); }}
                className={`px-4 py-2.5 rounded-2xl border-2 border-slate-900 font-extrabold shadow-kids text-sm transition-all ${
                  selectedCategory === 'all' ? 'bg-kids-orange text-white shadow-kids-orange -translate-y-0.5' : 'bg-white hover:bg-slate-50'
                }`}
              >
                🌈 બધી વાર્તાઓ
              </button>
              
              <button
                onClick={() => { triggerAudio('click'); setSelectedCategory('bookmarks'); }}
                className={`px-4 py-2.5 rounded-2xl border-2 border-slate-900 font-extrabold shadow-kids text-sm transition-all ${
                  selectedCategory === 'bookmarks' ? 'bg-kids-pink text-white shadow-kids-pink -translate-y-0.5' : 'bg-white hover:bg-slate-50'
                }`}
              >
                💖 મનગમતી ({bookmarks.length})
              </button>

              {storyCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { triggerAudio('click'); setSelectedCategory(cat.id); }}
                  className={`px-4 py-2.5 rounded-2xl border-2 border-slate-900 font-extrabold shadow-kids text-sm transition-all ${
                    selectedCategory === cat.id ? `${cat.bg.replace('-light', '')} text-slate-800 -translate-y-0.5` : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            {/* Grid list of stories */}
            {filteredStories.length === 0 ? (
              <div className="text-center py-16 bg-white border-2 border-slate-900 rounded-[32px] shadow-kids max-w-xl mx-auto">
                <span className="text-6xl block mb-4 select-none">📭</span>
                <p className="text-xl font-bold text-slate-600">હાલમાં કોઈ વાર્તા મળી નથી!</p>
                <p className="text-slate-400 text-xs mt-1">અન્ય કેટેગરી પસંદ કરી જુઓ.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredStories.map(story => {
                  const isCompleted = activeChild?.completedStories?.includes(story.id);
                  const isBookmarked = bookmarks.includes(story.id);
                  const categoryInfo = storyCategories.find(c => c.id === story.category) || storyCategories[0];
                  
                  return (
                    <motion.div
                      key={story.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleStartRead(story)}
                      className="bg-white border-3 border-slate-900 rounded-[32px] p-6 shadow-kids-orange hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between h-[300px] relative select-none"
                    >
                      {/* Top ribbon */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="px-2.5 py-0.5 bg-slate-100 rounded-full font-bold text-xs border border-slate-300 text-slate-500">
                          {categoryInfo.name}
                        </span>
                        
                        {/* Bookmark Button */}
                        <button
                          onClick={(e) => toggleBookmark(e, story.id)}
                          className={`p-1.5 rounded-full border border-slate-300 hover:border-slate-800 transition-all ${
                            isBookmarked ? 'bg-kids-pink-light text-kids-pink-dark border-kids-pink-dark' : 'bg-slate-50 text-slate-400'
                          }`}
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>

                      {/* Content details */}
                      <div className="flex-1">
                        <div className="flex gap-3 items-start">
                          <span className="text-4xl bg-slate-50 p-2.5 rounded-2xl border border-slate-200">{story.thumbnail}</span>
                          <div>
                            <h3 className="text-2xl font-black text-slate-800 leading-tight">{story.title}</h3>
                            <h4 className="text-xs text-slate-400 font-bold mt-0.5 italic">{story.englishTitle}</h4>
                          </div>
                        </div>
                        <p className="text-slate-500 text-sm mt-3 line-clamp-3 leading-relaxed font-medium">
                          {story.shortDesc}
                        </p>
                      </div>

                      {/* Bottom Footer block */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-xs font-bold text-yellow-600">⭐ ૩૦ સ્ટાર્સ ઇનામ</span>
                        
                        {isCompleted ? (
                          <span className="text-xs bg-kids-green-light border border-kids-green text-green-700 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 fill-current" /> પૂર્ણ કરેલ
                          </span>
                        ) : (
                          <span className="text-xs text-kids-orange-dark font-black hover:underline flex items-center gap-0.5">
                            વાંચવા તૈયાર ➡️
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* STORY READER VIEW */}
        {activeStory && (
          <motion.div
            key="reader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-4xl mx-auto"
          >
            {/* Sub-view Header Panel */}
            <div className="bg-white border-2 border-slate-900 p-4 rounded-3xl shadow-kids mb-6 flex flex-wrap items-center justify-between gap-4 select-none">
              <button 
                onClick={handleBackToLibrary}
                className="px-4 py-2 border-2 border-slate-800 rounded-2xl bg-slate-100 hover:bg-slate-200 font-bold flex items-center gap-1 shadow-kids text-sm"
              >
                <ArrowLeft className="w-4 h-4" /> લાઈબ્રેરી પાછા
              </button>

              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-black text-slate-800">{activeStory.title}</h3>
                <h4 className="text-xs text-slate-400 font-bold italic">{activeStory.englishTitle}</h4>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => { triggerAudio('click'); setShowPhonetic(!showPhonetic); }}
                  className={`px-3 py-1.5 rounded-xl border border-slate-800 font-bold text-xs flex items-center gap-1 shadow-kids-active transition-all ${
                    showPhonetic ? 'bg-kids-blue text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" /> English સ્પેલિંગ {showPhonetic ? 'ચાલુ' : 'બંધ'}
                </button>

                <button
                  onClick={() => { triggerAudio('click'); setShowEnglish(!showEnglish); }}
                  className={`px-3 py-1.5 rounded-xl border border-slate-800 font-bold text-xs flex items-center gap-1 shadow-kids-active transition-all ${
                    showEnglish ? 'bg-kids-purple text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" /> ભાષાંતર {showEnglish ? 'ચાલુ' : 'બંધ'}
                </button>
              </div>
            </div>

            {/* MAIN STORY CONTENT */}
            {!quizMode ? (
              <div className="bg-white border-3 border-slate-900 rounded-[36px] p-6 md:p-10 shadow-lg relative">
                
                {/* Visual Thumbnail */}
                <div className="w-24 h-24 bg-kids-yellow-light border-2 border-slate-900 rounded-3xl text-6xl flex items-center justify-center mx-auto mb-8 shadow-md">
                  {activeStory.thumbnail}
                </div>

                {/* Paragraphs loop */}
                <div className="space-y-8 select-text">
                  {activeStory.paragraphs.map((para, idx) => {
                    const isSpeaking = speakingIndex === idx;
                    return (
                      <motion.div 
                        key={idx}
                        className={`p-4 rounded-2xl border-2 transition-all relative ${
                          isSpeaking ? 'bg-kids-yellow-light border-kids-yellow shadow-sm' : 'border-transparent hover:bg-slate-50/50'
                        }`}
                      >
                        {/* Speaker Button */}
                        <div className="absolute right-3 top-3 flex gap-2">
                          <button
                            onClick={() => handleSpeakParagraph(para.gujarati, idx, 'gu-IN')}
                            title="Gujarati Audio"
                            className={`p-2 rounded-xl border border-slate-350 shadow-sm transition-transform active:scale-95 ${
                              isSpeaking ? 'bg-kids-yellow text-slate-800 border-kids-yellow-dark' : 'bg-slate-50 hover:bg-slate-100 text-slate-500'
                            }`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Gujarati text */}
                        <p className="text-2xl md:text-3xl font-black text-slate-800 leading-normal pr-12 text-slate-900">
                          {para.gujarati}
                        </p>

                        {/* Phonetic spelling */}
                        {showPhonetic && (
                          <p className="text-base text-slate-500 font-bold mt-2 pr-12 italic font-mono leading-relaxed">
                            {para.phonetic}
                          </p>
                        )}

                        {/* English translation */}
                        {showEnglish && (
                          <p className="text-base md:text-lg text-slate-500 font-semibold mt-2 pr-12 leading-relaxed">
                            {para.english}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Stop Speech Helper Bar */}
                {speakingIndex !== -1 && (
                  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-bounce-slow">
                    <span className="text-xs font-bold">વાર્તા વાંચન ચાલુ છે...</span>
                    <button 
                      onClick={handleStopSpeech}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-full text-xs font-black transition-all"
                    >
                      અવાજ બંધ કરો ⏹️
                    </button>
                  </div>
                )}

                {/* Moral Section */}
                <div className="mt-12 p-6 bg-kids-pink-light border-2 border-kids-pink rounded-3xl shadow-kids-pink select-none">
                  <h4 className="text-2xl font-black text-kids-pink-dark flex items-center gap-1.5">
                    ✨ વાર્તા બોધ (Moral Lesson)
                  </h4>
                  <p className="text-lg md:text-xl font-bold text-slate-800 mt-2 leading-relaxed">
                    {activeStory.moral}
                  </p>
                  {showEnglish && (
                    <p className="text-sm md:text-base text-slate-500 font-semibold mt-2 leading-relaxed italic">
                      Moral: {activeStory.englishMoral}
                    </p>
                  )}
                </div>

                {/* Activity section */}
                <div className="mt-6 p-6 bg-kids-blue-light border-2 border-kids-blue rounded-3xl shadow-kids-blue select-none">
                  <h4 className="text-xl font-black text-kids-blue-dark flex items-center gap-1.5">
                    🎨 બાળકો માટે મજેદાર પ્રવૃત્તિ
                  </h4>
                  <p className="text-md font-semibold text-slate-700 mt-2 leading-relaxed">
                    {activeStory.activity}
                  </p>
                </div>

                {/* Next Stage trigger */}
                <div className="mt-10 text-center select-none">
                  <button 
                    onClick={handleStartQuiz}
                    className="btn-kids-orange px-10 py-4 text-xl shadow-kids-orange"
                  >
                    સ્ટાર્સ જીતવા માટે ક્વિઝ રમો! <HelpCircle className="w-6 h-6" />
                  </button>
                </div>

              </div>
            ) : (
              /* QUIZ VIEW */
              <div className="bg-white border-3 border-slate-900 rounded-[36px] p-6 md:p-10 shadow-lg select-none">
                
                <AnimatePresence mode="wait">
                  {!quizFinished ? (
                    <motion.div
                      key={currentQuestionIdx}
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Quiz Header Progress */}
                      <div className="flex justify-between items-center text-sm font-bold text-slate-400 border-b pb-3">
                        <span>પ્રશ્ન {currentQuestionIdx + 1} / {activeStory.quiz.length}</span>
                        <span className="text-kids-orange font-black">ક્વિઝ સમય 🌟</span>
                      </div>

                      {/* Question Text */}
                      <h3 className="text-2xl md:text-3xl font-black text-slate-800 text-center leading-normal py-4">
                        {activeStory.quiz[currentQuestionIdx].question}
                      </h3>

                      {/* Options Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {activeStory.quiz[currentQuestionIdx].options.map((opt, oIdx) => {
                          const isAnswered = selectedOptionIdx !== null;
                          const isCorrectOption = oIdx === activeStory.quiz[currentQuestionIdx].answer;
                          const isSelected = selectedOptionIdx === oIdx;
                          
                          let cardStyle = 'bg-slate-50 border-2 border-slate-350 hover:bg-slate-100 hover:border-slate-800';
                          let icon = null;

                          if (isAnswered) {
                            if (isCorrectOption) {
                              cardStyle = 'bg-kids-green-light border-2 border-kids-green text-green-800';
                              icon = <Check className="w-5 h-5 text-green-700" />;
                            } else if (isSelected) {
                              cardStyle = 'bg-red-100 border-2 border-red-400 text-red-700';
                              icon = <X className="w-5 h-5 text-red-600" />;
                            } else {
                              cardStyle = 'bg-slate-50 border-2 border-slate-200 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={oIdx}
                              disabled={isAnswered}
                              onClick={() => handleOptionSelect(oIdx)}
                              className={`p-4 rounded-2xl text-left font-black text-lg md:text-xl flex items-center justify-between transition-all ${cardStyle}`}
                            >
                              <span>{opt}</span>
                              {icon}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next button */}
                      {selectedOptionIdx !== null && (
                        <div className="text-right pt-6">
                          <button
                            onClick={handleNextQuestion}
                            className="btn-kids-orange shadow-kids-orange px-8"
                          >
                            આગળનો પ્રશ્ન ➡️
                          </button>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    /* QUIZ RESULT PANEL */
                    <motion.div
                      key="result"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-8 space-y-6"
                    >
                      <span className="text-8xl block animate-bounce-slow">🏆</span>
                      <h3 className="text-4xl font-black text-slate-800">અદ્ભુત રમત, દોસ્ત!</h3>
                      
                      <div className="bg-slate-50 border-2 border-slate-900 max-w-sm mx-auto py-6 px-4 rounded-3xl shadow-kids-active">
                        <p className="text-slate-500 font-bold">તમારો ક્વિઝ સ્કોર:</p>
                        <p className="text-5xl font-black text-kids-orange-dark mt-2">
                          {score} / {activeStory.quiz.length} સાચા
                        </p>
                        <div className="flex justify-center gap-6 mt-4 border-t pt-4">
                          <div>
                            <span className="text-slate-400 text-xs font-bold block">મેળવેલા સ્ટાર્સ:</span>
                            <span className="text-lg font-black text-yellow-600">⭐ {score * 15}</span>
                          </div>
                          <div className="h-8 w-0.5 bg-slate-350"></div>
                          <div>
                            <span className="text-slate-400 text-xs font-bold block">મેળવેલા કોઈન્સ:</span>
                            <span className="text-lg font-black text-orange-600">🪙 {score * 5}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-500 font-bold max-w-md mx-auto text-sm">
                        સાચા જવાબો સાથે તમે તમારી કમાણીમાં મોટો વધારો કર્યો છે! કક્કો અથવા અન્ય વાર્તાઓ શીખતા રહો!
                      </p>

                      <div className="pt-4 flex justify-center gap-4">
                        <button
                          onClick={() => { triggerAudio('click'); setQuizMode(false); }}
                          className="px-6 py-3 border-2 border-slate-800 bg-slate-100 rounded-3xl font-extrabold shadow-kids"
                        >
                          ફરીથી વાર્તા વાંચો
                        </button>
                        <button
                          onClick={handleBackToLibrary}
                          className="btn-kids-orange px-8 shadow-kids-orange"
                        >
                          લાઈબ્રેરી પર પાછા 📖
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};
