import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Bot, Brain, Shield, MessageSquare, ArrowUpRight, Image, Edit, Users, Layers } from 'lucide-react';
import Link from 'next/link';
import { useAppTheme } from '../../../context/ThemeContext';
import { getConfig } from '../../../utils/configUtils';

const icons = {
  Bot,
  Brain,
  Shield,
  MessageSquare,
  Image,
  Edit,
  Users,
  Layers
};

export default function FeatureCard({ feature, index }) {
  const { resolvedTheme } = useAppTheme();
  const Icon = icons[feature.icon] || Bot;
  const featuresUrl = getConfig('urls.nav.features', '/features');
  const isDark = resolvedTheme === 'dark';

  const badgeType = feature.badgeType || 'NEW';
  const isPro = badgeType === 'PRO';

  const getCardStyle = () => {
    return isDark
      ? {
          background: 'linear-gradient(0.07deg, rgba(139, 92, 246, 0.15) 0%, rgba(97, 97, 97, 0.09) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(255, 255, 255, 0.07)',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.3)'
        }
      : {
          background: 'linear-gradient(0.07deg, rgba(139, 92, 246, 0.05) 0%, rgba(240, 240, 240, 0.8) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(0, 0, 0, 0.07)',
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)'
        };
  };

  return (
    <Link href={featuresUrl}>
      <motion.div
        className="group relative overflow-hidden rounded-[20px] p-6 transition-all duration-300 h-full cursor-pointer border"
        style={getCardStyle()}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div
              className="w-11 h-11 rounded-[50px] flex items-center justify-center"
              style={{
                background: isDark 
                  ? 'linear-gradient(0.07deg, rgba(139, 92, 246, 0.09) 0%, rgba(153, 153, 153, 0.09) 100%)'
                  : 'linear-gradient(0.07deg, rgba(139, 92, 246, 0.05) 0%, rgba(153, 153, 153, 0.05) 100%)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.07)' : '1px solid rgba(0, 0, 0, 0.07)',
                boxShadow: isDark 
                  ? 'rgba(139, 92, 246, 0.35) 2px 4px 24px 0px'
                  : 'rgba(139, 92, 246, 0.25) 2px 4px 24px 0px'
              }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <Icon size={22} className={clsx(
                  feature.lightColor || feature.color || (isDark ? 'text-white' : 'text-primary')
                )} />
              </div>
            </div>

            <div className="opacity-20 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight size={24} className={clsx(
                isDark ? "text-white" : "text-gray-700"
              )} />
            </div>
          </div>

          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={clsx(
                "text-xl font-semibold",
                isDark ? "text-white" : "text-gray-900"
              )}>
                {feature.title}
              </h3>

              <div
                className={clsx(
                  "px-2 py-0.5 text-xs font-medium text-white rounded-lg",
                  "border-2 border-white/15 backdrop-filter backdrop-blur-sm",
                  isPro ? "bg-[#8B5CF6]" : "bg-[#8B5CF6]"
                )}
              >
                {badgeType}
              </div>
            </div>

            <p className={clsx(
              "text-sm",
              isDark ? "text-white/60" : "text-gray-600"
            )}>
              {feature.shortDescription}
            </p>
          </div>

          <div className={clsx(
            "h-px w-full my-3 bg-gradient-to-r from-transparent to-transparent",
            isDark ? "via-white/15" : "via-gray-400/30"
          )}></div>

          <div className="mt-auto">
            <p className={clsx(
              "text-sm",
              isDark ? "text-white/50" : "text-gray-600"
            )}>
              {feature.description}
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgb(139, 92, 246) 50%, rgba(139, 92, 246, 0) 100%)' }}
        ></div>
      </motion.div>
    </Link>
  );
}