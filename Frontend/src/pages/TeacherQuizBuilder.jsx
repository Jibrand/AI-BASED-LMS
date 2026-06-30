import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPenTool, FiPlus, FiCpu, FiTrash2, FiSave, FiCheckSquare, FiSettings } from 'react-icons/fi';

const TeacherQuizBuilder = () => {
  const [questions, setQuestions] = useState([
    { id: 1, type: 'Multiple Choice', text: 'What is the derivative of x^2?', options: ['x', '2x', 'x^2', '2'], answer: '2x' },
    { id: 2, type: 'True/False', text: 'The chain rule is used for composite functions.', options: ['True', 'False'], answer: 'True' },
  ]);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
              <FiPenTool className="text-2xl" />
            </div>
            Quiz Builder
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Create assessments manually or use AI to generate questions from your syllabus.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#2D2D2D] to-gray-900 text-[#FFD300] px-6 py-3 rounded-xl font-extrabold shadow-lg hover:scale-105 transition-transform">
            <FiCpu className="text-lg" /> Generate with AI
          </button>
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 transition-colors">
            <FiSave className="text-lg" /> Publish Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Quiz Settings & Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
              <FiSettings className="text-blue-500" /> Quiz Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Quiz Title</label>
                <input type="text" defaultValue="Midterm Calculus Review" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Target Class</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500">
                  <option>10th Grade Math</option>
                  <option>11th Grade Physics</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration</label>
                  <input type="text" defaultValue="30 mins" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Total Points</label>
                  <input type="text" defaultValue="100" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-bold shadow-sm hover:bg-gray-50 transition-colors">
            <FiPlus className="text-lg text-blue-500" /> Add New Question
          </button>
        </div>

        {/* Right Col: Questions Canvas */}
        <div className="lg:col-span-2 space-y-4">
          {questions.map((q, i) => (
            <motion.div 
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-black text-sm">
                    {i + 1}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md">{q.type}</span>
                </div>
                <button className="text-gray-300 hover:text-red-500 transition-colors">
                  <FiTrash2 />
                </button>
              </div>

              <input 
                type="text" 
                defaultValue={q.text} 
                className="w-full text-lg font-bold text-gray-900 border-b border-transparent hover:border-gray-200 focus:border-blue-500 focus:outline-none pb-1 mb-4 transition-colors"
              />

              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${opt === q.answer ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}>
                      {opt === q.answer && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                    </div>
                    <input 
                      type="text" 
                      defaultValue={opt} 
                      className={`text-sm font-medium focus:outline-none focus:border-b focus:border-blue-500 ${opt === q.answer ? 'text-green-600 font-bold' : 'text-gray-600'}`}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TeacherQuizBuilder;
