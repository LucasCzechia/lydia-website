import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { 
  ImageIcon, 
  Edit, 
  Users, 
  Layers, 
  Scissors, 
  Palette, 
  Sparkles, 
  Wand2
} from 'lucide-react';

export default function FeaturesGrid({ variants }) {
  const features = [
    {
      id: "generation",
      icon: ImageIcon,
      title: "AI Image Generation",
      subtitle: "Create with Nano Banana",
      description: "Generate stunning, high-quality images using Google's Gemini 2.5 Flash Image (Nano Banana). Simply describe what you want and watch your vision come to life in Discord.",
      color: "text-primary",
      lightColor: "text-primary",
      bgGradient: "from-purple-500/20 to-purple-600/10",
      lightBgGradient: "from-purple-500/10 to-purple-600/5",
      badgeType: "NANO BANANA",
      benefits: [
        "Text-to-image generation",
        "Professional-grade quality",
        "Multiple art styles",
        "High-resolution outputs"
      ]
    },
    {
      id: "editing",
      icon: Edit,
      title: "Advanced Image Editing",
      subtitle: "Transform with natural language",
      description: "Edit images using simple text commands. Remove backgrounds, change colors, add objects, alter lighting, and make professional-grade adjustments effortlessly.",
      color: "text-secondary",
      lightColor: "text-secondary",
      bgGradient: "from-cyan-500/20 to-cyan-600/10",
      lightBgGradient: "from-cyan-500/10 to-cyan-600/5",
      badgeType: "PRO",
      benefits: [
        "Natural language editing",
        "Background removal/replacement",
        "Color and lighting adjustments",
        "Object manipulation"
      ]
    },
    {
      id: "consistency",
      icon: Users,
      title: "Character Consistency",
      subtitle: "Maintain visual continuity",
      description: "Keep characters and objects consistent across multiple images and edits. Perfect for storytelling, content creation, and maintaining visual brand identity.",
      color: "text-accent",
      lightColor: "text-accent",
      bgGradient: "from-pink-500/20 to-pink-600/10",
      lightBgGradient: "from-pink-500/10 to-pink-600/5",
      badgeType: "NEW",
      benefits: [
        "Character preservation",
        "Cross-image continuity",
        "Brand consistency",
        "Story development"
      ]
    },
    {
      id: "blending",
      icon: Layers,
      title: "Multi-Image Blending",
      subtitle: "Combine multiple references",
      description: "Upload multiple reference images and blend them together to create entirely new compositions. Combine elements from different sources seamlessly.",
      color: "text-green-400",
      lightColor: "text-green-600",
      bgGradient: "from-green-500/20 to-green-600/10",
      lightBgGradient: "from-green-500/10 to-green-600/5",
      badgeType: "NEW",
      benefits: [
        "Multiple reference support",
        "Seamless composition",
        "Element extraction",
        "Scene reconstruction"
      ]
    },
    {
      id: "background",
      icon: Scissors,
      title: "Background Magic",
      subtitle: "Remove, replace, enhance",
      description: "Automatically remove backgrounds, replace them with new scenes, or enhance existing backgrounds with advanced AI precision and natural blending.",
      color: "text-orange-400",
      lightColor: "text-orange-600",
      bgGradient: "from-orange-500/20 to-orange-600/10",
      lightBgGradient: "from-orange-500/10 to-orange-600/5",
      badgeType: "PRO",
      benefits: [
        "Auto background removal",
        "Scene replacement",
        "Natural edge blending",
        "Environment enhancement"
      ]
    },
    {
      id: "style",
      icon: Palette,
      title: "Style Transfer",
      subtitle: "Apply artistic styles",
      description: "Transform images with different artistic styles, from photorealistic to cartoon, watercolor to digital art. Apply any visual aesthetic to your images.",
      color: "text-purple-400",
      lightColor: "text-purple-600",
      bgGradient: "from-purple-500/20 to-purple-600/10",
      lightBgGradient: "from-purple-500/10 to-purple-600/5",
      badgeType: "NEW",
      benefits: [
        "Multiple art styles",
        "Style customization",
        "Aesthetic transformation",
        "Creative flexibility"
      ]
    },
    {
      id: "enhancement",
      icon: Sparkles,
      title: "Image Enhancement",
      subtitle: "Improve quality and details",
      description: "Enhance image quality, increase resolution, improve lighting, sharpen details, and restore old or low-quality images to professional standards.",
      color: "text-yellow-400",
      lightColor: "text-yellow-600",
      bgGradient: "from-yellow-500/20 to-yellow-600/10",
      lightBgGradient: "from-yellow-500/10 to-yellow-600/5",
      badgeType: "PRO",
      benefits: [
        "Quality enhancement",
        "Resolution upscaling",
        "Detail sharpening",
        "Restoration capabilities"
      ]
    },
    {
      id: "magic",
      icon: Wand2,
      title: "AI Magic Tools",
      subtitle: "Intelligent automation",
      description: "Access a suite of intelligent tools that automatically detect and fix common image issues, suggest improvements, and apply smart enhancements.",
      color: "text-indigo-400",
      lightColor: "text-indigo-600",
      bgGradient: "from-indigo-500/20 to-indigo-600/10",
      lightBgGradient: "from-indigo-500/10 to-indigo-600/5",
      badgeType: "NEW",
      benefits: [
        "Smart auto-corrections",
        "Intelligent suggestions",
        "One-click improvements",
        "Automated optimization"
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  return (
    <motion.div
      variants={variants}
      className="mb-16"
    >
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            variants={cardVariants}
            className="w-full sm:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] max-w-md flex-shrink-0"
          >
            <FeatureCard feature={feature} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
