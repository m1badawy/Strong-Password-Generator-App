import React from 'react';
import PropTypes from 'prop-types';
import { Copy, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PasswordDisplay = ({ password, onGenerate, copied, onCopy }) => {
  return (
    <div className="space-y-2">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-theme-400 to-theme-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-4 pr-24 rounded-2xl font-mono text-lg text-white focus:outline-none focus:ring-2 focus:ring-theme-500/30 selection:bg-theme-500/20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <motion.button
              onClick={onCopy}
              className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors group/btn"
              title="Copy password"
              whileTap={{ scale: 0.95 }}
            >
              <Copy className="w-5 h-5 text-slate-400 group-hover/btn:text-white transition-colors" />
            </motion.button>
            <motion.button
              onClick={onGenerate}
              className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors group/btn"
              title="Generate new password"
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="w-5 h-5 text-slate-400 group-hover/btn:text-white transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {copied && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-theme-400 flex items-center gap-2"
          >
            <span className="inline-block w-1.5 h-1.5 bg-theme-400 rounded-full animate-pulse"></span>
            Password copied to clipboard
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

PasswordDisplay.propTypes = {
  password: PropTypes.string.isRequired,
  onGenerate: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired,
  onCopy: PropTypes.func.isRequired,
};

export default PasswordDisplay;