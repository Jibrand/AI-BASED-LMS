import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiPlus, FiMoreVertical, FiClock, FiCheckCircle, FiAlertCircle, FiUsers, FiEdit3 } from 'react-icons/fi';

const mockAssignments = [
  { id: 1, title: 'Calculus Ch.3 Problem Set', class: '10th Grade Math', dueDate: 'Tomorrow, 11:59 PM', submitted: 28, total: 32, status: 'Active' },
  { id: 2, title: 'Physics Lab Report: Kinematics', class: '11th Grade Physics', dueDate: 'Oct 15, 2023', submitted: 28, total: 28, status: 'Needs Grading' },
  { id: 3, title: 'Chemical Bonding Worksheet', class: '12th Grade Chemistry', dueDate: 'Oct 20, 2023', submitted: 0, total: 25, status: 'Draft' },
  { id: 4, title: 'Algebra Midterm Review', class: '10th Grade Math', dueDate: 'Oct 10, 2023', submitted: 30, total: 30, status: 'Completed' },
];

const TeacherAssignments = () => {
  const [filter, setFilter] = useState('All');

  const filteredAssignments = mockAssignments.filter(a => {
    if (filter === 'All') return true;
    return a.status === filter;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Needs Grading': return 'bg-orange-50 text-orange-600 border-orange-200';
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
              <FiFileText className="text-2xl" />
            </div>
            Assignment Manager
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Create, distribute, and track homework and projects across your classes.</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#2D2D2D] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-800 transition-colors">
          <FiPlus className="text-lg text-blue-400" /> Create Assignment
        </button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Assignments', value: '45', icon: FiFileText, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Active', value: '3', icon: FiClock, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Needs Grading', value: '1', icon: FiAlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Avg Submission Rate', value: '94%', icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
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

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex gap-2 overflow-x-auto scrollbar-hide">
          {['All', 'Active', 'Needs Grading', 'Draft', 'Completed'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                filter === f 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="divide-y divide-gray-50">
          {filteredAssignments.map((assignment, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={assignment.id} 
              className="p-5 hover:bg-gray-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer"
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="mt-1 w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <FiFileText className="text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${getStatusBadge(assignment.status)}`}>
                      {assignment.status}
                    </span>
                    <span className={`text-[10px] font-bold flex items-center gap-1 ${assignment.status === 'Active' ? 'text-red-500' : 'text-gray-400'}`}>
                      <FiClock className="inline" /> Due: {assignment.dueDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-1">{assignment.title}</h3>
                  <p className="text-xs font-bold text-gray-500 flex items-center gap-1">
                    <FiUsers className="inline" /> {assignment.class}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 md:w-64 shrink-0 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] font-bold text-gray-500 mb-1">
                    <span>Submitted</span>
                    <span>{assignment.submitted} / {assignment.total}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${assignment.submitted === assignment.total ? 'bg-green-500' : 'bg-blue-500'}`} 
                      style={{ width: `${(assignment.submitted / assignment.total) * 100 || 0}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Assignment">
                    <FiEdit3 />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiMoreVertical />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredAssignments.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <FiFileText className="text-4xl mx-auto mb-3 text-gray-300" />
              <p className="font-bold text-gray-900">No assignments found</p>
              <p className="text-sm mt-1">Try adjusting your filters or create a new assignment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAssignments;
