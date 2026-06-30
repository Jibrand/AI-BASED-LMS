import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiSearch, FiFilter, FiCheckCircle, FiClock, FiActivity, FiEye } from 'react-icons/fi';

const mockAssignments = [
  { id: 1, title: 'Calculus Midterm Review', teacher: 'Alice Johnson', school: 'Westside High', completion: '88%', status: 'Active' },
  { id: 2, title: 'Kinematics Lab Report', teacher: 'Robert Smith', school: 'Northwood Academy', completion: '95%', status: 'Completed' },
  { id: 3, title: 'Organic Chem Worksheet', teacher: 'Emily Chen', school: 'East Valley High', completion: '42%', status: 'Active' },
];

const SuperAdminAssignments = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 pb-12 max-w-7xl">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
            <FiFolder className="text-2xl" />
          </div>
          Global Assignments
        </h1>
        <p className="text-gray-500 mt-2 font-medium">System-wide overview of homework tracking and submission rates.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Assignments', value: '45.2k', icon: FiFolder, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Submissions Processed', value: '1.2M', icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Active Right Now', value: '842', icon: FiActivity, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Global Completion', value: '89%', icon: FiCheckCircle, color: 'text-purple-500', bg: 'bg-purple-50' },
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
              placeholder="Search assignment title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1 shadow-sm">
            <FiFilter className="text-gray-400" />
            <select className="bg-transparent border-none text-sm font-bold text-gray-600 focus:outline-none py-1.5 cursor-pointer">
              <option>All Statuses</option>
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Assignment Title</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Teacher</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Institution</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Completion Rate</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockAssignments.map((task, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={task.id} 
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="p-4 font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {task.title}
                    <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${task.status === 'Active' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-gray-600">{task.teacher}</td>
                  <td className="p-4 text-sm text-gray-500">{task.school}</td>
                  <td className="p-4 text-sm font-bold text-indigo-600">{task.completion}</td>
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

export default SuperAdminAssignments;
