import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiSearch, FiFilter, FiCpu, FiEye, FiPieChart } from 'react-icons/fi';

const mockQuizzes = [
  { id: 1, title: 'Calculus Chain Rule Practice', teacher: 'Alice Johnson', school: 'Westside High', isAI: true, date: 'Oct 10, 2023' },
  { id: 2, title: 'Physics Midterm Exam', teacher: 'Robert Smith', school: 'Northwood Academy', isAI: false, date: 'Oct 12, 2023' },
  { id: 3, title: 'History of Europe: French Rev.', teacher: 'James Wilson', school: 'Westside High', isAI: true, date: 'Oct 14, 2023' },
];

const SuperAdminQuizzes = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 pb-12 max-w-7xl">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
            <FiCheckSquare className="text-2xl" />
          </div>
          Global Quizzes
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Track assessment volume and AI-generated quiz usage across the platform.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Quizzes', value: '18.4k', icon: FiCheckSquare, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'AI Generated', value: '64%', icon: FiCpu, color: 'text-[#FFD300]', bg: 'bg-[#2D2D2D]' },
          { label: 'Avg Global Score', value: '78%', icon: FiPieChart, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Active Now', value: '125', icon: FiCheckSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className={`p-3 rounded-full ${stat.bg} ${stat.color} shrink-0`}>
              <stat.icon className="text-xl" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 leading-none">{stat.value}</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search quiz title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1 shadow-sm">
            <FiFilter className="text-gray-400" />
            <select className="bg-transparent border-none text-sm font-bold text-gray-600 focus:outline-none py-1.5 cursor-pointer">
              <option>All Sources</option>
              <option>AI Generated</option>
              <option>Manual Creation</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Quiz Title</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Teacher</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Institution</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Source</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Date</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockQuizzes.map((quiz, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={quiz.id} 
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="p-4 font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{quiz.title}</td>
                  <td className="p-4 text-sm font-bold text-gray-600">{quiz.teacher}</td>
                  <td className="p-4 text-sm text-gray-500">{quiz.school}</td>
                  <td className="p-4">
                    {quiz.isAI ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-50 text-purple-600 border border-purple-200">
                        <FiCpu /> AI Generated
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-600 border border-gray-200">
                        Manual
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-500">{quiz.date}</td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><FiEye /></button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminQuizzes;
