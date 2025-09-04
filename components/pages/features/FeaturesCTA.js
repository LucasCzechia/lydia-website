import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useAppTheme } from '../../../context/ThemeContext';
import { getConfig, getBotName } from '../../../utils/configUtils';
import DiscordIcon from '../../icons/DiscordIcon';

export default function FeaturesCTA({ variants }) {
  const { resolvedTheme } = useAppTheme();
  const botName = getBotName();
  const inviteUrl = getConfig('urls.discord.invite');
  const isDark = resolvedTheme === 'dark';

  return (
    <motion.div
      variants={variants}
      className="relative max-w-3xl mx-auto rounded-[20px] p-8 md:p-12 text-center overflow-hidden border"
      style={{
        background: isDark 
          ? 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.2) 0%, rgba(97, 97, 97, 0.15) 100%)'
          : 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.08) 0%, rgba(240, 240, 240, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        boxShadow: isDark 
          ? '0 0 0 1px rgba(0, 0, 0, 0.3)'
          : '0 0 0 1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 30% 40%, rgba(37, 99, 235, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(29, 78, 216, 0.2) 0%, transparent 50%)'
            : 'radial-gradient(circle at 30% 40%, rgba(37, 99, 235, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(29, 78, 216, 0.1) 0%, transparent 50%)'
        }}
      />

      <div className="relative z-10">
        <motion.div
          className={clsx(
            "inline-flex items-center mb-6 rounded-full px-5 py-2 border overflow-hidden backdrop-blur-lg",
            isDark 
              ? "bg-blue-950/50 border-blue-700/30"
              : "bg-blue-100/70 border-blue-300/50"
          )}
          whileHover={{ scale: 1.05 }}
        >
          <Sparkles size={16} className="text-primary mr-2" />
          <span className={clsx(
            "text-sm font-medium",
            isDark ? "text-white/90" : "text-gray-800"
          )}>
            Ready to Get Started?
          </span>
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)'
            }}
          />
        </motion.div>

        <h2 className={clsx(
          "text-3xl md:text-4xl font-bold mb-4",
          isDark ? "text-white" : "text-gray-900"
        )}>
          Transform Your Discord Server Today
        </h2>
        
        <p className={clsx(
          "text-lg mb-8 max-w-2xl mx-auto",
          isDark ? "text-white/80" : "text-gray-700"
        )}>
          Join thousands of communities already using {botName} to enhance their Discord experience with cutting-edge AI capabilities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={inviteUrl} passHref legacyBehavior>
            <motion.a
              className="inline-flex items-center justify-center text-base font-medium px-8 py-3 rounded-[10px] border-[3px] border-solid border-white/15 bg-[#0055FF] text-white shadow-[0px_8px_40px_0px_rgba(0,85,255,0.5),0px_0px_0px_1px_rgba(0,85,255,0.12)] transition-all duration-200 ease-out"
              whileHover={{
                boxShadow: "0px 8px 40px 0px rgba(0,85,255,0.7), inset 0px 0px 10px 1px rgba(255,255,255,0.3), 0px 0px 0px_5px_rgba(0,85,255,0.2)",
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DiscordIcon className="w-5 h-5 mr-2.5 fill-current" />
              Add to Discord
            </motion.a>
          </Link>
          
          <Link href={getConfig('urls.nav.premium')} passHref legacyBehavior>
            <motion.a
              className={clsx(
                "inline-flex items-center justify-center text-base font-medium px-8 py-3 rounded-[10px] border-[2px] transition-all duration-200",
                isDark 
                  ? "border-white/30 text-white bg-white/10 hover:bg-white/20 hover:border-white/50"
                  : "border-gray-400/60 text-gray-800 bg-gray-100/60 hover:bg-gray-200/80 hover:border-gray-500/80"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Premium
              <ArrowRight size={16} className="ml-2" />
            </motion.a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
