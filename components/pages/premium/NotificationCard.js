import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import DiscordIcon from '../../icons/DiscordIcon';

const NotificationCard = ({ 
  discordSupportUrl, 
  variants = {},
  ...props 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const AnimatedBulletPoint = () => (
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
    />
  );

  const AnimatedBadge = () => (
    <motion.div
      className="relative inline-flex items-center mb-6 rounded-full px-5 py-2 border overflow-hidden bg-blue-950/50 backdrop-blur-lg border-blue-700/30"
      whileHover={{ scale: 1.05 }}
    >
      <AnimatedBulletPoint />
      <div className="framer-1pw8fxn">
        <p
          className="framer-text framer-styles-preset-m6m3zm"
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
          Get Notified
        </p>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{
          background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(0, 85, 255) 50%, rgba(0, 85, 255, 0) 100%)'
        }}
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );

  return (
    <motion.div 
      className="max-w-lg mx-auto rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border border-blue-900/30 group cursor-pointer"
      variants={variants}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(59, 130, 246, 0.3)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      {...props}
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
        />
      )}

      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300 z-[-1] rounded-3xl" />

      <div className="relative z-10">
        <motion.div 
          style={{ opacity: 1, display: 'inline-block', marginBottom: '1.5rem' }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          <AnimatedBadge />
        </motion.div>

        <motion.div 
          className="mb-4" 
          style={{ opacity: 1 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-1 group-hover:text-blue-100 transition-colors duration-300">
            Have Questions?
          </h2>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-white/80 transition-colors duration-300 text-white/60">
            Join our Community
          </h2>
        </motion.div>

        <motion.p 
          className="text-base md:text-lg text-white/80 group-hover:text-white/90 mb-8 max-w-sm mx-auto transition-colors duration-300"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          Connect with our Discord community for updates, support, and early access to premium features.
        </motion.p>

        <Link href={discordSupportUrl} passHref legacyBehavior>
          <motion.a
            className="inline-flex items-center justify-center text-base sm:text-lg font-medium px-8 py-3 h-12 sm:h-auto rounded-[10px] border-[3px] border-solid border-white/15 bg-[#0055FF] text-white shadow-[0px_8px_40px_0px_rgba(0,85,255,0.5),0px_0px_0px_1px_rgba(0,85,255,0.12)] transition-all duration-200 ease-out"
            whileHover={{
              boxShadow: "0px 8px 40px 0px rgba(0,85,255,0.7), inset 0px 0px 10px 1px rgba(255,255,255,0.3), 0px 0px 0px_5px_rgba(0,85,255,0.2)",
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
            Join Discord Server
          </motion.a>
        </Link>

        <div className="mt-6">
          <Link href="/contact" passHref legacyBehavior>
            <motion.a 
              className="inline-flex items-center text-sm text-white/70 hover:text-white transition-colors group/link"
              whileHover={{
                scale: 1.05,
                y: -1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="group-hover/link:underline">Contact Support</span>
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
  );
};

export default NotificationCard;