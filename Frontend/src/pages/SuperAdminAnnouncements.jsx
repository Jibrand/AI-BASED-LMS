import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiSend, FiUsers, FiClock, FiGlobe } from 'react-icons/fi';

const mockAnnouncements = [
  { id: 1, title: 'Scheduled Platform Maintenance', target: 'All Users', date: 'Today, 08:00 AM', text: 'Hexis LMS will undergo scheduled maintenance this Sunday from 2 AM to 4 AM EST. The platform will be completely offline during this period.', seen: '45%' },
  { id: 2, title: 'New AI Features for Educators', target: 'All Teachers', date: 'Yesterday, 11:30 AM', text: 'We have just rolled out an upgraded version of the AI Quiz Builder! It now supports automatic syllabus parsing.', seen: '82%' },
];

const SuperAdminAnnouncements = () => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
            <FiBell className="text-2xl" />
          </div>
          Global Announcements
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Broadcast system-wide messages to all institutions, teachers, or students.</p>
      </div>

      {/* Composer */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiSend className="text-indigo-500" /> New Broadcast
        </h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <input type="text" placeholder="Announcement Title..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white" />
            </div>
            <div className="w-64">
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-600 focus:outline-none focus:border-indigo-500 bg-gray-50 focus:bg-white">
                <option>All Platform Users</option>
                <option>All Teachers Only</option>
                <option>All Students Only</option>
                <option>Specific Institution...</option>
              </select>
            </div>
          </div>
          
          <textarea 
            placeholder="Write your global broadcast message here..." 
            rows="4"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all bg-gray-50 focus:bg-white resize-none"
          ></textarea>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-[#2D2D2D] hover:bg-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-colors">
              Broadcast Globally <FiGlobe />
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <FiClock /> Recent System Broadcasts
        </h3>
        
        <div className="space-y-4">
          {mockAnnouncements.map((ann, i) => (
            <motion.div 
              key={ann.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border flex items-center gap-1 ${ann.target === 'All Users' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-blue-50 text-blue-600 border-blue-200'}`}>
                    <FiGlobe /> TARGET: {ann.target}
                  </span>
                  <span className="text-xs font-bold text-gray-400">{ann.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{ann.title}</h3>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">{ann.text}</p>
              </div>

              <div className="w-full md:w-48 shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 pl-0 md:pl-6">
                <div className="text-center md:text-right">
                  <p className="text-2xl font-black text-indigo-500">{ann.seen}</p>
                  <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mt-1">Global Read Rate</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SuperAdminAnnouncements;
