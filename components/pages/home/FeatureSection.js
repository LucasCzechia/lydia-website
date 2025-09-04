import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { getBotName, getConfig } from '../../../utils/configUtils';
import FeatureCard from './FeatureCard';
import SectionHeader from '../../ui/SectionHeader';

export default function FeatureSection() {
  const botName = getBotName();
  const featuresUrl = getConfig('urls.nav.features', '/features');

  const features = [
    {
      id: "chatbot",
      icon: "Bot",
      title: "Instant Chatbot",
      shortDescription: "AI assistant powered by Gemini.",
      description: `Add ${botName} for an instant AI assistant powered by Google's Gemini 2.5 Flash. Engages users, answers questions, and more.`,
      color: "text-blue-400",
      badgeType: "PRO"
    },
    {
      id: "intelligence",
      icon: "Brain",
      title: "Advanced Intelligence",
      shortDescription: "Cutting-edge AI for the agentic era.",
      description: "Experience Google's cutting-edge AI, designed for complex tasks and natural interactions in the modern agentic era.",
      color: "text-purple-400",
      badgeType: "NEW"
    },
    {
      id: "privacy",
      icon: "Shield",
      title: "Privacy Focused",
      shortDescription: "Your data remains secure.",
      description: "Your data remains secure. All processing prioritizes privacy and adheres to strict data handling policies.",
      color: "text-red-400",
      badgeType: "NEW"
    },
    {
      id: "conversation",
      icon: "MessageSquare",
      title: "Natural Conversations",
      shortDescription: "Fluid, human-like interactions.",
      description: "Enjoy fluid, human-like interactions with deep context understanding, making conversations feel natural and intuitive.",
      color: "text-green-400",
      badgeType: "NEW"
    }
  ];

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

  const hoverBoxShadow = "0px_8px_40px_0px_rgba(0,85,255,0.7), inset_0px_0px_10px_1px_rgba(255,255,255,0.3), 0px_0px_0px_5px_rgba(0,85,255,0.2)";

  return (
    <section className="py-12 md:py-16 px-4 md:px-0 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        <SectionHeader
          tagline="Features"
          title="Supercharged Features"
          subtitle={`${botName} combines cutting-edge AI with seamless Discord integration to transform your server experience.`}
          variants={itemVariants}
          center={true}
        />

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id || index}
              variants={itemVariants}
              className="w-full sm:w-[calc(50%-12px)] max-w-md flex-shrink-0"
            >
              <FeatureCard
                feature={feature}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <Link href={featuresUrl} passHref legacyBehavior>
            <motion.a
              className={primaryButtonClasses}
              whileHover={{
                boxShadow: hoverBoxShadow,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight className="w-5 h-5 mr-2.5" />
              View All Features
            </motion.a>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
