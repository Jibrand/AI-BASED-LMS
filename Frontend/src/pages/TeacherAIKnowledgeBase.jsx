import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUploadCloud, 
  FiFileText, 
  FiCheckCircle, 
  FiClock, 
  FiCpu,
  FiX,
  FiDatabase,
  FiSearch,
  FiBookOpen,
  FiZap
} from 'react-icons/fi';

const mockLibrary = [
  { id: 1, title: 'Algebra Chapter 4 Notes', class: 'Class 10-A Math', date: 'Oct 12, 2026', type: 'PDF', size: '2.4 MB', status: 'trained' },
  { id: 2, title: 'Photosynthesis Slides', class: 'Class 9-B Science', date: 'Oct 10, 2026', type: 'PPTX', size: '5.1 MB', status: 'trained' },
  { id: 3, title: 'World War II Timeline', class: 'Class 8-A History', date: 'Oct 05, 2026', type: 'DOCX', size: '1.2 MB', status: 'trained' },
];

const TeacherAIKnowledgeBase = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [isTrained, setIsTrained] = useState(false);
  const [library, setLibrary] = useState(mockLibrary);
  
  const [className, setClassName] = useState('Class 10-A Math');
  const [topicName, setTopicName] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setTopicName(file.name.replace(/\.[^/.]+$/, "")); // Strip extension for default title
    setIsTrained(false);
  };

  const handleTrainAI = () => {
    if (!selectedFile) return;
    
    setIsTraining(true);
    
    // Simulate AI training process (chunking, embedding, saving to vector DB)
    setTimeout(() => {
      setIsTraining(false);
      setIsTrained(true);
      
      const newEntry = {
        id: Date.now(),
        title: topicName || selectedFile.name,
        class: className,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        type: selectedFile.name.split('.').pop().toUpperCase() || 'PDF',
        size: (selectedFile.size / (1024 * 1024)).toFixed(1) + ' MB',
        status: 'trained'
      };
      
      setLibrary([newEntry, ...library]);
      
      // Reset form after short delay
      setTimeout(() => {
        setSelectedFile(null);
        setTopicName('');
        setIsTrained(false);
      }, 3000);
      
    }, 2500); // 2.5 seconds of "training" animation
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1E1E1E] flex items-center gap-3">
          <FiDatabase className="text-[#FFD300]" /> AI Knowledge Base
        </h1>
        <p className="text-slate-500 mt-2 text-sm max-w-2xl">
          Upload your class notes, presentation slides, or PDFs here. The Hexis AI Tutor will instantly memorize the material, allowing your students to ask questions specifically about what you taught them.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload & Train Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
            <h2 className="text-lg font-bold text-[#1E1E1E] mb-4 flex items-center gap-2">
              <FiUploadCloud className="text-indigo-500" /> Upload Material
            </h2>
            
            {/* Drag & Drop Zone */}
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
              } ${selectedFile && !isTrained ? 'hidden' : 'block'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                className="hidden" 
                id="file-upload" 
                onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                accept=".pdf,.doc,.docx,.ppt,.pptx"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4">
                  <FiUploadCloud className="text-3xl text-indigo-500" />
                </div>
                <p className="font-bold text-slate-700 mb-1">Drag & drop your file here</p>
                <p className="text-xs text-slate-500 mb-4">Supports PDF, PPTX, DOCX (Max 50MB)</p>
                <span className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
                  Browse Files
                </span>
              </label>
            </div>

            {/* Selected File Details & Train Action */}
            <AnimatePresence>
              {selectedFile && !isTrained && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-indigo-50 border border-indigo-100 rounded-xl p-5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg text-indigo-600 shadow-sm">
                        <FiFileText className="text-2xl" />
                      </div>
                      <div>
                        <p className="font-bold text-indigo-900 truncate max-w-[180px]">{selectedFile.name}</p>
                        <p className="text-xs text-indigo-600/70">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedFile(null)} className="text-indigo-400 hover:text-indigo-700 transition-colors">
                      <FiX />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs font-bold text-indigo-900/70 mb-1 block">Topic Title</label>
                      <input 
                        type="text" 
                        value={topicName}
                        onChange={(e) => setTopicName(e.target.value)}
                        className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-indigo-900/70 mb-1 block">Assign to Class</label>
                      <select 
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                        className="w-full bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
                      >
                        <option>Class 10-A Math</option>
                        <option>Class 9-B Science</option>
                        <option>Class 8-A History</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    onClick={handleTrainAI}
                    disabled={isTraining}
                    className={`w-full relative overflow-hidden rounded-xl font-extrabold text-sm py-3 px-4 shadow-lg transition-all ${
                      isTraining 
                        ? 'bg-slate-800 text-indigo-200 cursor-wait' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:scale-95'
                    }`}
                  >
                    {isTraining ? (
                      <span className="flex items-center justify-center gap-2 relative z-10">
                        <FiCpu className="animate-pulse" /> Memorizing Material...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 relative z-10">
                        <FiZap className="text-yellow-300" /> Train AI Tutor
                      </span>
                    )}
                    
                    {/* Animated processing background */}
                    {isTraining && (
                      <div className="absolute inset-0 z-0 opacity-20">
                        <div className="h-full w-full bg-[linear-gradient(90deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%)] bg-[length:250%_100%] animate-[shimmer_1.5s_infinite]"></div>
                      </div>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success State */}
            <AnimatePresence>
              {isTrained && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiCheckCircle className="text-3xl" />
                  </div>
                  <h3 className="text-emerald-800 font-bold text-lg mb-1">AI Successfully Trained!</h3>
                  <p className="text-emerald-600/80 text-sm">Your students can now ask the AI Tutor questions about this material.</p>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>

        {/* Library Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold text-[#1E1E1E] flex items-center gap-2">
                <FiBookOpen className="text-amber-500" /> Trained Memory Library
              </h2>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search materials..." 
                  className="bg-white border border-slate-200 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-indigo-300 w-48 transition-all"
                />
              </div>
            </div>

            <div className="p-0 overflow-y-auto custom-scrollbar flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold sticky top-0 z-10 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Material Title</th>
                    <th className="px-6 py-4">Class</th>
                    <th className="px-6 py-4">Date Uploaded</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {library.map((item) => (
                    <motion.tr 
                      key={item.id} 
                      layout
                      initial={{ opacity: 0, bg: '#f8fafc' }}
                      animate={{ opacity: 1, bg: '#ffffff' }}
                      transition={{ duration: 0.5 }}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg text-xs font-black shadow-sm ${
                            item.type === 'PDF' ? 'bg-rose-100 text-rose-600' :
                            item.type === 'PPTX' ? 'bg-orange-100 text-orange-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {item.type}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{item.title}</p>
                            <p className="text-xs text-slate-400">{item.size}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                          {item.class}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-medium flex items-center gap-1.5 pt-6">
                        <FiClock className="text-slate-400" /> {item.date}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          AI Trained
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              
              {library.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                  <FiDatabase className="text-4xl mx-auto mb-3 opacity-20" />
                  <p>No materials uploaded yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default TeacherAIKnowledgeBase;
