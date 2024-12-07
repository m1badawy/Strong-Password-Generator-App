import React from 'react';
import PropTypes from 'prop-types';
import { calculatePasswordStrength } from '../utils/strengthCalculator';
import { STRENGTH_COLORS } from '../utils/constants';

const PasswordStrengthIndicator = ({ password }) => {
  const strength = calculatePasswordStrength(password);
  const strengthLevels = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
  const strengthIndex = strengthLevels.indexOf(strength);

  return (
    <div className="mt-6">
      <div className="flex gap-1 h-2 mb-2">
        {strengthLevels.map((_, index) => (
          <div
            key={index}
            className={`h-full w-full rounded-full transition-colors ${
              index <= strengthIndex ? STRENGTH_COLORS[strength] : 'bg-slate-700/30'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-white/70">
        Password Strength:{' '}
        <span className="text-white font-medium">{strength}</span>
      </p>
    </div>
  );
};

PasswordStrengthIndicator.propTypes = {
  password: PropTypes.string.isRequired,
};

export default PasswordStrengthIndicator;