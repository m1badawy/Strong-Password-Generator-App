import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { LENGTH_CONSTRAINTS } from '../utils/constants';

const presets = [
  { label: 'Short', length: 8 },
  { label: 'Standard', length: 12 },
  { label: 'Strong', length: 16 },
  { label: 'Extra Strong', length: 24 },
  { label: 'Maximum', length: LENGTH_CONSTRAINTS.MAX },
];

const PasswordLengthPresets = ({ currentLength, onSelectPreset }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {presets.map(({ label, length }) => (
        <motion.button
          key={length}
          onClick={() => onSelectPreset(length)}
          className={`relative px-3 py-1.5 rounded-xl text-sm transition-all ${
            currentLength === length
              ? 'text-white'
              : 'bg-slate-800/50 text-slate-400 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentLength === length && (
            <motion.div
              layoutId="activePreset"
              className="absolute inset-0 bg-gradient-to-r from-theme-400 to-theme-600 rounded-xl"
              initial={false}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative">
            {label} ({length})
          </span>
        </motion.button>
      ))}
    </div>
  );
};

PasswordLengthPresets.propTypes = {
  currentLength: PropTypes.number.isRequired,
  onSelectPreset: PropTypes.func.isRequired,
};

export default PasswordLengthPresets;