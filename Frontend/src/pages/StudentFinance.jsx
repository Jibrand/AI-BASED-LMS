import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDollarSign, 
  FiDownload, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiClock, 
  FiFileText,
  FiCreditCard
} from 'react-icons/fi';

const mockPaymentHistory = [
  { id: 1, month: 'September 2026', amount: 'Rs. 15,000', status: 'Paid', date: 'Sep 05, 2026', receipt: 'REC-0926-442' },
  { id: 2, month: 'August 2026', amount: 'Rs. 15,000', status: 'Paid', date: 'Aug 04, 2026', receipt: 'REC-0826-118' },
  { id: 3, month: 'July 2026', amount: 'Rs. 15,000', status: 'Paid', date: 'Jul 06, 2026', receipt: 'REC-0726-890' },
];

const StudentFinance = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadChallan = () => {
    setIsDownloading(true);
    // Simulate PDF generation delay for demo
    setTimeout(() => {
      setIsDownloading(false);
      alert('Fee Challan downloaded successfully! (Demo)');
    }, 1500);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-[#1E1E1E] flex items-center gap-3">
          <FiDollarSign className="text-emerald-500" /> Fees & Payments
        </h1>
        <p className="text-slate-500 mt-2 text-sm max-w-2xl">
          View your current fee status, download challans for the bank, and check your payment history.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Current Status */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Current Fee Status Card (UNPAID STATE) */}
          <div className="bg-white rounded-2xl border-2 border-rose-200 shadow-lg shadow-rose-100/50 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-10"></div>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Current Month</p>
                <h2 className="text-xl font-extrabold text-slate-800">October 2026</h2>
              </div>
              <div className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-sm border border-rose-200">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                UNPAID
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-500 mb-1">Amount Due</p>
              <h3 className="text-4xl font-black text-rose-600">Rs. 15,000</h3>
              <p className="text-sm font-bold text-rose-500 mt-2 flex items-center gap-1.5 bg-rose-50 w-max px-2 py-1 rounded-md">
                <FiClock /> Due Date: Oct 10, 2026
              </p>
            </div>

            <button 
              onClick={handleDownloadChallan}
              disabled={isDownloading}
              className={`w-full flex justify-center items-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 ${
                isDownloading 
                  ? 'bg-slate-200 text-slate-500 cursor-wait' 
                  : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30'
              }`}
            >
              {isDownloading ? (
                <>Generating PDF...</>
              ) : (
                <><FiDownload className="text-lg" /> Download Fee Challan</>
              )}
            </button>
            <p className="text-xs text-center text-slate-400 mt-3 font-medium">
              Print this challan and pay at any branch of Meezan Bank or HBL.
            </p>
          </div>

          {/* Quick Info */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 className="font-bold text-slate-700 text-sm mb-3 flex items-center gap-2">
              <FiAlertCircle className="text-amber-500" /> Payment Policy
            </h3>
            <ul className="text-xs text-slate-500 space-y-2 list-disc list-inside font-medium">
              <li>A late fee of Rs. 500 applies after the due date.</li>
              <li>Allow 24-48 hours for bank payments to reflect here.</li>
              <li>For finance issues, contact accounts@school.edu.pk.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold text-[#1E1E1E] flex items-center gap-2">
                <FiFileText className="text-blue-500" /> Payment History
              </h2>
            </div>

            <div className="p-0 overflow-y-auto custom-scrollbar flex-1">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wider font-bold sticky top-0 z-10 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Fee Month</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Paid On</th>
                    <th className="px-6 py-4">Receipt</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Current Unpaid Row */}
                  <tr className="bg-rose-50/30">
                    <td className="px-6 py-4 font-bold text-slate-800 text-sm">October 2026</td>
                    <td className="px-6 py-4 font-bold text-rose-600 text-sm">Rs. 15,000</td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-medium">-</td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-medium">-</td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-600 px-2.5 py-1 rounded text-xs font-bold">
                        Pending
                      </span>
                    </td>
                  </tr>
                  
                  {/* Past Paid Rows */}
                  {mockPaymentHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-700 text-sm">{item.month}</td>
                      <td className="px-6 py-4 font-bold text-slate-700 text-sm">{item.amount}</td>
                      <td className="px-6 py-4 text-xs text-slate-500 font-medium">{item.date}</td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">{item.receipt}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded text-xs font-bold">
                          <FiCheckCircle /> {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentFinance;
