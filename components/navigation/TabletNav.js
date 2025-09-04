import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Home, Settings, Zap, Heart, Bell, ChevronDown, Sun, Moon, Monitor, LogIn, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import ThemeDropdown from './ThemeDropdown';
import DiscordDropdown from './DiscordDropdown';
import LoginMenu from './LoginMenu';
import { getConfig, getBotName } from '../../utils/configUtils';

export default function TabletNav() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { compactMode, setCompactMode } = useAppTheme();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeUserOpen, setIsThemeUserOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDiscordOpen, setIsDiscordOpen] = useState(false);
  const menuRef = useRef(null);
  const themeUserRef = useRef(null);
  const userRef = useRef(null);
  const discordRef = useRef(null);
  
  const logoPath = getConfig('branding.images.logo', '/images/lydia.webp');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (themeUserRef.current && !themeUserRef.current.contains(event.target)) {
        setIsThemeUserOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (discordRef.current && !discordRef.current.contains(event.target)) {
        setIsDiscordOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, href: getConfig('urls.nav.home') },
    { name: 'Features', icon: Zap, href: getConfig('urls.nav.features') },
    { name: 'Premium', icon: Heart, href: getConfig('urls.nav.premium') },
    { name: 'Updates', icon: Bell, href: getConfig('urls.nav.updates') },
    { name: 'Settings', icon: Settings, href: getConfig('urls.nav.settings') }
  ];

  const isDark = mounted && (theme === 'dark' || (theme === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches));
  
  const getThemeIcon = () => {
    if (!mounted) return <Monitor size={18} />;
    if (theme === 'dark') return <Moon size={18} />;
    if (theme === 'light') return <Sun size={18} />;
    return <Monitor size={18} />;
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleCompactModeToggle = () => {
    setCompactMode(!compactMode);
  };

  if (!mounted) {
    return null;
  }
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href={getConfig('urls.nav.home')} className="flex items-center space-x-2 group">
            <motion.div
              className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src={logoPath} 
                alt={getBotName()} 
                width={28}
                height={28}
                className="rounded-md"
              />
            </motion.div>
            <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {getBotName()}
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme & User Container */}
            <div className="flex items-center bg-card/80 backdrop-blur-md border border-card-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              {/* Theme Button */}
              <div className="relative" ref={themeUserRef}>
                <motion.button
                  onClick={() => setIsThemeUserOpen(!isThemeUserOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-l-xl hover:bg-card-hover/80 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Toggle theme"
                >
                  {getThemeIcon()}
                </motion.button>

                <AnimatePresence>
                  {isThemeUserOpen && (
                    <ThemeDropdown 
                      theme={theme}
                      onThemeChange={handleThemeChange}
                      compactMode={compactMode}
                      onCompactModeToggle={handleCompactModeToggle}
                      isMobile={true}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Separator */}
              <div className="w-px h-6 bg-border/30"></div>

              {/* User Button */}
              {!loading && (
                user ? (
                  <div className="relative" ref={userRef}>
                    <motion.button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center justify-center w-10 h-10 rounded-r-xl hover:bg-card-hover/80 transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img
                        src={user.avatar}
                        alt={user.displayName || user.username}
                        className="w-7 h-7 rounded-full border-2 border-border/20 shadow-sm"
                      />
                    </motion.button>
                    
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <LoginMenu 
                          onClose={() => setIsUserMenuOpen(false)}
                          isMobile={true}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    onClick={() => router.push('/login')}
                    className="flex items-center justify-center w-10 h-10 rounded-r-xl hover:bg-card-hover/80 transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogIn size={16} />
                  </motion.button>
                )
              )}
            </div>

            {/* Discord Button */}
            <div className="relative" ref={discordRef}>
              <motion.button
                onClick={() => setIsDiscordOpen(!isDiscordOpen)}
                className="flex items-center space-x-1 px-3 py-2 bg-[#5865F2] text-white rounded-lg text-sm font-medium hover:bg-[#4752C4] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 71 55" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
                </svg>
                <span>Discord</span>
                <ChevronDown size={14} className={clsx(
                  "transition-transform",
                  isDiscordOpen && "rotate-180"
                )} />
              </motion.button>

              <AnimatePresence>
                {isDiscordOpen && (
                  <DiscordDropdown onClose={() => setIsDiscordOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* Menu Button */}
            <div className="relative" ref={menuRef}>
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Navigation Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ 
                      duration: 0.2,
                      when: "beforeChildren",
                      staggerChildren: 0.05
                    }}
                    className="dropdown-menu right-0 mt-2 w-48"
                  >
                    <div className="py-1">
                      <h3 className="px-4 py-1 text-xs uppercase font-semibold text-gray-500">Navigation</h3>
                      
                      <div className="border-t border-card-border my-1"></div>
                      
                      {navItems.map((item, index) => {
                        const isActive = router.pathname === item.href;
                        return (
                          <Link key={item.name} href={item.href}>
                            <motion.div
                              onClick={() => setIsMenuOpen(false)}
                              className="dropdown-item"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ 
                                opacity: 1, 
                                x: 0,
                                transition: {
                                  duration: 0.2,
                                  delay: index * 0.05
                                }
                              }}
                              whileHover={{ 
                                x: 2,
                                transition: { duration: 0.1 }
                              }}
                            >
                              <item.icon size={16} className="mr-2" />
                              <span>{item.name}</span>
                              
                              {isActive && (
                                <motion.span 
                                  className="ml-auto text-primary"
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  ✓
                                </motion.span>
                              )}
                            </motion.div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}