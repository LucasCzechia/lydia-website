import Layout from '../components/common/Layout';
import Link from 'next/link';
import { Home, AlertTriangle, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { getConfig, getBotName } from '../utils/configUtils';

const AnimatedBackground = dynamic(
  () => import('../components/common/AnimatedBackground'),
  { ssr: false }
);

export default function Custom404() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(10);
  const botName = getBotName();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 10000);

    const countdownInterval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <Layout title={`Page Not Found - ${botName}`}>
      <AnimatedBackground intensity="light" theme="primary" />
      <div className="flex flex-col items-center justify-center min-h-[70vh] py-8 md:py-16 px-4 text-center">
        <div className="w-full max-w-md md:max-w-lg">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center animate-pulse-glow">
            <AlertTriangle size={40} className="text-primary" />
          </div>

           <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
             404 - Page Not Found
           </h1>

          <p className="text-lg md:text-xl mb-8 max-w-md mx-auto text-gray-700 dark:text-gray-400">
            Oops! It seems this page has been zapped out of existence.
          </p>

          <div className="card p-5 mb-8 text-left">
            <h2 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Try one of these instead:
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <Zap size={18} className="text-primary mr-2" />
                <Link href={getConfig('urls.nav.home')} className="hover:text-primary transition-colors">
                  Return to the homepage
                </Link>
              </li>
              <li className="flex items-center">
                <Zap size={18} className="text-primary mr-2" />
                <Link href={getConfig('urls.nav.features')} className="hover:text-primary transition-colors">
                  Check out our features
                </Link>
              </li>
              <li className="flex items-center">
                <Zap size={18} className="text-primary mr-2" />
                <Link href={getConfig('urls.nav.contact')} className="hover:text-primary transition-colors">
                  Contact our support team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Link href={getConfig('urls.nav.home')} passHref>
              <button className="btn-primary flex items-center mx-auto">
                <Home size={20} className="mr-2" />
                Back to Home
              </button>
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-700 dark:text-gray-500">
            <p>Redirecting to home page in <span className="text-primary font-medium">{secondsLeft}</span> seconds</p>
            <div className="w-full bg-card-border rounded-full h-2 mt-2 overflow-hidden">
              <div
                  style={{ width: `${100 - (10-secondsLeft)*10}%` }}
                  className="bg-primary h-full transition-width duration-1000 ease-linear"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
  }
