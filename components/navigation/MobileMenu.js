import Link from 'next/link';
import { useTheme } from 'next-themes';
import { ExternalLink, ChevronRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { getConfig, getBotName } from '../../utils/configUtils';

export default function MobileMenu({ menuGroups, router, onClose }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const discordInviteUrl = getConfig('urls.discord.invite');
  const discordSupportUrl = getConfig('urls.discord.supportServer');
  const version = getConfig('bot.version');
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getBgStyle = () => {
    if (!mounted) return {};
    
    const isLightTheme = theme === 'light' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: light)').matches);
    
    if (isLightTheme) {
      return {
        background: `linear-gradient(to right, #F5F5F5, #F8F8F8)` // Light gray gradient for light mode
      };
    } else {
      return {
        background: `linear-gradient(to right, #111111, #0A0A0A)` // Dark gradient for dark mode
      };
    }
  };

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };
  
  const groupVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.03
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={menuVariants}
      className="md:hidden fixed top-[60px] left-0 right-0 border-b border-card-border shadow-lg z-50 overflow-hidden"
      style={getBgStyle()}
    >
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Main gradient overlay */}
        <motion.div 
          className="absolute inset-0 w-full h-full opacity-20"
          style={{
            background: `radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.4) 0%, transparent 70%), 
                       radial-gradient(circle at 80% 80%, rgba(29, 78, 216, 0.3) 0%, transparent 70%)`
          }}
        />
        
        <div className="absolute inset-0 bg-background/80 dark:bg-background/60 backdrop-blur-sm"></div>
      </div>
      
      <div className="py-3 px-4 max-h-[70vh] overflow-y-auto relative z-10">
        {menuGroups.map((group, groupIndex) => (
          <motion.div 
            key={groupIndex} 
            className="mb-5"
            variants={groupVariants}
          >
            <h3 className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400 mb-2 px-1">{group.title}</h3>
            <div className="bg-card-hover/60 backdrop-blur-sm rounded-xl overflow-hidden border border-card-border">
              {group.items.map((item, itemIndex) => {
                const isActive = router.pathname === item.href;
                const isLast = itemIndex === group.items.length - 1;
                return (
                  <Link 
                    href={item.href} 
                    key={item.name}
                    onClick={onClose}
                  >
                    <motion.div 
                      className={clsx(
                        'flex items-center px-4 py-3 hover:bg-primary/10 transition-colors',
                        isActive ? 'bg-primary/10 text-primary' : 'text-gray-800 dark:text-gray-300',
                        !isLast && 'border-b border-card-border'
                      )}
                      variants={itemVariants}
                      whileHover={{ 
                        x: 4,
                        transition: { 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 30 
                        }
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        whileHover={{ 
                          scale: 1.1,
                          transition: { 
                            type: "spring", 
                            stiffness: 500, 
                            damping: 30 
                          }
                        }}
                      >
                        <item.icon size={20} className={clsx('mr-3', isActive ? 'text-primary' : '')} />
                      </motion.div>
                      <span className="font-medium">{item.name}</span>
                      <motion.div 
                        className="ml-auto"
                        animate={isActive ? { x: [0, 5, 0] } : {}}
                        transition={{
                          repeat: isActive ? Infinity : 0,
                          repeatType: "reverse",
                          duration: 1,
                          repeatDelay: 1
                        }}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ))}
        
        <motion.div 
          className="mb-5"
          variants={groupVariants}
        >
          <h3 className="text-xs font-bold uppercase text-gray-700 dark:text-gray-400 mb-2 px-1">Discord</h3>
          <div className="bg-card-hover/60 backdrop-blur-sm rounded-xl overflow-hidden border border-card-border">
            <a 
              href={discordInviteUrl}
              onClick={onClose}
            >
              <motion.div 
                className="flex items-center px-4 py-3 hover:bg-primary/10 border-b border-card-border transition-colors"
                variants={itemVariants}
                whileHover={{ 
                  x: 4,
                  transition: { 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30 
                  }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    transition: { 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30 
                    }
                  }}
                >
                  <ExternalLink size={20} className="mr-3 text-blue-500" />
                </motion.div>
                <span className="font-medium text-gray-800 dark:text-gray-300">Add to Discord</span>
                <ChevronRight size={16} className="ml-auto" />
              </motion.div>
            </a>
            <a 
              href={discordSupportUrl}
              onClick={onClose}
            >
              <motion.div 
                className="flex items-center px-4 py-3 hover:bg-primary/10 transition-colors"
                variants={itemVariants}
                whileHover={{ 
                  x: 4,
                  transition: { 
                    type: "spring", 
                    stiffness: 500, 
                    damping: 30 
                  }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    transition: { 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30 
                    }
                  }}
                >
                  <MessageSquare size={20} className="mr-3 text-blue-500" />
                </motion.div>
                <span className="font-medium text-gray-800 dark:text-gray-300">Support Server</span>
                <ChevronRight size={16} className="ml-auto" />
              </motion.div>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          className="pt-2 text-center text-xs text-gray-700 dark:text-gray-500"
          variants={groupVariants}
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p>{getBotName()} v{version}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}