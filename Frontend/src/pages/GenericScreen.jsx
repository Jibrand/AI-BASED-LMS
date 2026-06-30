import React from 'react';
import { motion } from 'framer-motion';

const GenericScreen = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 h-full flex flex-col"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      
      <div className="flex-1 bg-white/50 border border-dashed border-gray-300 rounded-2xl flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-gray-400">🚧</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">{title} Module</h2>
          <p className="text-sm text-gray-500 max-w-sm">This screen is currently under construction. It will be built out in the upcoming steps.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default GenericScreen;
