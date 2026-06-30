import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiUsers, FiClock, FiCalendar, FiMoreVertical, FiPlus, FiArrowRight, FiTrendingUp } from 'react-icons/fi';

const mockClasses = [
  { id: 1, name: '10th Grade Math', section: 'Section A', schedule: 'Mon, Wed, Fri • 09:00 AM', students: 32, avgGrade: '84% (B)', nextTask: 'Chapter 3 Quiz', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 2, name: '11th Grade Physics', section: 'Section B', schedule: 'Tue, Thu • 11:00 AM', students: 28, avgGrade: '79% (C+)', nextTask: 'Lab Report Due', color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 3, name: '12th Grade Chemistry', section: 'Section A', schedule: 'Mon, Wed • 02:00 PM', students: 25, avgGrade: '88% (B+)', nextTask: 'Midterm Exam', color: 'bg-green-50 text-green-600 border-green-200' },
  { id: 4, name: '10th Grade Math', section: 'Section C', schedule: 'Tue, Thu • 08:00 AM', students: 30, avgGrade: '81% (B-)', nextTask: 'Chapter 3 Quiz', color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 5, name: '9th Grade Science', section: 'Section D', schedule: 'Fri • 10:00 AM', students: 27, avgGrade: '92% (A-)', nextTask: 'Science Fair Draft', color: 'bg-orange-50 text-orange-600 border-orange-200' },
];

const TeacherClasses = () => {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
              <FiBook className="text-2xl" />
            </div>
            My Classes
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Manage your active classes, batches, and their overall performance.</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#2D2D2D] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-800 transition-colors">
          <FiPlus className="text-lg text-blue-400" /> Create New Class
        </button>
      </div>

      {/* Grid of Classes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockClasses.map((cls, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={cls.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group overflow-hidden flex flex-col"
          >
            {/* Card Header */}
            <div className={`p-5 border-b border-gray-100 flex justify-between items-start ${cls.color.split(' ')[0]}`}>
              <div>
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border bg-white shadow-sm ${cls.color.split(' ')[1]} ${cls.color.split(' ')[2]}`}>
                  {cls.section}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-3 group-hover:text-blue-600 transition-colors">{cls.name}</h2>
              </div>
              <button className="text-gray-400 hover:text-gray-900 p-1">
                <FiMoreVertical />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 space-y-4">
              <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <FiClock className="text-gray-400" />
                </div>
                {cls.schedule}
              </div>
              
              <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <FiUsers className="text-gray-400" />
                </div>
                {cls.students} Enrolled Students
              </div>

              <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <FiTrendingUp className="text-gray-400" />
                </div>
                Class Average: <span className="text-gray-900">{cls.avgGrade}</span>
              </div>
            </div>

            {/* Upcoming Task Area */}
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <FiCalendar /> Upcoming
                </p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{cls.nextTask}</p>
              </div>
              
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-colors">
                <FiArrowRight />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Empty State / Add Class Placeholder */}
        <motion.button 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: mockClasses.length * 0.05 }}
          className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 hover:bg-gray-100 hover:border-blue-300 transition-colors min-h-[300px] group"
        >
          <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all mb-4">
            <FiPlus className="text-3xl" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Add New Class</h3>
          <p className="text-sm font-medium text-gray-500 mt-1 text-center">Create a new batch and start adding students.</p>
        </motion.button>
      </div>

    </div>
  );
};

export default TeacherClasses;
