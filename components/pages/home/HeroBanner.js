import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { useAppTheme } from '../../../context/ThemeContext';
import { getConfig, getBotName } from '../../../utils/configUtils';
import DiscordIcon from '../../icons/DiscordIcon';
import { animationPresets, createFadeVariants, staggerConfigs } from '../../../utils/motionConfig';

export default function HeroBanner() {
  const { resolvedTheme } = useAppTheme();
  const botName = getBotName();
  const botNameWithoutSymbol = getBotName(false);
  const botTagline = getConfig('bot.tagline', "The most intelligent Discord AI bot, built for the agentic era.");
  const discordInviteUrl = getConfig('urls.discord.invite', '#');
  const logoPath = getConfig('branding.images.logo', '/images/lylia.webp');
  const aiModel = getConfig('bot.aiModel', 'Gemini 2.5 Flash');
  const featuresUrl = getConfig('urls.nav.features', '#');
  const isDark = resolvedTheme === 'dark';

  const containerVariants = createFadeVariants({
    stagger: staggerConfigs.medium,
    duration: 0.4
  });

  const itemVariants = createFadeVariants({
    distance: 30,
    duration: 0.5
  });

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center relative z-10"
    >
      <motion.div
        variants={logoVariants}
        className="mb-8 relative inline-block"
      >
        <div className="relative">
          <Image
            src={logoPath}
            alt={`${botNameWithoutSymbol} Logo`}
            width={200}
            height={200}
            className="rounded-full relative z-10 block"
            priority
            sizes="200px"
          />
          <div 
            className="absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)'
            }}
            aria-hidden="true"
          />
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={clsx(
          "relative inline-flex items-center mb-6 rounded-full px-4 py-1.5 border overflow-hidden",
          isDark 
            ? "bg-primary/10 backdrop-blur-lg border-primary/30"
            : "bg-primary/10 backdrop-blur-lg border-primary/50"
        )}
        role="banner"
        aria-label={`Powered by ${aiModel}`}
      >
        <Sparkles size={16} className="text-primary mr-2" aria-hidden="true" />
        <span className={clsx(
          "text-sm font-medium",
          isDark ? "text-white/90" : "text-gray-800"
        )}>
          Powered by {aiModel}
        </span>
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgb(139, 92, 246) 50%, rgba(139, 92, 246, 0) 100%)'
          }}
          aria-hidden="true"
        />
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className={clsx(
          "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-7 mx-auto px-4 whitespace-nowrap",
          isDark ? "text-white" : "text-gray-900"
        )}
      >
        Introducing <span className="text-primary">{botName}</span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className={clsx(
          "text-lg md:text-xl max-w-3xl mb-8 md:mb-10 px-4 sm:px-2",
          isDark ? "text-gray-300" : "text-gray-600"
        )}
      >
        {botTagline}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col w-full px-4 sm:px-0 sm:flex-row sm:w-auto gap-4 mb-12"
      >
        <Link href={discordInviteUrl} passHref legacyBehavior>
          <motion.a
            className="btn-primary flex items-center justify-center w-full h-12 sm:h-auto text-base sm:text-lg px-8 py-3 bg-primary text-white border-[3px] border-solid border-white/15 shadow-[0px_8px_40px_0px_rgba(139,92,246,0.5),0px_0px_0px_1px_rgba(139,92,246,0.12)] transition-all duration-200 ease-out rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            variants={animationPresets.button}
            whileHover="whileHover"
            whileTap="whileTap"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Add ${botNameWithoutSymbol} to your Discord server`}
          >
            <DiscordIcon className="w-5 h-5 mr-2.5 fill-current" aria-hidden="true" />
            Add to Discord
          </motion.a>
        </Link>
        <Link href={featuresUrl} passHref legacyBehavior>
          <motion.a
            className={clsx(
              "btn-secondary flex items-center justify-center w-full h-12 sm:h-auto text-base sm:text-lg px-8 py-3 bg-transparent font-medium rounded-full transition-all border focus:outline-none focus:ring-2 focus:ring-offset-2",
              isDark
                ? "border-primary hover:border-secondary text-white hover:bg-primary/20 focus:ring-primary"
                : "border-primary hover:border-secondary text-primary hover:bg-primary/10 focus:ring-primary"
            )}
            variants={animationPresets.button}
            whileHover="whileHover"
            whileTap="whileTap"
            aria-label={`Learn more about ${botNameWithoutSymbol} features`}
          >
            Learn more
          </motion.a>
        </Link>
      </motion.div>
    </motion.div>
  );
}