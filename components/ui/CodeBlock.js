import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, AlertTriangle, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useAppTheme } from '../../context/ThemeContext';

const CodeBlock = ({ 
  content = '',
  onCopy,
  copyState = 'ready',
  maxHeight = 'max-h-96',
  language = '',
  showCopyButton = true,
  className = "",
  ...props 
}) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';

  const getCopyButtonContent = () => {
    switch (copyState) {
      case 'loading':
        return { icon: <Loader2 size={16} className="animate-spin" />, text: 'Loading...' };
      case 'copying':
        return { icon: <Loader2 size={16} className="animate-spin" />, text: 'Copying...' };
      case 'copied':
        return { icon: <Check size={16} className="text-green-500" />, text: 'Copied!' };
      case 'error':
        return { icon: <AlertTriangle size={16} className="text-red-500" />, text: 'Error' };
      default:
        return { icon: <Copy size={16} />, text: 'Copy' };
    }
  };

  const buttonContent = getCopyButtonContent();

  return (
    <div className={clsx("relative", className)} {...props}>
      <pre
        className={clsx(
          "p-4 md:p-6 rounded-[15px] border text-sm overflow-auto font-mono leading-relaxed",
          maxHeight,
          isDark 
            ? "bg-gray-900/50 border-gray-700/50 text-gray-300" 
            : "bg-gray-50/80 border-gray-300/50 text-gray-800"
        )}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: isDark ? '#4B5563 #1F2937' : '#9CA3AF #F3F4F6'
        }}
      >
        <code data-language={language}>{content}</code>
      </pre>
      
      {showCopyButton && (
        <motion.button
          onClick={onCopy}
          disabled={copyState === 'loading' || copyState === 'copying' || copyState === 'error'}
          className={clsx(
            "absolute top-3 right-3 md:top-4 md:right-4 px-2 py-1.5 md:px-3 md:py-2 rounded-lg border text-xs md:text-sm font-medium transition-all duration-200",
            isDark
              ? "bg-gray-800/80 border-gray-600/50 text-gray-300 hover:bg-gray-700/80 hover:border-gray-500/50"
              : "bg-white/80 border-gray-300/50 text-gray-700 hover:bg-gray-100/80 hover:border-gray-400/50",
            "disabled:opacity-60 disabled:cursor-not-allowed"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-1.5 md:gap-2">
            {buttonContent.icon}
            <span className="hidden sm:inline">{buttonContent.text}</span>
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default CodeBlock;