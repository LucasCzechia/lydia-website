// File: /components/pages/credits/BetaTestersList.js
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';
import clsx from 'clsx';

export default function BetaTestersList({ betaTesters, botName, isDark, variants }) {
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

  return (
    <motion.div variants={variants} className="mb-8">
      <h2 className={clsx(
        "text-xl font-medium mb-4",
        isDark ? "text-white/90" : "text-gray-800"
      )}>
        Beta Testers & Community
      </h2>
      <motion.div
        className="rounded-[20px] border relative overflow-hidden mb-4"
        style={getCardStyle()}
        whileHover={{ 
          scale: 1.005,
          transition: { duration: 0.2 }
        }}
      >
        <div className="p-5">
          <p className={clsx(
            "mb-4",
            isDark ? "text-gray-300" : "text-gray-700"
          )}>
            A massive shout-out to our dedicated beta testers and the amazing community members who shared invaluable feedback, reported bugs, and provided suggestions. Your collective effort has significantly shaped {botName}!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {betaTesters.map((tester, index) => (
              <motion.div
                key={index}
                className={clsx(
                  "flex items-center space-x-3 p-2 rounded-lg border",
                  isDark 
                    ? "bg-primary/10 border-primary/20 hover:border-primary/40" 
                    : "bg-blue-50 border-blue-200 hover:border-primary"
                )}
                whileHover={{ scale: 1.02, y: -1 }}
              >
                <span className="text-primary">
                  <UserCheck size={18} />
                </span>
                <div>
                  <p className={clsx(
                    "font-medium text-sm",
                    isDark ? "text-white" : "text-gray-900"
                  )}>
                    {tester.name}
                  </p>
                  <p className={clsx(
                    "text-xs",
                    isDark ? "text-gray-400" : "text-gray-600"
                  )}>
                    {tester.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Blue highlight line at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
        ></div>
      </motion.div>
    </motion.div>
  );
}
