import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, ExternalLink } from 'lucide-react';
import { getConfig } from '../../utils/configUtils';

export default function DevelopmentNotice() {
  const [showNotice, setShowNotice] = useState(false);
  const [mounted, setMounted] = useState(false);
  const discordSupportUrl = getConfig('urls.discord.supportServer');
  
  useEffect(() => {
    setMounted(true);
    // Check if the user has already acknowledged the notice
    const hasAcknowledged = localStorage.getItem('devNoticeAcknowledged') === 'true';
    
    if (!hasAcknowledged) {
      setShowNotice(true);
    }
  }, []);
  
  const handleAcknowledge = () => {
    localStorage.setItem('devNoticeAcknowledged', 'true');
    setShowNotice(false);
  };
  
  // Reset acknowledgment for testing (remove in production)
  const resetAcknowledgment = () => {
    localStorage.removeItem('devNoticeAcknowledged');
    setShowNotice(true);
  };
  
  if (!mounted) return null;
  
  return (
    <AnimatePresence>
      {showNotice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && handleAcknowledge()}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card border border-card-border rounded-xl shadow-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={handleAcknowledge}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-primary/10 transition-colors"
              aria-label="Close notice"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-yellow-500/10 rounded-full p-3 text-yellow-500">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-xl font-bold">Development Notice</h2>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                Welcome to the {getConfig('bot.name')} website! Please note that this site is currently in <span className="text-yellow-500 font-medium">active development</span>.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                Many features are still being implemented, and you may encounter:
              </p>
              
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                <li>Missing pages or content</li>
                <li>Features that are not yet functional</li>
                <li>Visual elements that may change</li>
              </ul>
              
              <p className="text-gray-700 dark:text-gray-300">
                We appreciate your patience as we continue to improve the {getConfig('bot.name')} experience.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
              <button
                onClick={handleAcknowledge}
                className="btn-primary w-full sm:w-auto flex-shrink-0 flex items-center justify-center py-2 px-4"
              >
                I Understand
              </button>
              
              <a 
                href={discordSupportUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary flex items-center hover:underline w-full sm:w-auto justify-center"
              >
                <ExternalLink size={16} className="mr-1" />
                Join our Discord for Updates
              </a>
            </div>
            
            {/* Developer testing button - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <button
                onClick={resetAcknowledgment}
                className="absolute bottom-2 right-2 text-xs text-gray-400 hover:text-gray-500"
              >
                Reset (dev only)
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
