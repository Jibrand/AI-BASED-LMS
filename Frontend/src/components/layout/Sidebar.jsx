import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiBook, 
  FiMessageSquare, 
  FiCheckSquare, 
  FiPieChart, 
  FiSettings,
  FiChevronDown,
  FiPenTool,
  FiAward,
  FiCalendar,
  FiUsers,
  FiFolder,
  FiDollarSign,
  FiCpu,
  FiHardDrive,
  FiBell,
  FiUser,
  FiDatabase,
  FiCreditCard
} from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(() => {
    if (location.pathname.startsWith('/teacher')) return 'teacher';
    if (location.pathname.startsWith('/superadmin')) return 'superadmin';
    return 'student';
  });
  
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setShowRoleMenu(false);
    navigate(`/${newRole}`);
  };

  const navLinks = {
    student: [
      { name: 'Dashboard', path: '/student', icon: FiHome },
      // { name: 'Homework Solver', path: '/student/homework-solver', icon: FiPenTool },
      { name: 'Quizzes', path: '/student/quizzes', icon: FiCheckSquare },
      { name: 'Assignments', path: '/student/assignments', icon: FiFolder },
      { name: 'Resources', path: '/student/resources', icon: FiBook },
      { name: 'Study Planner', path: '/student/planner', icon: FiCalendar },
      { name: 'Fees & Payments', path: '/student/finance', icon: FiCreditCard },
    ],
    teacher: [
      { name: 'Dashboard', path: '/teacher', icon: FiHome },
      { name: 'Students', path: '/teacher/students', icon: FiUsers },
      { name: 'Classes', path: '/teacher/classes', icon: FiBook },
      { name: 'Assignments', path: '/teacher/assignments', icon: FiFolder },
      { name: 'Submissions', path: '/teacher/submissions', icon: FiCheckSquare },
      { name: 'Quizzes', path: '/teacher/quizzes', icon: FiPenTool },
      { name: 'Announcements', path: '/teacher/announcements', icon: FiBell },
    ],
    superadmin: [
      { name: 'Dashboard', path: '/superadmin', icon: FiHome },
      { name: 'Finance', path: '/superadmin/finance', icon: FiDollarSign },
      { name: 'Students', path: '/superadmin/students', icon: FiUsers },
      { name: 'Teachers', path: '/superadmin/teachers', icon: FiUser },
      { name: 'Classes', path: '/superadmin/classes', icon: FiBook },
      { name: 'Assignments', path: '/superadmin/assignments', icon: FiFolder },
      { name: 'Quizzes', path: '/superadmin/quizzes', icon: FiCheckSquare },
      { name: 'Announcements', path: '/superadmin/announcements', icon: FiBell },
      { name: 'Parent Reports', path: '/superadmin/reports', icon: FiFolder },
      { name: 'Logs', path: '/superadmin/logs', icon: FiHardDrive },
    ]
  };

  const links = navLinks[role];
  const mainLinks = links.filter(l => !l.name.startsWith('AI') && l.name !== 'Leaderboard');
  const aiLinks = links.filter(l => l.name.startsWith('AI'));
  
  // Inject AI Assistant for Teacher and ensure AI Tutor/Usage are tracked
  if (role === 'teacher' && aiLinks.length === 0) {
    aiLinks.push({ name: 'AI Assistant', path: '/teacher/ai-assistant', icon: FiCpu });
    aiLinks.push({ name: 'AI Knowledge Base', path: '/teacher/ai-knowledge', icon: FiDatabase });
  }
  if (role === 'student' && aiLinks.length === 0) {
    aiLinks.push({ name: 'AI Tutor', path: '/student/ai-tutor', icon: FiMessageSquare });
  }
  if (role === 'superadmin' && aiLinks.length === 0) {
    aiLinks.push({ name: 'AI Copilot', path: '/superadmin/ai-copilot', icon: FiCpu });
  }

  const leaderboardLinks = links.filter(l => l.name === 'Leaderboard');
  if (leaderboardLinks.length === 0) {
    leaderboardLinks.push({ name: 'Leaderboard', path: `/${role}/leaderboard`, icon: FiAward });
  }

  const renderLink = (link) => {
    const isAI = link.name.startsWith('AI');
    const isLeaderboard = link.name === 'Leaderboard';

    return (
      <NavLink
        key={link.name}
        to={link.path}
        end={link.path.split('/').length === 2}
        className={({ isActive }) => {
          let baseClasses = `flex items-center text-[12px] font-semibold tracking-tight transition-all duration-300 relative group `;
          
          if (isAI) {
            // High curvature wrapper
            return baseClasses + `rounded-xl ai-sparkle-wrapper p-0 ${isActive ? 'shadow-lg shadow-primary/30' : 'hover:-translate-y-0.5'}`;
          }

          baseClasses += 'rounded-lg px-3 py-2.5 overflow-hidden ';

          if (isLeaderboard) {
            // Light, elegant gold outline for leaderboard
            return baseClasses + (isActive 
              ? 'bg-gradient-to-r from-[#FFD300] to-[#FFD300]/90 text-[#2D2D2D] shadow-lg shadow-[#FFD300]/20 border border-[#FFD300] scale-[1.02]' 
              : 'text-gray-700 bg-white border border-gray-200 hover:border-[#FFD300] hover:bg-[#FFD300]/10 hover:shadow-sm hover:-translate-y-0.5');
          }

          return baseClasses + (isActive 
            ? 'text-white shadow-md shadow-[#2D2D2D]/20' 
            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50');
        }}
      >
        {({ isActive }) => {
          const innerContent = (
            <>
              {!isLeaderboard && isActive && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute inset-0 bg-[#2D2D2D] z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="relative z-10 flex items-center w-full">
                <link.icon className={`text-[16px] flex-shrink-0 mr-2.5 ${isActive ? (isLeaderboard ? 'text-[#2D2D2D]' : 'text-primary') : (isLeaderboard ? 'text-[#FFD300]' : 'text-gray-400 group-hover:text-gray-600 transition-colors')}`} />
                <span className="whitespace-nowrap">{link.name}</span>
              </div>
            </>
          );

          if (isAI) {
            return (
              <div className={`ai-sparkle-content px-3 py-2.5 flex items-center bg-[#2D2D2D]`}>
                <div className="relative z-10 flex items-center w-full">
                  <link.icon className="text-[17px] flex-shrink-0 mr-2.5 text-[#FFD300] animate-juggle drop-shadow-[0_0_6px_rgba(255,211,0,0.6)]" />
                  <span className="whitespace-nowrap font-extrabold bg-gradient-to-r from-[#FFD300] via-[#FFE44D] to-[#FF8C00] bg-clip-text text-transparent">
                    {link.name}
                  </span>
                </div>
              </div>
            );
          }

          return innerContent;
        }}
      </NavLink>
    );
  };

  return (
    <motion.aside 
      initial={false}
      animate={{ 
        width: isOpen ? 180 : 0, 
        opacity: isOpen ? 1 : 0 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white/95 backdrop-blur-2xl border-r border-gray-100 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.01)] z-20 relative h-full overflow-hidden"
    >
      <div className="p-4 flex items-center justify-center border-b border-gray-100/50 h-16 shrink-0 min-w-[180px]">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Hexis LMS" className="h-6 object-contain" />
          <span className="font-bold text-base tracking-widest text-[#2D2D2D] uppercase mt-0.5">HEXIS</span>
        </div>
      </div>

      <div className="p-3 relative min-w-[180px]">
        <button 
          onClick={() => setShowRoleMenu(!showRoleMenu)}
          className="w-full flex items-center justify-between px-3 py-2 bg-gray-50/50 hover:bg-gray-100 rounded-lg text-[12px] font-semibold tracking-tight transition-colors border border-gray-100/50"
        >
          <span className="capitalize text-[#2D2D2D]">{role}</span>
          <FiChevronDown className="text-gray-400 text-xs" />
        </button>

        <AnimatePresence>
          {showRoleMenu && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-14 left-3 right-3 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-xl shadow-gray-200/50 rounded-lg overflow-hidden z-30"
            >
              {['student', 'teacher', 'superadmin'].map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleChange(r)}
                  className={`w-full text-left px-3 py-2 text-[12px] hover:bg-gray-50 transition-colors capitalize flex items-center gap-2 tracking-tight ${role === r ? 'text-[#2D2D2D] font-bold' : 'text-gray-500 font-medium'}`}
                >
                  {r === role && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  {r}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide min-w-[180px]">
        
        {/* Main Nav Links */}
        <nav className="px-3 py-2 space-y-1">
          {mainLinks.map(renderLink)}
        </nav>
        
        <div className="mt-auto px-3 pb-4 flex flex-col gap-4">
          {/* AI Feature Separated */}
          {aiLinks.length > 0 && (
            <div className="space-y-2">
              {aiLinks.map(renderLink)}
            </div>
          )}

          {/* Leaderboard Separated */}
          {leaderboardLinks.length > 0 && (
            <div className="pt-4 border-t border-gray-100/80 space-y-2">
              {leaderboardLinks.map(renderLink)}
            </div>
          )}
        </div>

      </div>
      
      <div className="p-3 border-t border-gray-100/50 min-w-[180px]">
        <button className="flex items-center px-3 py-2 w-full text-gray-500 hover:text-gray-900 transition-colors text-[12px] font-semibold tracking-tight rounded-lg hover:bg-gray-50">
          <FiUser className="text-[15px] flex-shrink-0 mr-2.5" />
          <span>Profile</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
