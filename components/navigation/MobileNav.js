import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Home, Settings, Zap, Heart, Bell, Menu, X, ChevronRight, Info, Shield, MessageSquare, ExternalLink, Sun, Moon, Monitor, LayoutGrid, LogIn } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import MobileMenu from './MobileMenu';
import ThemeDropdown from './ThemeDropdown';
import LoginMenu from './LoginMenu';
import { getConfig, getBotName } from '../../utils/configUtils';

export default function MobileNav() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { compactMode, setCompactMode } = useAppTheme();
  const { user, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const themeDropdownRef = useRef(null);
  const themeButtonRef = useRef(null);
  const userButtonRef = useRef(null);
  
  const discordSupportUrl = getConfig('urls.discord.supportServer');
  const logoPath = getConfig('branding.images.logo', '/images/lylia.webp');
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeDropdownRef.current && 
          !themeDropdownRef.current.contains(event.target) && 
          themeButtonRef.current && 
          !themeButtonRef.current.contains(event.target)) {
        setIsThemeDropdownOpen(false);
      }
      
      if (user && userButtonRef.current && 
          !userButtonRef.current.contains(event.target) && 
          isUserMenuOpen) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [user, isUserMenuOpen]);

  const navItems = [
    { name: 'Home', icon: Home, href: getConfig('urls.nav.home') },
    { name: 'Features', icon: Zap, href: getConfig('urls.nav.features') },
    { name: 'Premium', icon: Heart, href: getConfig('urls.nav.premium') },
    { name: 'Updates', icon: Bell, href: getConfig('urls.nav.updates') },
    { name: 'Settings', icon: Settings, href: getConfig('urls.nav.settings') }
  ];

  const menuGroups = [
    {
      title: "Navigation",
      items: [
        { name: 'Home', icon: Home, href: getConfig('urls.nav.home') },
        { name: 'Features', icon: Zap, href: getConfig('urls.nav.features') },
        { name: 'Premium', icon: Heart, href: getConfig('urls.nav.premium') },
        { name: 'Updates', icon: Bell, href: getConfig('urls.nav.updates') },
      ]
    },
    {
      title: "Support",
      items: [
        { name: 'Settings', icon: Settings, href: getConfig('urls.nav.settings') },
        { name: 'Contact', icon: MessageSquare, href: getConfig('urls.nav.contact') },
      ]
    },
    {
      title: "Legal",
      items: [
        { name: 'Terms', icon: Shield, href: getConfig('urls.nav.terms') },
        { name: 'Privacy', icon: Info, href: getConfig('urls.nav.privacy') },
      ]
    }
  ];
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setIsThemeDropdownOpen(false);
    }
  };
  
  const toggleThemeDropdown = (e) => {
    e.stopPropagation();
    setIsThemeDropdownOpen(!isThemeDropdownOpen);
    if (!isThemeDropdownOpen) {
      setIsMenuOpen(false);
    }
  };
  
  const toggleUserMenu = (e) => {
    if (!user) return;
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
    if (!isUserMenuOpen) {
      setIsMenuOpen(false);
      setIsThemeDropdownOpen(false);
    }
  };
  
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setIsThemeDropdownOpen(false);
  };

  const handleCompactModeToggle = () => {
    setCompactMode(!compactMode);
  };
  
  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon size={20} />;
    if (theme === 'light') return <Sun size={20} />;
    return <Monitor size={20} />;
  };
  
  const navItemVariants = {
    inactive: { y: 0, opacity: 0.8 },
    active: { 
      y: -3, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    }
  };
  
  const navIconVariants = {
    inactive: { scale: 1 },
    active: { 
      scale: 1.1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }
    }
  };
  
  const topBarVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const bottomNavVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const getBgStyle = () => {
    const isLightTheme = theme === 'light' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches);
    
    if (isLightTheme) {
      return {
        background: `linear-gradient(to right, #F5F5F5, #F8F8F8)`
      };
    } else {
      return {
        background: `linear-gradient(to right, #111111, #0A0A0A)`
      };
    }
  };
  
  const buttonStyles = "p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center";
  
  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 border-b border-card-border z-50 px-4 py-3 shadow-lg"
        style={getBgStyle()}
        variants={topBarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div 
            className="absolute inset-0 w-full h-full opacity-20"
            style={{
              background: `radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 70%), 
                         radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 70%)`
            }}
          />
        </div>

        <div className="flex justify-between items-center relative z-10">
          <Link href={getConfig('urls.nav.home')} className="flex items-center group">
            <div className="w-9 h-9 relative mr-2 bg-primary-5 rounded-full overflow-hidden group-hover:bg-primary-10 transition-all duration-300">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30 
                }}
              >
                <Image 
                  src={logoPath} 
                  alt={getConfig('branding.images.logoAlt', 'Lylia Logo')} 
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </motion.div>
            </div>
            <motion.span 
              className="font-bold text-xl tracking-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
            >
              {getBotName(false)}
            </motion.span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <motion.button 
                ref={themeButtonRef}
                onClick={toggleThemeDropdown}
                className={clsx(
                  buttonStyles,
                  "bg-card hover:bg-card-hover border border-card-border text-gray-600 dark:text-gray-400"
                )}
                aria-label="Change theme"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: isThemeDropdownOpen ? "rgba(139, 92, 246, 0.1)" : undefined
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30 
                }}
              >
                {getThemeIcon()}
              </motion.button>
              
              <AnimatePresence>
                {isThemeDropdownOpen && (
                  <div ref={themeDropdownRef}>
                    <ThemeDropdown 
                      theme={theme}
                      onThemeChange={handleThemeChange}
                      compactMode={compactMode}
                      onCompactModeToggle={handleCompactModeToggle}
                      isMobile={true}
                    />
                  </div>
                )}
              </AnimatePresence>
            </div>
            
            <a href={discordSupportUrl} aria-label="Join Discord Support Server">
              <motion.button 
                className={clsx(buttonStyles, "bg-primary hover:bg-secondary text-white")}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 4px 12px rgba(139, 92, 246, 0.25)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 500, 
                  damping: 30 
                }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 71 55" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
                </svg>
              </motion.button>
            </a>
            
            {!loading && (
              user ? (
                <div className="relative">
                  <motion.button 
                    ref={userButtonRef}
                    onClick={toggleUserMenu}
                    className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all duration-200 flex items-center justify-center"
                    aria-label="User menu"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "rgba(139, 92, 246, 0.6)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30 
                    }}
                  >
                    <img
                      src={user.avatar}
                      alt={user.displayName || user.username}
                      className="w-full h-full object-cover"
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
                  className={clsx(
                    buttonStyles,
                    "bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl"
                  )}
                  aria-label="Sign In"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(244, 114, 182, 0.25)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30 
                  }}
                >
                  <LogIn size={20} />
                </motion.button>
              )
            )}
            
            <motion.button 
              onClick={toggleMenu} 
              className={clsx(
                buttonStyles,
                isMenuOpen 
                  ? "bg-primary/15 border border-primary/30 text-primary" 
                  : "bg-card hover:bg-card-hover border border-card-border text-gray-600 dark:text-gray-400"
              )}
              aria-label="Toggle menu"
              whileHover={{ 
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu 
            menuGroups={menuGroups} 
            router={router}
            onClose={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <motion.div 
        className="fixed bottom-0 left-0 right-0 border-t border-card-border z-50 shadow-lg"
        style={getBgStyle()}
        variants={bottomNavVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 overflow-hidden z-0">
          <motion.div 
            className="absolute inset-0 w-full h-full opacity-20"
            style={{
              background: `radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.4) 0%, transparent 70%), 
                         radial-gradient(circle at 80% 20%, rgba(244, 114, 182, 0.3) 0%, transparent 70%)`
            }}
          />
        </div>

        <div className="flex justify-between items-center py-2 px-1 relative z-10">
          {navItems.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <Link href={item.href} key={item.name} className="flex-1">
                <motion.div 
                  className={clsx(
                    'flex flex-col items-center justify-center p-2',
                    isActive 
                      ? 'text-primary relative' 
                      : 'text-gray-800 dark:text-gray-300 hover:text-primary dark:hover:text-primary'
                  )}
                  variants={navItemVariants}
                  animate={isActive ? "active" : "inactive"}
                  whileTap={{ scale: 0.9 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30 
                  }}
                >
                  <motion.div 
                    className={clsx(
                      'p-2 rounded-lg transition-all',
                      isActive ? 'bg-primary-10' : ''
                    )}
                    variants={navIconVariants}
                  >
                    <item.icon size={22} />
                  </motion.div>
                  <span className="mt-1 text-xs font-medium">{item.name}</span>
                  
                  {isActive && (
                    <motion.span 
                      className="absolute -bottom-2 h-1 w-10 bg-primary rounded-t-md"
                      layoutId="mobileNavIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}
