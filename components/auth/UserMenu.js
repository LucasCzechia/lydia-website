import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Settings, ChevronDown, Crown } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useAppTheme } from '../../context/ThemeContext';
import { useToast } from '../ui/Toast';
import clsx from 'clsx';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const { resolvedTheme } = useAppTheme();
  const { showToast } = useToast();
  const menuRef = useRef(null);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      showToast('Logged out successfully', 'success');
    } catch (error) {
      console.error('Logout failed:', error);
      showToast('Logout failed', 'error');
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: 8,
      scale: 0.95,
      transition: {
        duration: 0.15
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  if (!user) return null;

  const displayName = user.displayName || user.username;

  return (
    <div className="relative" ref={menuRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all',
          'hover:bg-card-hover focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          isDark ? 'text-white' : 'text-gray-900'
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative">
          <img
            src={user.avatar}
            alt={displayName}
            className="w-8 h-8 rounded-full border-2 border-primary/20"
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
        </div>
        
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium truncate max-w-24">
            {displayName}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            @{user.username}
          </p>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="hidden sm:block"
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={dropdownVariants}
            className="dropdown-menu right-0 mt-2 w-64"
          >
            <div className="p-3 border-b border-card-border">
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {displayName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    @{user.username}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-1">
              <motion.div variants={itemVariants}>
                <Link href="/profile" onClick={() => setIsOpen(false)}>
                  <div className="dropdown-item">
                    <User size={16} className="mr-3" />
                    Profile
                  </div>
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Link href="/settings" onClick={() => setIsOpen(false)}>
                  <div className="dropdown-item">
                    <Settings size={16} className="mr-3" />
                    Settings
                  </div>
                </Link>
              </motion.div>

              {user.premiumType > 0 && (
                <motion.div variants={itemVariants}>
                  <Link href="/premium" onClick={() => setIsOpen(false)}>
                    <div className="dropdown-item text-yellow-600 dark:text-yellow-400">
                      <Crown size={16} className="mr-3" />
                      Premium
                    </div>
                  </Link>
                </motion.div>
              )}

              <div className="border-t border-card-border my-1"></div>

              <motion.div variants={itemVariants}>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="dropdown-item w-full text-left text-red-600 dark:text-red-400 disabled:opacity-50"
                >
                  {isLoggingOut ? (
                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-3"></div>
                  ) : (
                    <LogOut size={16} className="mr-3" />
                  )}
                  {isLoggingOut ? 'Signing out...' : 'Sign out'}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
