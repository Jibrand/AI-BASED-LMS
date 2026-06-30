import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiFile, FiVideo, FiLink, FiSearch, FiFilter, FiDownload, FiPlus, FiBook } from 'react-icons/fi';

const mockResources = [
  { id: 1, title: 'Chapter 4: Thermodynamics', subject: 'Physics', type: 'PDF', author: 'Mr. Lee', date: 'Oct 12, 2023', size: '2.4 MB', source: 'Teacher' },
  { id: 2, title: 'My Revision Notes - Cell Biology', subject: 'Biology', type: 'Note', author: 'Me', date: 'Oct 14, 2023', size: '12 KB', source: 'Personal' },
  { id: 3, title: 'Calculus Integration Formulas', subject: 'Math', type: 'PDF', author: 'Mr. Roberts', date: 'Oct 10, 2023', size: '1.1 MB', source: 'Teacher' },
  { id: 4, title: 'French Revolution Documentary', subject: 'History', type: 'Video', author: 'Mrs. Davis', date: 'Oct 08, 2023', size: '450 MB', source: 'Teacher' },
  { id: 5, title: 'Essay Structure Template', subject: 'Literature', type: 'Doc', author: 'Ms. Taylor', date: 'Oct 05, 2023', size: '24 KB', source: 'Teacher' },
  { id: 6, title: 'Important History Dates', subject: 'History', type: 'Note', author: 'Me', date: 'Oct 02, 2023', size: '5 KB', source: 'Personal' },
  { id: 7, title: 'Periodic Table High-Res', subject: 'Chemistry', type: 'Image', author: 'Dr. Smith', date: 'Sep 28, 2023', size: '4 MB', source: 'Teacher' },
];

const StudentResources = () => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = mockResources.filter(r => {
    const matchesFilter = filter === 'All' ? true : r.source === filter;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIconForType = (type) => {
    switch(type) {
      case 'PDF': return <FiFile className="text-red-500" />;
      case 'Video': return <FiVideo className="text-purple-500" />;
      case 'Doc': return <FiFile className="text-blue-500" />;
      case 'Note': return <FiBookOpen className="text-primary" />;
      case 'Image': return <FiFile className="text-green-500" />;
      default: return <FiLink className="text-gray-500" />;
    }
  };

  const getBgForType = (type) => {
    switch(type) {
      case 'PDF': return 'bg-red-50';
      case 'Video': return 'bg-purple-50';
      case 'Doc': return 'bg-blue-50';
      case 'Note': return 'bg-[#FFD300]/20';
      case 'Image': return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 text-[#2D2D2D] rounded-xl">
              <FiBook className="text-2xl" />
            </div>
            Resources & Notes
          </h1>
          <p className="text-gray-500 mt-2 font-medium">Access materials uploaded by your teachers and organize your own notes.</p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-[#2D2D2D] text-white px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-800 transition-colors">
          <FiPlus className="text-lg text-primary" /> Create Note
        </button>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        
        {/* Filter Tabs */}
        <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-200 self-start md:self-auto">
          {['All', 'Teacher', 'Personal'].map((tf) => (
            <button
              key={tf}
              onClick={() => setFilter(tf)}
              className={`px-5 py-2 text-sm font-bold rounded-lg transition-all ${
                filter === tf 
                  ? 'bg-white text-[#2D2D2D] shadow-sm border border-gray-200/50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tf === 'Teacher' ? 'Teacher Materials' : tf === 'Personal' ? 'My Notes' : 'All Files'}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredResources.map((res, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={res.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-primary/50 transition-all group flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${getBgForType(res.type)}`}>
                {getIconForType(res.type)}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                res.source === 'Teacher' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-[#FFD300]/10 text-[#2D2D2D] border-[#FFD300]/30'
              }`}>
                {res.source === 'Teacher' ? 'Class Material' : 'Personal Note'}
              </span>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight mb-1">{res.title}</h3>
              <p className="text-xs font-bold text-gray-400 mb-3">{res.subject}</p>
            </div>

            <div className="border-t border-gray-100 pt-4 mt-2 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-gray-500">{res.date}</p>
                <p className="text-[10px] font-bold text-gray-400 mt-0.5">{res.size} • By {res.author}</p>
              </div>
              <button className="w-8 h-8 rounded-full bg-gray-50 hover:bg-primary/20 hover:text-primary flex items-center justify-center text-gray-500 transition-colors">
                <FiDownload />
              </button>
            </div>
          </motion.div>
        ))}

        {filteredResources.length === 0 && (
          <div className="col-span-full bg-gray-50 rounded-2xl p-12 text-center border border-gray-100 border-dashed">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-400">
              <FiSearch className="text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No resources found</h3>
            <p className="text-sm font-medium text-gray-500 mt-1">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default StudentResources;
