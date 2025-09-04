import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';
import { getConfig } from '../../utils/configUtils';

const ToastContext = createContext({
  showToast: (message, type, duration) => {},
  hideToast: () => {}
});

const TOAST_TYPES = {
  success: {
    icon: CheckCircle,
    iconColor: 'text-green-500',
    progressColor: 'bg-green-500',
    border: 'border-green-500/30',
    progressShadow: 'rgba(74, 222, 128, 0.4)'
  },
  error: {
    icon: AlertCircle,
    iconColor: 'text-red-500',
    progressColor: 'bg-red-500',
    border: 'border-red-500/30',
    progressShadow: 'rgba(248, 113, 113, 0.4)'
  },
  warning: {
    icon: AlertTriangle,
    iconColor: 'text-yellow-500',
    progressColor: 'bg-yellow-500',
    border: 'border-yellow-500/30',
    progressShadow: 'rgba(251, 191, 36, 0.4)'
  },
  info: {
    icon: Info,
    iconColor: 'text-blue-500',
    progressColor: 'bg-blue-500',
    border: 'border-blue-500/30',
    progressShadow: 'rgba(96, 165, 250, 0.4)'
  }
};

const BASE_BG_COLOR_DARK = 'rgba(17, 17, 17, 0.9)';
const BASE_BG_COLOR_LIGHT = 'rgba(245, 245, 245, 0.9)';
const BASE_SHADOW = '0 4px 12px rgba(37, 99, 235, 0.15)';
const BASE_GLOW_GRADIENT = 'radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.1) 0%, transparent 70%), radial-gradient(circle at 75% 75%, rgba(29, 78, 216, 0.1) 0%, transparent 70%)';

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const primaryColor = getConfig('branding.colors.primary', '37, 99, 235').replace('#', '');
  const secondaryColor = getConfig('branding.colors.secondary', '29, 78, 216').replace('#', '');

  const hideToast = useCallback(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setToast(null);
    setTimeoutId(null);
  }, [timeoutId]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newToast = { id: Date.now(), message, type, duration };
    setToast(newToast);

    const id = setTimeout(() => {
      setToast(currentToast => (currentToast?.id === newToast.id ? null : currentToast));
      setTimeoutId(null);
    }, duration);
    setTimeoutId(id);
  }, [timeoutId]);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  const currentToastType = toast ? TOAST_TYPES[toast.type] : null;

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      <div
        className="fixed top-0 left-0 right-0 flex justify-center pt-20 z-[9999] pointer-events-none"
        aria-live="assertive"
      >
        <AnimatePresence mode="wait">
          {toast && currentToastType && (
            <motion.div
              key={toast.id}
              className="pointer-events-auto px-4 w-auto relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.8
              }}
              style={{ transform: 'translateZ(0)' }}
            >
              <div
                className={clsx(
                  "relative rounded-full shadow-md overflow-hidden border",
                  currentToastType.border,
                  "bg-[rgba(245,245,245,0.9)] dark:bg-[rgba(17,17,17,0.9)]"
                )}
                style={{
                  boxShadow: BASE_SHADOW,
                }}
              >
                <div
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{
                    background: BASE_GLOW_GRADIENT.replace('37, 99, 235', primaryColor).replace('29, 78, 216', secondaryColor),
                    opacity: 0.8,
                  }}
                />

                <div className="relative z-10 flex items-center px-4 py-1.5">
                  <div className={`${currentToastType.iconColor} mr-2`}>
                    {React.createElement(currentToastType.icon, {
                      size: 18,
                      strokeWidth: 2.5,
                      style: { filter: 'drop-shadow(0 0 2px rgba(59, 130, 246, 0.5))' }
                    })}
                  </div>

                  <span className="text-sm font-medium text-foreground/90 dark:text-white/90">
                    {toast.message}
                  </span>

                  <button
                    onClick={hideToast}
                    className="ml-2 p-1 rounded-full hover:bg-white/10 dark:hover:bg-black/20 transition-colors"
                    aria-label="Close notification"
                  >
                    <X size={14} className="text-foreground/60 dark:text-white/60" />
                  </button>
                </div>
              </div>

              <motion.div
                className={clsx(
                  "h-1 opacity-60 rounded-full mt-1 mx-auto",
                  currentToastType.progressColor
                )}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{
                  duration: toast.duration / 1000,
                  ease: "linear"
                }}
                style={{
                  boxShadow: `0 0 8px ${currentToastType.progressShadow}`
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
