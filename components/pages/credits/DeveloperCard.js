// File: /components/pages/credits/DeveloperCard.js
import { motion } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';
import LanyardPresence from '../../providers/LanyardPresence';

export default function DeveloperCard({ developer, isDark }) {
  const getSocialIconStyles = (platform) => {
    switch (platform) {
      case 'github':
        return {
          icon: 'github',
          class: "text-gray-700 dark:text-gray-300"
        };
      case 'twitter':
        return {
          icon: 'twitter',
          class: "text-sky-600 dark:text-sky-400"
        };
      case 'linkedin':
        return {
          icon: 'linkedin',
          class: "text-primary dark:text-secondary"
        };
      case 'discord':
        return {
          icon: 'discord',
          class: "text-[#5865F2] dark:text-[#7289da]"
        };
      default:
        return {
          icon: 'external-link',
          class: "text-gray-700 dark:text-gray-300"
        };
    }
  };

  const getCardStyle = () => {
    return isDark
      ? {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.15) 0%, rgba(97, 97, 97, 0.09) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(255, 255, 255, 0.07)'
        }
      : {
          background: 'linear-gradient(0.07deg, rgba(0, 85, 255, 0.05) 0%, rgba(240, 240, 240, 0.8) 100%)',
          backdropFilter: 'blur(0px)',
          borderColor: 'rgba(0, 0, 0, 0.07)'
        };
  };

  const renderSocialIcon = (platform) => {
    switch (platform) {
      case 'github':
        return (
          <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect x="2" y="9" width="4" height="12"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        );
      case 'discord':
        return (
          <svg className="w-3.5 h-3.5" viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        );
    }
  };

  return (
    <motion.div 
      className="rounded-[20px] border relative overflow-hidden"
      style={getCardStyle()}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
    >
      <div className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-start space-x-4 mb-3 md:mb-0">
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src={developer.avatar}
                alt={`${developer.name}'s avatar`}
                width={48}
                height={48}
                className="rounded-full"
                style={{ 
                  boxShadow: 'rgba(0, 85, 255, 0.3) 0px 0px 10px'
                }}
              />
            </motion.div>
            <div>
              <h3 className={clsx(
                "font-medium", 
                isDark ? "text-white" : "text-gray-900"
              )}>
                {developer.name}
              </h3>
              <p className={clsx(
                "text-sm",
                isDark ? "text-gray-400" : "text-gray-700"
              )}>
                {developer.role}
              </p>
              <LanyardPresence discordUserId={developer.discordUserId} />
            </div>
          </div>
          
          {developer.socials && (
            <>
              {/* Separator for mobile view - balanced spacing */}
              <div className="md:hidden w-full h-px bg-card-border my-2"></div>
              
              <div className="flex flex-wrap gap-2 md:mt-0">
                {Object.entries(developer.socials).map(([platform, url]) => {
                  const { class: iconColorClass } = getSocialIconStyles(platform);
                  const label = platform.charAt(0).toUpperCase() + platform.slice(1);
                  
                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={clsx(
                        "flex items-center space-x-1 px-2 py-1 text-xs rounded border transition-colors",
                        isDark 
                          ? "bg-card-hover border-gray-700/60 hover:border-primary/30" 
                          : "bg-gray-100/80 border-gray-300/60 hover:border-blue-400/30",
                        iconColorClass
                      )}
                      whileHover={{ 
                        scale: 1.05,
                        y: -1 
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={iconColorClass}>
                        {renderSocialIcon(platform)}
                      </span>
                      <span className={iconColorClass}>{label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Blue highlight line at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, rgba(0, 85, 255, 0) 0%, rgb(37, 99, 235) 50%, rgba(0, 85, 255, 0) 100%)' }}
      ></div>
    </motion.div>
  );
}
