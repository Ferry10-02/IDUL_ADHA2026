import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Icon } from '@iconify/react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [name, setName] = useState('');
  const [showShareToast, setShowShareToast] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState('');

  const audioRef = useRef<HTMLAudioElement>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Handle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Generate WhatsApp message
  const getWhatsAppMessage = () => {
    const baseMessage = `🌙 *Selamat Hari Raya Idul Adha 1447 H* 🌙\n\nTaqabbalallahu minna wa minkum.\nMohon maaf lahir dan batin.\n\n✨ Semoga di hari yang Adha ini, kita kembali suci dan diberkahi oleh Allah SWT. Aamiin.\n\n${name ? `🤍 Dari: *${name}*\n` : ''}\n_Mohon doa restu dari keluarga besar._`;
    return encodeURIComponent(baseMessage);
  };

  // Handle share to WhatsApp
  const handleShareWhatsApp = () => {
    const phoneNumber = '6285772416042';
const message = getWhatsAppMessage();
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  // Handle general share
  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Selamat Hari Raya Idul Adha 1447 H. Mohon maaf lahir dan batin.${name ? ` Dari: ${name}` : ''}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ucapan Idul Adha 1447 H',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopiedMessage('Tautan berhasil disalin!');
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 3000);
    }
  };

  // Handle copy message to clipboard
  const handleCopyMessage = () => {
    const message = decodeURIComponent(getWhatsAppMessage());
    navigator.clipboard.writeText(message);
    setCopiedMessage('Ucapan berhasil disalin!');
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500 bg-gradient-to-br from-light-bg via-light-bg to-light-accent/5 dark:from-[#0f0f1a] dark:via-[#0f0f1a] dark:to-dark-accent/5">
      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="/takbiran.mp3"
        loop
        preload="auto"
      />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Gradient Orbs */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-light-accent/15 dark:bg-emerald-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-light-accent/10 dark:bg-emerald-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2394a3b8' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>

        {/* Floating Icons */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-16 left-8 text-light-accent/15 dark:text-emerald-400/10"
        >
          <Icon icon="mdi:moon-waning-crescent" className="text-6xl" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 12, 0], rotate: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute top-24 right-12 text-light-accent/12 dark:text-emerald-400/8"
        >
          <Icon icon="mdi:star-four-points" className="text-4xl" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, -12, 0], rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          className="absolute bottom-40 left-12 text-light-accent/12 dark:text-emerald-400/8"
        >
          <Icon icon="mdi:star-four-points" className="text-3xl" />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute bottom-16 right-8 text-light-accent/15 dark:text-emerald-400/10"
        >
          <Icon icon="mdi:moon-waning-crescent" className="text-5xl rotate-180" />
        </motion.div>
      </div>

      {/* Top Navigation */}
      <header className="w-full p-4 sm:p-5 flex justify-between items-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <Icon icon="ph:mosque-thin" className="text-2xl text-light-accent dark:text-emerald-400" />
          <span className="font-serif text-base font-semibold text-light-text dark:text-slate-200">Idul Adha 1447 H</span>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-md text-light-text dark:text-slate-200 transition-all hover:shadow-lg"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <Icon icon="ph:sun-fill" className="text-lg text-amber-400" />
          ) : (
            <Icon icon="ph:moon-fill" className="text-lg text-indigo-500" />
          )}
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-5 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="w-full max-w-lg bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[28px] p-6 sm:p-10 shadow-[0_16px_50px_rgb(0,0,0,0.06)] dark:shadow-[0_16px_50px_rgb(0,0,0,0.3)] border border-white/40 dark:border-white/5 text-center relative overflow-hidden"
        >
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-[28px] p-[1px] bg-gradient-to-br from-light-accent/40 via-transparent to-light-accent/40 dark:from-emerald-500/30 dark:via-transparent dark:to-emerald-500/30 pointer-events-none"></div>
          
          {/* Top Accent Bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-light-accent dark:via-emerald-400 to-transparent rounded-full"></div>

          {/* Mosque Icon with Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="relative flex justify-center mb-6"
          >
            <div className="absolute inset-0 bg-light-accent/15 dark:bg-emerald-400/15 rounded-full blur-xl scale-125"></div>
            <div className="relative bg-gradient-to-br from-light-accent to-light-accent/80 dark:from-emerald-500 dark:to-emerald-600 p-4 sm:p-5 rounded-2xl shadow-lg">
              <Icon icon="ph:mosque-thin" className="text-4xl sm:text-5xl text-white" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-light-text dark:text-slate-100 leading-tight"
          >
            Selamat Hari Raya<br/>
            <span className="bg-gradient-to-r from-light-accent to-light-accent/70 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent italic">Idul Adha 1447 H</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-base sm:text-lg text-gray-600 dark:text-slate-300 mb-7 font-light leading-relaxed"
          >
            <span className="block mb-1.5">Taqabbalallahu minna wa minkum.</span>
            <span className="text-light-accent dark:text-emerald-400 font-medium">Mohon maaf lahir dan batin.</span>
          </motion.p>

          {/* Name Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="max-w-xs mx-auto mb-7"
          >
            <label htmlFor="sender-name" className="block text-xs font-medium text-gray-500 dark:text-slate-400 mb-2.5 uppercase tracking-wider">
              Tulis Nama Anda
            </label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-light-accent/15 to-light-accent/8 dark:from-emerald-500/15 dark:to-emerald-500/8 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center">
                <Icon icon="ph:user-light" className="absolute left-4 text-gray-400 dark:text-slate-500 text-xl" />
                <input
                  id="sender-name"
                  type="text"
                  placeholder="Nama Anda..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-5 py-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-light-accent dark:focus:border-emerald-500 text-light-text dark:text-slate-100 text-base placeholder-gray-400 dark:placeholder-slate-500 transition-all shadow-sm focus:shadow-md"
                />
              </div>
            </div>
          </motion.div>

          {/* Display Name Preview */}
          <AnimatePresence>
            {name && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                className="mb-7 p-3 bg-gradient-to-r from-light-accent/8 to-light-accent/4 dark:from-emerald-500/10 dark:to-emerald-500/5 rounded-xl border border-light-accent/15 dark:border-emerald-500/15"
              >
                <p className="text-[10px] text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Salam hangat dari</p>
                <p className="font-serif text-2xl font-medium bg-gradient-to-r from-light-accent to-light-accent/70 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent">{name}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-col gap-3"
          >
            {/* WhatsApp Share Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShareWhatsApp}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl hover:shadow-green-500/25"
            >
              <Icon icon="ph:whatsapp-logo" className="text-xl" />
              <span>Bagikan ke WhatsApp</span>
              <Icon icon="ph:arrow-right" className="text-base group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Copy Message Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyMessage}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-light-text dark:text-slate-200 font-semibold transition-all shadow-sm hover:shadow-md hover:border-light-accent/40 dark:hover:border-emerald-500/40"
            >
              <Icon icon="ph:copy" className="text-lg" />
              <span>Salin Ucapan</span>
            </motion.button>

            {/* Share Button */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-light-accent hover:bg-light-accent-hover dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-900 font-semibold transition-all shadow-md hover:shadow-lg"
            >
              <Icon icon="ph:share-network" className="text-lg" />
              <span>Bagikan</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </main>

      {/* Floating Audio Controls */}
      <motion.div
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="fixed bottom-5 left-5 z-20"
      >
        <div className="flex items-center gap-2.5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-2.5 pr-3.5 rounded-4xl border border-slate-200 dark:border-slate-700 shadow-xl">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleAudio}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-light-accent to-light-accent/90 dark:from-emerald-500 dark:to-emerald-600 text-white dark:text-slate-900 shadow-md transition-all hover:shadow-lg hover:shadow-light-accent/25 dark:hover:shadow-emerald-500/25"
            aria-label={isPlaying ? "Pause Takbir" : "Play Takbir"}
          >
            {isPlaying ? (
              <Icon icon="ph:pause-fill" className="text-xl" />
            ) : (
              <Icon icon="ph:play-fill" className="text-xl ml-0.5" />
            )}
          </motion.button>

          <div className="flex flex-col w-24 hidden sm:flex">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8px] uppercase tracking-wider font-bold text-gray-500 dark:text-slate-400">
                {isPlaying ? 'Playing' : 'Takbir'}
              </span>
              {isPlaying && (
                <div className="flex gap-0.5 items-end h-3.5">
                  <motion.div animate={{ height: ["3px", "12px", "5px", "9px", "3px"] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-gradient-to-t from-light-accent to-light-accent/60 dark:from-emerald-500 dark:to-emerald-400 rounded-full"></motion.div>
                  <motion.div animate={{ height: ["7px", "3px", "10px", "5px", "8px"] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-gradient-to-t from-light-accent to-light-accent/60 dark:from-emerald-500 dark:to-emerald-400 rounded-full"></motion.div>
                  <motion.div animate={{ height: ["5px", "10px", "3px", "12px", "7px"] }} transition={{ repeat: Infinity, duration: 0.85 }} className="w-1 bg-gradient-to-t from-light-accent to-light-accent/60 dark:from-emerald-500 dark:to-emerald-400 rounded-full"></motion.div>
                </div>
              )}
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-light-accent dark:accent-emerald-500"
              aria-label="Volume"
            />
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="w-full p-5 text-center z-10 relative">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-xs text-gray-500 dark:text-slate-400"
        >
          &copy; {new Date().getFullYear()} Idul Adha 1447 H. Dibuat dengan <Icon icon="ph:heart-fill" className="text-red-500 inline text-[10px]" /> sepenuh hati.
        </motion.p>
      </footer>

      {/* Toast Notification */}
      <AnimatePresence>
        {showShareToast && (
          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 45, scale: 0.92 }}
            className="fixed bottom-5 right-5 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2.5"
          >
            <Icon icon="ph:check-circle-fill" className="text-xl text-green-400 dark:text-green-600" />
            <span className="font-semibold text-xs">{copiedMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
