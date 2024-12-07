import { CHARS } from './constants.js';

const getRandomChar = (chars) => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return chars[array[0] % chars.length];
};

const shuffleString = (str) => {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const array2 = new Uint32Array(1);
    crypto.getRandomValues(array2);
    const j = array2[0] % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
};

const ensureCharacterDistribution = (password, options) => {
  const minCharsPerType = Math.max(1, Math.floor(password.length / 4));
  let result = password;

  const counts = {
    uppercase: (result.match(/[A-Z]/g) || []).length,
    lowercase: (result.match(/[a-z]/g) || []).length,
    numbers: (result.match(/[0-9]/g) || []).length,
    symbols: (result.match(/[^A-Za-z0-9]/g) || []).length,
  };

  if (options.includeUppercase && counts.uppercase < minCharsPerType) {
    for (let i = 0; i < minCharsPerType - counts.uppercase; i++) {
      result = result.replace(/[^A-Z]/, getRandomChar(CHARS.UPPERCASE));
    }
  }

  if (options.includeLowercase && counts.lowercase < minCharsPerType) {
    for (let i = 0; i < minCharsPerType - counts.lowercase; i++) {
      result = result.replace(/[^a-z]/, getRandomChar(CHARS.LOWERCASE));
    }
  }

  if (options.includeNumbers && counts.numbers < minCharsPerType) {
    for (let i = 0; i < minCharsPerType - counts.numbers; i++) {
      result = result.replace(/[^0-9]/, getRandomChar(CHARS.NUMBERS));
    }
  }

  if (options.includeSymbols && counts.symbols < minCharsPerType) {
    for (let i = 0; i < minCharsPerType - counts.symbols; i++) {
      result = result.replace(/[A-Za-z0-9]/, getRandomChar(CHARS.SYMBOLS));
    }
  }

  return result;
};

export const generatePassword = (options) => {
  let chars = '';
  let requiredChars = '';
  
  if (options.includeUppercase) {
    chars += CHARS.UPPERCASE;
    requiredChars += getRandomChar(CHARS.UPPERCASE);
  }
  if (options.includeLowercase) {
    chars += CHARS.LOWERCASE;
    requiredChars += getRandomChar(CHARS.LOWERCASE);
  }
  if (options.includeNumbers) {
    chars += CHARS.NUMBERS;
    requiredChars += getRandomChar(CHARS.NUMBERS);
  }
  if (options.includeSymbols) {
    chars += CHARS.SYMBOLS;
    requiredChars += getRandomChar(CHARS.SYMBOLS);
  }

  if (!chars) {
    chars = CHARS.LOWERCASE;
    requiredChars = getRandomChar(CHARS.LOWERCASE);
  }

  const remainingLength = Math.max(0, options.length - requiredChars.length);
  const array = new Uint32Array(remainingLength);
  crypto.getRandomValues(array);
  
  const remainingChars = Array.from(array)
    .map(n => chars[n % chars.length])
    .join('');

  let password = shuffleString(requiredChars + remainingChars).slice(0, options.length);
  
  password = ensureCharacterDistribution(password, options);
  
  return shuffleString(password);
};