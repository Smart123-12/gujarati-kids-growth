import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // --- Parent Authentication State ---
  const [parentUser, setParentUser] = useState(() => {
    const saved = localStorage.getItem('gkgw_parent');
    return saved ? JSON.parse(saved) : null;
  });

  // --- Child Profiles ---
  const [childProfiles, setChildProfiles] = useState(() => {
    const saved = localStorage.getItem('gkgw_profiles');
    return saved ? JSON.parse(saved) : [];
  });

  // --- Active Selected Child ID ---
  const [activeChildId, setActiveChildId] = useState(() => {
    return localStorage.getItem('gkgw_active_child_id') || null;
  });

  // --- Active Child Data ---
  const [activeChild, setActiveChild] = useState(null);

  // --- Sound & Audio Control ---
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('gkgw_sound');
    return saved !== 'false';
  });

  const [voiceSpeed, setVoiceSpeed] = useState(() => {
    const saved = localStorage.getItem('gkgw_voice_speed');
    return saved ? parseFloat(saved) : 0.9;
  });

  // --- Screen Time Settings & Limits ---
  const [screenTimeLimit, setScreenTimeLimit] = useState(() => {
    const saved = localStorage.getItem('gkgw_screen_limit');
    return saved ? parseInt(saved) : 30; // in minutes
  });

  const [timeSpentToday, setTimeSpentToday] = useState(0); // in seconds
  const [isLockedByScreenTime, setIsLockedByScreenTime] = useState(false);

  // Sync parent profile to localStorage
  useEffect(() => {
    if (parentUser) {
      localStorage.setItem('gkgw_parent', JSON.stringify(parentUser));
    } else {
      localStorage.removeItem('gkgw_parent');
    }
  }, [parentUser]);

  // Sync child profiles to localStorage
  useEffect(() => {
    localStorage.setItem('gkgw_profiles', JSON.stringify(childProfiles));
  }, [childProfiles]);

  // Sync active child details when changing child profiles
  useEffect(() => {
    if (activeChildId) {
      localStorage.setItem('gkgw_active_child_id', activeChildId);
      const child = childProfiles.find(c => c.id === activeChildId);
      setActiveChild(child || null);
    } else {
      localStorage.removeItem('gkgw_active_child_id');
      setActiveChild(null);
    }
  }, [activeChildId, childProfiles]);

  // Screen time tracking interval
  useEffect(() => {
    let interval = null;
    if (activeChild && !isLockedByScreenTime) {
      interval = setInterval(() => {
        setTimeSpentToday(prev => {
          const nextVal = prev + 1;
          const limitSeconds = screenTimeLimit * 60;
          if (nextVal >= limitSeconds) {
            setIsLockedByScreenTime(true);
            triggerAudio('alert');
          }
          return nextVal;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeChild, screenTimeLimit, isLockedByScreenTime]);

  // --- Audio Utility ---
  const triggerAudio = (type) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } else if (type === 'correct') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'levelUp') {
        // Grand fanfare
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const tOsc = ctx.createOscillator();
          const tGain = ctx.createGain();
          tOsc.connect(tGain);
          tGain.connect(ctx.destination);
          tOsc.type = 'sine';
          tOsc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          tGain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
          tGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + idx * 0.08 + 0.3);
          tOsc.start(ctx.currentTime + idx * 0.08);
          tOsc.stop(ctx.currentTime + idx * 0.08 + 0.3);
        });
      } else if (type === 'alert') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.setValueAtTime(220, ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(330, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      console.warn("AudioContext failed:", e);
    }
  };

  // --- Text-to-Speech in Gujarati / English ---
  const speakText = (text, lang = 'gu-IN') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // cancel current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = voiceSpeed;
      
      // Match voice locale
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(voice => voice.lang.startsWith(lang));
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      } else {
        // Fallback search
        const defaultVoice = voices.find(voice => voice.lang.startsWith('hi-IN') || voice.lang.startsWith('en-IN'));
        if (defaultVoice) utterance.voice = defaultVoice;
      }
      
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech Synthesis not supported by this browser.");
    }
  };

  // --- App Action Modifiers ---

  const registerParent = (email, name, password, pin) => {
    const parent = { email, name, password, pin: pin || '1234' };
    setParentUser(parent);
    return parent;
  };

  const loginParent = (email, password) => {
    if (parentUser && parentUser.email === email && parentUser.password === password) {
      return true;
    }
    return false;
  };

  const createChildProfile = (name, age, avatarId) => {
    const newProfile = {
      id: `child_${Date.now()}`,
      name,
      age: parseInt(age),
      avatar: avatarId,
      stars: 0,
      coins: 0,
      level: 1,
      streak: 1,
      completedStories: [],
      completedQuizzes: [],
      gamesPlayed: 0,
      checkedHabits: {}, // { '2026-05-24': ['h1', 'h2'] }
      badges: [] // list of badges awarded
    };
    setChildProfiles(prev => [...prev, newProfile]);
    setActiveChildId(newProfile.id);
    triggerAudio('levelUp');
  };

  const deleteChildProfile = (profileId) => {
    setChildProfiles(prev => prev.filter(c => c.id !== profileId));
    if (activeChildId === profileId) {
      setActiveChildId(null);
    }
  };

  const updateChildRewards = (profileId, starsEarned, coinsEarned, actionType = '') => {
    setChildProfiles(prev => prev.map(child => {
      if (child.id !== profileId) return child;
      
      const newStars = child.stars + starsEarned;
      const newCoins = child.coins + coinsEarned;
      
      // Calculate level up: Every 100 stars = +1 level
      const calculatedLevel = Math.max(child.level, Math.floor(newStars / 100) + 1);
      const isLevelUp = calculatedLevel > child.level;
      
      if (isLevelUp) {
        setTimeout(() => triggerAudio('levelUp'), 100);
      }

      // Check badges based on accomplishments
      const updatedBadges = [...(child.badges || [])];
      
      if (newStars >= 50 && !updatedBadges.includes('star_explorer')) {
        updatedBadges.push('star_explorer'); // Awarded for 50 stars
      }
      if (newStars >= 200 && !updatedBadges.includes('star_champion')) {
        updatedBadges.push('star_champion');
      }
      if (actionType === 'story' && !updatedBadges.includes('story_lover')) {
        updatedBadges.push('story_lover');
      }
      if (actionType === 'quiz' && !updatedBadges.includes('quiz_wizard')) {
        updatedBadges.push('quiz_wizard');
      }
      if (actionType === 'game' && !updatedBadges.includes('game_master')) {
        updatedBadges.push('game_master');
      }

      return {
        ...child,
        stars: newStars,
        coins: newCoins,
        level: calculatedLevel,
        badges: updatedBadges
      };
    }));
  };

  const addCompletedStory = (storyId) => {
    if (!activeChildId) return;
    const child = childProfiles.find(c => c.id === activeChildId);
    if (!child) return;

    if (!child.completedStories.includes(storyId)) {
      setChildProfiles(prev => prev.map(c => {
        if (c.id === activeChildId) {
          return {
            ...c,
            completedStories: [...c.completedStories, storyId]
          };
        }
        return c;
      }));
      updateChildRewards(activeChildId, 30, 10, 'story'); // Reading a story gives 30 stars, 10 coins
      triggerAudio('correct');
    }
  };

  const addCompletedQuiz = (storyId, scorePercent) => {
    if (!activeChildId) return;
    const child = childProfiles.find(c => c.id === activeChildId);
    if (!child) return;

    if (!child.completedQuizzes.includes(storyId)) {
      setChildProfiles(prev => prev.map(c => {
        if (c.id === activeChildId) {
          return {
            ...c,
            completedQuizzes: [...c.completedQuizzes, storyId]
          };
        }
        return c;
      }));
      
      // Dynamic rewards based on quiz performance
      const bonusStars = Math.round(scorePercent * 0.5); // Up to 50 stars
      const bonusCoins = Math.round(scorePercent * 0.2); // Up to 20 coins
      
      updateChildRewards(activeChildId, bonusStars, bonusCoins, 'quiz');
      triggerAudio('correct');
    }
  };

  const incrementGamesPlayed = () => {
    if (!activeChildId) return;
    setChildProfiles(prev => prev.map(c => {
      if (c.id === activeChildId) {
        return {
          ...c,
          gamesPlayed: c.gamesPlayed + 1
        };
      }
      return c;
    }));
    updateChildRewards(activeChildId, 15, 5, 'game'); // Each game awards 15 stars, 5 coins
  };

  const toggleHabitCheck = (habitId, dateStr) => {
    if (!activeChildId) return;
    
    setChildProfiles(prev => prev.map(c => {
      if (c.id !== activeChildId) return c;
      
      const currentChecked = { ...(c.checkedHabits || {}) };
      const dayChecked = currentChecked[dateStr] || [];
      
      let updatedDayChecked;
      let coinDelta = 0;
      
      if (dayChecked.includes(habitId)) {
        updatedDayChecked = dayChecked.filter(id => id !== habitId);
        coinDelta = -10; // lose habit reward
      } else {
        updatedDayChecked = [...dayChecked, habitId];
        coinDelta = 10; // earn habit reward
        triggerAudio('correct');
      }
      
      currentChecked[dateStr] = updatedDayChecked;

      return {
        ...c,
        checkedHabits: currentChecked,
        coins: Math.max(0, c.coins + coinDelta)
      };
    }));
  };

  const resetScreenLimitLock = () => {
    setTimeSpentToday(0);
    setIsLockedByScreenTime(false);
  };

  const logoutParent = () => {
    setParentUser(null);
    setActiveChildId(null);
    setChildProfiles([]);
    localStorage.clear();
  };

  return (
    <AppContext.Provider value={{
      parentUser,
      childProfiles,
      activeChildId,
      activeChild,
      soundEnabled,
      voiceSpeed,
      screenTimeLimit,
      timeSpentToday,
      isLockedByScreenTime,
      setActiveChildId,
      setSoundEnabled: (val) => {
        setSoundEnabled(val);
        localStorage.setItem('gkgw_sound', val.toString());
      },
      setVoiceSpeed: (val) => {
        setVoiceSpeed(val);
        localStorage.setItem('gkgw_voice_speed', val.toString());
      },
      setScreenTimeLimit: (val) => {
        setScreenTimeLimit(val);
        localStorage.setItem('gkgw_screen_limit', val.toString());
      },
      triggerAudio,
      speakText,
      registerParent,
      loginParent,
      createChildProfile,
      deleteChildProfile,
      updateChildRewards,
      addCompletedStory,
      addCompletedQuiz,
      incrementGamesPlayed,
      toggleHabitCheck,
      resetScreenLimitLock,
      logoutParent
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
