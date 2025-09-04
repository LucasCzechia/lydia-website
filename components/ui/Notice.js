import Link from 'next/link';
import { getConfig, getBotName } from '../../utils/configUtils';
import { useEffect, useState } from 'react';
import DiscordIcon from '../icons/DiscordIcon';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useAppTheme } from '../../context/ThemeContext';

export default function Notice({
  tagline = "Supercharge Your Server",
  title = "Ready to take the next step?",
  subtitle = "Join us now.",
  description,
  buttonText = "Add to Discord",
  buttonUrl,
  secondaryText = "View Features",
  secondaryUrl
}) {
  const { resolvedTheme } = useAppTheme();
  const botName = getBotName();
  const aiModel = getConfig('bot.aiModel', "Google's Gemini 2.5 Flash");
  const inviteUrl = buttonUrl || getConfig('urls.discord.invite');
  const featuresUrl = secondaryUrl || getConfig('urls.nav.features');
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === 'dark';

  const defaultDescription = `Add ${botName} now and start transforming your vision into reality with the ${aiModel} model.`;
  const finalDescription = description || defaultDescription;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const hoverBoxShadow = "0px 8px 40px 0px rgba(0,85,255,0.7), inset 0px 0px 10px 1px rgba(255,255,255,0.3), 0px 0px 0px 5px rgba(0,85,255,0.2)";

  return (
    <section className="py-12 md:py-20 px-4 md:px-0">
      <motion.div 
        className="max-w-lg mx-auto rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border border-blue-900/30 group cursor-pointer"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(59, 130, 246, 0.3)",
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        whileTap={{ scale: 0.98 }}
      >

        {mounted && (
          <video
            src="/videos/background.mp4"
            loop
            preload="auto"
            muted
            playsInline
            autoPlay
            className="group-hover:scale-105 transition-transform duration-500 ease-out"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'translate(-50%, -50%)',
              zIndex: -1,
              borderRadius: 'inherit'
            }}
          ></video>
        )}

        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300 z-[-1] rounded-3xl"></div>

        <div className="relative z-10">
          <motion.div 
            style={{ opacity: 1, display: 'inline-block', marginBottom: '1.5rem' }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
          >
             <div
              className="framer-AxSyY framer-cV14Y framer-N4BCj framer-9xh6r2 framer-v-1neujbl"
              data-border="true"
              data-framer-name="Dotted Highlight Tag"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(2.5px)',
                background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.08) 0%, rgba(153, 153, 153, 0.1) 100%)',
                borderRadius: '10px',
                opacity: 1,
                padding: '6px 14px',
                display: 'inline-flex',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <motion.div
                className="framer-5n0mfo mr-2"
                data-border="true"
                data-framer-name="Bullet Point"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgb(255, 255, 255)',
                  borderRadius: '30px',
                  opacity: 1,
                  width: '6px',
                  height: '6px',
                  flexShrink: 0
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <div
                className="framer-1pw8fxn"
                data-framer-name="Title"
                style={{
                  outline: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  flexShrink: 0,
                }}
              >
                <p
                  className="framer-text framer-styles-preset-m6m3zm"
                  data-styles-preset="qScbNYtt3"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, rgb(255, 255, 255) 0%, rgba(153, 153, 153, 0) 350%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em'
                  }}
                >
                  {tagline}
                </p>
              </div>
              <motion.div
                className="framer-1ahrcnp"
                data-framer-name="Blue Line"
                style={{
                  background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)',
                  willChange: 'transform',
                  opacity: 1,
                  position: 'absolute',
                  bottom: '0px',
                  left: '0px',
                  right: '0px',
                  height: '1px'
                }}
                animate={{
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="framer-alj09w mb-4" 
            data-framer-name="Title" 
            style={{ opacity: 1 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
             <h2
              className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-1 group-hover:text-blue-100 transition-colors duration-300"
              style={{ textAlign: 'center' }}
            >
              {title}
            </h2>
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight group-hover:text-white/80 transition-colors duration-300"
              style={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {subtitle}
            </h2>
          </motion.div>

          <motion.p 
            className="text-base md:text-lg text-white/80 group-hover:text-white/90 mb-8 max-w-sm mx-auto transition-colors duration-300"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            {finalDescription}
          </motion.p>

          <Link href={inviteUrl} passHref legacyBehavior>
            <motion.a
              className={primaryButtonClasses}
              whileHover={{
                boxShadow: hoverBoxShadow,
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ 
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <DiscordIcon className="w-5 h-5 mr-2.5 fill-current" />
              </motion.div>
              {buttonText}
            </motion.a>
          </Link>

          <div className="mt-6">
            <Link href={featuresUrl} passHref legacyBehavior>
              <motion.a 
                className="inline-flex items-center text-sm text-white/70 hover:text-white transition-colors group/link"
                whileHover={{
                  scale: 1.05,
                  y: -1,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="group-hover/link:underline">{secondaryText}</span>
                <motion.div
                  className="ml-1"
                  whileHover={{
                    x: 3,
                    transition: { duration: 0.2 }
                  }}
                >
                  <ChevronRight size={16} />
                </motion.div>
              </motion.a>
            </Link>
          </div>

        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ 
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgb(59, 130, 246) 30%, rgb(147, 197, 253) 50%, rgb(59, 130, 246) 70%, rgba(59, 130, 246, 0) 100%)' 
          }}
        />
      </motion.div>
    </section>
  );
}
