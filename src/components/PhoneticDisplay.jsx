import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getPhoneticPassword } from '../utils/phoneticAlphabet';
import { motion, AnimatePresence } from 'framer-motion';

const PhoneticDisplay = ({ password }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneticWords = getPhoneticPassword(password);

  return (
    <div className="mt-4 md:mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
      >
        {isExpanded ? (
          <ChevronUp size={16} className="text-slate-400 group-hover:text-white" />
        ) : (
          <ChevronDown size={16} className="text-slate-400 group-hover:text-white" />
        )}
        Phonetic Reminder
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-3 md:p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="grid grid-cols-2 gap-2 md:gap-3 text-sm">
                {password.split('').map((char, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="font-mono font-bold text-theme-400">{char}</span>
                    <span className="text-slate-400">{phoneticWords[index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

PhoneticDisplay.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PhoneticDisplay;