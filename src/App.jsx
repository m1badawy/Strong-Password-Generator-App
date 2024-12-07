import React from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import { motion } from 'framer-motion';
import { ShieldCheck, Github, Globe, Heart } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-xl pt-4 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-theme-400 to-theme-600 rounded-2xl blur opacity-30"></div>
              <div className="relative flex items-center justify-center sm:justify-start gap-3 bg-slate-800/50 backdrop-blur-xl p-3 rounded-2xl border border-slate-700/50">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex items-center"
                >
                  <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-theme-400" />
                </motion.div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-theme-200 bg-clip-text text-transparent">
                  Password Generator
                </h1>
              </div>
            </div>
            <motion.p 
              className="text-slate-400 text-center text-sm md:text-base max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Generate secure, random passwords with advanced customization options
            </motion.p>
          </div>
          <PasswordGenerator />
        </motion.div>
      </div>

      <motion.footer
        className="w-full max-w-xl mt-8 md:mt-12 pb-4 flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-6">
          <motion.a
            href="https://github.com/m1badawy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-theme-400 transition-colors group/link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5 group-hover/link:animate-pulse" />
            <span className="text-sm md:text-base">GitHub</span>
          </motion.a>
          <motion.a
            href="https://mbadawy.net"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-theme-400 transition-colors group/link"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="w-5 h-5 group-hover/link:animate-pulse" />
            <span className="text-sm md:text-base">Portfolio</span>
          </motion.a>
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm md:text-base">
          <span>Made with</span>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart className="w-4 h-4 text-theme-400 fill-theme-400" />
          </motion.div>
          <span>by Mohamed Badawy • © {new Date().getFullYear()}</span>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;