import { MessageSquare, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { getConfig } from '../../utils/configUtils';

export default function DiscordDropdown({ onClose }) {
  const inviteUrl = getConfig('urls.discord.invite');
  const supportUrl = getConfig('urls.discord.supportServer');
  
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: 8,
      transition: {
        duration: 0.2,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={dropdownVariants}
      className="dropdown-menu right-0 mt-2 w-64"
    >
      <div className="py-1">
        <motion.a 
          href={inviteUrl} 
          className="flex items-center px-4 py-3 hover:bg-primary/10 hover:text-foreground border-b border-card-border transition-colors"
          onClick={onClose}
          variants={itemVariants}
          whileHover={{ 
            x: 4,
            backgroundColor: "rgba(139, 92, 246, 0.1)",
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
              rotate: -10,
              transition: { 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }
            }}
          >
            <ExternalLink size={18} className="mr-3 text-primary" />
          </motion.div>
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-300">Add to Discord</p>
            <p className="text-xs text-gray-700 dark:text-gray-500">Invite {getConfig('bot.name')} to your server</p>
          </div>
        </motion.a>
        
        <motion.a 
          href={supportUrl} 
          className="flex items-center px-4 py-3 hover:bg-primary/10 hover:text-foreground transition-colors"
          onClick={onClose}
          variants={itemVariants}
          whileHover={{ 
            x: 4,
            backgroundColor: "rgba(139, 92, 246, 0.1)",
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
              rotate: 10,
              transition: { 
                type: "spring", 
                stiffness: 500, 
                damping: 30 
              }
            }}
          >
            <MessageSquare size={18} className="mr-3 text-primary" />
          </motion.div>
          <div>
            <p className="font-medium text-gray-800 dark:text-gray-300">Support Server</p>
            <p className="text-xs text-gray-700 dark:text-gray-500">Join our Discord community</p>
          </div>
        </motion.a>
      </div>
    </motion.div>
  );
}