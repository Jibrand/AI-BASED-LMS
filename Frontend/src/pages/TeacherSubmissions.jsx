import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckSquare, FiSearch, FiFilter, FiDownload, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const mockSubmissions = [
  { id: 1, studentName: 'Alice Johnson', assignment: 'Calculus Ch.3 Problem Set', submittedDate: 'Today, 10:45 AM', status: 'Ungraded', grade: null, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
  { id: 2, studentName: 'Bilal Khan', assignment: 'Physics Lab Report: Kinematics', submittedDate: 'Yesterday, 04:20 PM', status: 'Ungraded', grade: null, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  { id: 3, studentName: 'Chloe Davis', assignment: 'Calculus Ch.3 Problem Set', submittedDate: 'Today, 08:15 AM', status: 'Graded', grade: '92', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
  { id: 4, studentName: 'David Smith', assignment: 'Algebra Midterm Review', submittedDate: 'Oct 09, 2023', status: 'Graded', grade: '88', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { id: 5, studentName: 'Eisha Tariq', assignment: 'Physics Lab Report: Kinematics', submittedDate: 'Yesterday, 11:30 AM', status: 'Ungraded', grade: null, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
];

const TeacherSubmissions = () => {
  const [filter, setFilter] = useState('Ungraded');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubmissions = mockSubmissions.filter(sub => {
    const matchesFilter = filter === 'All' ? true : sub.status === filter;
    const matchesSearch = sub.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || sub.assignment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
              <FiCheckSquare className="text-2xl" />
            </div>
            Review Submissions
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Grade student work, provide feedback, and track completion.</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-colors">
          <FiDownload className="text-lg" /> Export Grades
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-4">
          
          {/* Tabs */}
          <div className="flex p-1 bg-white rounded-xl border border-gray-200 self-start md:self-auto">
            {['Ungraded', 'Graded', 'All'].map((tf) => (
              <button
                key={tf}
                onClick={() => setFilter(tf)}
                className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${
                  filter === tf 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tf}
                {tf === 'Ungraded' && <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] ${filter === tf ? 'bg-white/20' : 'bg-orange-100 text-orange-600'}`}>3</span>}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search student or assignment..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Student</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Assignment</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Submitted</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right">Action / Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSubmissions.map((sub, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={sub.id} 
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={sub.avatar} alt={sub.studentName} className="w-8 h-8 rounded-full object-cover shadow-sm border border-gray-100" />
                      <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">{sub.studentName}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-gray-700">{sub.assignment}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-xs font-bold text-gray-500">{sub.submittedDate}</p>
                  </td>
                  <td className="p-4">
                    {sub.status === 'Ungraded' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-wider">
                        <FiAlertCircle /> Needs Grading
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider">
                        <FiCheckCircle /> Graded
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {sub.status === 'Ungraded' ? (
                      <button className="px-4 py-2 bg-[#2D2D2D] hover:bg-gray-900 text-white rounded-lg text-xs font-bold transition-colors shadow-sm">
                        Grade Now
                      </button>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-sm font-bold text-gray-400">Score:</span>
                        <span className="text-lg font-black text-green-500">{sub.grade}/100</span>
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
              {filteredSubmissions.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-gray-500">
                    <FiCheckSquare className="text-4xl mx-auto mb-3 text-gray-300" />
                    <p className="font-bold text-gray-900">All caught up!</p>
                    <p className="text-sm mt-1">No submissions require grading right now.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default TeacherSubmissions;
