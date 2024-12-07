import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { generatePassword } from '../utils/passwordGenerator';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import PasswordDisplay from './PasswordDisplay';
import PasswordControls from './PasswordControls';
import PhoneticDisplay from './PhoneticDisplay';
import { motion } from 'framer-motion';

const PasswordGenerator = () => {
  const [options, setOptions] = useState({
    length: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const [password, setPassword] = useState(() => generatePassword(options));
  const [copied, setCopied] = useState(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopyPassword = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOptionsChange = (newOptions) => {
    setOptions(newOptions);
    const newPassword = generatePassword(newOptions);
    setPassword(newPassword);
    setCopied(false);
  };

  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-slate-700/50 p-4 md:p-8 text-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <PasswordDisplay
        password={password}
        onGenerate={handleGeneratePassword}
        copied={copied}
        onCopy={handleCopyPassword}
      />

      <PasswordStrengthIndicator password={password} />
      
      <PhoneticDisplay password={password} />

      <div className="mt-6 md:mt-8">
        <PasswordControls
          options={options}
          onOptionsChange={handleOptionsChange}
        />
      </div>
    </motion.div>
  );
};

PasswordGenerator.propTypes = {
  options: PropTypes.shape({
    length: PropTypes.number,
    includeUppercase: PropTypes.bool,
    includeLowercase: PropTypes.bool,
    includeNumbers: PropTypes.bool,
    includeSymbols: PropTypes.bool,
  }),
};

export default PasswordGenerator;