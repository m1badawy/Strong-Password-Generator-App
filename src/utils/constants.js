// Password generation character sets
export const CHARS = {
  UPPERCASE: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  LOWERCASE: 'abcdefghijklmnopqrstuvwxyz',
  NUMBERS: '0123456789',
  SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

// Password length constraints
export const LENGTH_CONSTRAINTS = {
  MIN: 6,
  MAX: 60,
  DEFAULT: 12
};

// Password strength colors
export const STRENGTH_COLORS = {
  'Very Weak': 'bg-red-500',
  'Weak': 'bg-orange-500',
  'Medium': 'bg-yellow-500',
  'Strong': 'bg-green-500',
  'Very Strong': 'bg-emerald-500'
};