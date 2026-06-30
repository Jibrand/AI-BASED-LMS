import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiSearch, FiFilter, FiMoreVertical, FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiUserPlus, FiMail } from 'react-icons/fi';

const mockStudents = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@school.edu', grade: 'A', score: 95, attendance: '98%', class: '10th Grade Math', risk: false, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
  { id: 2, name: 'Bilal Khan', email: 'bilal.k@school.edu', grade: 'B+', score: 88, attendance: '95%', class: '11th Grade Physics', risk: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  { id: 3, name: 'Chloe Davis', email: 'chloe.d@school.edu', grade: 'C-', score: 71, attendance: '82%', class: '10th Grade Math', risk: true, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
  { id: 4, name: 'David Smith', email: 'david.s@school.edu', grade: 'A-', score: 91, attendance: '100%', class: '12th Grade Chemistry', risk: false, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { id: 5, name: 'Eisha Tariq', email: 'eisha.t@school.edu', grade: 'B', score: 84, attendance: '92%', class: '11th Grade Physics', risk: false, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
  { id: 6, name: 'Fahad Ali', email: 'fahad.a@school.edu', grade: 'D', score: 64, attendance: '75%', class: '12th Grade Chemistry', risk: true, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' },
];

const TeacherStudents = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('All Classes');

  const classes = ['All Classes', '10th Grade Math', '11th Grade Physics', '12th Grade Chemistry'];

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === 'All Classes' || student.class === filterClass;
    return matchesSearch && matchesClass;
  });

  const getGradeColor = (score) => {
    if (score >= 90) return 'text-green-500 bg-green-50';
    if (score >= 80) return 'text-blue-500 bg-blue-50';
    if (score >= 70) return 'text-orange-500 bg-orange-50';
    return 'text-red-500 bg-red-50';
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
              <FiUsers className="text-2xl" />
            </div>
            Student Directory
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Manage, monitor, and support the students in your classes.</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#2D2D2D] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-800 transition-colors">
          <FiUserPlus className="text-lg text-blue-400" /> Add Student
        </button>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '142', icon: FiUsers, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Avg Attendance', value: '92%', icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Avg Grade', value: '84 (B)', icon: FiTrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'At Risk', value: '12', icon: FiAlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
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
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1 shadow-sm">
              <FiFilter className="text-gray-400" />
              <select 
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="bg-transparent border-none text-sm font-bold text-gray-600 focus:outline-none py-1.5 cursor-pointer"
              >
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Student Name</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Class</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Grade / Score</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Attendance</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.map((student, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={student.id} 
                  className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100" />
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">{student.class}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${getGradeColor(student.score)}`}>
                        {student.grade}
                      </span>
                      <span className="text-xs font-bold text-gray-500">{student.score}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-gray-700">{student.attendance}</p>
                  </td>
                  <td className="p-4">
                    {student.risk ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span> At Risk
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> On Track
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Message Student">
                        <FiMail />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <FiMoreVertical />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-gray-500">
                    <FiUsers className="text-4xl mx-auto mb-3 text-gray-300" />
                    <p className="font-bold text-gray-900">No students found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination (Mock) */}
        <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between text-sm font-medium text-gray-500">
          <p>Showing {filteredStudents.length} of 142 students</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TeacherStudents;
