// File: /components/pages/credits/CreditHeader.js
import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function CreditHeader({ isDark, variants }) {
  return (
    <motion.div 
      variants={variants} 
      className="mb-8"
    >
      <h1 className={clsx(
        "text-3xl font-bold mb-4",
        isDark ? "text-white" : "text-gray-900"
      )}>
        Team & Acknowledgements
      </h1>
      
      <div 
        className="w-20 h-1 mb-2"
        style={{
          background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)'
        }}
      ></div>
    </motion.div>
  );
}
