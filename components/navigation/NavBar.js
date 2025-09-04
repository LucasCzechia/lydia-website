import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopNav from './DesktopNav';
import TabletNav from './TabletNav';
import MobileNav from './MobileNav';

export default function NavBar() {
  const [screenSize, setScreenSize] = useState('desktop');
  const router = useRouter();
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {screenSize === 'desktop' && <DesktopNav />}
        {screenSize === 'tablet' && <TabletNav />}
        {screenSize === 'mobile' && <MobileNav />}
      </motion.div>
    </AnimatePresence>
  );
}