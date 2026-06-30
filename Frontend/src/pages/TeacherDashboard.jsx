import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  FiUsers, FiBook, FiFolder, FiCheckSquare, FiPieChart, FiCpu, 
  FiPlus, FiUpload, FiFileText, FiAlertCircle, FiClock,
  FiArrowRight
} from 'react-icons/fi';

const classPerformanceData = [
  { name: 'Class A', score: 89 },
  { name: 'Class B', score: 81 },
  { name: 'Class C', score: 75 },
  { name: 'Class D', score: 92 },
];

const TeacherDashboard = () => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Welcome Section */}
      <div className="bg-[#2D2D2D] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 text-white">Good Morning, Sarah</h1>
            <p className="text-gray-300 text-sm font-medium">Your students completed <span className="text-primary font-bold">87 quizzes</span> this week.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-primary text-[#2D2D2D] px-5 py-2.5 rounded-lg font-bold hover:bg-[#FFD300]/90 transition-colors shadow-[0_4px_14px_rgba(255,211,0,0.3)]">
              <FiPlus /> Create Assignment
            </button>
            <button className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-colors">
              <FiUpload /> Upload Notes
            </button>
            <button className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-colors">
              <FiFileText /> Generate Quiz
            </button>
          </div>
        </div>
      </div>

      {/* 2. Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: FiUsers, label: 'Students', value: '124', color: 'text-blue-500', bg: 'bg-blue-50' },
          { icon: FiBook, label: 'Classes', value: '4', color: 'text-orange-500', bg: 'bg-orange-50' },
          { icon: FiFolder, label: 'Assignments', value: '12', color: 'text-pink-500', bg: 'bg-pink-50' },
          { icon: FiCheckSquare, label: 'Pending Reviews', value: '38', color: 'text-red-500', bg: 'bg-red-50' },
          { icon: FiPieChart, label: 'Avg Class Score', value: '84%', color: 'text-green-500', bg: 'bg-green-50' },
          { icon: FiCpu, label: 'AI Usage', value: '890', color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform">
            <div className={`p-3 rounded-full ${stat.bg} ${stat.color} mb-3`}>
              <stat.icon className="text-xl" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* 3. AI Assistant & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* AI Assistant Widget */}
        <div className="bg-gradient-to-br from-[#2D2D2D] to-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
            <FiCpu className="text-primary" /> AI Assistant
          </h2>
          <div className="space-y-3 relative z-10">
            {['Generate Lesson Plan', 'Create Homework', 'Summarize Notes', 'Create Exam'].map((s, i) => (
              <button key={i} className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-sm text-gray-200 transition-colors flex items-center justify-between">
                <span>{s}</span>
                <FiArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <button className="w-full mt-4 bg-primary text-[#2D2D2D] py-2.5 rounded-lg font-bold hover:bg-[#FFD300]/90 transition-colors relative z-10 shadow-[0_0_15px_rgba(255,211,0,0.2)]">
            Open AI Assistant
          </button>
        </div>

        {/* AI Insights */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiAlertCircle className="text-primary" /> AI Class Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><FiAlertCircle /></div>
              <div>
                <p className="text-xs text-orange-600 font-bold uppercase tracking-wide">Attention</p>
                <p className="text-sm font-medium text-gray-900 mt-1">12 students struggling with Algebra concepts from Chapter 4.</p>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-100 flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded-lg text-red-600"><FiClock /></div>
              <div>
                <p className="text-xs text-red-600 font-bold uppercase tracking-wide">Pending</p>
                <p className="text-sm font-medium text-gray-900 mt-1">18 students haven't completed this week's Physics assignment.</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><FiPieChart /></div>
              <div>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Engagement</p>
                <p className="text-sm font-medium text-gray-900 mt-1">Class B engagement dropped by 8% this week.</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-600"><FiCheckSquare /></div>
              <div>
                <p className="text-xs text-green-600 font-bold uppercase tracking-wide">Positive</p>
                <p className="text-sm font-medium text-gray-900 mt-1">Class A average score improved by 12% after the last AI Quiz.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Class Performance Charts */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiPieChart className="text-primary" /> Class Performance Averages
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
              <Tooltip 
                cursor={{ fill: '#f9f9f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#2D2D2D', fontWeight: 'bold' }}
              />
              <Bar dataKey="score" fill="#FFD300" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Student Performance Table */}
      <div className="bg-white rounded-2xl p-0 border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FiUsers className="text-primary" /> Student Performance
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Average</th>
                <th className="p-4 font-semibold">Attendance</th>
                <th className="p-4 font-semibold">AI Usage</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4 font-medium text-gray-900">Ali Khan</td>
                <td className="p-4 text-gray-600 font-bold">92%</td>
                <td className="p-4 text-gray-600">98%</td>
                <td className="p-4 text-gray-600">High</td>
                <td className="p-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">Excellent</span></td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                <td className="p-4 font-medium text-gray-900">Ahmed Raza</td>
                <td className="p-4 text-gray-600 font-bold text-red-500">65%</td>
                <td className="p-4 text-gray-600">82%</td>
                <td className="p-4 text-gray-600">Low</td>
                <td className="p-4"><span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-xs font-bold">Needs Attention</span></td>
              </tr>
              <tr className="hover:bg-gray-50/50">
                <td className="p-4 font-medium text-gray-900">Sarah Malik</td>
                <td className="p-4 text-gray-600 font-bold">88%</td>
                <td className="p-4 text-gray-600">95%</td>
                <td className="p-4 text-gray-600">Medium</td>
                <td className="p-4"><span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">Good</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default TeacherDashboard;
