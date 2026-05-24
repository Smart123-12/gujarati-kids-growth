import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { stories, storyCategories } from '../data/mockData';
import { Database, PlusCircle, Check, Eye, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminPanel = () => {
  const { triggerAudio, speakText } = useApp();
  const navigate = useNavigate();

  // CMS states
  const [newTitle, setNewTitle] = useState('');
  const [newEnglishTitle, setNewEnglishTitle] = useState('');
  const [newCategory, setNewCategory] = useState(storyCategories[0].id);
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newMoral, setNewMoral] = useState('');
  const [newActivity, setNewActivity] = useState('');
  const [paragraphs, setParagraphs] = useState([
    { gujarati: '', phonetic: '', english: '' }
  ]);
  
  // Database mock inspect values
  const [logs, setLogs] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddParagraphField = () => {
    triggerAudio('click');
    setParagraphs([...paragraphs, { gujarati: '', phonetic: '', english: '' }]);
  };

  const handleParaChange = (idx, field, val) => {
    const nextPara = [...paragraphs];
    nextPara[idx][field] = val;
    setParagraphs(nextPara);
  };

  const handleCreateStoryCMS = (e) => {
    e.preventDefault();
    if (!newTitle || !newShortDesc || !newMoral) {
      triggerAudio('wrong');
      return;
    }

    // Save story to local dynamic stories list (persisted in dynamic state/storage if desired)
    const newStory = {
      id: `dynamic_${Date.now()}`,
      category: newCategory,
      title: newTitle,
      englishTitle: newEnglishTitle,
      thumbnail: '📖',
      shortDesc: newShortDesc,
      moral: newMoral,
      activity: newActivity || 'વાર્તાનો આનંદ માણો!',
      paragraphs: paragraphs.filter(p => p.gujarati),
      quiz: [
        {
          question: `${newTitle} માં કઈ બાબત મુખ્ય છે?`,
          options: ['સારું વર્તન', 'રમત ગમત', 'જૂઠું બોલવું', 'કંઈ નહીં'],
          answer: 0
        }
      ]
    };

    // Save to localStorage stories dynamic cache
    const cachedStories = JSON.parse(localStorage.getItem('gkgw_dynamic_stories') || '[]');
    const nextStories = [...cachedStories, newStory];
    localStorage.setItem('gkgw_dynamic_stories', JSON.stringify(nextStories));

    // Append to local static list for testing in this session
    stories.push(newStory);

    triggerAudio('levelUp');
    setSuccessMsg('વાર્તા સફળતાપૂર્વક પબ્લિશ કરવામાં આવી છે! (Story published!)');
    
    // Clear forms
    setNewTitle('');
    setNewEnglishTitle('');
    setNewShortDesc('');
    setNewMoral('');
    setNewActivity('');
    setParagraphs([{ gujarati: '', phonetic: '', english: '' }]);
  };

  const inspectLocalStorage = () => {
    triggerAudio('click');
    const inspected = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('gkgw_')) {
        inspected.push({ key, val: JSON.parse(localStorage.getItem(key) || '{}') });
      }
    }
    setLogs(inspected);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100 font-fredoka py-8 px-4 md:px-8 select-none">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <button 
          onClick={() => { triggerAudio('click'); navigate('/'); }}
          className="px-5 py-2.5 border-2 border-slate-800 bg-slate-100 hover:bg-slate-250 font-bold flex items-center gap-1 shadow-kids text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> હોમ સ્ક્રીન
        </button>

        <div className="text-center flex-1">
          <span className="text-5xl block mb-1">🛡️</span>
          <h2 className="text-4xl font-extrabold text-slate-800">એડમીન કંટ્રોલ પેનલ (Admin Simulator)</h2>
          <p className="text-slate-500 font-bold">વાર્તાઓ ઉમેરો અને ડેટાબેઝ ટેબલોનું સીધું નિરીક્ષણ કરો.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Form to add story */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-6">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-kids-orange-dark" /> નવી વાર્તા પ્રકાશિત કરો (Story Publisher CMS)
          </h3>

          {successMsg && (
            <div className="p-3 bg-green-150 border border-green-400 text-green-700 font-bold rounded-2xl text-center text-sm">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleCreateStoryCMS} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-400 mb-1">વાર્તાનું નામ (Gujarati Title)</label>
                <input
                  type="text" required placeholder="ઉદા. ચતુર કાગડો"
                  value={newTitle} onChange={e => setNewTitle(e.target.value)}
                  className="w-full text-sm font-bold p-2.5 rounded-xl border focus:outline-none focus:border-slate-800 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 mb-1">English Title</label>
                <input
                  type="text" required placeholder="e.g. The Clever Crow"
                  value={newEnglishTitle} onChange={e => setNewEnglishTitle(e.target.value)}
                  className="w-full text-sm font-bold p-2.5 rounded-xl border focus:outline-none focus:border-slate-800 bg-slate-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 mb-1">વાર્તા કેટેગરી (Category)</label>
              <select
                value={newCategory} onChange={e => setNewCategory(e.target.value)}
                className="w-full text-sm font-bold p-2.5 rounded-xl border focus:outline-none bg-slate-50"
              >
                {storyCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 mb-1">વાર્તાનો ટૂંકો બોધ (Short Description)</label>
              <input
                type="text" required placeholder="વાર્તાનો નાનો પરિચય લખો..."
                value={newShortDesc} onChange={e => setNewShortDesc(e.target.value)}
                className="w-full text-sm font-bold p-2.5 rounded-xl border focus:outline-none focus:border-slate-800 bg-slate-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-400 mb-1">વાર્તાનો મુખ્ય સાર (Moral Lesson)</label>
                <input
                  type="text" required placeholder="દાખલા તરીકે: મહેનતનું ફળ મીઠું છે."
                  value={newMoral} onChange={e => setNewMoral(e.target.value)}
                  className="w-full text-sm font-bold p-2.5 rounded-xl border focus:outline-none focus:border-slate-800 bg-slate-50"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 mb-1">બાળકો માટે એક્ટિવિટી (Activity)</label>
                <input
                  type="text" placeholder="ચિત્ર દોરો અથવા શેર કરો..."
                  value={newActivity} onChange={e => setNewActivity(e.target.value)}
                  className="w-full text-sm font-bold p-2.5 rounded-xl border focus:outline-none focus:border-slate-800 bg-slate-50"
                />
              </div>
            </div>

            {/* Paragraph Creator */}
            <div className="space-y-4 pt-3 border-t">
              <span className="block text-xs font-black text-slate-400">વાર્તા ફકરાઓ (Story Paragraphs)</span>
              
              {paragraphs.map((para, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border rounded-xl space-y-2 relative">
                  <span className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-800 text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  
                  <textarea
                    rows={2} required placeholder="ગુજરાતી ફકરો..."
                    value={para.gujarati} onChange={e => handleParaChange(idx, 'gujarati', e.target.value)}
                    className="w-full text-xs font-semibold p-2 rounded border focus:outline-none bg-white"
                  />
                  <input
                    type="text" placeholder="English phonetic guide..."
                    value={para.phonetic} onChange={e => handleParaChange(idx, 'phonetic', e.target.value)}
                    className="w-full text-xs font-semibold p-2 rounded border focus:outline-none bg-white"
                  />
                  <input
                    type="text" placeholder="English translation..."
                    value={para.english} onChange={e => handleParaChange(idx, 'english', e.target.value)}
                    className="w-full text-xs font-semibold p-2 rounded border focus:outline-none bg-white"
                  />
                </div>
              ))}

              <button
                type="button" onClick={handleAddParagraphField}
                className="w-full py-2 bg-slate-200 border border-slate-350 hover:bg-slate-300 font-bold text-xs rounded-xl"
              >
                + નવો ફકરો ઉમેરો
              </button>
            </div>

            <button
              type="submit"
              className="w-full btn-kids-orange font-black text-sm py-3 shadow-kids-orange border border-slate-800 text-white"
            >
              વાર્તા પ્રકાશિત કરો (Publish Story) <Check className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right Column: Database audit inspection logs */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <Database className="w-6 h-6 text-kids-blue-dark" /> લોકલ ડેટાબેઝ ઇન્સ્પેક્ટર (Local Database Inspector)
            </h3>
            <button
              onClick={inspectLocalStorage}
              className="px-3 py-1.5 bg-kids-blue border border-kids-blue-dark text-white rounded-xl font-bold text-xs shadow-kids-active"
            >
              ડેટા લોડ કરો
            </button>
          </div>

          <p className="text-xs text-slate-400 font-medium">
            લોકલ સ્ટોરેજ ટેબલોનું સીધું લાઈવ નિરીક્ષણ કરો. આ ડેટા ફાઇલો બ્રાઉઝર સ્ટોરેજમાં સતત સુરક્ષિત રહે છે.
          </p>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1 select-text">
            {logs.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400">
                <AlertCircle className="w-10 h-10 mx-auto mb-2 opacity-60" />
                <span className="text-xs font-bold">ડેટા લોડ કરવા ઉપર આપેલા બટન પર ક્લિક કરો.</span>
              </div>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-300 font-mono text-[11px] overflow-x-auto">
                  <span className="block font-black text-slate-800 mb-1 bg-slate-200 py-1 px-2.5 rounded-lg border border-slate-350">
                    📂 {log.key}
                  </span>
                  <pre className="p-2 whitespace-pre-wrap leading-normal font-semibold">
                    {JSON.stringify(log.val, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
