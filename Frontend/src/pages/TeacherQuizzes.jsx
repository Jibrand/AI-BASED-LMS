import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiCheckSquare, FiPlus, FiFilter, FiMoreVertical, FiClock, FiCheckCircle, FiUsers, FiEdit3, FiPieChart } from 'react-icons/fi';

const mockQuizzes = [
  { id: 1, title: 'Midterm Calculus Review', class: '10th Grade Math', date: 'Tomorrow, 10:00 AM', status: 'Active', questions: 25, avgScore: null },
  { id: 2, title: 'Kinematics Weekly Quiz', class: '11th Grade Physics', date: 'Oct 15, 2023', status: 'Completed', questions: 10, avgScore: '82%' },
  { id: 3, title: 'Chemical Bonding Basics', class: '12th Grade Chemistry', date: 'Unscheduled', status: 'Draft', questions: 15, avgScore: null },
  { id: 4, title: 'Algebra Fundamentals', class: '10th Grade Math', date: 'Oct 10, 2023', status: 'Completed', questions: 20, avgScore: '88%' },
];

const TeacherQuizzes = () => {
  const navigate = useNavigate();
  const [filterClass, setFilterClass] = useState('All Classes');
  const [filterStatus, setFilterStatus] = useState('All');

  const classes = ['All Classes', '10th Grade Math', '11th Grade Physics', '12th Grade Chemistry'];
  const statuses = ['All', 'Active', 'Draft', 'Completed'];

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    const matchesClass = filterClass === 'All Classes' || quiz.class === filterClass;
    const matchesStatus = filterStatus === 'All' || quiz.status === filterStatus;
    return matchesClass && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Completed': return 'bg-green-50 text-green-600 border-green-200';
      case 'Draft': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
              <FiCheckSquare className="text-2xl" />
            </div>
            Quiz Management
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Manage, schedule, and review all quizzes across your classes.</p>
        </div>

        <button 
          onClick={() => navigate('/teacher/quiz-builder')}
          className="flex items-center justify-center gap-2 bg-[#2D2D2D] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-800 transition-colors"
        >
          <FiPlus className="text-lg text-[#FFD300]" /> Create New Quiz
        </button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Quizzes', value: '24', icon: FiCheckSquare, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Active', value: '1', icon: FiClock, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Drafts', value: '4', icon: FiEdit3, color: 'text-gray-500', bg: 'bg-gray-100' },
          { label: 'Avg Score (All)', value: '84%', icon: FiPieChart, color: 'text-green-500', bg: 'bg-green-50' },
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

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar / Filters */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          <div className="flex p-1 bg-white rounded-xl border border-gray-200 self-start md:self-auto overflow-x-auto">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-5 py-2 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${
                  filterStatus === s 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1 shadow-sm w-full md:w-auto">
            <FiFilter className="text-gray-400" />
            <select 
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-gray-600 focus:outline-none py-1.5 cursor-pointer w-full"
            >
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

        </div>

        {/* List */}
        <div className="divide-y divide-gray-50">
          {filteredQuizzes.map((quiz, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={quiz.id} 
              className="p-5 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1 w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <FiCheckSquare className="text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${getStatusBadge(quiz.status)}`}>
                      {quiz.status}
                    </span>
                    <span className={`text-[10px] font-bold flex items-center gap-1 ${quiz.status === 'Active' ? 'text-blue-500' : 'text-gray-400'}`}>
                      <FiClock className="inline" /> {quiz.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">{quiz.title}</h3>
                  <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                    <span className="flex items-center gap-1"><FiUsers className="inline" /> {quiz.class}</span>
                    <span>•</span>
                    <span>{quiz.questions} Questions</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 md:w-64 shrink-0 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                {quiz.status === 'Completed' ? (
                  <div className="text-center md:text-right flex-1">
                    <p className="text-2xl font-black text-green-500">{quiz.avgScore}</p>
                    <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Class Average</p>
                  </div>
                ) : (
                  <div className="text-center md:text-right flex-1">
                    <p className="text-sm font-bold text-gray-400 italic">Waiting for results...</p>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Quiz">
                    <FiEdit3 />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiMoreVertical />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredQuizzes.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <FiCheckSquare className="text-4xl mx-auto mb-3 text-gray-300" />
              <p className="font-bold text-gray-900">No quizzes found</p>
              <p className="text-sm mt-1">Try adjusting your filters or create a new quiz.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TeacherQuizzes;
