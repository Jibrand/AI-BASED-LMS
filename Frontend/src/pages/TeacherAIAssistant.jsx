import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCpu, FiSidebar, FiFileText, FiBarChart2, FiPlus, FiMessageSquare, FiX, FiPaperclip, FiImage, FiMic } from 'react-icons/fi';

const mockHistory = [
  { id: 1, title: 'Draft Solar System Quiz', date: 'Today' },
  { id: 2, title: 'Grade 10A Essays', date: 'Yesterday' },
  { id: 3, title: 'Message Parents regarding field trip', date: 'Oct 14' },
  { id: 4, title: 'Lesson Plan: Algebra', date: 'Oct 12' },
];

const mockChat = [
  { id: 1, sender: 'user', text: "Can you help me plan the next class for 8A? We're starting the Solar System." },
  { id: 2, sender: 'ai', text: "Absolutely! For the Solar System introduction, I recommend starting with a visual presentation of the planets, followed by a short interactive quiz. Shall I draft the lesson plan and generate the presentation outline?" },
  { id: 3, sender: 'user', text: "Yes, and include this reference diagram I found.", attachment: { type: 'image', url: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', name: 'solar_system_diagram.jpg' } },
  { id: 4, sender: 'ai', text: "That diagram is perfect for showing planetary orbits. I've incorporated it into the lesson plan and created a presentation outline.", type: 'document', documentTitle: 'LessonPlan_SolarSystem_8A.pdf', documentType: 'Lesson Plan' },
  { id: 5, sender: 'user', text: "Looks great. Now create an assignment based on this lesson for them to do over the weekend." },
  { id: 6, sender: 'ai', text: "Drafting assignment...\n\nI have created a 5-question research assignment where students must pick a planet and describe its composition and orbit. Would you like to review the rubric?" },
  { id: 7, sender: 'user', text: "Yes, but I also want to attach this syllabus document so they know the reading requirements.", attachment: { type: 'doc', name: 'Science_Syllabus_Term2.pdf', size: '2.4 MB' } },
  { id: 8, sender: 'ai', text: "Syllabus attached successfully. Here is the generated rubric for the assignment:", type: 'document', documentTitle: 'Grading_Rubric_Planets.pdf', documentType: 'Rubric' },
  { id: 9, sender: 'user', text: "Assign this to Class 8A for this Friday at 5 PM." },
  { id: 10, sender: 'ai', text: "**Assignment Ready**\n\n**Title:** Planetary Research\n**Class:** 8A\n**Due Date:** Friday, 5:00 PM\n**Attachments:** Science_Syllabus_Term2.pdf\n\nI have queued this assignment. Would you like me to confirm and schedule it?", hasAction: true },
];

const TeacherAIAssistant = () => {
  const [messages, setMessages] = useState(mockChat);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'ai',
        text: "I am your teaching assistant! Since this is a demo, I cannot process live requests right now, but I can help with grading, lesson planning, and student insights."
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-7rem)] flex gap-0 md:gap-6 relative">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm z-30 lg:hidden rounded-2xl"
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 224, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute left-0 lg:relative z-40 h-full flex flex-col bg-white rounded-2xl border border-gray-100 shadow-2xl lg:shadow-sm overflow-hidden shrink-0"
          >
            <div className="w-full flex flex-col h-full">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
                <h2 className="font-bold text-gray-900 flex items-center gap-2">
                  <FiMessageSquare className="text-purple-600" /> History
                </h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:shadow-sm transition-all" title="New Chat">
                    <FiPlus />
                  </button>
                  <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-900 hover:shadow-sm transition-all" title="Close Sidebar">
                    <FiX />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {mockHistory.map((chat, i) => (
                  <button 
                    key={chat.id} 
                    className={`w-full text-left p-3 rounded-xl transition-colors text-sm ${i === 0 ? 'bg-[#2D2D2D] text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <p className="font-bold truncate">{chat.title}</p>
                    <p className={`text-[10px] uppercase tracking-wider mt-1 ${i === 0 ? 'text-gray-400' : 'text-gray-400'}`}>{chat.date}</p>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex gap-4 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 mt-1 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-gray-900 text-white' : 'bg-purple-600 text-white'}`}>
                {msg.sender === 'user' ? 'JS' : <FiCpu className="text-sm" />}
              </div>
              <div className={`flex flex-col gap-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-3 py-2.5 md:px-4 md:py-3 rounded-2xl text-xs md:text-[13px] font-medium leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-[#2D2D2D] text-white rounded-tr-sm' 
                    : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'
                }`}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.includes('**') ? (
                        <span dangerouslySetInnerHTML={{__html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-gray-900 bg-gray-100 px-1 py-0.5 rounded">$1</strong>')}} />
                      ) : line.includes('`') ? (
                        <span dangerouslySetInnerHTML={{__html: line.replace(/`(.*?)`/g, '<code class="bg-purple-50 text-purple-600 px-1 py-0.5 rounded">$1</code>')}} />
                      ) : line}
                      {i < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>

                {/* Uploaded Attachment from User */}
                {msg.attachment && msg.attachment.type === 'image' && (
                  <div className="bg-white p-1 md:p-1.5 rounded-2xl shadow-sm border border-gray-100 w-40 md:w-56 relative group cursor-pointer hover:shadow-md transition-shadow">
                    <img src={msg.attachment.url} alt={msg.attachment.name} className="w-full h-24 md:h-32 object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                      <FiImage className="text-white text-xl md:text-2xl drop-shadow-lg" />
                    </div>
                  </div>
                )}

                {msg.attachment && msg.attachment.type === 'doc' && (
                  <div className="bg-white p-2 md:p-2.5 rounded-2xl shadow-sm border border-gray-100 w-40 md:w-56 flex items-center gap-2 cursor-pointer hover:shadow-md transition-shadow group">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
                      <FiFileText className="text-base md:text-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] md:text-xs font-bold text-gray-900 truncate group-hover:text-purple-600 transition-colors">{msg.attachment.name}</p>
                      <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-wider">{msg.attachment.size}</p>
                    </div>
                  </div>
                )}

                {/* AI Document Response */}
                {msg.type === 'document' && (
                  <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 flex items-center gap-3 md:gap-4 w-64 md:w-72 shadow-sm cursor-pointer hover:shadow-md transition-shadow group">
                    <div className="p-2.5 md:p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                      <FiFileText className="text-xl md:text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-xs md:text-sm truncate w-36 md:w-48 group-hover:text-purple-600 transition-colors">{msg.documentTitle}</p>
                      <p className="text-[9px] md:text-xs text-gray-500 font-bold uppercase mt-0.5">{msg.documentType}</p>
                    </div>
                  </div>
                )}

                {msg.hasAction && (
                  <div className="flex gap-2 mt-1">
                    <button className="px-3 py-1.5 md:px-4 md:py-2 bg-purple-600 text-white text-[10px] md:text-xs font-bold rounded-lg shadow-sm hover:bg-purple-700 transition-colors">Confirm & Schedule</button>
                    <button className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-gray-200 text-gray-600 text-[10px] md:text-xs font-bold rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-2 md:p-4 bg-white border-t border-gray-100 shrink-0 relative">
          <div className="relative max-w-4xl mx-auto flex items-center">
            <div className="absolute left-1 md:left-2 flex items-center gap-0 z-10">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-purple-500 hover:text-purple-600 p-1.5 md:p-2 transition-colors rounded-full hover:bg-purple-50" 
                title="Toggle History"
              >
                <FiSidebar className="text-[18px] md:text-[20px]" />
              </button>
              <button className="hidden sm:block text-gray-400 hover:text-gray-600 p-1.5 md:p-2 transition-colors rounded-full hover:bg-gray-100" title="Attach Document">
                <FiPaperclip className="text-[16px] md:text-[18px]" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 p-1.5 md:p-2 transition-colors rounded-full hover:bg-gray-100" title="Upload Image">
                <FiImage className="text-[16px] md:text-[18px]" />
              </button>
            </div>
            
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask AI Assistant for help with grading, planning, or student insights..."
              className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 md:py-3.5 pl-[5.5rem] sm:pl-[7.5rem] pr-[4.5rem] md:pr-24 text-[13px] md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all shadow-inner"
            />
            
            <div className="absolute right-1 md:right-2 flex items-center gap-0.5 md:gap-1.5">
              <button className="text-gray-400 hover:text-purple-600 p-1.5 md:p-2 transition-colors rounded-full hover:bg-purple-50" title="Voice Input">
                <FiMic className="text-[16px] md:text-[18px]" />
              </button>
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed" 
                title="Send Message"
              >
                <FiSend className="mr-0.5 text-sm md:text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherAIAssistant;
