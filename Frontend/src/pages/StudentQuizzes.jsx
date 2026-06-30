import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiCpu, FiClock, FiPieChart, FiPlay, FiAward, FiFileText, FiFilter } from 'react-icons/fi';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const mockAnalytics = [
  { name: 'Q1', score: 65 },
  { name: 'Q2', score: 78 },
  { name: 'Q3', score: 82 },
  { name: 'Q4', score: 75 },
  { name: 'Q5', score: 88 },
  { name: 'Q6', score: 92 },
];

const mockQuizzes = [
  { id: 1, title: 'Algebra II: Quadratics', category: 'Math', source: 'Teacher', author: 'Mr. Roberts', status: 'Pending', score: null, dueDate: 'Today, 11:59 PM', duration: '30 mins' },
  { id: 2, title: 'Cellular Respiration', category: 'Biology', source: 'Teacher', author: 'Mrs. Davis', status: 'Completed', score: 88, dueDate: 'Passed', duration: '45 mins' },
  { id: 3, title: 'Newton\'s Laws Practice', category: 'Physics', source: 'AI', author: 'AI Tutor', status: 'Pending', score: null, dueDate: 'No limit', duration: '15 mins' },
  { id: 4, title: 'World War II Summary', category: 'History', source: 'Teacher', author: 'Dr. Smith', status: 'Completed', score: 95, dueDate: 'Passed', duration: '60 mins' },
  { id: 5, title: 'Organic Chemistry Vocab', category: 'Chemistry', source: 'AI', author: 'AI Tutor', status: 'Completed', score: 72, dueDate: 'Passed', duration: '20 mins' },
  { id: 6, title: 'Hamlet Act 1 Analysis', category: 'Literature', source: 'Teacher', author: 'Ms. Taylor', status: 'Pending', score: null, dueDate: 'Tomorrow', duration: '40 mins' },
];

const StudentQuizzes = () => {
  const [filter, setFilter] = useState('All');

  const filteredQuizzes = mockQuizzes.filter(q => {
    if (filter === 'All') return true;
    if (filter === 'Pending') return q.status === 'Pending';
    if (filter === 'Completed') return q.status === 'Completed';
    if (filter === 'AI Generated') return q.source === 'AI';
    if (filter === 'Teacher Assigned') return q.source === 'Teacher';
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 text-[#2D2D2D] rounded-xl">
              <FiCheckSquare className="text-2xl" />
            </div>
            My Quizzes
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Track your performance and complete pending assignments.</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#2D2D2D] to-gray-900 text-[#FFD300] px-6 py-3 rounded-xl font-extrabold shadow-[0_4px_20px_rgba(45,45,45,0.2)] hover:scale-105 transition-transform group relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <FiCpu className="text-xl group-hover:rotate-12 transition-transform" />
          <span className="relative z-10">Generate AI Quiz</span>
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Completed', value: '42', icon: FiAward, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Average Score', value: '84%', icon: FiPieChart, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Pending Quizzes', value: '3', icon: FiClock, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'AI Generated', value: '15', icon: FiCpu, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-start hover:-translate-y-1 transition-transform relative overflow-hidden">
            <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} mb-3`}>
              <stat.icon className="text-lg" />
            </div>
            <p className="text-2xl font-black text-gray-900 mb-0.5">{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: List and Filters */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
              <FiFilter className="text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter</span>
            </div>
            {['All', 'Pending', 'Completed', 'Teacher Assigned', 'AI Generated'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  filter === f 
                    ? 'bg-[#2D2D2D] text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Quiz Cards */}
          <div className="space-y-4">
            {filteredQuizzes.map((quiz, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={quiz.id} 
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`mt-1 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${quiz.source === 'AI' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                    {quiz.source === 'AI' ? <FiCpu className="text-xl" /> : <FiFileText className="text-xl" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        quiz.category === 'Math' ? 'bg-red-50 text-red-600' :
                        quiz.category === 'Science' || quiz.category === 'Physics' || quiz.category === 'Biology' || quiz.category === 'Chemistry' ? 'bg-green-50 text-green-600' :
                        'bg-yellow-50 text-yellow-700'
                      }`}>
                        {quiz.category}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400">•</span>
                      <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                        <FiClock className="inline" /> {quiz.duration}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">{quiz.title}</h3>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">
                      {quiz.source === 'Teacher' ? `Assigned by ${quiz.author}` : `Generated by AI Tutor`} 
                      <span className="mx-2 text-gray-300">|</span> 
                      {quiz.status === 'Pending' ? <span className="text-orange-500 font-bold">Due: {quiz.dueDate}</span> : <span className="text-gray-400">Completed</span>}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 md:gap-2 shrink-0 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                  {quiz.status === 'Completed' ? (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Score</p>
                        <p className={`text-lg font-black leading-none ${quiz.score >= 85 ? 'text-green-500' : quiz.score >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>{quiz.score}%</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-bold transition-colors border border-gray-200">
                        View Results
                      </button>
                    </div>
                  ) : (
                    <button className="w-full md:w-auto px-6 py-2.5 bg-primary hover:bg-[#FFD300]/90 text-[#2D2D2D] rounded-lg text-sm font-bold transition-colors shadow-sm shadow-primary/20 flex items-center justify-center gap-2">
                      <FiPlay className="text-lg" /> Start Quiz
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            
            {filteredQuizzes.length === 0 && (
              <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100 border-dashed">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-400">
                  <FiCheckSquare className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No quizzes found</h3>
                <p className="text-sm font-medium text-gray-500 mt-1">Try changing your filters or generate a new AI quiz.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Performance Trend */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiPieChart className="text-primary" /> Performance Trend
            </h2>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAnalytics}>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ color: '#2D2D2D', fontWeight: 'bold' }}
                    cursor={{ stroke: '#f0f0f0', strokeWidth: 2 }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#FFD300" strokeWidth={4} dot={{ r: 4, fill: '#FFD300', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-4">
              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">Strongest Area</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">History (95% Avg)</p>
              </div>
              <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100/50">
                <p className="text-xs font-bold text-orange-500 uppercase tracking-wider">Needs Focus</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">Algebra II (65% Avg)</p>
                <button className="text-[11px] font-bold text-orange-600 mt-2 hover:underline">Generate AI Practice Quiz →</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentQuizzes;
