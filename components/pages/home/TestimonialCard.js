import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import DiscordIcon from '../../icons/DiscordIcon';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function TestimonialCard({ testimonial, index }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  const defaultUserSeed = testimonial.author || `User${index + 1}`;
  const defaultServerSeed = testimonial.community || `Server${index + 1}`;
  const userAvatarBgColor = '0055ff';
  const serverIconBgColor = '777777';
  const bannerPlaceholderBgColor = userAvatarBgColor;
  const bannerPlaceholderTextColor = 'ffffff';

  const userPlaceholderImage = testimonial.avatar || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(defaultUserSeed)}&backgroundColor=${userAvatarBgColor}&fontSize=40&chars=1`;
  const serverPlaceholderImage = testimonial.serverIcon || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(defaultServerSeed)}&backgroundColor=${serverIconBgColor}&fontSize=40&chars=1`;
  const bannerPlaceholderImage = testimonial.banner || `https://placehold.co/600x100/${bannerPlaceholderBgColor}/${bannerPlaceholderTextColor}?text=${encodeURIComponent(testimonial.community || `Server ${index+1}`)}&font=montserrat`;

  const getCardStyle = () => {
    if (isDark) {
      return {
        background: 'linear-gradient(145deg, rgba(17, 24, 39, 0.8) 0%, rgba(31, 41, 55, 0.6) 50%, rgba(17, 24, 39, 0.9) 100%)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      };
    } else {
      return {
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.9) 50%, rgba(243, 244, 246, 0.95) 100%)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(229, 231, 235, 0.6)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
      };
    }
  };

  const getHoverStyle = () => {
    if (isDark) {
      return {
        background: 'linear-gradient(145deg, rgba(17, 24, 39, 0.9) 0%, rgba(31, 41, 55, 0.7) 50%, rgba(17, 24, 39, 1) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.4)',
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(139, 92, 246, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        transform: 'translateY(-4px) scale(1.02)'
      };
    } else {
      return {
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(249, 250, 251, 0.95) 50%, rgba(243, 244, 246, 1) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        boxShadow: '0 16px 64px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(139, 92, 246, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)',
        transform: 'translateY(-4px) scale(1.02)'
      };
    }
  };

  return (
    <motion.a
      href={testimonial.inviteLink ? `https://discord.gg/${testimonial.inviteLink.replace('discord.gg/', '')}` : '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block group relative overflow-hidden rounded-[20px] h-full flex flex-col"
      style={getCardStyle()}
      whileHover={{
        ...getHoverStyle(),
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      <div className="relative h-20 w-full overflow-hidden rounded-t-[19px] shrink-0">
        <Image
          src={bannerPlaceholderImage}
          alt={`${testimonial.community || 'Server'} Banner`}
          layout="fill"
          objectFit="cover"
          className="opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105"
          unoptimized
        />
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black/20 to-transparent' : 'bg-gradient-to-t from-black/10 to-transparent'}`} />
      </div>

      <div className="flex flex-col h-full p-6 relative">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-1">
            {Array(5).fill(0).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  scale: 0, 
                  rotate: -90,
                  x: 30,
                  opacity: 0
                }}
                whileInView={{ 
                  scale: 1, 
                  rotate: 0,
                  x: 0,
                  opacity: 1
                }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  delay: i * 0.2 + 0.3,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: [0, 20, -20, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Star
                  size={18}
                  className={`${isDark ? 'text-white fill-white' : 'text-yellow-500 fill-yellow-500'} transition-colors duration-200`}
                />
              </motion.div>
            ))}
          </div>
          
          <div className={`opacity-20 ${isDark ? 'text-white' : 'text-gray-600'}`}>
            <DiscordIcon className="w-6 h-6" />
          </div>
        </div>

        <div className="mb-6 flex-grow">
          <blockquote className={`text-sm leading-relaxed ${isDark ? 'text-gray-300 group-hover:text-gray-200' : 'text-gray-700 group-hover:text-gray-800'} transition-colors duration-200`}>
            "{testimonial.text}"
          </blockquote>
        </div>

        <div className="mt-auto space-y-4">
          <div className={`h-px w-full ${isDark ? 'bg-gradient-to-r from-transparent via-gray-600/40 to-transparent' : 'bg-gradient-to-r from-transparent via-gray-300/60 to-transparent'} transition-all duration-300`}></div>

          <div className="flex items-center gap-3">
            <motion.div
              className="relative"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div
                className={`w-10 h-10 rounded-full overflow-hidden relative ${isDark ? 'ring-2 ring-blue-400/20' : 'ring-2 ring-blue-500/20'} transition-all duration-300`}
              >
                <Image
                  src={userPlaceholderImage}
                  alt={testimonial.author || "User"}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-500'} ring-2 ${isDark ? 'ring-gray-800' : 'ring-white'}`} />
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <p className={`font-semibold truncate ${isDark ? 'text-white group-hover:text-blue-200' : 'text-gray-900 group-hover:text-primary'} transition-colors duration-200`}>
                {testimonial.author}
              </p>
              <p className={`text-sm truncate ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'} transition-colors duration-200`}>
                {testimonial.role || "Server Owner"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <motion.div
              className="relative"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div
                className={`w-8 h-8 rounded-lg overflow-hidden relative ${isDark ? 'ring-1 ring-gray-600/30' : 'ring-1 ring-gray-300/40'} transition-all duration-300`}
              >
                <Image
                  src={serverPlaceholderImage}
                  alt={testimonial.community || "Server"}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
            </motion.div>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${isDark ? 'text-gray-200 group-hover:text-gray-100' : 'text-gray-800 group-hover:text-gray-900'} transition-colors duration-200`}>
                {testimonial.community}
              </p>
              {(testimonial.memberCount || testimonial.inviteLink) && (
                <div className={`flex items-center text-xs mt-1 gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-green-400' : 'bg-green-500'} animate-pulse`} />
                    <span className="whitespace-nowrap">
                      {testimonial.memberCount ? `${testimonial.memberCount} Members` : 'Active'}
                    </span>
                  </div>
                  {testimonial.inviteLink && (
                    <>
                      <span>•</span>
                      <span className="truncate opacity-75">{testimonial.inviteLink}</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-[20px]"
          style={{ 
            background: isDark 
              ? 'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgb(59, 130, 246) 30%, rgb(147, 197, 253) 50%, rgb(59, 130, 246) 70%, rgba(139, 92, 246, 0) 100%)'
              : 'linear-gradient(90deg, rgba(139, 92, 246, 0) 0%, rgb(59, 130, 246) 30%, rgb(37, 99, 235) 50%, rgb(59, 130, 246) 70%, rgba(139, 92, 246, 0) 100%)'
          }}
        />

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[20px]"
          style={{
            background: isDark
              ? 'radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)'
              : 'radial-gradient(circle at 50% 80%, rgba(139, 92, 246, 0.03) 0%, transparent 70%)'
          }}
        />
      </div>
    </motion.a>
  );
}
