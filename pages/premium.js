import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import { Crown, Bot, Sparkles, Zap, Eye, Globe, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import { useAppTheme } from '../context/ThemeContext';
import { getConfig, getBotName } from '../utils/configUtils';
import PremiumFeatureCard from '../components/pages/premium/PremiumFeatureCard';
import NotificationCard from '../components/pages/premium/NotificationCard';

const AnimatedBackground = dynamic(
  () => import('../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Premium() {
  const { resolvedTheme } = useAppTheme();
  const [mounted, setMounted] = useState(false);
  
  const botName = getBotName();
  const isDark = resolvedTheme === 'dark';
  const discordSupportUrl = getConfig('urls.discord.supportServer');
  const featuresUrl = getConfig('urls.nav.features');

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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

  const upcomingFeatures = [
    {
      icon: Bot,
      title: "Custom Personalities",
      description: "Create unique AI personalities tailored to your server's needs and community culture",
      color: "text-blue-500",
      lightColor: "text-blue-600",
      badgeType: "SOON"
    },
    {
      icon: Sparkles,
      title: "Advanced AI Models",
      description: "Access to the latest and most powerful AI models for enhanced conversations",
      color: "text-purple-400",
      lightColor: "text-purple-600",
      badgeType: "SOON"
    },
    {
      icon: Zap,
      title: "Enhanced Performance",
      description: "Faster response times and increased rate limits for premium subscribers",
      color: "text-yellow-400",
      lightColor: "text-yellow-600",
      badgeType: "SOON"
    },
    {
      icon: Eye,
      title: "Advanced Vision",
      description: "Enhanced image analysis and visual understanding capabilities",
      color: "text-pink-400",
      lightColor: "text-pink-600",
      badgeType: "SOON"
    },
    {
      icon: Globe,
      title: "Extended Web Access",
      description: "Unlimited web browsing and real-time information access",
      color: "text-cyan-400",
      lightColor: "text-cyan-600",
      badgeType: "SOON"
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "Get premium 24/7 support with faster response times and dedicated assistance",
      color: "text-green-400",
      lightColor: "text-green-600",
      badgeType: "SOON"
    }
  ];

  const buttonBaseClasses = clsx(
    "inline-flex items-center justify-center",
    "text-base sm:text-lg font-medium",
    "px-8 py-3 h-12 sm:h-auto",
    "rounded-[10px]",
    "border-[3px] border-solid border-white/15",
    "shadow-[0px_8px_40px_0px_rgba(0,85,255,0.5),0px_0px_0px_1px_rgba(0,85,255,0.12)]",
    "transition-all duration-200 ease-out"
  );

  const primaryButtonClasses = clsx(
    buttonBaseClasses,
    "bg-[#0055FF]",
    "text-white"
  );

  const hoverBoxShadow = "0px_8px_40px_0px_rgba(0,85,255,0.7), inset_0px_0px_10px_1px_rgba(255,255,255,0.3), 0px_0px_0px_5px_rgba(0,85,255,0.2)";

  if (!mounted) {
    return (
      <Layout title={`Premium - ${botName}`}>
        <div className="max-w-4xl mx-auto px-4 pt-20">
          <div className="animate-pulse">
            <div className="h-12 bg-card rounded mb-6 w-1/2 mx-auto"></div>
            <div className="h-6 bg-card rounded mb-12 w-2/3 mx-auto"></div>
            <div className="h-80 bg-card rounded-xl"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Premium - ${botName}`}>
      <div className="framer-theme relative">
        <AnimatedBackground intensity="light" theme="primary" enableParallax={true} blendMode="overlay" />
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-10"
        >
          <section className="py-12 md:py-20 px-4 md:px-0">
            <div className="max-w-4xl mx-auto">
              
              <motion.div
                variants={itemVariants}
                className="text-center mb-16"
              >
                <motion.div
                  className={clsx(
                    "relative inline-flex items-center mb-6 rounded-full px-5 py-2 border overflow-hidden",
                    isDark 
                      ? "bg-blue-950/50 backdrop-blur-lg border-blue-700/30"
                      : "bg-blue-100/70 backdrop-blur-lg border-blue-300/50"
                  )}
                  whileHover={{ scale: 1.05 }}
                >
                  <Crown size={16} className="text-primary mr-2.5" />
                  <span className={clsx(
                    "text-sm font-medium",
                    isDark ? "text-white/90" : "text-gray-800"
                  )}>
                    Premium Features
                  </span>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{
                      background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)'
                    }}
                  />
                </motion.div>

                <motion.h1
                  className={clsx(
                    "text-4xl md:text-6xl font-bold mb-6 tracking-tight",
                    isDark ? "text-white" : "text-gray-900"
                  )}
                  variants={itemVariants}
                >
                  Coming Soon
                </motion.h1>

                <motion.p
                  className={clsx(
                    "text-lg md:text-xl max-w-2xl mx-auto",
                    isDark ? "text-gray-300" : "text-gray-600"
                  )}
                  variants={itemVariants}
                >
                  We're working hard to bring you premium features for {botName}. 
                  Stay tuned for exciting updates and enhanced capabilities.
                </motion.p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mb-12"
              >
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
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2.5"></span>
                    <span className={clsx(
                      "text-sm font-medium",
                      isDark ? "text-white/90" : "text-gray-800"
                    )}>
                      Upcoming Features
                    </span>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{
                        background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)'
                      }}
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingFeatures.map((feature, index) => (
                    <PremiumFeatureCard
                      key={feature.title}
                      feature={feature}
                      index={index}
                      delay={0.1}
                    />
                  ))}
                </div>

                <motion.div
                  variants={itemVariants}
                  className="text-center mt-12"
                >
                  <Link href={featuresUrl} passHref legacyBehavior>
                    <motion.a
                      className={primaryButtonClasses}
                      whileHover={{
                        boxShadow: hoverBoxShadow,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight className="w-5 h-5 mr-2.5" />
                      Browse Free Features
                    </motion.a>
                  </Link>
                </motion.div>
              </motion.div>

              <NotificationCard 
                discordSupportUrl={discordSupportUrl}
                variants={itemVariants}
              />

            </div>
          </section>
        </motion.div>
      </div>
    </Layout>
  );
}