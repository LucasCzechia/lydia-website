import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Zap, Users, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import Layout from '../components/common/Layout';
import LoginButton from '../components/auth/LoginButton';
import AuthSuccess from '../components/auth/AuthSuccess';
import AuthError from '../components/auth/AuthError';
import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';
import { getBotName, getConfig } from '../utils/configUtils';
import dynamic from 'next/dynamic';
import clsx from 'clsx';

const AnimatedBackground = dynamic(
  () => import('../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Login() {
  const { user, loading } = useAuth();
  const { resolvedTheme } = useAppTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authState, setAuthState] = useState('login');
  
  const botName = getBotName();
  const featuresUrl = getConfig('urls.nav.features');
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (router.query.error) {
      setAuthState('error');
      return;
    }
    
    if (router.query.success || (!loading && user)) {
      setAuthState('success');
      return;
    }

    if (!loading && user && !router.query.error && !router.query.success) {
      router.push('/');
    }
  }, [router.query, user, loading, router]);

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

  const features = [
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Get started immediately with full access to all features'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: Users,
      title: 'Community Ready',
      description: 'Join thousands of users already using our platform'
    }
  ];

  if (!mounted) {
    return (
      <Layout title={`Login - ${botName}`}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout title={`Login - ${botName}`}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (authState === 'success') {
    return (
      <Layout title={`Login Success - ${botName}`}>
        <AuthSuccess />
      </Layout>
    );
  }

  if (authState === 'error') {
    return (
      <Layout title={`Login Error - ${botName}`}>
        <AuthError error={router.query.error} onRetry={() => setAuthState('login')} />
      </Layout>
    );
  }

  return (
    <Layout title={`Login - ${botName}`}>
      <div className="framer-theme relative">
        <AnimatedBackground intensity="light" theme="primary" enableParallax={false} blendMode="overlay" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="min-h-screen flex items-start justify-center py-16 px-4 relative z-10"
        >
          <div className="w-full max-w-sm md:max-w-md">
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border relative overflow-hidden p-6 md:p-8 text-center shadow-xl"
              style={{
                background: isDark
                  ? 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.15) 0%, rgba(97, 97, 97, 0.09) 100%)'
                  : 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.05) 0%, rgba(240, 240, 240, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)'
              }}
            >
              <motion.div
                variants={itemVariants}
                className="mb-6 md:mb-8 pt-2"
              >
                <h1 className={clsx(
                  'text-2xl md:text-3xl font-bold mb-2',
                  isDark ? 'text-white' : 'text-gray-900'
                )}>
                  Welcome to {getBotName()}
                </h1>
                <p className={clsx(
                  'text-sm md:text-base',
                  isDark ? 'text-gray-300' : 'text-gray-600'
                )}>
                  Sign in to access your dashboard
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mb-6 md:mb-8"
              >
                <LoginButton
                  variant="discord"
                  size="md"
                  className="w-full py-3 text-base"
                >
                  Continue with Discord
                </LoginButton>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-3 md:space-y-4 mb-6 md:mb-8"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center text-left p-3 rounded-lg"
                      style={{
                        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <div className={clsx(
                        'w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0',
                        isDark ? 'bg-blue-900/30' : 'bg-blue-100'
                      )}>
                        <Icon size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <h3 className={clsx(
                          'font-medium text-sm',
                          isDark ? 'text-white' : 'text-gray-900'
                        )}>
                          {feature.title}
                        </h3>
                        <p className={clsx(
                          'text-xs',
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        )}>
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className={clsx(
                  'text-xs',
                  isDark ? 'text-gray-500' : 'text-gray-600'
                )}
              >
                By signing in, you agree to our{' '}
                <Link href="/terms" className="text-blue-500 hover:underline">
                  Terms
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </Link>
              </motion.div>

              <div
                className="absolute bottom-0 left-0 right-0 h-1 opacity-60"
                style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)' }}
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 text-center space-y-2"
            >
              <Link href="/">
                <motion.button
                  className={clsx(
                    'inline-flex items-center text-sm transition-colors',
                    isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Home
                </motion.button>
              </Link>

              <Link href={featuresUrl}>
                <motion.span
                  className={clsx(
                    'block text-sm hover:underline transition-colors',
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  Learn more about our features
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
