import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  FiPlay, FiMessageSquare, FiFileText, FiTarget, FiClock, FiCalendar, 
  FiZap, FiBookOpen, FiStar, FiCpu, FiCheckSquare, FiTrendingUp, 
  FiArrowRight, FiCheckCircle
} from 'react-icons/fi';

const performanceData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 85 },
  { name: 'Week 4', score: 81 },
  { name: 'Week 5', score: 92 },
];

const StudentDashboard = () => {
  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Welcome Banner */}
      <div className="bg-[#2D2D2D] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold mb-2 text-white">Welcome back, Jibran 👋</h1>
            <p className="text-gray-300 text-sm font-medium">You're <span className="text-yellow-400 font-bold">82% on track</span> to achieve your target grade.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-yellow-400 text-[#2D2D2D] px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-500 transition-colors shadow-[0_4px_14px_rgba(255,211,0,0.3)]">
              <FiPlay /> Continue Learning
            </button>
            <button className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-colors">
              <FiMessageSquare /> Ask AI
            </button>
            <button className="flex items-center gap-2 bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-colors">
              <FiFileText /> Generate Quiz
            </button>
          </div>
        </div>
      </div>

      {/* 2. Today's Focus & AI Tutor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Focus */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiTarget className="text-yellow-500" /> Today's Focus
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><FiBookOpen /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Study Goal</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">Complete Physics Ch. 5</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><FiClock /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Due Today</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">Calculus Assignment 3</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded-lg text-red-600"><FiCalendar /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Next Exam</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">Biology in 12 Days</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-600"><FiZap /></div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Daily Challenge</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">Score 90% in Math Quiz</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Tutor Widget */}
        <div className="bg-gradient-to-br from-[#2D2D2D] to-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl relative overflow-hidden group">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 relative z-10">
            <FiCpu className="text-yellow-400" /> AI Tutor Suggestions
          </h2>
          <div className="space-y-3 relative z-10">
            {['Continue Chapter 5 Physics', 'Revise Algebra', 'Practice 15 MCQs', "Review yesterday's mistakes"].map((s, i) => (
              <button key={i} className="w-full text-left bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-sm text-gray-200 transition-colors flex items-center justify-between">
                <span>{s}</span>
                <FiArrowRight className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <button className="w-full mt-4 bg-yellow-400 text-[#2D2D2D] py-2.5 rounded-lg font-bold hover:bg-yellow-500 transition-colors relative z-10 shadow-[0_0_15px_rgba(255,211,0,0.2)]">
            Open AI Tutor
          </button>
        </div>
      </div>

      {/* 3. Study Progress */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { icon: FiZap, label: 'Study Streak', value: '14 Days', color: 'text-orange-500', bg: 'bg-orange-50' },
          { icon: FiStar, label: 'Total XP', value: '2,450', color: 'text-yellow-500', bg: 'bg-yellow-50' },
          { icon: FiClock, label: 'Hours This Week', value: '18.5h', color: 'text-blue-500', bg: 'bg-blue-50' },
          { icon: FiCpu, label: 'AI Questions', value: '142', color: 'text-purple-500', bg: 'bg-purple-50' },
          { icon: FiCheckSquare, label: 'Quizzes Done', value: '38', color: 'text-green-500', bg: 'bg-green-50' },
          { icon: FiFileText, label: 'Assignments', value: '24', color: 'text-pink-500', bg: 'bg-pink-50' },
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

      {/* 4. Performance Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FiTrendingUp className="text-yellow-500" /> Quiz Score Trend
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#2D2D2D', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="score" stroke="#EAB308" strokeWidth={4} dot={{ r: 6, fill: '#EAB308', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiBookOpen className="text-yellow-500" /> Subject Performance
          </h2>
          <div className="space-y-4 flex-1">
            {[
              { name: 'Math', score: 92, color: 'bg-green-500' },
              { name: 'English', score: 88, color: 'bg-blue-500' },
              { name: 'Physics', score: 81, color: 'bg-yellow-500' },
              { name: 'Chemistry', score: 74, color: 'bg-red-500' },
            ].map(sub => (
              <div key={sub.name}>
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span className="text-gray-700">{sub.name}</span>
                  <span className="text-gray-900 font-bold">{sub.score}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${sub.color} h-2 rounded-full`} style={{ width: `${sub.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Tables & Timelines */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Upcoming Assignments Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-0 border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiFileText className="text-yellow-500" /> Upcoming Assignments
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <th className="p-4 font-semibold">Subject</th>
                  <th className="p-4 font-semibold">Assignment</th>
                  <th className="p-4 font-semibold">Due Date</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">Physics</td>
                  <td className="p-4 text-gray-600">Chapter 5 Problems</td>
                  <td className="p-4 text-gray-600">Tomorrow</td>
                  <td className="p-4"><span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-md text-xs font-bold">Pending</span></td>
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">Math</td>
                  <td className="p-4 text-gray-600">Calculus Worksheet</td>
                  <td className="p-4 text-gray-600">Oct 24</td>
                  <td className="p-4"><span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-bold">Started</span></td>
                </tr>
                <tr className="hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-900">English</td>
                  <td className="p-4 text-gray-600">Essay Draft</td>
                  <td className="p-4 text-gray-600">Oct 26</td>
                  <td className="p-4"><span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">Done</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FiClock className="text-yellow-500" /> Recent Activity
          </h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:h-full before:w-0.5 before:bg-gray-200">
            {[
              { title: 'Completed Physics Quiz', time: '2 hours ago', icon: FiCheckCircle, color: 'text-green-500 bg-green-100' },
              { title: 'Uploaded Assignment', time: '4 hours ago', icon: FiFileText, color: 'text-blue-500 bg-blue-100' },
              { title: 'Asked AI about Calculus', time: 'Yesterday', icon: FiMessageSquare, color: 'text-purple-500 bg-purple-100' },
            ].map((item, i) => (
              <div key={i} className="relative flex items-center gap-4">
                <div className={`w-5 h-5 rounded-full border-2 border-white ${item.color} shrink-0`}></div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;
