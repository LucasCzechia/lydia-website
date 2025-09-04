import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';
import { 
  Bot, 
  Eye, 
  Mic, 
  Globe, 
  ImageIcon, 
  FileText, 
  Languages
} from 'lucide-react';

export default function FeaturesGrid({ variants }) {
  const features = [
    {
      id: "personalities",
      icon: Bot,
      title: "Custom Personalities",
      subtitle: "Tailored AI experiences",
      description: "Create your own AI Discord chatbot with unique personalities, conversation styles, and specialized knowledge bases that perfectly match your server's community and needs.",
      color: "text-primary",
      lightColor: "text-primary",
      bgGradient: "from-blue-500/20 to-blue-600/10",
      lightBgGradient: "from-blue-500/10 to-blue-600/5",
      badgeType: "PRO",
      benefits: [
        "Unlimited personality configurations",
        "Custom knowledge bases",
        "Community-specific responses",
        "Role-based interactions"
      ]
    },
    {
      id: "vision",
      icon: Eye,
      title: "Vision Recognition",
      subtitle: "See and understand visuals",
      description: "Analyze and understand images, videos, and visual content with advanced AI vision capabilities. From memes to complex diagrams, Lylia sees it all.",
      color: "text-purple-400",
      lightColor: "text-purple-600",
      bgGradient: "from-purple-500/20 to-purple-600/10",
      lightBgGradient: "from-purple-500/10 to-purple-600/5",
      badgeType: "NEW",
      benefits: [
        "Image content analysis",
        "Video frame extraction",
        "Visual question answering",
        "Scene understanding"
      ]
    },
    {
      id: "audio",
      icon: Mic,
      title: "Audio Processing",
      subtitle: "Hear and transcribe audio",
      description: "Transcribe and comprehend voice messages and audio files with high accuracy. Perfect for accessibility and creating searchable audio archives.",
      color: "text-green-400",
      lightColor: "text-green-600",
      bgGradient: "from-green-500/20 to-green-600/10",
      lightBgGradient: "from-green-500/10 to-green-600/5",
      badgeType: "NEW",
      benefits: [
        "Voice message transcription",
        "Audio file processing",
        "Multiple language support",
        "Real-time audio analysis"
      ]
    },
    {
      id: "browsing",
      icon: Globe,
      title: "Internet Browsing",
      subtitle: "Real-time web access",
      description: "Search and summarize web content in real-time. Get the latest information, news, and data directly in your Discord conversations.",
      color: "text-cyan-400",
      lightColor: "text-cyan-600",
      bgGradient: "from-cyan-500/20 to-cyan-600/10",
      lightBgGradient: "from-cyan-500/10 to-cyan-600/5",
      badgeType: "NEW",
      benefits: [
        "Real-time web searches",
        "Content summarization",
        "News and updates",
        "Research assistance"
      ]
    },
    {
      id: "generation",
      icon: ImageIcon,
      title: "Image Generation",
      subtitle: "Create stunning visuals",
      description: "Create custom AI-generated images from text descriptions. Bring your imagination to life with high-quality, creative visuals tailored to your needs.",
      color: "text-pink-400",
      lightColor: "text-pink-600",
      bgGradient: "from-pink-500/20 to-pink-600/10",
      lightBgGradient: "from-pink-500/10 to-pink-600/5",
      badgeType: "NEW",
      benefits: [
        "Text-to-image generation",
        "Multiple art styles",
        "High-resolution outputs",
        "Creative concepts"
      ]
    },
    {
      id: "analysis",
      icon: FileText,
      title: "Text Analysis",
      subtitle: "Deep content understanding",
      description: "Process and understand documents, code, and complex text with advanced natural language processing. Perfect for document analysis and code reviews.",
      color: "text-orange-400",
      lightColor: "text-orange-600",
      bgGradient: "from-orange-500/20 to-orange-600/10",
      lightBgGradient: "from-orange-500/10 to-orange-600/5",
      badgeType: "NEW",
      benefits: [
        "Document processing",
        "Code analysis",
        "Sentiment analysis",
        "Content extraction"
      ]
    },
    {
      id: "multilingual",
      icon: Languages,
      title: "Multilingual",
      subtitle: "Global communication",
      description: "Communicate fluently in various languages with natural translation and conversation capabilities. Break down language barriers in your community.",
      color: "text-red-400",
      lightColor: "text-red-600",
      bgGradient: "from-red-500/20 to-red-600/10",
      lightBgGradient: "from-red-500/10 to-red-600/5",
      badgeType: "NEW",
      benefits: [
        "100+ languages supported",
        "Natural translations",
        "Cultural context awareness",
        "Real-time communication"
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
