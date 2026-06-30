import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiDownload, 
  FiPrinter, 
  FiCheckCircle, 
  FiTrendingUp, 
  FiAlertCircle,
  FiAward,
  FiStar,
  FiActivity,
  FiTarget,
  FiZap,
  FiBookOpen,
  FiClock,
  FiUsers
} from 'react-icons/fi';
import { FaGraduationCap, FaCrown, FaMedal } from 'react-icons/fa';

// Mock Data
const mockStudents = [
  { id: 1, name: 'Ali Khan', grade: 'Class 10-A', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', gpa: '3.8', attendance: '96%', rank: 12 },
  { id: 2, name: 'Sarah Malik', grade: 'Class 10-A', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', gpa: '4.0', attendance: '100%', rank: 1 },
  { id: 3, name: 'Ahmed Raza', grade: 'Class 9-B', avatar: 'https://randomuser.me/api/portraits/men/68.jpg', gpa: '3.2', attendance: '85%', rank: 45 },
  { id: 4, name: 'Zainab Bibi', grade: 'Class 10-B', avatar: 'https://randomuser.me/api/portraits/women/12.jpg', gpa: '3.6', attendance: '92%', rank: 24 },
  { id: 5, name: 'Omar Farooq', grade: 'Class 8-A', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', gpa: '2.9', attendance: '78%', rank: 89 },
];

const mockPerformance = [
  { subject: 'Mathematics', type: 'Quiz', score: 92, status: 'Excellent', date: 'Oct 12, 2026' },
  { subject: 'Physics', type: 'Assignment', score: 88, status: 'Good', date: 'Oct 15, 2026' },
  { subject: 'Chemistry', type: 'Lab Report', score: 95, status: 'Excellent', date: 'Oct 18, 2026' },
  { subject: 'English', type: 'Essay', score: 75, status: 'Needs Work', date: 'Oct 22, 2026' },
  { subject: 'History', type: 'Quiz', score: 82, status: 'Good', date: 'Oct 25, 2026' },
];

const mockSubjects = [
  { name: 'Mathematics', score: 94, color: 'bg-blue-500' },
  { name: 'Science', score: 89, color: 'bg-emerald-500' },
  { name: 'Literature', score: 76, color: 'bg-amber-500' },
  { name: 'History', score: 84, color: 'bg-purple-500' },
  { name: 'Computer Sci', score: 98, color: 'bg-indigo-500' },
];

const mockSoftSkills = [
  { name: 'Class Participation', rating: 'Excellent', icon: FiActivity },
  { name: 'Teamwork', rating: 'Good', icon: FiUsers },
  { name: 'Punctuality', rating: 'Excellent', icon: FiClock },
  { name: 'Critical Thinking', rating: 'Good', icon: FiTarget },
];

const mockBadges = [
  { name: 'Math Whiz', icon: FiZap, color: 'text-amber-500 bg-amber-100 border-amber-200' },
  { name: 'Perfect Attendance', icon: FiStar, color: 'text-emerald-500 bg-emerald-100 border-emerald-200' },
  { name: 'Top 5% Global', icon: FaCrown, color: 'text-purple-500 bg-purple-100 border-purple-200' },
];

const SuperAdminReports = () => {
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.grade.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      window.print();
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50 overflow-hidden font-sans">
      
      {/* Print Styles (Hidden in normal view, overrides layout when printing) */}
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            #printable-report, #printable-report * { visibility: visible; }
            #printable-report { 
              position: absolute; 
              left: 0; 
              top: 0; 
              width: 100%; 
              box-shadow: none !important;
              padding: 0 !important;
            }
            .no-print { display: none !important; }
            
            /* Page Break Handling */
            .page-break-before { page-break-before: always; }
            .page-break-inside-avoid { page-break-inside: avoid; }
          }
        `}
      </style>

      {/* Left Column: Controls & Selection (Hidden on Print) */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col no-print shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-extrabold text-slate-800 mb-2">Parent Reports</h2>
          <p className="text-sm text-slate-500 mb-6">Select a student to generate their detailed monthly report.</p>
          
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD300]/50 focus:border-[#FFD300] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
          {filteredStudents.map(student => (
            <button
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-all ${
                selectedStudent.id === student.id 
                  ? 'bg-gradient-to-r from-[#FFD300]/20 to-[#FF8C00]/10 border border-[#FFD300]/50 shadow-sm' 
                  : 'hover:bg-slate-50 border border-transparent'
              }`}
            >
              <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              <div>
                <p className={`text-sm font-bold ${selectedStudent.id === student.id ? 'text-[#1E1E1E]' : 'text-slate-700'}`}>{student.name}</p>
                <p className="text-xs text-slate-500">{student.grade}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Column: Document Workspace */}
      <div className="flex-1 overflow-y-auto bg-slate-200 p-4 md:p-8 flex justify-center custom-scrollbar relative">
        
        {/* Floating Actions */}
        <div className="fixed top-24 right-8 flex gap-3 no-print z-50">
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-[#1E1E1E] hover:bg-black text-[#FFD300] px-6 py-3 rounded-xl font-bold text-sm shadow-2xl shadow-black/20 transition-all active:scale-95 disabled:opacity-70"
          >
            {isDownloading ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                <FiPrinter className="text-lg" />
              </motion.div>
            ) : (
              <FiDownload className="text-lg" />
            )}
            {isDownloading ? 'Generating PDF...' : 'Download Full Report'}
          </button>
        </div>

        {/* The Document Preview */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          key={selectedStudent.id}
          id="printable-report"
          className="bg-white w-full max-w-[850px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-md flex flex-col mb-10"
        >
          {/* Document Header */}
          <div className="bg-[#1E1E1E] text-white p-10 flex items-center justify-between relative overflow-hidden shrink-0">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD300] rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <img src="/logo.png" alt="Hexis" className="h-8 brightness-0 invert" />
                <span className="text-2xl font-black tracking-widest uppercase text-[#FFD300]">HEXIS</span>
              </div>
              <h1 className="text-3xl font-light text-slate-200 mt-6">Comprehensive Performance <span className="font-bold text-white">Report</span></h1>
              <p className="text-[#FFD300] text-sm font-semibold tracking-wider uppercase mt-2">October 2026</p>
            </div>
            
            <div className="relative z-10 text-right">
              <p className="text-slate-400 text-sm">Report ID: #RPT-{Math.floor(Math.random() * 10000)}</p>
              <p className="text-slate-400 text-sm mt-1">Generated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="p-10 flex-1 flex flex-col">
            
            {/* 1. Student Profile Block */}
            <div className="flex items-center gap-6 pb-8 border-b border-slate-200 page-break-inside-avoid">
              <img src={selectedStudent.avatar} alt={selectedStudent.name} className="w-24 h-24 rounded-2xl border-4 border-slate-50 shadow-md" />
              <div className="flex-1">
                <h2 className="text-3xl font-extrabold text-[#1E1E1E]">{selectedStudent.name}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-md text-sm font-bold flex items-center gap-2">
                    <FaGraduationCap /> {selectedStudent.grade}
                  </span>
                  <span className="text-slate-500 text-sm font-medium border-l border-slate-300 pl-4">Student ID: {202600 + selectedStudent.id}</span>
                </div>
              </div>
              {/* Gamification Badge Highlight */}
              <div className="bg-gradient-to-br from-[#FFD300]/20 to-[#FF8C00]/20 border border-[#FFD300]/50 p-4 rounded-xl text-center">
                <FaMedal className="text-[#FF8C00] text-3xl mx-auto mb-1" />
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-600">Global Rank</p>
                <p className="text-2xl font-black text-[#1E1E1E]">#{selectedStudent.rank}</p>
              </div>
            </div>

            {/* 2. Key Metrics Dashboard */}
            <div className="grid grid-cols-2 gap-6 py-8 page-break-inside-avoid">
              <div className="bg-[#FFFDF5] border border-[#FFD300]/30 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FiAward className="text-[#FF8C00]" />
                    <h3 className="font-bold text-slate-600 text-xs uppercase tracking-wider">Overall GPA</h3>
                  </div>
                  <p className="text-4xl font-black text-[#1E1E1E]">{selectedStudent.gpa}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-emerald-600 font-semibold flex items-center gap-1 justify-end"><FiTrendingUp /> Top 15%</p>
                  <p className="text-xs text-slate-400 mt-1">of Class {selectedStudent.grade}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FiCheckCircle className="text-blue-600" />
                    <h3 className="font-bold text-slate-600 text-xs uppercase tracking-wider">Attendance</h3>
                  </div>
                  <p className="text-4xl font-black text-[#1E1E1E]">{selectedStudent.attendance}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 font-semibold flex items-center gap-1 justify-end">24/25 Days</p>
                  <p className="text-xs text-slate-400 mt-1">Present this month</p>
                </div>
              </div>
            </div>

            {/* 3. Expanded AI Performance Dashboard */}
            <div className="mb-10 page-break-inside-avoid relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl"></div>
              <div className="relative p-8 border border-indigo-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                  <h3 className="font-black text-indigo-900 text-xl tracking-tight">AI Diagnostic Dashboard</h3>
                </div>
                
                <p className="text-indigo-900/80 leading-relaxed font-medium mb-6">
                  Based on continuous analysis of {selectedStudent.name}'s quizzes, assignments, and interaction times across all subjects, the AI Tutor has compiled the following diagnostic report.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/60 p-4 rounded-xl border border-indigo-100">
                    <h4 className="font-bold text-emerald-700 mb-2 flex items-center gap-2"><FiCheckCircle /> Key Strengths</h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
                      <li>Exceptional grasp of complex algebraic concepts.</li>
                      <li>High completion rate in Chemistry lab simulations.</li>
                      <li>Consistent and punctual assignment submissions.</li>
                    </ul>
                  </div>
                  <div className="bg-white/60 p-4 rounded-xl border border-indigo-100">
                    <h4 className="font-bold text-rose-700 mb-2 flex items-center gap-2"><FiAlertCircle /> Areas for Focus</h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
                      <li>Struggling with vocabulary in English essays.</li>
                      <li>Historical timeline retention needs improvement.</li>
                      <li>Occasional rushing through multiple-choice quizzes.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 bg-indigo-600 text-white p-5 rounded-xl shadow-inner">
                  <h4 className="font-bold mb-2 flex items-center gap-2 text-indigo-100"><FiTarget /> Recommended Action Plan</h4>
                  <p className="text-sm leading-relaxed text-indigo-50">
                    <strong>For Parents:</strong> Encourage {selectedStudent.name} to spend 15 extra minutes daily on the AI Vocabulary Builder module. Before starting History assignments, have them use the "Concept Mapping" tool in the LMS to visualize timelines.
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Subject Mastery Breakdown (Visual) */}
            <div className="mb-10 page-break-inside-avoid">
              <h3 className="font-extrabold text-[#1E1E1E] text-xl mb-6 flex items-center gap-2">
                <FiBookOpen className="text-[#FFD300]" /> Subject Mastery
              </h3>
              <div className="space-y-5 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                {mockSubjects.map((subject, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-bold text-slate-700 text-sm">{subject.name}</span>
                      <span className="font-black text-slate-900">{subject.score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className={`h-2.5 rounded-full ${subject.color}`} style={{ width: `${subject.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Behavioral & Soft Skills */}
            <div className="mb-10 page-break-inside-avoid">
              <h3 className="font-extrabold text-[#1E1E1E] text-xl mb-6 flex items-center gap-2">
                <FiUsers className="text-[#FFD300]" /> Behavioral & Soft Skills
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockSoftSkills.map((skill, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                    <skill.icon className="mx-auto text-2xl text-slate-400 mb-2" />
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 h-8 flex items-center justify-center">{skill.name}</p>
                    <p className={`font-black ${skill.rating === 'Excellent' ? 'text-emerald-600' : 'text-blue-600'}`}>
                      {skill.rating}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Gamification Badges */}
            <div className="mb-10 page-break-inside-avoid">
              <h3 className="font-extrabold text-[#1E1E1E] text-xl mb-6 flex items-center gap-2">
                <FiAward className="text-[#FFD300]" /> Achievements Earned This Month
              </h3>
              <div className="flex flex-wrap gap-4">
                {mockBadges.map((badge, idx) => (
                  <div key={idx} className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${badge.color}`}>
                    <badge.icon className="text-xl" />
                    <span className="font-bold text-sm text-slate-800">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Detailed Performance Table */}
            <div className="mb-10 page-break-inside-avoid">
              <h3 className="font-extrabold text-[#1E1E1E] text-xl mb-4 border-b-2 border-[#FFD300] inline-block pb-1">Detailed Assessment Records</h3>
              <div className="rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-xs">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Assessment Type</th>
                      <th className="px-6 py-4">Score</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mockPerformance.map((item, idx) => (
                      <tr key={idx} className="bg-white">
                        <td className="px-6 py-4 text-slate-500">{item.date}</td>
                        <td className="px-6 py-4 font-bold text-[#1E1E1E]">{item.subject}</td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className="bg-slate-100 px-2 py-1 rounded text-xs">{item.type}</span>
                        </td>
                        <td className="px-6 py-4 font-black text-indigo-600">{item.score}%</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.score >= 90 ? 'bg-emerald-100 text-emerald-700' :
                            item.score >= 80 ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer / Signatures */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-end page-break-inside-avoid">
              <div>
                <p className="text-xs text-slate-400 font-medium">This is an officially generated document by Hexis LMS.</p>
                <p className="text-xs text-slate-400 font-medium">For inquiries, contact administration.</p>
              </div>
              <div className="text-center w-48">
                <div className="border-b border-slate-400 h-8 mb-2"></div>
                <p className="text-sm font-bold text-[#1E1E1E]">Principal Signature</p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default SuperAdminReports;
