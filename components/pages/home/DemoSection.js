import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useAppTheme } from '../../../context/ThemeContext';
import { getBotName } from '../../../utils/configUtils';
import SectionHeader from '../../ui/SectionHeader';

export default function DemoSection() {
  const { resolvedTheme } = useAppTheme();
  const botName = getBotName();
  const [isMobile, setIsMobile] = useState(false);
  const isDark = resolvedTheme === 'dark';
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  return (
    <section className="py-12 md:py-24 px-4 md:px-0 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px 0px" }}
        variants={containerVariants}
        className="max-w-6xl mx-auto relative z-10"
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
              Interactive Preview
            </span>
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(139, 92, 246) 50%, rgba(0, 85, 255, 0) 100%)'
              }}
            ></div>
          </motion.div>

          <motion.h2
            className={clsx(
              "text-4xl md:text-5xl font-bold mb-4 md:mb-5 tracking-tight",
              isDark ? "text-white" : "text-gray-900"
            )}
            variants={itemVariants}
          >
            {botName} in Action
          </motion.h2>

          <motion.p
            className={clsx(
              "text-lg md:text-xl max-w-2xl mx-auto",
              isDark ? "text-gray-300" : "text-gray-600"
            )}
            variants={itemVariants}
          >
            Experience the intelligence and versatility of {botName} through our interactive demo.
          </motion.p>
        </div>

        <motion.div
          variants={itemVariants}
          className="relative max-w-md md:max-w-3xl mx-auto mt-8 md:mt-12"
        >
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-[20px] md:rounded-[40px] blur-[30px] md:blur-[60px] opacity-40 pointer-events-none"
            style={{ 
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 80%)',
              zIndex: -1
            }}
          ></div>

          <div className="relative rounded-[20px] md:rounded-[30px] bg-gradient-to-br from-gray-900 to-black overflow-visible border border-primary/20 shadow-2xl">
            <div className="bg-gray-900 border-b border-gray-800 px-3 md:px-6 py-3 md:py-4 rounded-t-[20px] md:rounded-t-[30px] flex items-center">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 mr-1 md:mr-2"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500 mr-1 md:mr-2"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 mr-2 md:mr-4"></div>
              <span className="text-secondary text-sm md:text-base font-medium">Lylia Demo</span>
            </div>

            <div className="relative md:aspect-video overflow-hidden flex items-center justify-center bg-gradient-to-b from-gray-900 to-black rounded-b-[20px] md:rounded-b-[30px] p-4 md:p-8">
              <div 
                className="absolute inset-0 z-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.2) 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              ></div>

              <div className="absolute inset-0 z-0">
                {[...Array(isMobile ? 10 : 20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-primary/60"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`
                    }}
                    animate={{
                      opacity: [0.2, 0.8, 0.2],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 5
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 text-center bg-black/50 backdrop-blur-md p-5 md:p-8 rounded-2xl md:rounded-3xl border border-primary/20 shadow-lg w-full max-w-sm md:max-w-md">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(139, 92, 246, 0.3)", 
                      "0 0 40px rgba(139, 92, 246, 0.5)", 
                      "0 0 20px rgba(139, 92, 246, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-primary/20 border border-primary/50 mx-auto mb-4 md:mb-6"
                >
                  <Sparkles className="w-7 h-7 md:w-10 md:h-10 text-secondary" />
                </motion.div>
                
                <h3 className="text-xl md:text-3xl font-bold text-white mb-3 md:mb-4 tracking-tight">
                  Experience Coming Soon
                </h3>
                
                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">
                  Our interactive demo is being prepared to showcase the full capabilities of Lylia. Be among the first to try it!
                </p>
                
                <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-primary/50 bg-primary/20 text-xs md:text-sm text-secondary">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="mr-2"
                  >
                    🤖
                  </motion.div>
                  <span>Launching April 2025</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute -bottom-px left-[10%] right-[10%] h-[2px] z-20"
            style={{
              background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)'
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
        </motion.div>
      </motion.div>
    </section>
  );
}
