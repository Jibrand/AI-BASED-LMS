import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiClock, FiCheckCircle, FiAlertCircle, FiUploadCloud, FiFileText, FiFilter, FiCalendar } from 'react-icons/fi';

const mockAssignments = [
  { id: 1, title: 'Calculus Ch.3 Problem Set', subject: 'Math', teacher: 'Mr. Roberts', status: 'To Do', dueDate: 'Tomorrow, 11:59 PM', score: null, urgent: true },
  { id: 2, title: 'Essay: The Great Gatsby', subject: 'Literature', teacher: 'Ms. Taylor', status: 'Submitted', dueDate: 'Oct 15, 2023', score: null, urgent: false },
  { id: 3, title: 'Lab Report: Titration', subject: 'Chemistry', teacher: 'Dr. Smith', status: 'Graded', dueDate: 'Oct 10, 2023', score: 92, urgent: false },
  { id: 4, title: 'French Revolution Timeline', subject: 'History', teacher: 'Mrs. Davis', status: 'To Do', dueDate: 'Friday, 5:00 PM', score: null, urgent: false },
  { id: 5, title: 'Physics Kinematics Worksheet', subject: 'Physics', teacher: 'Mr. Lee', status: 'Graded', dueDate: 'Oct 05, 2023', score: 88, urgent: false },
];

const StudentAssignments = () => {
  const [filter, setFilter] = useState('All');

  const filteredAssignments = mockAssignments.filter(a => {
    if (filter === 'All') return true;
    return a.status === filter;
  });

  const getStatusColor = (status) => {
    if (status === 'To Do') return 'bg-orange-100 text-orange-600 border-orange-200';
    if (status === 'Submitted') return 'bg-blue-100 text-blue-600 border-blue-200';
    if (status === 'Graded') return 'bg-green-100 text-green-600 border-green-200';
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 text-[#2D2D2D] rounded-xl">
              <FiFolder className="text-2xl" />
            </div>
            My Assignments
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Manage your homework, essays, and lab reports in one place.</p>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Assignments', value: '24', icon: FiFileText, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'To Do', value: '2', icon: FiAlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Submitted', value: '1', icon: FiClock, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Graded', value: '21', icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main List */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
              <FiFilter className="text-gray-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filter</span>
            </div>
            {['All', 'To Do', 'Submitted', 'Graded'].map(f => (
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

          {/* Assignment Cards */}
          <div className="space-y-4">
            {filteredAssignments.map((assignment, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={assignment.id} 
                className={`bg-white rounded-2xl border ${assignment.urgent ? 'border-red-200 shadow-sm' : 'border-gray-100 shadow-sm'} p-5 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className={`mt-1 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner bg-gray-50 text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
                    <FiFileText className="text-xl" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${getStatusColor(assignment.status)}`}>
                        {assignment.status}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                        <FiCalendar className="inline" /> Due: <span className={assignment.urgent ? 'text-red-500 font-bold' : ''}>{assignment.dueDate}</span>
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-1">{assignment.title}</h3>
                    <p className="text-xs font-medium text-gray-500">
                      {assignment.subject} <span className="mx-1 text-gray-300">|</span> Assigned by {assignment.teacher}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 md:gap-2 shrink-0 border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                  {assignment.status === 'Graded' && (
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Final Grade</p>
                        <p className={`text-xl font-black leading-none ${assignment.score >= 90 ? 'text-green-500' : 'text-primary'}`}>{assignment.score}/100</p>
                      </div>
                      <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-bold transition-colors border border-gray-200">
                        View Feedback
                      </button>
                    </div>
                  )}
                  {assignment.status === 'Submitted' && (
                    <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-bold transition-colors border border-gray-200 flex items-center gap-2">
                      <FiCheckCircle /> View Submission
                    </button>
                  )}
                  {assignment.status === 'To Do' && (
                    <button className="w-full md:w-auto px-6 py-2.5 bg-primary hover:bg-[#FFD300]/90 text-[#2D2D2D] rounded-lg text-sm font-bold transition-colors shadow-sm shadow-primary/20 flex items-center justify-center gap-2">
                      <FiUploadCloud className="text-lg" /> Submit Work
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Deadlines */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-sm sticky top-24 bg-gradient-to-b from-red-50/50 to-white">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiAlertCircle className="text-red-500" /> Upcoming Deadlines
            </h2>
            <div className="space-y-4">
              {mockAssignments.filter(a => a.status === 'To Do').map(a => (
                <div key={a.id} className="bg-white p-4 rounded-xl border border-red-100 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{a.title}</h4>
                  <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                    <FiClock /> {a.dueDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentAssignments;
