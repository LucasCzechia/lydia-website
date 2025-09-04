import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Check, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useAppTheme } from '../../context/ThemeContext';

const StatusNotification = ({ 
  status,
  className = "",
  ...props 
}) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';

  const getStatusIcon = () => {
    switch (status?.type) {
      case 'loading':
        return <Loader2 size={20} className="animate-spin text-blue-500" />;
      case 'success':
        return <Check size={20} className="text-green-500" />;
      case 'error':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const getStatusStyles = () => {
    if (!status?.type) return '';
    
    const baseClasses = "flex items-center gap-3 p-4 rounded-[15px] border";
    
    const typeClasses = {
      success: isDark ? "bg-green-900/20 border-green-500/30" : "bg-green-50 border-green-200",
      error: isDark ? "bg-red-900/20 border-red-500/30" : "bg-red-50 border-red-200",
      warning: isDark ? "bg-yellow-900/20 border-yellow-500/30" : "bg-yellow-50 border-yellow-200",
      info: isDark ? "bg-blue-900/20 border-blue-500/30" : "bg-blue-50 border-blue-200",
      loading: isDark ? "bg-blue-900/20 border-blue-500/30" : "bg-blue-50 border-blue-200"
    };
    
    return clsx(baseClasses, typeClasses[status.type], className);
  };

  if (!status?.message) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status.type + status.message}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={getStatusStyles()}
        {...props}
      >
        {getStatusIcon()}
        <span className={clsx(
          "text-sm font-medium",
          isDark ? "text-white/90" : "text-gray-800"
        )}>
          {status.message}
        </span>
      </motion.div>
    </AnimatePresence>
  );
};

export default StatusNotification;