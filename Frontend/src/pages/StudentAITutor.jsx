import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiSend, FiPaperclip, FiPlus, FiCpu, FiPlay, FiCheckSquare, FiClock, FiImage, FiMic, FiFileText, FiX, FiSidebar } from 'react-icons/fi';

const mockHistory = [
  { id: 1, title: 'Calculus Chain Rule', date: 'Today' },
  { id: 2, title: 'Physics Momentum Quiz', date: 'Yesterday' },
  { id: 3, title: 'History Essay Outline', date: 'Oct 14' },
  { id: 4, title: 'Chemistry Bonding Rules', date: 'Oct 12' },
];

const mockChat = [
  { 
    id: 1, 
    sender: 'user', 
    text: "What was the formula trick Mr. Ali taught us yesterday for Algebra Chapter 4?" 
  },
  { 
    id: 2, 
    sender: 'ai', 
    text: "According to the **Algebra Chapter 4 Notes** uploaded by Mr. Ali yesterday, the trick to remembering the quadratic formula is the 'Negative Boy' story: *A negative boy couldn't decide whether to go to a radical party...*\n\nHe also noted on slide 4 that you should always check if the discriminant is positive first!"
  },
  { 
    id: 3, 
    sender: 'user', 
    text: "I took a picture of my lab manual. I need help balancing this equation.",
    attachment: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80',
      name: 'chemistry_lab_eq.jpg'
    }
  },
  { 
    id: 4, 
    sender: 'ai', 
    text: "I can see the equation: **C3H8 + O2 → CO2 + H2O**. This is a combustion reaction! To balance it, we need to make sure the number of atoms for each element is the same on both sides. Let's balance Carbon first. Add a 3 in front of CO2."
  },
  { 
    id: 5, 
    sender: 'user', 
    text: "Oh okay, so C3H8 + O2 → 3CO2 + 4H2O. And then for oxygen, that means 10 on the right, so 5O2 on the left?" 
  },
  { 
    id: 6, 
    sender: 'ai', 
    text: "Spot on! The balanced equation is **C3H8 + 5O2 → 3CO2 + 4H2O**. Great job. What's next on your list?"
  },
  { 
    id: 7, 
    sender: 'user', 
    text: "Next is Calculus. I'm stuck on this problem. Can you explain the chain rule in simple terms?",
    attachment: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80',
      name: 'calculus_problem_7.jpg'
    }
  },
  { 
    id: 8, 
    sender: 'ai', 
    text: "Of course! Think of the chain rule like an onion. When you take the derivative of a composite function (a function inside another function), you first take the derivative of the 'outside' function, leaving the inside untouched, and then multiply it by the derivative of the 'inside' function.\n\nMathematically: **d/dx [f(g(x))] = f'(g(x)) * g'(x)**\n\nLooking at your image, for sin(x^2), the outside is sin(u) and the inside is x^2." 
  },
  { 
    id: 9, 
    sender: 'user', 
    text: "That makes sense! But I think I need to practice this. Can you generate a short quiz for me?" 
  },
  { 
    id: 10, 
    sender: 'ai', 
    text: "Absolutely. I've generated a 5-question practice quiz focusing specifically on applying the chain rule to algebraic and trigonometric functions. Take your time!",
    widget: {
      type: 'quiz',
      title: 'Calculus: Chain Rule Practice',
      duration: '15 mins',
      questions: 5,
    }
  },
  { 
    id: 11, 
    sender: 'user', 
    text: "Thanks! I'll do that later. Right now, can you also review my physics essay draft and give me some feedback?",
    attachment: {
      type: 'doc',
      name: 'Physics_Essay_Draft.pdf',
      size: '2.4 MB',
      url: '#'
    }
  },
  { 
    id: 12, 
    sender: 'ai', 
    text: "I've reviewed your draft. Your introduction is strong and clearly states your thesis on quantum mechanics. However, in the second paragraph, you should consider expanding on Heisenberg's Uncertainty Principle with a more concrete example. Keep it up!"
  },
  { 
    id: 13, 
    sender: 'user', 
    text: "I have some handwritten notes on that. Let me upload them so you can incorporate them into your feedback.",
    attachment: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80',
      name: 'handwritten_notes_physics.jpg'
    }
  },
  { 
    id: 14, 
    sender: 'ai', 
    text: "These notes are fantastic! You can seamlessly integrate the bullet point about 'electron slit experiments' from your notes into paragraph two. That provides exactly the concrete example the essay was missing."
  },
  { 
    id: 15, 
    sender: 'user', 
    text: "Awesome, I'll update my document now. One last thing, can you summarize the French Revolution in 3 bullet points for my history review?" 
  },
  { 
    id: 16, 
    sender: 'ai', 
    text: "Certainly! Here is a quick summary:\n\n• **Causes:** Extreme social inequality, a massive financial crisis, and inspiration from Enlightenment ideas.\n• **Key Events:** The Storming of the Bastille (1789), the Reign of Terror, and the rise of Napoleon Bonaparte.\n• **Legacy:** It fundamentally altered modern political history, spreading democratic principles and nationalism across Europe."
  }
];

const StudentAITutor = () => {
  const [inputText, setInputText] = useState('');
  const [activeAttachment, setActiveAttachment] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <div className="h-[calc(100vh-5rem)] md:h-[calc(100vh-7rem)] flex gap-0 md:gap-6 relative">
        
        {/* Mobile Overlay Backdrop */}
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

        {/* Left Sidebar: Chat History */}
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
                    <FiMessageSquare className="text-primary" /> History
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

        {/* Main Chat Area */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col overflow-hidden relative min-w-0">
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-gray-50/30">
            {mockChat.map((msg, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                key={msg.id} 
                className={`flex gap-3 md:gap-4 max-w-[90%] md:max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-6 h-6 md:w-8 md:h-8 text-xs md:text-sm rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-blue-100 text-blue-600' : 'bg-primary text-[#2D2D2D] shadow-md'}`}>
                  {msg.sender === 'user' ? 'JS' : <FiCpu />}
                </div>

                {/* Message Content */}
                <div className={`flex flex-col gap-2 md:gap-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  
                  {/* Uploaded Attachment */}
                  {msg.attachment && msg.attachment.type === 'image' && (
                    <div 
                      onClick={() => setActiveAttachment(msg.attachment)}
                      className="bg-white p-1 md:p-1.5 rounded-2xl shadow-sm border border-gray-100 w-40 md:w-56 relative group cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <img src={msg.attachment.url} alt={msg.attachment.name} className="w-full h-24 md:h-32 object-cover rounded-xl" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                        <FiImage className="text-white text-xl md:text-2xl drop-shadow-lg" />
                      </div>
                    </div>
                  )}

                  {msg.attachment && msg.attachment.type === 'doc' && (
                    <div 
                      onClick={() => setActiveAttachment(msg.attachment)}
                      className="bg-white p-2 md:p-2.5 rounded-2xl shadow-sm border border-gray-100 w-40 md:w-56 flex items-center gap-2 cursor-pointer hover:shadow-md transition-shadow group"
                    >
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <FiFileText className="text-base md:text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] md:text-xs font-bold text-gray-900 truncate group-hover:text-primary transition-colors">{msg.attachment.name}</p>
                        <p className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-wider">{msg.attachment.size}</p>
                      </div>
                    </div>
                  )}

                  <div className={`px-3 py-2.5 md:px-4 md:py-3 rounded-2xl text-xs md:text-[13px] font-medium leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#2D2D2D] text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'
                  }`}>
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line.includes('**') ? (
                          <span dangerouslySetInnerHTML={{__html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-gray-900 bg-gray-100 px-1 py-0.5 rounded">$1</strong>')}} />
                        ) : line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>

                  {/* AI generated widget (Quiz link) */}
                  {msg.widget && msg.widget.type === 'quiz' && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm w-60 md:w-80 hover:shadow-md transition-shadow group">
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                          <FiCheckSquare className="text-lg md:text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-[13px] md:text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">{msg.widget.title}</h4>
                          <div className="flex items-center gap-1 md:gap-2 mt-1 text-[10px] md:text-[11px] font-bold text-gray-400">
                            <span className="flex items-center gap-1"><FiClock /> {msg.widget.duration}</span>
                            <span>•</span>
                            <span>{msg.widget.questions} Qs</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold shadow-sm transition-all hover:shadow-md">
                        <FiPlay /> Start Quiz Now
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-2 md:p-4 bg-white border-t border-gray-100 shrink-0">
            <div className="relative flex items-center">
              <div className="absolute left-1 md:left-2 flex items-center gap-0 z-10">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-primary hover:text-primary/80 p-1.5 md:p-2 transition-colors rounded-full hover:bg-primary/10" 
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
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask a question..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 md:py-3.5 pl-[5.5rem] sm:pl-[7.5rem] pr-[4.5rem] md:pr-24 text-[13px] md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all shadow-inner"
              />
              
              <div className="absolute right-1 md:right-2 flex items-center gap-0.5 md:gap-1.5">
                <button className="text-gray-400 hover:text-primary p-1.5 md:p-2 transition-colors rounded-full hover:bg-primary/10" title="Voice Input">
                  <FiMic className="text-[16px] md:text-[18px]" />
                </button>
                <button className="w-8 h-8 md:w-10 md:h-10 bg-[#2D2D2D] hover:bg-gray-900 text-[#FFD300] rounded-full flex items-center justify-center transition-all shadow-md hover:scale-105" title="Send Message">
                  <FiSend className="mr-0.5 text-sm md:text-base" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Attachment Modal */}
      <AnimatePresence>
        {activeAttachment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveAttachment(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white shrink-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activeAttachment.type === 'image' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'}`}>
                    {activeAttachment.type === 'image' ? <FiImage className="text-xl" /> : <FiFileText className="text-xl" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-none">{activeAttachment.name}</h3>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">{activeAttachment.type === 'image' ? 'Image File' : 'Document PDF'}</p>
                  </div>
                </div>
                <button onClick={() => setActiveAttachment(null)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiX className="text-2xl" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center p-6 md:p-12 min-h-[50vh]">
                {activeAttachment.type === 'image' ? (
                  <img src={activeAttachment.url} alt={activeAttachment.name} className="max-w-full max-h-full rounded-lg shadow-md object-contain" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500 py-20 bg-white w-full max-w-2xl rounded-2xl shadow-sm border border-gray-200">
                    <FiFileText className="text-6xl mb-4 text-blue-200" />
                    <p className="font-extrabold text-xl text-gray-800">PDF Viewer Placeholder</p>
                    <p className="text-sm font-medium mt-2 text-center max-w-md">In the actual application, <strong className="text-gray-700">{activeAttachment.name}</strong> would be rendered here using a PDF viewer library.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudentAITutor;
