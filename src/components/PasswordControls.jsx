import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PasswordLengthPresets from './PasswordLengthPresets';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { LENGTH_CONSTRAINTS } from '../utils/constants';

const PasswordControls = ({ options, onOptionsChange }) => {
  const [inputValue, setInputValue] = useState(options.length.toString());
  const [error, setError] = useState('');

  useEffect(() => {
    setInputValue(options.length.toString());
  }, [options.length]);

  const handleLengthChange = (e) => {
    const length = parseInt(e.target.value);
    setInputValue(length.toString());
    if (length >= LENGTH_CONSTRAINTS.MIN && length <= LENGTH_CONSTRAINTS.MAX) {
      setError('');
      onOptionsChange({ ...options, length });
    }
  };

  const handleNumberInput = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value === '') {
      setError('Please enter a number');
      return;
    }
    
    const length = parseInt(value);
    
    if (isNaN(length)) {
      setError('Please enter a valid number');
      return;
    }
    
    if (length < LENGTH_CONSTRAINTS.MIN) {
      setError(`Minimum length is ${LENGTH_CONSTRAINTS.MIN} characters`);
      return;
    }
    
    if (length > LENGTH_CONSTRAINTS.MAX) {
      setError(`Maximum length is ${LENGTH_CONSTRAINTS.MAX} characters`);
      return;
    }
    
    setError('');
    onOptionsChange({ ...options, length });
  };

  const handleOptionChange = (key) => {
    const newOptions = {
      ...options,
      [key]: !options[key],
    };
    
    const hasAnyOption = Object.entries(newOptions)
      .filter(([k]) => k !== 'length')
      .some(([, value]) => value);

    if (hasAnyOption) {
      onOptionsChange(newOptions);
    }
  };

  const handleBlur = () => {
    const length = parseInt(inputValue);
    if (isNaN(length) || length < LENGTH_CONSTRAINTS.MIN) {
      setInputValue(LENGTH_CONSTRAINTS.MIN.toString());
      setError('');
      onOptionsChange({ ...options, length: LENGTH_CONSTRAINTS.MIN });
    } else if (length > LENGTH_CONSTRAINTS.MAX) {
      setInputValue(LENGTH_CONSTRAINTS.MAX.toString());
      setError('');
      onOptionsChange({ ...options, length: LENGTH_CONSTRAINTS.MAX });
    }
  };

  const incrementLength = () => {
    const newLength = Math.min(parseInt(inputValue) + 1, LENGTH_CONSTRAINTS.MAX);
    setInputValue(newLength.toString());
    onOptionsChange({ ...options, length: newLength });
  };

  const decrementLength = () => {
    const newLength = Math.max(parseInt(inputValue) - 1, LENGTH_CONSTRAINTS.MIN);
    setInputValue(newLength.toString());
    onOptionsChange({ ...options, length: newLength });
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="space-y-4 md:space-y-6">
        <div>
          <span className="text-white font-medium block mb-3 md:mb-4">Password Length</span>
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <motion.div
                  className="relative group"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-theme-400/20 to-theme-600/20 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                  <div className="relative flex">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={handleNumberInput}
                      onBlur={handleBlur}
                      className={`w-20 md:w-24 px-3 py-2 bg-slate-800/50 backdrop-blur-xl border rounded-l-xl focus:outline-none focus:ring-2 text-white text-center ${
                        error 
                          ? 'border-red-500/50 focus:ring-red-500/20' 
                          : 'border-slate-700/50 focus:ring-theme-500/20'
                      }`}
                    />
                    <div className="flex flex-col border-y border-r border-slate-700/50 rounded-r-xl overflow-hidden">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={incrementLength}
                        className="px-2 py-1 hover:bg-slate-700/50 border-b border-slate-700/50 transition-colors"
                      >
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={decrementLength}
                        className="px-2 py-1 hover:bg-slate-700/50 transition-colors"
                      >
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 top-full mt-2 text-xs text-red-400 whitespace-nowrap bg-red-900/20 px-2 py-1 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
              <div className="relative flex-1 h-10 flex items-center">
                <div className="absolute inset-0 bg-slate-700/20 rounded-full"></div>
                <input
                  type="range"
                  min={LENGTH_CONSTRAINTS.MIN}
                  max={LENGTH_CONSTRAINTS.MAX}
                  value={options.length}
                  onChange={handleLengthChange}
                  className="absolute inset-0 w-full h-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-theme-400 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-theme-400/20 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/10 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                />
                <div 
                  className="absolute h-1 bg-gradient-to-r from-theme-400 to-theme-600 rounded-full" 
                  style={{ 
                    width: `${((options.length - LENGTH_CONSTRAINTS.MIN) / (LENGTH_CONSTRAINTS.MAX - LENGTH_CONSTRAINTS.MIN)) * 100}%`,
                    transition: 'width 0.2s ease-out'
                  }}
                />
              </div>
            </div>
            
            <div>
              <span className="text-slate-400 text-sm mb-2 md:mb-3 block">Preset Lengths:</span>
              <PasswordLengthPresets
                currentLength={options.length}
                onSelectPreset={(length) => {
                  setInputValue(length.toString());
                  setError('');
                  onOptionsChange({ ...options, length });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-white font-medium mb-3 md:mb-4">Character Types</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'includeUppercase', label: 'Uppercase Letters (A-Z)' },
            { key: 'includeLowercase', label: 'Lowercase Letters (a-z)' },
            { key: 'includeNumbers', label: 'Numbers (0-9)' },
            { key: 'includeSymbols', label: 'Symbols (!@#$%^&*)' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 group cursor-pointer">
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => handleOptionChange(key)}
                className="w-5 h-5 rounded-lg border-slate-700/50 bg-slate-800/50 checked:bg-theme-500 checked:border-theme-500 focus:ring-2 focus:ring-theme-500/20"
              />
              <span className="text-slate-400 group-hover:text-white transition-colors">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

PasswordControls.propTypes = {
  options: PropTypes.shape({
    length: PropTypes.number.isRequired,
    includeUppercase: PropTypes.bool.isRequired,
    includeLowercase: PropTypes.bool.isRequired,
    includeNumbers: PropTypes.bool.isRequired,
    includeSymbols: PropTypes.bool.isRequired,
  }).isRequired,
  onOptionsChange: PropTypes.func.isRequired,
};

export default PasswordControls;