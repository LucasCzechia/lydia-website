import { motion } from 'framer-motion';
import Layout from '../components/common/Layout';
import dynamic from 'next/dynamic';
import { getBotName } from '../utils/configUtils';
import HeroBanner from '../components/pages/home/HeroBanner';
import FeatureSection from '../components/pages/home/FeatureSection';
import TestimonialSection from '../components/pages/home/TestimonialSection';
import Notice from '../components/ui/Notice';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { animationPresets } from '../utils/motionConfig';

const AnimatedBackground = dynamic(
  () => import('../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Home() {
  const botName = getBotName();

  return (
    <Layout title={`${botName} - AI Discord Bot`}>
      <div className="framer-theme relative">
        <ErrorBoundary minimal>
          <AnimatedBackground 
            intensity="light" 
            theme="primary" 
            enableParallax={false} 
            blendMode="overlay" 
          />
        </ErrorBoundary>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationPresets.fadeIn}
          className="relative z-10"
        >
          <section className="min-h-screen flex items-center justify-center py-12 md:py-20 px-4 md:px-0">
            <motion.div 
              variants={animationPresets.fadeInUp} 
              className="w-full max-w-6xl mx-auto"
            >
              <ErrorBoundary>
                <HeroBanner />
              </ErrorBoundary>
            </motion.div>
          </section>

          <ErrorBoundary>
            <FeatureSection />
          </ErrorBoundary>
          
          <ErrorBoundary minimal>
            <Notice />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <TestimonialSection />
          </ErrorBoundary>
        </motion.div>
      </div>
    </Layout>
  );
}