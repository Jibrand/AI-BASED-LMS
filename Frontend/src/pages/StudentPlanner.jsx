import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiCheck, FiCpu, FiPlus, FiMoreVertical, FiBook, FiAward } from 'react-icons/fi';

const mockSchedule = [
  { id: 1, time: '09:00 AM - 10:30 AM', title: 'Math: Calculus Practice', type: 'Study Block', color: 'bg-blue-500', completed: true },
  { id: 2, time: '11:00 AM - 12:00 PM', title: 'Physics Lecture Review', type: 'Class', color: 'bg-green-500', completed: false },
  { id: 3, time: '02:00 PM - 03:30 PM', title: 'AI Generated Chemistry Quiz', type: 'AI Practice', color: 'bg-purple-500', completed: false },
  { id: 4, time: '04:00 PM - 05:00 PM', title: 'History Essay Writing', type: 'Assignment', color: 'bg-orange-500', completed: false },
];

const daysOfWeek = [
  { day: 'Mon', date: 12 },
  { day: 'Tue', date: 13 },
  { day: 'Wed', date: 14, active: true },
  { day: 'Thu', date: 15 },
  { day: 'Fri', date: 16 },
  { day: 'Sat', date: 17 },
  { day: 'Sun', date: 18 },
];

const StudentPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(14);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 text-[#2D2D2D] rounded-xl">
              <FiCalendar className="text-2xl" />
            </div>
            Study Planner
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Organize your schedule, track study hours, and let AI optimize your routine.</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm">
            <FiPlus /> Add Block
          </button>
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#2D2D2D] to-gray-900 text-[#FFD300] px-6 py-2.5 rounded-xl font-extrabold shadow-[0_4px_20px_rgba(45,45,45,0.2)] hover:scale-105 transition-transform group">
            <FiCpu className="text-lg group-hover:rotate-12 transition-transform" /> Auto-Schedule
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Calendar & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Weekly Strip */}
          <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">October 2023</h2>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors">{'<'}</button>
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors">{'>'}</button>
              </div>
            </div>
            
            <div className="flex justify-between items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
              {daysOfWeek.map((d, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedDate(d.date)}
                  className={`flex flex-col items-center justify-center min-w-[3.5rem] py-3 rounded-xl cursor-pointer transition-all border ${
                    selectedDate === d.date 
                      ? 'bg-[#2D2D2D] text-[#FFD300] border-[#2D2D2D] shadow-md scale-105' 
                      : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${selectedDate === d.date ? 'text-gray-300' : 'text-gray-400'}`}>{d.day}</span>
                  <span className={`text-xl font-black ${selectedDate === d.date ? 'text-[#FFD300]' : 'text-gray-900'}`}>{d.date}</span>
                  {d.date === 14 && <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${selectedDate === d.date ? 'bg-[#FFD300]' : 'bg-primary'}`}></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline View */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Today's Schedule</h3>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
              
              {mockSchedule.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.id} 
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  {/* Timeline Dot */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${item.completed ? 'text-green-500' : 'text-gray-300'}`}>
                    {item.completed ? <FiCheck className="text-xl" /> : <div className={`w-3 h-3 rounded-full ${item.color}`}></div>}
                  </div>
                  
                  {/* Card */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white ${item.color} shadow-sm`}>{item.type}</span>
                      <button className="text-gray-400 hover:text-gray-900"><FiMoreVertical /></button>
                    </div>
                    <h4 className={`text-base font-bold mb-1 ${item.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{item.title}</h4>
                    <p className="text-xs font-bold text-gray-400 flex items-center gap-1">
                      <FiClock /> {item.time}
                    </p>
                  </div>
                </motion.div>
              ))}

            </div>
          </div>
        </div>

        {/* Right Column: Weekly Goals & AI Insights */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Progress Widget */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiAward className="text-primary" /> Weekly Goal
            </h2>
            
            <div className="flex items-center justify-center relative mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-100" />
                <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="351" strokeDashoffset={351 - (351 * 75) / 100} className="text-[#FFD300]" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-gray-900 leading-none">15<span className="text-sm">h</span></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">out of 20h</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-5">
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-xl font-black text-gray-900">8</p>
                <p className="text-[10px] font-bold uppercase text-gray-400 mt-1">Tasks Done</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-xl">
                <p className="text-xl font-black text-gray-900">2</p>
                <p className="text-[10px] font-bold uppercase text-gray-400 mt-1">Pending</p>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A] rounded-2xl p-6 border border-[#2D2D2D] shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-[#FFD300] flex items-center justify-center">
                  <FiCpu />
                </div>
                <h3 className="font-bold text-[#FFD300]">AI Optimizer</h3>
              </div>
              
              <p className="text-sm text-gray-300 font-medium leading-relaxed mb-5">
                You have an upcoming Math assignment tomorrow. I recommend adding a 45-minute focused study block tonight at 7:00 PM.
              </p>
              
              <button className="w-full py-2.5 bg-[#FFD300] text-[#1A1A1A] font-extrabold rounded-xl shadow-[0_4px_15px_rgba(255,211,0,0.3)] hover:scale-[1.02] transition-transform">
                Apply Recommendation
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentPlanner;
