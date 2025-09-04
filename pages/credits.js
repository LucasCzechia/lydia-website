import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import dynamic from 'next/dynamic';
import { getConfig, getTeamMembers, getBotName } from '../utils/configUtils';

import CreditHeader from '../components/pages/credits/CreditHeader';
import DevelopersList from '../components/pages/credits/DevelopersList';
import BetaTestersList from '../components/pages/credits/BetaTestersList';
import InspirationSection from '../components/pages/credits/InspirationSection';
import ThankYouSection from '../components/pages/credits/ThankYouSection';

const AnimatedBackground = dynamic(
  () => import('../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Credits() {
  const developers = getTeamMembers('developers');
  const betaTesters = getTeamMembers('betaTesters');
  const inspirationText = getConfig('team.inspirationText');
  const botName = getBotName();
  
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const htmlTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const systemPreference = mediaQuery.matches ? 'dark' : 'light';
      setIsDark(htmlTheme === 'dark' || (htmlTheme === 'system' && systemPreference === 'dark'));
    };
    
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

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
    <Layout title={`Credits - ${botName}`}>
      <div className="framer-theme relative">
        <AnimatedBackground intensity="light" theme="primary" enableParallax={true} blendMode="overlay" />
        <div className="max-w-3xl mx-auto px-4 pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <CreditHeader isDark={isDark} variants={itemVariants} />
            
            <DevelopersList 
              developers={developers} 
              isDark={isDark} 
              variants={itemVariants} 
            />
            
            <BetaTestersList 
              betaTesters={betaTesters} 
              botName={botName} 
              isDark={isDark} 
              variants={itemVariants} 
            />
            
            <InspirationSection 
              inspirationText={inspirationText} 
              isDark={isDark} 
              variants={itemVariants} 
            />
            
            <ThankYouSection 
              botName={botName} 
              isDark={isDark} 
              variants={itemVariants} 
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}