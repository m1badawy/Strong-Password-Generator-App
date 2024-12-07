# Secure Password Generator

A modern, secure password generator built with React that helps you create strong, customizable passwords with real-time strength analysis and NATO phonetic alphabet reminders.

## Features

- 🔐 Secure password generation with customizable length (6-60 characters)
- 🎯 Multiple character type options:
  - Uppercase letters (A-Z)
  - Lowercase letters (a-z)
  - Numbers (0-9)
  - Special symbols (!@#$%^&*)
- 📊 Real-time password strength analysis with visual indicator
- 🎯 Convenient length presets (Short, Standard, Strong, Extra Strong, Maximum)
- 🗣️ NATO phonetic alphabet reminders for easy communication
- 📋 One-click copy to clipboard
- 🎨 Modern, animated UI with beautiful gradients
- 📱 Fully responsive design for all devices
- ✨ Smooth animations and transitions

## Security Features

- 🔒 Cryptographically secure random number generation using Web Crypto API
- 📈 Advanced password strength calculation considering:
  - Password length and complexity
  - Character variety and distribution
  - Pattern detection and penalties
  - Entropy analysis
- ⚡ Real-time strength assessment with five levels:
  - Very Weak (Red)
  - Weak (Orange)
  - Medium (Yellow)
  - Strong (Green)
  - Very Strong (Emerald)

## Technology Stack

- ⚛️ React 18 - Modern UI development
- 🎨 Tailwind CSS - Utility-first styling
- 🎭 Framer Motion - Smooth animations
- 📦 Vite - Fast development and building
- 🎯 Lucide Icons - Beautiful, consistent icons
- 🔤 Inter & Space Mono fonts - Clean typography

## Getting Started

1. Clone the repository
```bash
git clone git@github.com:m1badawy/Strong-Password-Generator-App.git
```
OR
```bash
git clone https://github.com/m1badawy/Strong-Password-Generator-App.git
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Password Generation Logic

The password generator ensures high-quality passwords by:

1. Using cryptographically secure random values
2. Enforcing minimum character type requirements
3. Ensuring even character distribution
4. Detecting and penalizing common patterns
5. Calculating entropy for randomness assessment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

**Mohamed Badawy**
- Portfolio: [mbadawy.net](https://mbadawy.net)
- GitHub: [@m1badawy](https://github.com/m1badawy)
