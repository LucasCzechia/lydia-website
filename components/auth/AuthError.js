import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAppTheme } from '../../context/ThemeContext';
import { getBotName } from '../../utils/configUtils';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import CountdownCircle from './CountdownCircle';

const AnimatedBackground = dynamic(
  () => import('../common/AnimatedBackground'),
  { ssr: false }
);

export default function AuthError({ error, onRetry }) {
  const { resolvedTheme } = useAppTheme();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const botName = getBotName();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const getErrorMessage = () => {
    switch (error) {
      case 'access_denied':
        return 'You cancelled the authorization process. Please try again to continue.';
      case 'invalid_request':
        return 'There was an issue with the login request. Please try again.';
      case 'server_error':
        return 'Our servers are experiencing issues. Please try again in a moment.';
      default:
        return 'An unexpected error occurred during login. Please try again.';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 0.3, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="framer-theme relative">
      <AnimatedBackground intensity="light" theme="primary" enableParallax={false} blendMode="overlay" />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen flex items-center justify-center py-8 px-4 relative z-10"
      >
        <div className="w-full max-w-md">
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border relative overflow-hidden p-8 text-center shadow-2xl"
            style={{
              background: isDark
                ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.15) 0%, rgba(0, 85, 255, 0.1) 100%)'
                : 'linear-gradient(145deg, rgba(239, 68, 68, 0.1) 0%, rgba(0, 85, 255, 0.05) 100%)',
              backdropFilter: 'blur(20px)',
              borderColor: isDark ? 'rgba(239, 68, 68, 0.3)' : 'rgba(239, 68, 68, 0.2)'
            }}
          >
            <motion.div className="relative mb-8">
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 w-20 h-20 mx-auto rounded-full bg-red-500/20"
              />
              <motion.div
                variants={iconVariants}
                className="relative w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center"
              >
                <AlertTriangle size={48} className="text-red-500" />
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h1 className={clsx(
                'text-3xl font-bold mb-3',
                isDark ? 'text-white' : 'text-gray-900'
              )}>
                Login Failed
              </h1>
              <p className={clsx(
                'text-base leading-relaxed',
                isDark ? 'text-gray-300' : 'text-gray-600'
              )}>
                {getErrorMessage()}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center justify-center space-x-4">
                <CountdownCircle countdown={countdown} variant="error" />
                <div className="text-left">
                  <p className={clsx(
                    'text-sm font-medium',
                    isDark ? 'text-white' : 'text-gray-900'
                  )}>
                    Redirecting to homepage
                  </p>
                  <p className={clsx(
                    'text-xs',
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  )}>
                    in {countdown} second{countdown !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <motion.button
                onClick={onRetry}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw size={20} className="mr-2" />
                Try Again
              </motion.button>

              <Link href="/">
                <motion.button
                  className={clsx(
                    'w-full inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg transition-all duration-200 border',
                    isDark
                      ? 'bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50'
                      : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-50'
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home size={20} className="mr-2" />
                  Back to Home
                </motion.button>
              </Link>
            </motion.div>

            <div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{ background: 'linear-gradient(90deg, rgba(239, 68, 68, 0) 0%, rgb(239, 68, 68) 50%, rgba(239, 68, 68, 0) 100%)' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
