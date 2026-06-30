import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FiBell, FiSearch, FiMenu, FiUser, FiSettings, FiLogOut, FiCheckCircle, FiStar } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const isStudent = location.pathname.startsWith('/student') || location.pathname === '/';
  
  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    toast.success('Logged out successfully');
    setShowUserMenu(false);
  };

  return (
    <header className="h-12 md:h-14 bg-white/80 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center flex-1 gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-[#2D2D2D] transition-colors"
        >
          <FiMenu className="text-lg" />
        </button>
        
        <div className="relative hidden sm:block w-full max-w-sm group">
          <FiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#2D2D2D] transition-colors text-base" />
          <input 
            type="text" 
            placeholder="Search students, resources..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50/80 hover:bg-white border border-gray-200/80 rounded-full text-[13px] font-medium tracking-tight focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        
        {/* Student XP Badge */}
        {isStudent && (
          <div className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-[#2D2D2D] to-gray-900 text-[#FFD300] px-3.5 py-1.5 rounded-full shadow-[0_4px_14px_rgba(255,211,0,0.25)] border border-[#FFD300]/30 mr-2 cursor-pointer hover:scale-105 transition-transform group">
            <FiStar className="fill-[#FFD300] drop-shadow-[0_0_5px_rgba(255,211,0,0.8)] group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-extrabold text-[13px] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD300] to-[#FF8C00]">840 XP</span>
          </div>
        )}

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 text-gray-400 hover:text-[#2D2D2D] hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiBell className="text-lg" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
              >
                <div className="p-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  <button className="text-[11px] text-primary hover:text-[#2D2D2D] font-medium transition-colors">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex gap-3">
                        <div className="mt-0.5"><FiCheckCircle className="text-primary text-base" /></div>
                        <div>
                          <p className="text-[13px] text-gray-800 font-medium">Assignment Graded</p>
                          <p className="text-[12px] text-gray-500 mt-0.5 line-clamp-1">Math Quiz 3 has been graded. Click to view results.</p>
                          <p className="text-[10px] text-gray-400 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-100 text-center">
                  <button className="text-[12px] text-gray-500 hover:text-gray-900 font-medium">View all notifications</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* User Profile Dropdown */}
        <div className="relative" ref={userRef}>
          <div 
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer select-none rounded-full pr-1 pl-2 py-1 hover:bg-gray-50 transition-colors"
          >
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[13px] font-semibold text-[#2D2D2D] leading-none tracking-tight">Jibran Shah</span>
              <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase mt-1">Admin</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-[#2D2D2D] text-xs font-bold shadow-sm ring-2 ring-transparent hover:ring-primary/30 transition-all">
              JS
            </div>
          </div>

          <AnimatePresence>
            {showUserMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 py-1"
              >
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 mb-1 text-left">
                  <p className="text-sm font-semibold text-gray-900">Jibran Shah</p>
                  <p className="text-xs text-gray-500 truncate">jibran@hexis.school</p>
                </div>
                
                <button className="w-full flex items-center px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors text-left group">
                  <FiUser className="text-[16px] flex-shrink-0 mr-3 text-gray-400 group-hover:text-primary" />
                  <span className="truncate whitespace-nowrap">My Profile</span>
                </button>
                <button className="w-full flex items-center px-4 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors text-left group">
                  <FiSettings className="text-[16px] flex-shrink-0 mr-3 text-gray-400 group-hover:text-primary" />
                  <span className="truncate whitespace-nowrap">Account Settings</span>
                </button>
                
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2.5 text-[14px] text-red-600 hover:bg-red-50 transition-colors font-medium text-left group"
                  >
                    <FiLogOut className="text-[16px] flex-shrink-0 mr-3 text-red-500 group-hover:text-red-600" />
                    <span className="truncate whitespace-nowrap">Log out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  );
};

export default Header;
