import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, LogOut, Crown, Shield, Info } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function LoginMenu({ onClose, isMobile = false }) {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: 8, 
      scale: isMobile ? 0.95 : 1 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: isMobile ? 0.15 : 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: 8, 
      scale: isMobile ? 0.95 : 1,
      transition: {
        duration: 0.15
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

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
      if (onClose) onClose();
    }
  };

  const handleNavigation = (href) => {
    router.push(href);
    if (onClose) onClose();
  };

  if (!user) {
    return null;
  }

  const displayName = user.displayName || user.username;
  const username = user.username;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={dropdownVariants}
      className={`dropdown-menu right-0 ${isMobile ? 'fixed top-16 right-4' : 'mt-2'} w-64`}
    >
      <div className="p-3 border-b border-card-border">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={user.avatar}
              alt={displayName}
              className="w-12 h-12 rounded-full"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">
              {displayName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              @{username}
            </p>
          </div>
        </div>
      </div>

      <div className="py-1">
        <motion.button
          onClick={() => handleNavigation('/profile')}
          className="dropdown-item w-full"
          variants={itemVariants}
          whileHover={{ 
            x: 2,
            transition: { duration: 0.1 }
          }}
        >
          <User size={isMobile ? 18 : 16} className="mr-2" />
          <span>Profile</span>
        </motion.button>

        <motion.button
          onClick={() => handleNavigation('/settings')}
          className="dropdown-item w-full"
          variants={itemVariants}
          whileHover={{ 
            x: 2,
            transition: { duration: 0.1 }
          }}
        >
          <Settings size={isMobile ? 18 : 16} className="mr-2" />
          <span>Settings</span>
        </motion.button>

        {user.premiumType > 0 && (
          <motion.button
            onClick={() => handleNavigation('/premium')}
            className="dropdown-item w-full text-yellow-600 dark:text-yellow-400"
            variants={itemVariants}
            whileHover={{ 
              x: 2,
              transition: { duration: 0.1 }
            }}
          >
            <Crown size={isMobile ? 18 : 16} className="mr-2" />
            <span>Premium</span>
          </motion.button>
        )}

        <div className="border-t border-card-border my-1"></div>

        <motion.button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="dropdown-item w-full text-red-600 dark:text-red-400 disabled:opacity-50"
          variants={itemVariants}
          whileHover={{ 
            x: 2,
            transition: { duration: 0.1 }
          }}
        >
          {isLoggingOut ? (
            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-2"></div>
          ) : (
            <LogOut size={isMobile ? 18 : 16} className="mr-2" />
          )}
          <span>{isLoggingOut ? 'Signing out...' : 'Sign out'}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
