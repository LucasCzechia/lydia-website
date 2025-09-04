import '../styles/globals.css';
import '../styles/framer-theme.css';
import { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import AnalyticsProvider from '../components/providers/AnalyticsProvider';
import { ToastProvider } from '../components/ui/Toast';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { getConfig } from '../utils/configUtils';
import { setupGlobalErrorHandling } from '../utils/errorHandling';

function MyApp({ Component, pageProps }) {
  const defaultTheme = getConfig('theme.default', 'dark');

  useEffect(() => {
    setupGlobalErrorHandling();
  }, []);

  return (
    <ErrorBoundary>
      <NextThemesProvider
        attribute="class"
        defaultTheme={defaultTheme}
        enableSystem
        disableTransitionOnChange={true}
        storageKey="theme"
        themes={['light', 'dark', 'system']}
      >
        <ErrorBoundary minimal>
          <ThemeProvider>
            <ErrorBoundary minimal>
              <AuthProvider>
                <ErrorBoundary minimal>
                  <ToastProvider>
                    <ErrorBoundary>
                      <Component {...pageProps} />
                    </ErrorBoundary>
                    <ErrorBoundary minimal>
                      <AnalyticsProvider />
                    </ErrorBoundary>
                  </ToastProvider>
                </ErrorBoundary>
              </AuthProvider>
            </ErrorBoundary>
          </ThemeProvider>
        </ErrorBoundary>
      </NextThemesProvider>
    </ErrorBoundary>
  );
}

export default MyApp;