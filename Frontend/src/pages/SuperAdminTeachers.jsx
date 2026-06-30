import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiMoreVertical, FiEdit, FiShieldOff, FiKey, FiUserPlus, FiActivity, FiUserX, FiCheckCircle, FiUser } from 'react-icons/fi';

const mockTeachers = [
  { id: 1, name: 'Mr. Robert Smith', email: 'r.smith@school.edu', school: 'Westside High', classes: 4, joinDate: 'Feb 10, 2022', status: 'Active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' },
  { id: 2, name: 'Ms. Sarah Connor', email: 's.connor@school.edu', school: 'Northwood Academy', classes: 3, joinDate: 'Aug 22, 2023', status: 'Pending', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
  { id: 3, name: 'Dr. Emily Chen', email: 'e.chen@school.edu', school: 'East Valley High', classes: 5, joinDate: 'Jan 15, 2021', status: 'Active', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80' },
  { id: 4, name: 'Mr. James Wilson', email: 'j.wilson@school.edu', school: 'Westside High', classes: 2, joinDate: 'Nov 05, 2022', status: 'Suspended', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
];

const SuperAdminTeachers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredTeachers = mockTeachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || teacher.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active': return 'bg-green-50 text-green-600 border-green-200';
      case 'Suspended': return 'bg-red-50 text-red-600 border-red-200';
      case 'Pending': return 'bg-orange-50 text-orange-600 border-orange-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-200';
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-7xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
              <FiUser className="text-2xl" />
            </div>
            Global Teacher Directory
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Oversee educator accounts, manage permissions, and track active classes.</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#2D2D2D] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-800 transition-colors">
          <FiUserPlus className="text-lg text-indigo-400" /> Onboard Teacher
        </button>
      </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Teachers', value: '845', icon: FiUser, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Active Today', value: '721', icon: FiActivity, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Pending Approval', value: '18', icon: FiCheckCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Total Classes Managed', value: '3,204', icon: FiActivity, color: 'text-blue-500', bg: 'bg-blue-50' },
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
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-sm"
            />
          </div>

          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-1 shadow-sm">
            <FiFilter className="text-gray-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent border-none text-sm font-bold text-gray-600 focus:outline-none py-1.5 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Teacher Identity</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Institution</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Classes</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Status</th>
                <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTeachers.map((teacher, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={teacher.id} 
                  className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={teacher.avatar} alt={teacher.name} className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100" />
                      <div>
                        <p className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{teacher.name}</p>
                        <p className="text-xs text-gray-500">{teacher.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-bold text-gray-700">{teacher.school}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-100">{teacher.classes} Active Classes</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${getStatusBadge(teacher.status)}`}>
                      {teacher.status === 'Active' && <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>}
                      {teacher.status === 'Suspended' && <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>}
                      {teacher.status === 'Pending' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>}
                      {teacher.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Edit Teacher Details">
                        <FiEdit />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Reset Password">
                        <FiKey />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Suspend User">
                        <FiShieldOff />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="More Options">
                        <FiMoreVertical />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filteredTeachers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-gray-500">
                    <FiUser className="text-4xl mx-auto mb-3 text-gray-300" />
                    <p className="font-bold text-gray-900">No teachers found</p>
                    <p className="text-sm mt-1">Try adjusting your search or filters.</p>
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

export default SuperAdminTeachers;
