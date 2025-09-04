// File: /components/pages/settings/privacy/DataTypeCard.js
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

export default function DataTypeCard({ 
  dataType, 
  isChecked, 
  handleTogglePreference, 
  isDark 
}) {
  const Icon = dataType.icon;
  
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
    <motion.div
      className={clsx(
        "rounded-[20px] border relative overflow-hidden",
        dataType.alwaysEnabled 
          ? isDark ? "border-yellow-500/30" : "border-yellow-300/50" 
          : isDark ? "border-white/5" : "border-gray-200"
      )}
      style={getCardStyle()}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
    >
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className={clsx(
            "rounded-full p-2.5 flex-shrink-0 mt-1",
            dataType.alwaysEnabled 
              ? isDark ? "bg-yellow-500/10" : "bg-yellow-100" 
              : isDark ? "bg-blue-900/30" : "bg-blue-50"
          )}>
            {dataType.alwaysEnabled ? (
              <AlertTriangle size={16} className={isDark ? "text-yellow-500" : "text-yellow-600"} />
            ) : (
              <Icon size={16} className="text-blue-500" />
            )}
          </div>

          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className={clsx(
                "font-medium",
                isDark ? "text-white" : "text-gray-900"
              )}>
                {dataType.name}
              </h3>
              <motion.button
                onClick={() => handleTogglePreference(dataType.id)}
                disabled={dataType.alwaysEnabled}
                className={clsx(
                  "relative inline-flex items-center h-5 rounded-full w-10 transition-colors focus:outline-none",
                  isChecked
                    ? (dataType.alwaysEnabled 
                        ? isDark ? "bg-gray-500" : "bg-gray-400" 
                        : "bg-blue-500")
                    : isDark ? "bg-gray-600" : "bg-gray-300",
                  dataType.alwaysEnabled ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                )}
                role="switch"
                aria-checked={isChecked}
                whileTap={dataType.alwaysEnabled ? {} : { scale: 0.9 }}
              >
                <motion.span
                  className="inline-block w-3.5 h-3.5 transform bg-white rounded-full"
                  initial={false} // Prevent initial animation
                  animate={{ x: isChecked ? 19 : 3 }}
                  transition={{ type: "spring", stiffness: 700, damping: 30 }} // Faster animation
                />
              </motion.button>
            </div>
            <p className={clsx(
              "text-sm mt-1",
              isDark ? "text-gray-400" : "text-gray-700"
            )}>
              {dataType.description}
              {dataType.requiredText && (
                <span className={isDark ? "text-yellow-500 font-medium ml-1" : "text-yellow-600 font-medium ml-1"}>
                  {dataType.requiredText}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
      
      {/* Blue highlight line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
      ></div>
    </motion.div>
  );
}
