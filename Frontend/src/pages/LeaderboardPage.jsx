import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FiArrowUp, FiTarget } from 'react-icons/fi';
import { FaCrown, FaTrophy } from 'react-icons/fa';

const firstNames = ['Ali', 'Sarah', 'Ahmed', 'Zainab', 'Omar', 'Fatima', 'Hassan', 'Ayesha', 'Bilal', 'Zara', 'Hamza', 'Noor', 'Usman', 'Hira', 'Saad', 'Maryam', 'Tariq', 'Sana', 'Ibrahim', 'Maha', 'Kamran', 'Nida', 'Daniyal', 'Rabia', 'Farhan', 'Hafsa', 'Adil', 'Khadija', 'Raza', 'Anum'];
const lastNames = ['Khan', 'Malik', 'Raza', 'Bibi', 'Farooq', 'Noor', 'Ali', 'Ahmed', 'Shah', 'Hussain', 'Iqbal', 'Tariq', 'Mahmood', 'Abbas', 'Sheikh', 'Dar', 'Bukhari', 'Siddiqui', 'Qureshi', 'Baig'];

const generateMockData = (count, startXp) => {
  return Array.from({ length: count }, (_, i) => {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const isMale = Math.random() > 0.5;
    const avatar = `https://randomuser.me/api/portraits/${isMale ? 'men' : 'women'}/${Math.floor(Math.random() * 90)}.jpg`;
    
    // Calculate trend
    const trendValue = Math.floor(Math.random() * 20) + 1;
    const isUp = Math.random() > 0.3;
    
    return {
      id: `user-${i}-${Math.random().toString(36).substring(7)}`,
      name: `${fn} ${ln}`,
      avatar,
      xp: startXp - (i * Math.floor(Math.random() * 150 + 50)),
      trend: isUp ? trendValue : -trendValue,
    };
  }).sort((a, b) => b.xp - a.xp);
};

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = parseInt(value, 10);
    if (isNaN(end)) return;
    
    const duration = 600;
    const incrementTime = 20;
    const totalSteps = duration / incrementTime;
    const step = (end - start) / totalSteps;

    if (Math.abs(end - start) < 1) {
      setDisplayValue(end);
      return;
    }

    const timer = setInterval(() => {
      start += step;
      if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('class');
  
  const initialClassData = useMemo(() => generateMockData(60, 5000), []);
  const initialGlobalData = useMemo(() => generateMockData(150, 25000), []);

  const [classData, setClassData] = useState(initialClassData);
  const [globalData, setGlobalData] = useState(initialGlobalData);

  useEffect(() => {
    const hasSeenConfetti = sessionStorage.getItem('leaderboardConfetti');
    if (!hasSeenConfetti) {
      const duration = 2500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 80,
          origin: { x: 0 },
          colors: ['#FFD300', '#FF8C00', '#1E1E1E', '#FFFFFF']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 80,
          origin: { x: 1 },
          colors: ['#FFD300', '#FF8C00', '#1E1E1E', '#FFFFFF']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
      sessionStorage.setItem('leaderboardConfetti', 'true');
    }
  }, []);

  // Live Simulation Engine
  useEffect(() => {
    const interval = setInterval(() => {
      const isClassTab = activeTab === 'class';
      const setData = isClassTab ? setClassData : setGlobalData;
      
      setData(prevData => {
        const newData = [...prevData];
        const numToUpdate = Math.floor(Math.random() * 4) + 1;
        
        for (let i = 0; i < numToUpdate; i++) {
          const targetIdx = Math.floor(Math.random() * Math.min(25, newData.length));
          const xpGain = Math.floor(Math.random() * 250) + 50; 
          
          newData[targetIdx] = {
            ...newData[targetIdx],
            xp: newData[targetIdx].xp + xpGain,
            trend: Math.floor(Math.random() * 10) + 1 
          };
        }
        
        return newData.sort((a, b) => b.xp - a.xp);
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [activeTab]);

  const currentData = activeTab === 'class' ? classData : globalData;
  const podiumTop = currentData[0];
  const podiumSecond = currentData[1];
  const podiumThird = currentData[2];
  const listData = currentData.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFBE6] via-[#FFFdf0] to-[#FFF9D6] font-sans">
      <div className="pb-16 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4">
        
        {/* Sleek, Transparent Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-2 z-50 relative">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1E1E1E] tracking-tight flex items-center gap-2 shrink-0">
              Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD300] to-[#FF8C00] drop-shadow-sm">Excellence</span>
            </h1>
            
            {/* User Rank Display */}
            <div className="flex items-center bg-white/80 backdrop-blur-sm border border-[#FFD300]/30 rounded-full shadow-sm overflow-hidden mt-1 sm:mt-0">
              <div className="px-3 py-1 flex items-center gap-1.5">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Class</span>
                <span className="text-[#1E1E1E] text-sm font-black">#12</span>
              </div>
              <div className="w-[1px] h-3 bg-slate-300"></div>
              <div className="px-3 py-1 flex items-center gap-1.5">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Global</span>
                <span className="text-[#FF8C00] text-sm font-black">#142</span>
              </div>
            </div>
          </div>

          {/* Sleek Tab Switcher using Logo Theme */}
          <div className="bg-white/60 backdrop-blur-md p-1 rounded-xl flex w-full sm:w-auto shrink-0 shadow-inner border border-[#FFD300]/20">
            <button
              onClick={() => setActiveTab('class')}
              className={`relative flex-1 sm:w-28 py-1.5 px-2 text-center text-xs md:text-sm font-bold rounded-lg transition-all duration-300 z-10 ${
                activeTab === 'class' ? 'text-[#1E1E1E]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {activeTab === 'class' && (
                <motion.div layoutId="hero-tab" className="absolute inset-0 bg-[#FFD300] rounded-lg shadow-md z-[-1]" />
              )}
              My Class
            </button>
            <button
              onClick={() => setActiveTab('global')}
              className={`relative flex-1 sm:w-28 py-1.5 px-2 text-center text-xs md:text-sm font-bold rounded-lg transition-all duration-300 z-10 ${
                activeTab === 'global' ? 'text-[#1E1E1E]' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {activeTab === 'global' && (
                <motion.div layoutId="hero-tab" className="absolute inset-0 bg-[#FFD300] rounded-lg shadow-md z-[-1]" />
              )}
              Global League
            </button>
          </div>
        </div>

        {/* Sleek Gamified Podium using Logo Theme Accents */}
        <div className="pt-6 pb-6 flex items-end justify-center gap-2 md:gap-6 relative z-20">
          
          {/* 2nd Place (Silver) */}
          {podiumSecond && (
            <motion.div layout initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 250, damping: 25 }} className="flex flex-col items-center w-28 md:w-44 relative group">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-[4px] border-slate-200 shadow-lg relative z-30 mb-[-1.5rem] md:mb-[-2rem] overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <img src={podiumSecond.avatar} alt={podiumSecond.name} className="w-full h-full object-cover" />
              </div>
              <div className="bg-gradient-to-b from-slate-100 to-slate-200 rounded-[2rem] w-full pt-8 pb-4 px-2 md:pt-10 md:pb-6 md:px-4 shadow-[0_10px_30px_rgba(148,163,184,0.3)] border-2 border-white flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-300 to-slate-400"></div>
                <p className="text-slate-500 font-black text-[10px] md:text-xs tracking-widest uppercase mb-1">2ND PLACE</p>
                <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-0.5 md:mb-1 truncate w-full">{podiumSecond.name}</h3>
                <p className="text-xs md:text-sm font-black text-[#1E1E1E] drop-shadow-sm"><AnimatedNumber value={podiumSecond.xp} /> XP</p>
              </div>
            </motion.div>
          )}

          {/* 1st Place (Logo Theme Gold/Yellow) */}
          {podiumTop && (
            <motion.div layout initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 250, damping: 25 }} className="flex flex-col items-center relative z-30 w-32 md:w-52 group">
              <div className="absolute -top-7 md:-top-9 left-1/2 -translate-x-1/2 text-[#FFD300] text-3xl md:text-5xl z-40 drop-shadow-[0_4px_10px_rgba(255,211,0,0.5)]">
                <FaCrown />
              </div>
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-[5px] border-white shadow-[0_10px_40px_rgba(255,211,0,0.4)] relative z-30 mb-[-2rem] md:mb-[-3rem] overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <img src={podiumTop.avatar} alt={podiumTop.name} className="w-full h-full object-cover" />
              </div>
              <div className="bg-gradient-to-b from-[#FFD300] to-[#FFB700] rounded-[2.5rem] w-full pt-10 pb-5 px-3 md:pt-14 md:pb-8 md:px-6 shadow-[0_20px_50px_rgba(255,211,0,0.4)] border-[3px] border-white flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 group-hover:-translate-y-3">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FFE04D] to-[#FFD300]"></div>
                <p className="text-[#1E1E1E]/70 font-black text-[10px] md:text-xs tracking-widest uppercase mb-1 drop-shadow-sm">1ST PLACE</p>
                <h3 className="text-base md:text-xl font-extrabold text-[#1E1E1E] mb-1 truncate w-full tracking-tight drop-shadow-sm">{podiumTop.name}</h3>
                <p className="text-sm md:text-base font-black text-[#FFD300] bg-[#1E1E1E] px-3 md:px-5 py-0.5 md:py-1 rounded-full shadow-inner"><AnimatedNumber value={podiumTop.xp} /> XP</p>
              </div>
            </motion.div>
          )}

          {/* 3rd Place (Bronze) */}
          {podiumThird && (
            <motion.div layout initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 250, damping: 25 }} className="flex flex-col items-center w-28 md:w-44 relative group">
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-[4px] border-[#FCD34D] shadow-lg relative z-30 mb-[-1.5rem] md:mb-[-2rem] overflow-hidden group-hover:scale-110 transition-transform duration-500">
                <img src={podiumThird.avatar} alt={podiumThird.name} className="w-full h-full object-cover" />
              </div>
              <div className="bg-gradient-to-b from-[#FEF08A] to-[#FBBF24] rounded-[2rem] w-full pt-8 pb-4 px-2 md:pt-10 md:pb-6 md:px-4 shadow-[0_10px_30px_rgba(251,191,36,0.3)] border-2 border-white flex flex-col items-center text-center relative overflow-hidden transition-all duration-500 group-hover:-translate-y-2">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-200 to-yellow-400"></div>
                <p className="text-amber-700 font-black text-[10px] md:text-xs tracking-widest uppercase mb-1">3RD PLACE</p>
                <h3 className="text-sm md:text-lg font-bold text-slate-800 mb-0.5 md:mb-1 truncate w-full">{podiumThird.name}</h3>
                <p className="text-xs md:text-sm font-black text-[#1E1E1E] drop-shadow-sm"><AnimatedNumber value={podiumThird.xp} /> XP</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sleeker, Tighter Pill-Card List Container */}
        <div className="flex flex-col gap-1.5 md:gap-2 relative z-10 w-full pb-10 mt-2">
          {listData.map((row, index) => {
            const actualRank = index + 4;
            const isTrendUp = row.trend >= 0;
            
            return (
              <motion.div 
                layout 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                key={row.id} 
                className="bg-white/90 backdrop-blur-sm rounded-xl border border-[#FFD300]/20 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_15px_rgba(255,211,0,0.15)] hover:border-[#FFD300]/50 transition-all p-1.5 pr-3 md:p-2 md:pr-3 flex items-center justify-between group"
              >
                {/* Left Side: Rank + Avatar + Name */}
                <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                  <div className="w-8 md:w-10 text-center shrink-0">
                    <span className="font-extrabold text-slate-300 text-sm md:text-lg group-hover:text-[#FFD300] transition-colors">
                      {actualRank}
                    </span>
                  </div>
                  
                  <div className="relative w-8 h-8 md:w-9 md:h-9 shrink-0">
                    <img src={row.avatar} alt={row.name} className="w-full h-full rounded-full border border-white shadow-sm object-cover" />
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[#1E1E1E] text-xs md:text-sm truncate group-hover:text-[#FF8C00] transition-colors tracking-tight">{row.name}</p>
                  </div>
                </div>
                
                {/* Right Side: XP + Trend */}
                <div className="flex items-center gap-2 md:gap-3 shrink-0">
                  <div className="font-black text-[#1E1E1E] text-xs md:text-sm w-16 md:w-20 text-right">
                    <AnimatedNumber value={row.xp} /> <span className="text-[8px] md:text-[9px] text-slate-400 font-bold uppercase tracking-wider">XP</span>
                  </div>
                  
                  <div className={`hidden sm:flex items-center gap-1 px-1.5 py-0.5 md:px-2 md:py-1 rounded-md text-[10px] md:text-[11px] font-black w-10 md:w-12 justify-center shadow-inner ${
                    isTrendUp ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-500 border border-rose-100'
                  }`}>
                    {Math.abs(row.trend)} 
                    {isTrendUp ? <FiArrowUp className="stroke-[4] text-[10px]" /> : <FiArrowUp className="stroke-[4] text-[10px] rotate-180" />}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
