import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import { Crown, ImageIcon, Sparkles, Wand2, Layers, Scissors, Palette, ArrowRight } from 'lucide-react';
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
      icon: ImageIcon,
      title: "Unlimited Image Generation",
      description: "Generate unlimited high-quality images with Google's Gemini 2.5 Flash Image (Nano Banana) without rate limits",
      color: "text-primary",
      lightColor: "text-primary",
      badgeType: "PRO"
    },
    {
      icon: Sparkles,
      title: "Premium Resolution",
      description: "Access to ultra-high resolution image generation up to 4K and beyond for professional quality results",
      color: "text-secondary",
      lightColor: "text-secondary",
      badgeType: "PRO"
    },
    {
      icon: Wand2,
      title: "Advanced Magic Tools",
      description: "Exclusive access to cutting-edge AI tools like intelligent object removal and scene reconstruction",
      color: "text-accent",
      lightColor: "text-accent",
      badgeType: "PREMIUM"
    },
    {
      icon: Layers,
      title: "Batch Processing",
      description: "Process multiple images simultaneously with batch editing and bulk style transfers",
      color: "text-yellow-400",
      lightColor: "text-yellow-600",
      badgeType: "PRO"
    },
    {
      icon: Scissors,
      title: "Professional Editing",
      description: "Access to professional-grade editing tools with precision control and advanced masking",
      color: "text-green-400",
      lightColor: "text-green-600",
      badgeType: "PRO"
    },
    {
      icon: Palette,
      title: "Custom Style Training",
      description: "Train custom art styles from your own images and apply them to generate consistent branded content",
      color: "text-orange-400",
      lightColor: "text-orange-600",
      badgeType: "PREMIUM"
    }
  ];

  const buttonBaseClasses = clsx(
    "inline-flex items-center justify-center",
    "text-base sm:text-lg font-medium",
    "px-8 py-3 h-12 sm:h-auto",
    "rounded-[10px]",
    "border-[3px] border-solid border-white/15",
    "shadow-[0px_8px_40px_0px_rgba(139,92,246,0.5),0px_0px_0px_1px_rgba(139,92,246,0.12)]",
    "transition-all duration-200 ease-out"
  );

  const primaryButtonClasses = clsx(
    buttonBaseClasses,
    "bg-[#8B5CF6]",
    "text-white"
  );

  const hoverBoxShadow = "0px_8px_40px_0px_rgba(139,92,246,0.7), inset_0px_0px_10px_1px_rgba(255,255,255,0.3), 0px_0px_0px_5px_rgba(139,92,246,0.2)";

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
                      ? "bg-primary/50 backdrop-blur-lg border-primary/30"
                      : "bg-primary/70 backdrop-blur-lg border-primary/50"
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
                      background: 'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgb(139, 92, 246) 50%, rgba(139, 92, 246, 0) 100%)'
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
                  We're developing premium image generation capabilities for {botName}. 
                  Get ready for unlimited creation and professional-grade editing tools.
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
                        ? "bg-primary/50 backdrop-blur-lg border-primary/30"
                        : "bg-primary/70 backdrop-blur-lg border-primary/50"
                    )}
                    variants={itemVariants}
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-2.5"></span>
                    <span className={clsx(
                      "text-sm font-medium",
                      isDark ? "text-white/90" : "text-gray-800"
                    )}>
                      Upcoming Features
                    </span>
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{
                        background: 'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgb(139, 92, 246) 50%, rgba(139, 92, 246, 0) 100%)'
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