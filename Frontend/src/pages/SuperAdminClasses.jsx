import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiSearch, FiFilter, FiMoreVertical, FiArchive, FiEdit, FiUsers, FiMapPin } from 'react-icons/fi';

const mockClasses = [
  { id: 1, name: '10th Grade Math - Sec A', teacher: 'Alice Johnson', school: 'Westside High', students: 32, status: 'Active' },
  { id: 2, name: '11th Grade Physics', teacher: 'Robert Smith', school: 'Northwood Academy', students: 28, status: 'Active' },
  { id: 3, name: 'Advanced Chemistry', teacher: 'Emily Chen', school: 'East Valley High', students: 25, status: 'Archived' },
  { id: 4, name: 'World History', teacher: 'James Wilson', school: 'Westside High', students: 30, status: 'Active' },
];

const SuperAdminClasses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSchool, setFilterSchool] = useState('All Institutions');

  const schools = ['All Institutions', 'Westside High', 'Northwood Academy', 'East Valley High'];

  const filteredClasses = mockClasses.filter(cls => {
    const matchesSearch = cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || cls.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchool = filterSchool === 'All Institutions' || cls.school === filterSchool;
    return matchesSearch && matchesSchool;
  });

  return (
    <div className="space-y-8 pb-12 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
              <FiBook className="text-2xl" />
            </div>
            Global Classes
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Monitor all active batches and classes across every institution.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Classes', value: '1,240', icon: FiBook, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Total Enrolled', value: '28k+', icon: FiUsers, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Active Today', value: '1,105', icon: FiBook, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Avg Size', value: '24', icon: FiUsers, color: 'text-purple-500', bg: 'bg-purple-50' },
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
              placeholder="Search class or teacher..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1 shadow-sm">
            <FiMapPin className="text-gray-400" />
            <select 
              value={filterSchool}
              onChange={(e) => setFilterSchool(e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-gray-600 focus:outline-none py-1.5 cursor-pointer"
            >
              {schools.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Class Name</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Teacher</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Institution</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Students</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredClasses.map((cls, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={cls.id} 
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="p-4 font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{cls.name}</td>
                  <td className="p-4 text-sm font-bold text-gray-600">{cls.teacher}</td>
                  <td className="p-4 text-sm text-gray-500">{cls.school}</td>
                  <td className="p-4 text-sm font-bold text-indigo-600">{cls.students} Enrolled</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${cls.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                      {cls.status}
                    </span>
                  </td>
                  <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg"><FiEdit /></button>
                    <button className="p-2 text-gray-400 hover:text-orange-600 rounded-lg"><FiArchive /></button>
                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg"><FiMoreVertical /></button>
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

export default SuperAdminClasses;
