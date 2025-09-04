import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useAppTheme } from '../../../context/ThemeContext';
import { getBotName } from '../../../utils/configUtils';
import TestimonialCard from './TestimonialCard';

export default function TestimonialSection() {
  const { resolvedTheme } = useAppTheme();
  const botName = getBotName();
  const isDark = resolvedTheme === 'dark';

  const testimonials = [
    {
      text: `They not only delivered a top-notch website but also provided strategic insights that helped us improve our overall digital presence.`,
      author: "John Smith",
      role: "Server Owner",
      community: "Gaming Community Hub",
      avatar: null,
      serverIcon: null,
      banner: null,
      memberCount: "5k+",
      inviteLink: "discord.gg/gaminghub"
    },
    {
      text: `The team understood our complex requirements and provided a user-friendly, high-performing bot that stands out in the market.`,
      author: "Emily Davis",
      role: "Community Manager",
      community: "Nexus Gaming Network",
      avatar: null,
      serverIcon: null,
      banner: null,
      memberCount: "12k+",
      inviteLink: "discord.gg/nexus"
    },
    {
      text: `Their innovative solutions helped streamline our server operations, and the bot is both functional and easy to use for all our members.`,
      author: "David Lee",
      role: "Server Admin",
      community: "GreenLeaf Gaming",
      avatar: null,
      serverIcon: null,
      banner: null,
      memberCount: "1k+",
      inviteLink: "discord.gg/greenleaf"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-0 relative">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-10 md:mb-16 text-center">
          <motion.div
            className={clsx(
              "relative inline-flex items-center mb-6 rounded-full px-5 py-2 border overflow-hidden",
              isDark 
                ? "bg-primary/50 backdrop-blur-lg border-primary/30"
                : "bg-primary/70 backdrop-blur-lg border-primary/50"
            )}
            variants={itemVariants}
          >
            <span className="w-2 h-2 bg-primary rounded-full mr-2.5"></span>
            <span className={clsx(
              "text-sm font-medium",
              isDark ? "text-white/90" : "text-gray-800"
            )}>
              Testimonials
            </span>
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(139, 92, 246) 50%, rgba(0, 85, 255, 0) 100%)'
              }}
            ></div>
          </motion.div>

          <motion.h2
            className={clsx(
              "text-4xl md:text-5xl font-bold mb-4 md:mb-5 tracking-tight",
              isDark ? "text-white" : "text-gray-900"
            )}
            variants={itemVariants}
          >
            Loved by Discord Communities
          </motion.h2>

          <motion.p
            className={clsx(
              "text-lg md:text-xl max-w-2xl mx-auto",
              isDark ? "text-gray-300" : "text-gray-600"
            )}
            variants={itemVariants}
          >
            See what server owners and managers are saying about {botName}.
          </motion.p>
        </div>

        <motion.div
          className="mt-12"
          variants={containerVariants}
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-md flex-shrink-0"
              >
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
