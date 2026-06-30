import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiHardDrive, FiSearch, FiFilter, FiActivity, FiShield, FiDownload, FiCheckCircle } from 'react-icons/fi';

const mockLogs = [
  { id: 1, timestamp: '10:45:22 AM - Today', event: 'New Quiz Created: Calculus Midterm', userName: 'Alice Johnson', userEmail: 'alice.j@school.edu', userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
  { id: 2, timestamp: '09:12:05 AM - Today', event: 'New Student Joined: Bilal Khan', userName: 'Bilal Khan', userEmail: 'bilal.k@school.edu', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  { id: 3, timestamp: '08:30:00 AM - Today', event: 'New Assignment Posted: Physics Lab', userName: 'Robert Smith', userEmail: 'r.smith@school.edu', userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
  { id: 4, timestamp: '11:20:15 PM - Yesterday', event: 'New Course Enrolled: 11th Grade Physics', userName: 'Chloe Davis', userEmail: 'chloe.d@school.edu', userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
  { id: 5, timestamp: '04:15:22 PM - Yesterday', event: 'Teacher Account Suspended', userName: 'Super Admin', userEmail: 'admin@hexis.com', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
];

const SuperAdminLogs = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = mockLogs.filter(log => {
    return log.event.toLowerCase().includes(searchQuery.toLowerCase()) || 
           log.userName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8 pb-12 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
              <FiHardDrive className="text-2xl" />
            </div>
            Activity Logs
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Audit platform events and track user actions.</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-colors">
          <FiDownload className="text-lg" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Events Today', value: '45.2k', icon: FiActivity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Security Alerts', value: '12', icon: FiShield, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'New Signups', value: '143', icon: FiCheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Total Logs', value: '2.4M', icon: FiHardDrive, color: 'text-blue-500', bg: 'bg-blue-50' },
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
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by event or user name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1 shadow-sm">
            <FiFilter className="text-gray-400" />
            <select className="bg-transparent border-none text-sm font-bold text-gray-600 focus:outline-none py-1.5 cursor-pointer">
              <option>All Events</option>
              <option>Quizzes</option>
              <option>Assignments</option>
              <option>Users</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">User Details</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Timestamp</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Event / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLogs.map((log, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={log.id} 
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                   <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={log.userAvatar} alt={log.userName} className="w-8 h-8 rounded-full object-cover shadow-sm border border-gray-100" />
                      <div>
                        <p className="font-bold text-sm text-gray-900">{log.userName}</p>
                        <p className="text-xs text-gray-500">{log.userEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-bold text-gray-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-4 text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{log.event}</td>
               
                </motion.tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-12 text-center text-gray-500">
                    <FiActivity className="text-4xl mx-auto mb-3 text-gray-300" />
                    <p className="font-bold text-gray-900">No events found</p>
                    <p className="text-sm mt-1">Try adjusting your search criteria.</p>
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

export default SuperAdminLogs;
