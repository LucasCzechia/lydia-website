// File: /components/pages/credits/DevelopersList.js
import { motion } from 'framer-motion';
import clsx from 'clsx';
import DeveloperCard from './DeveloperCard';

export default function DevelopersList({ developers, isDark, variants }) {
  return (
    <motion.div variants={variants} className="mb-8">
      <h2 className={clsx(
        "text-xl font-medium mb-4",
        isDark ? "text-white/90" : "text-gray-800"
      )}>
        Development Team
      </h2>
      <div className="space-y-2">
        {developers.map((developer, index) => (
          <DeveloperCard 
            key={index} 
            developer={developer} 
            isDark={isDark} 
          />
        ))}
      </div>
    </motion.div>
  );
}
