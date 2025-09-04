import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useAppTheme } from '../../context/ThemeContext';

const ChartCard = ({ 
  title, 
  children, 
  height = "h-80", 
  action,
  className = "",
  ...props 
}) => {
  const { resolvedTheme } = useAppTheme();
  const isDark = resolvedTheme === 'dark';

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
      className={clsx("rounded-[20px] border relative overflow-hidden p-6", height, className)}
      style={getCardStyle()}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className={clsx("text-lg font-semibold", isDark ? "text-white" : "text-gray-900")}>
          {title}
        </h3>
        {action}
      </div>
      <div className="h-64">
        {children}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
      />
    </motion.div>
  );
};

export default ChartCard;