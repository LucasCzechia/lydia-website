import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Calendar, Star } from 'lucide-react';
import Layout from '../components/common/Layout';
import { useAuth, withAuthRequired } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';
import { getBotName } from '../utils/configUtils';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

const AnimatedBackground = dynamic(
  () => import('../components/common/AnimatedBackground'),
  { ssr: false }
);

function Profile() {
  const { user } = useAuth();
  const { resolvedTheme } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  const botName = getBotName();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const getCardStyle = () => {
    return isDark
      ? {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.15) 0%, rgba(97, 97, 97, 0.09) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(255, 255, 255, 0.07)'
        }
      : {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.05) 0%, rgba(240, 240, 240, 0.8) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(0, 0, 0, 0.07)'
        };
  };

  if (!mounted || !user) {
    return (
      <Layout title={`Profile - ${botName}`}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  const displayName = user.displayName || user.username;

  return (
    <Layout title={`Profile - ${botName}`}>
      <div className="framer-theme relative">
        <AnimatedBackground intensity="light" theme="primary" enableParallax={true} blendMode="overlay" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-4xl mx-auto px-4 py-12 md:py-20 relative z-10"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className={clsx(
              "text-3xl md:text-4xl font-bold",
              isDark ? "text-white" : "text-gray-900"
            )}>
              Profile
            </h1>
            <p className={clsx(
              "text-lg mt-2",
              isDark ? "text-gray-300" : "text-gray-600"
            )}>
              Manage your account settings and preferences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <div
                className="rounded-[20px] border relative overflow-hidden p-6 text-center"
                style={getCardStyle()}
              >
                <div className="mb-6">
                  <img
                    src={user.avatar}
                    alt={displayName}
                    className="w-24 h-24 rounded-full mx-auto border-4 border-primary/20"
                  />
                </div>
                
                <h2 className={clsx(
                  "text-xl font-bold mb-1",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  {displayName}
                </h2>
                
                <p className={clsx(
                  "text-sm mb-4",
                  isDark ? "text-gray-400" : "text-gray-600"
                )}>
                  @{user.username}
                </p>

                {user.premiumType > 0 && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-medium mb-4">
                    <Star size={14} className="mr-1" />
                    Discord Nitro
                  </div>
                )}
                
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
                  style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)' }}
                />
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <div
                className="rounded-[20px] border relative overflow-hidden p-6"
                style={getCardStyle()}
              >
                <h3 className={clsx(
                  "text-lg font-semibold mb-6",
                  isDark ? "text-white" : "text-gray-900"
                )}>
                  Account Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <User size={20} className="text-blue-500 mr-3" />
                    <div>
                      <p className={clsx(
                        "font-medium",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Display Name
                      </p>
                      <p className={clsx(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        {displayName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <User size={20} className="text-purple-500 mr-3" />
                    <div>
                      <p className={clsx(
                        "font-medium",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Username
                      </p>
                      <p className={clsx(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        @{user.username}
                      </p>
                    </div>
                  </div>


                  <div className="flex items-center">
                    <Shield size={20} className="text-purple-500 mr-3" />
                    <div>
                      <p className={clsx(
                        "font-medium",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Verification Status
                      </p>
                      <p className={clsx(
                        "text-sm",
                        user.verified 
                          ? "text-green-600 dark:text-green-400" 
                          : "text-red-600 dark:text-red-400"
                      )}>
                        {user.verified ? 'Verified' : 'Not verified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Calendar size={20} className="text-orange-500 mr-3" />
                    <div>
                      <p className={clsx(
                        "font-medium",
                        isDark ? "text-white" : "text-gray-900"
                      )}>
                        Locale
                      </p>
                      <p className={clsx(
                        "text-sm",
                        isDark ? "text-gray-400" : "text-gray-600"
                      )}>
                        {user.locale || 'en-US'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
                  style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default withAuthRequired(Profile);
