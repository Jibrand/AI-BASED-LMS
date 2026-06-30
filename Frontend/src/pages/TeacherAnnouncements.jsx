import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiSend, FiUsers, FiClock, FiMessageCircle } from 'react-icons/fi';

const mockAnnouncements = [
  { id: 1, title: 'Midterm Exam Schedule Posted', class: 'All Classes', date: 'Today, 09:00 AM', text: 'The schedule for the upcoming midterm exams has been posted on the main board. Please ensure you review your time slots.', seen: '95%' },
  { id: 2, title: 'Physics Lab Tomorrow', class: '11th Grade Physics', date: 'Yesterday, 03:30 PM', text: 'Reminder: Tomorrow we are doing the pendulum experiment. Do not forget to bring your lab manuals and safety goggles.', seen: '82%' },
];

const TeacherAnnouncements = () => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
            <FiBell className="text-2xl" />
          </div>
          Announcements
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Broadcast messages to your classes and track engagement.</p>
      </div>

      {/* Composer */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
        <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FiSend className="text-blue-500" /> New Announcement
        </h2>
        
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <input type="text" placeholder="Announcement Title..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white" />
            </div>
            <div className="w-64">
              <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-600 focus:outline-none focus:border-blue-500 bg-gray-50 focus:bg-white">
                <option>All Classes</option>
                <option>10th Grade Math</option>
                <option>11th Grade Physics</option>
              </select>
            </div>
          </div>
          
          <textarea 
            placeholder="Write your message here..." 
            rows="4"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white resize-none"
          ></textarea>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-[#2D2D2D] hover:bg-gray-900 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-colors">
              Broadcast <FiSend />
            </button>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <FiClock /> Recent Broadcasts
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
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border bg-gray-50 text-gray-500 flex items-center gap-1">
                    <FiUsers /> {ann.class}
                  </span>
                  <span className="text-xs font-bold text-gray-400">{ann.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{ann.title}</h3>
                <p className="text-sm font-medium text-gray-600 leading-relaxed">{ann.text}</p>
              </div>

              <div className="w-full md:w-48 shrink-0 flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 pl-0 md:pl-6">
                <div className="text-center md:text-right">
                  <p className="text-2xl font-black text-blue-500">{ann.seen}</p>
                  <p className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mt-1">Seen By Class</p>
                </div>
                <button className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors mt-4">
                  View Read Receipts
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TeacherAnnouncements;
