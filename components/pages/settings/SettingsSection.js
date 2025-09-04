// File: /components/pages/settings/SettingsSection.js
import { motion } from 'framer-motion';
import clsx from 'clsx';
import SettingsCard from './SettingsCard';

export default function SettingsSection({ section, isDark, variants }) {
  return (
    <motion.div variants={variants} className="mb-8">
      <h2 className={clsx(
        "text-xl font-medium mb-4",
        isDark ? "text-white/90" : "text-gray-800"
      )}>
        {section.title}
      </h2>
      <div className="space-y-2">
        {section.items.map((item, itemIndex) => (
          <SettingsCard 
            key={itemIndex}
            item={item}
            isDark={isDark}
          />
        ))}
      </div>
    </motion.div>
  );
}
