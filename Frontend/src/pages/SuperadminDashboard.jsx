import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  FiUsers, FiBook, FiPieChart, FiCpu, FiTrendingUp, 
  FiAlertCircle, FiClock, FiCheckSquare, FiArrowRight, FiAward, FiDollarSign
} from 'react-icons/fi';

const schoolPerformanceData = [
  { name: 'Week 1', score: 75 },
  { name: 'Week 2', score: 78 },
  { name: 'Week 3', score: 82 },
  { name: 'Week 4', score: 80 },
  { name: 'Week 5', score: 85 },
];

const SuperadminDashboard = () => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Welcome Section */}
      <div className="bg-[#2D2D2D] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 text-white">School Admin Dashboard</h1>
            <p className="text-gray-300 text-sm font-medium">Your school average score improved by <span className="text-primary font-bold">4%</span> this month.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-primary text-[#2D2D2D] px-5 py-2.5 rounded-lg font-bold hover:bg-[#FFD300]/90 transition-colors shadow-[0_4px_14px_rgba(255,211,0,0.3)]">
              <FiCheckSquare /> View Reports
            </button>
            <button className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-colors">
              <FiUsers /> Manage Users
            </button>
          </div>
        </div>
      </div>

      {/* 2. Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: FiUsers, label: 'Students', value: '1,240', color: 'text-blue-500', bg: 'bg-blue-50' },
          { icon: FiUsers, label: 'Teachers', value: '84', color: 'text-orange-500', bg: 'bg-orange-50' },
          { icon: FiBook, label: 'Classes', value: '42', color: 'text-pink-500', bg: 'bg-pink-50' },
          { icon: FiClock, label: 'Avg Attendance', value: '94%', color: 'text-green-500', bg: 'bg-green-50' },
          { icon: FiPieChart, label: 'School Avg Score', value: '82%', color: 'text-yellow-500', bg: 'bg-yellow-50' },
          { icon: FiDollarSign, label: 'Monthly Revenue', value: 'Rs. 2.1M', color: 'text-emerald-500', bg: 'bg-emerald-50' },
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
        
        {/* AI Admin Widget */}
        <div className="bg-gradient-to-br from-[#2D2D2D] to-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
            <FiCpu className="text-primary" /> AI Admin Assistant
          </h2>
          <div className="space-y-3 relative z-10">
            {['Generate School Report', 'Identify Struggling Classes', 'Review Attendance Trends', 'Optimize Schedules'].map((s, i) => (
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

        {/* AI School Insights */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiAlertCircle className="text-primary" /> AI School Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100 flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><FiAlertCircle /></div>
              <div>
                <p className="text-xs text-orange-600 font-bold uppercase tracking-wide">Attention</p>
                <p className="text-sm font-medium text-gray-900 mt-1">Grade 10 Science classes are showing a 5% drop in average scores this month.</p>
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-100 flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded-lg text-red-600"><FiClock /></div>
              <div>
                <p className="text-xs text-red-600 font-bold uppercase tracking-wide">Pending</p>
                <p className="text-sm font-medium text-gray-900 mt-1">12 teachers have not submitted their weekly lesson plans.</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><FiUsers /></div>
              <div>
                <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Engagement</p>
                <p className="text-sm font-medium text-gray-900 mt-1">Student AI usage increased by 15% during exam preparation week.</p>
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-600"><FiTrendingUp /></div>
              <div>
                <p className="text-xs text-green-600 font-bold uppercase tracking-wide">Positive</p>
                <p className="text-sm font-medium text-gray-900 mt-1">Overall school attendance has remained consistently above 94%.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Analytics & Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* School Performance Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiTrendingUp className="text-primary" /> School Average Score Trend
            </h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={schoolPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#2D2D2D', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="score" stroke="#FFD300" strokeWidth={4} dot={{ r: 6, fill: '#FFD300', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Teachers */}
        <div className="bg-white rounded-2xl p-0 border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiAward className="text-primary" /> Top Teachers
            </h2>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <th className="p-4 font-semibold">Teacher</th>
                  <th className="p-4 font-semibold">Class Avg</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">Mr. Roberts</td>
                  <td className="p-4 text-green-600 font-bold">92%</td>
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">Mrs. Davis</td>
                  <td className="p-4 text-green-600 font-bold">89%</td>
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">Ms. Taylor</td>
                  <td className="p-4 text-green-600 font-bold">87%</td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">Mr. Lee</td>
                  <td className="p-4 text-green-600 font-bold">85%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SuperadminDashboard;
