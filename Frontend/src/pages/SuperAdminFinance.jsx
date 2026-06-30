import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiDownload, 
  FiAlertCircle, 
  FiUsers, 
  FiPieChart,
  FiMail
} from 'react-icons/fi';

const collectionData = [
  { name: 'May', collected: 4200000, outstanding: 120000 },
  { name: 'Jun', collected: 4350000, outstanding: 150000 },
  { name: 'Jul', collected: 4100000, outstanding: 250000 },
  { name: 'Aug', collected: 4400000, outstanding: 90000 },
  { name: 'Sep', collected: 4500000, outstanding: 110000 },
  { name: 'Oct', collected: 2100000, outstanding: 2400000 }, // Current month, still collecting
];

const defaulters = [
  { id: 1, name: 'Ali Khan', grade: 'Class 10-A', parent: 'Mr. Khan', phone: '0300-1234567', amount: 'Rs. 15,000', months: 1 },
  { id: 2, name: 'Zainab Bibi', grade: 'Class 9-B', parent: 'Mr. Tariq', phone: '0333-7654321', amount: 'Rs. 30,000', months: 2 },
  { id: 3, name: 'Omar Farooq', grade: 'Class 8-A', parent: 'Mr. Farooq', phone: '0345-9988776', amount: 'Rs. 15,000', months: 1 },
];

const SuperAdminFinance = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1E1E1E] flex items-center gap-3">
            <FiPieChart className="text-[#FFD300]" /> Financial Dashboard
          </h1>
          <p className="text-slate-500 mt-2 text-sm max-w-2xl">
            Track revenue, outstanding dues, and manage fee collections across the entire school.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#1E1E1E] hover:bg-black text-[#FFD300] px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md">
          <FiDownload /> Export Accounts Report
        </button>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-10"></div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600"><FiDollarSign /></div>
            <h3 className="font-bold text-slate-500 text-xs uppercase tracking-wider">Collected (Oct)</h3>
          </div>
          <p className="text-3xl font-black text-[#1E1E1E]">Rs. 2.1M</p>
          <p className="text-sm font-semibold text-emerald-600 mt-2 flex items-center gap-1"><FiTrendingUp /> 46% of expected</p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-rose-200 shadow-sm relative overflow-hidden shadow-rose-100">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-full -z-10"></div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-rose-100 p-2 rounded-lg text-rose-600"><FiAlertCircle /></div>
            <h3 className="font-bold text-rose-600 text-xs uppercase tracking-wider">Outstanding Dues</h3>
          </div>
          <p className="text-3xl font-black text-rose-600">Rs. 2.4M</p>
          <p className="text-sm font-semibold text-slate-500 mt-2">Across 160 students</p>
        </div>

        <div className="bg-[#1E1E1E] rounded-2xl p-6 border border-gray-800 shadow-sm relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl -mr-10 -mt-10"></div>
          <div className="flex items-center gap-3 mb-2 relative z-10">
            <div className="bg-[#FFD300]/20 p-2 rounded-lg text-[#FFD300]"><FiTrendingUp /></div>
            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider">Projected Revenue</h3>
          </div>
          <p className="text-3xl font-black text-white relative z-10">Rs. 4.5M</p>
          <p className="text-sm font-semibold text-[#FFD300] mt-2 relative z-10">Expected by Oct 31</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-[#1E1E1E] mb-6 flex items-center gap-2">
          <FiTrendingUp className="text-indigo-500" /> Fee Collection vs. Outstanding (6 Months)
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={collectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#888' }} 
                tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
              />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                formatter={(value) => `Rs. ${(value).toLocaleString()}`}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="collected" name="Collected" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              <Bar dataKey="outstanding" name="Outstanding" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Defaulters Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-rose-50/30">
          <h2 className="text-lg font-bold text-rose-700 flex items-center gap-2">
            <FiAlertCircle className="text-rose-500" /> Action Required: Pending Dues
          </h2>
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
            View All (160)
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Student Info</th>
                <th className="px-6 py-4">Parent Contact</th>
                <th className="px-6 py-4">Pending Months</th>
                <th className="px-6 py-4">Amount Due</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {defaulters.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.grade}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-slate-700 text-sm">{item.parent}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-bold ${item.months > 1 ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                      {item.months} {item.months === 1 ? 'Month' : 'Months'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-black text-rose-600 text-sm">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors tooltip" title="Send SMS Reminder">
                        <FiMail />
                      </button>
                      <button className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors tooltip" title="Download Challan">
                        <FiDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default SuperAdminFinance;
