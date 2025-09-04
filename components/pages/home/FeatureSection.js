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
      id: "image-generation",
      icon: "Image",
      title: "AI Image Generation",
      shortDescription: "Create stunning visuals with text prompts.",
      description: `Generate high-quality images using Google's Gemini 2.5 Flash Image model. Simply describe what you want and watch ${botName} bring your vision to life.`,
      color: "text-secondary",
      badgeType: "NANO BANANA"
    },
    {
      id: "image-editing",
      icon: "Edit",
      title: "Advanced Image Editing",
      shortDescription: "Professional-grade editing with natural language.",
      description: "Transform images with simple text commands. Remove backgrounds, change colors, add objects, or blend multiple images seamlessly.",
      color: "text-purple-400",
      badgeType: "NEW"
    },
    {
      id: "character-consistency",
      icon: "Users",
      title: "Character Consistency",
      shortDescription: "Maintain characters across edits.",
      description: "Keep characters and objects consistent across multiple generations and edits, perfect for storytelling and content creation.",
      color: "text-accent",
      badgeType: "PRO"
    },
    {
      id: "multi-image-blend",
      icon: "Layers",
      title: "Multi-Image Blending",
      shortDescription: "Combine multiple images into one scene.",
      description: "Upload multiple reference images and blend them together to create entirely new compositions and scenes with professional results.",
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
    "shadow-[0px_8px_40px_0px_rgba(139,92,246,0.5),0px_0px_0px_1px_rgba(139,92,246,0.12)]",
    "transition-all duration-200 ease-out"
  );

  const primaryButtonClasses = clsx(
    buttonBaseClasses,
    "bg-[#8B5CF6]",
    "text-white"
  );

  const hoverBoxShadow = "0px_8px_40px_0px_rgba(139,92,246,0.7), inset_0px_0px_10px_1px_rgba(255,255,255,0.3), 0px_0px_0px_5px_rgba(139,92,246,0.2)";

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
          subtitle={`${botName} harnesses Google's Gemini 2.5 Flash Image (Nano Banana) to deliver professional-grade image generation and editing directly in Discord.`}
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
