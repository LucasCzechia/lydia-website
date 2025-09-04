import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import { Crown, Zap } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { useAppTheme } from '../context/ThemeContext';
import { getBotName, getConfig } from '../utils/configUtils';
import FeaturesGrid from '../components/pages/features/FeaturesGrid';
import Notice from '../components/ui/Notice';

const AnimatedBackground = dynamic(
  () => import('../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Features() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useAppTheme();
  const botName = getBotName();
  const premiumUrl = getConfig('urls.nav.premium');
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonBaseClasses = "inline-flex items-center justify-center text-base sm:text-lg font-medium px-8 py-3 h-12 sm:h-auto rounded-[10px] border-[3px] border-solid border-white/15 shadow-[0px_8px_40px_0px_rgba(0,85,255,0.5),0px_0px_0px_1px_rgba(0,85,255,0.12)] transition-all duration-200 ease-out";

  const primaryButtonClasses = `${buttonBaseClasses} bg-[#0055FF] text-white`;

  const hoverBoxShadow = "0px_8px_40px_0px_rgba(0,85,255,0.7), inset_0px_0px_10px_1px_rgba(255,255,255,0.3), 0px_0px_0px_5px_rgba(0,85,255,0.2)";

  if (!mounted) {
    return (
      <Layout title={`Features - ${botName}`}>
        <div className="max-w-6xl mx-auto px-4 pt-20">
          <div className="animate-pulse">
            <div className="h-12 bg-card rounded mb-6 w-1/2 mx-auto"></div>
            <div className="h-6 bg-card rounded mb-12 w-2/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-80 bg-card rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Features - ${botName}`}>
      <div className="framer-theme relative">
        <AnimatedBackground intensity="medium" theme="primary" enableParallax={true} blendMode="overlay" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10"
        >
          <section className="py-12 md:py-20 px-4 md:px-0">
            <div className="max-w-6xl mx-auto">
              
              <div className="mb-10 md:mb-16 text-center">
                <motion.div
                  className={clsx(
                    "relative inline-flex items-center mb-6 rounded-full px-5 py-2 border overflow-hidden",
                    isDark 
                      ? "bg-blue-950/50 backdrop-blur-lg border-blue-700/30"
                      : "bg-blue-100/70 backdrop-blur-lg border-blue-300/50"
                  )}
                  variants={itemVariants}
                >
                  <Zap size={16} className="text-primary mr-2.5" />
                  <span className={clsx(
                    "text-sm font-medium",
                    isDark ? "text-white/90" : "text-gray-800"
                  )}>
                    Powerful Features
                  </span>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)'
                    }}
                  />
                </motion.div>

                <motion.h2
                  className={clsx(
                    "text-4xl md:text-5xl font-bold mb-4 md:mb-5 tracking-tight",
                    isDark ? "text-white" : "text-gray-900"
                  )}
                  variants={itemVariants}
                >
                  Everything {botName} Can Do
                </motion.h2>

                <motion.p
                  className={clsx(
                    "text-lg md:text-xl max-w-2xl mx-auto",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}
                  variants={itemVariants}
                >
                  Discover the comprehensive AI capabilities that make {botName} the most advanced Discord bot for your community.
                </motion.p>
              </div>
              
              <FeaturesGrid variants={itemVariants} />
              
              <motion.div
                variants={itemVariants}
                className="text-center mb-8"
              >
                <Link href={premiumUrl} passHref legacyBehavior>
                  <motion.a
                    className={primaryButtonClasses}
                    whileHover={{
                      boxShadow: hoverBoxShadow,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Crown className="w-5 h-5 mr-2.5" />
                    Browse Pro Features
                  </motion.a>
                </Link>
              </motion.div>
            </div>
          </section>
          
          <Notice 
            title="Ready to Transform Your Server?"
            subtitle=""
            description={`Join thousands of Discord communities already using ${botName} to enhance their server experience with cutting-edge AI capabilities.`}
            secondaryText="Join our Discord"
            secondaryUrl="/contact"
          />
        </motion.div>
      </div>
    </Layout>
  );
}