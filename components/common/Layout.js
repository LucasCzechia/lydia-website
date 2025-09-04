import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '../navigation/NavBar';
import Footer from './Footer';
import DevelopmentNotice from '../ui/DevelopmentNotice';
import CookieConsent from '../ui/CookieConsent';
import ErrorBoundary from './ErrorBoundary';
import { getConfig, getPageTitle, getPageDescription, getBotName } from '../../utils/configUtils';
import { initializePerformanceOptimizations } from '../../utils/serviceWorker';

export default function Layout({ children, title, description }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  const getPageKey = () => {
    const path = router.pathname;
    if (path === '/') return 'home';
    return path.replace(/^\//, '').split('/')[0] || 'home';
  };
  
  const pageKey = getPageKey();
  const pageTitle = title || getPageTitle(pageKey);
  const pageDescription = description || getPageDescription(pageKey);
  const botName = getBotName();
  const botNameWithoutSymbol = getBotName(false);
  
  const domain = process.env.NEXT_PUBLIC_VERCEL_URL || getConfig('urls.website', 'lydia.app').replace(/^https?:\/\//, '');
  const canonicalUrl = `https://${domain}${router.pathname}`;
  const botLogoUrl = `https://${domain}${getConfig('branding.images.logo', '/images/lydia.webp')}`;
  const faviconUrl = getConfig('branding.images.favicon', '/images/favicon/favicon.ico');

  useEffect(() => {
    setIsClient(true);
    
    // Initialize performance optimizations
    if (typeof window !== 'undefined') {
      initializePerformanceOptimizations().catch(console.error);
    }
  }, []);

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `https://${domain}/#website`,
        "url": `https://${domain}`,
        "name": botName,
        "description": pageDescription,
        "publisher": {
          "@id": `https://${domain}/#organization`
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `https://${domain}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ],
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": `https://${domain}/#organization`,
        "name": botNameWithoutSymbol,
        "url": `https://${domain}`,
        "logo": {
          "@type": "ImageObject",
          "inLanguage": "en-US",
          "@id": `https://${domain}/#/schema/logo/image/`,
          "url": botLogoUrl,
          "contentUrl": botLogoUrl,
          "width": 200,
          "height": 200,
          "caption": botNameWithoutSymbol
        },
        "image": {
          "@id": `https://${domain}/#/schema/logo/image/`
        },
        "sameAs": [
          getConfig('urls.discord.supportServer', 'https://discord.gg/bolt'),
          getConfig('urls.social.github', 'https://github.com/lydia'),
          getConfig('urls.social.twitter', 'https://twitter.com/lydiaai')
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": pageTitle,
        "isPartOf": {
          "@id": `https://${domain}/#website`
        },
        "about": {
          "@id": `https://${domain}/#organization`
        },
        "description": pageDescription,
        "breadcrumb": {
          "@id": `${canonicalUrl}#breadcrumb`
        },
        "inLanguage": "en-US",
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [canonicalUrl]
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `https://${domain}`
          },
          ...(pageKey !== 'home' ? [{
            "@type": "ListItem",
            "position": 2,
            "name": pageTitle,
            "item": canonicalUrl
          }] : [])
        ]
      }
    ]
  };

  // Additional page-specific structured data
  if (pageKey === 'home') {
    structuredData["@graph"].push({
      "@type": "SoftwareApplication",
      "name": botName,
      "description": pageDescription,
      "url": `https://${domain}`,
      "logo": botLogoUrl,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Discord",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "publisher": {
        "@id": `https://${domain}/#organization`
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Critical Resource Hints - Loading Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://vercel.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://discord.gg" />

        {/* Critical Image Preloading */}
        <link 
          rel="preload" 
          as="image" 
          href="/images/lydia.webp"
          imagesrcset="/_next/image/?url=%2Fimages%2Flydia.webp&w=16&q=75 16w, /_next/image/?url=%2Fimages%2Flydia.webp&w=32&q=75 32w, /_next/image/?url=%2Fimages%2Flydia.webp&w=48&q=75 48w, /_next/image/?url=%2Fimages%2Flydia.webp&w=64&q=75 64w, /_next/image/?url=%2Fimages%2Flydia.webp&w=96&q=75 96w, /_next/image/?url=%2Fimages%2Flydia.webp&w=128&q=75 128w, /_next/image/?url=%2Fimages%2Flydia.webp&w=256&q=75 256w, /_next/image/?url=%2Fimages%2Flydia.webp&w=384&q=75 384w, /_next/image/?url=%2Fimages%2Flydia.webp&w=640&q=75 640w, /_next/image/?url=%2Fimages%2Flydia.webp&w=750&q=75 750w, /_next/image/?url=%2Fimages%2Flydia.webp&w=828&q=75 828w, /_next/image/?url=%2Fimages%2Flydia.webp&w=1080&q=75 1080w, /_next/image/?url=%2Fimages%2Flydia.webp&w=1200&q=75 1200w, /_next/image/?url=%2Fimages%2Flydia.webp&w=1920&q=75 1920w, /_next/image/?url=%2Fimages%2Flydia.webp&w=2048&q=75 2048w, /_next/image/?url=%2Fimages%2Flydia.webp&w=3840&q=75 3840w"
          imagesizes="200px"
          fetchpriority="high"
        />

        {/* Critical Font Preloading with font-display: swap */}
        <link 
          rel="preload" 
          href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin=""
        />

        {/* Favicon and touch icons */}
        <link rel="icon" href={faviconUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/favicon/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/favicon/android-chrome-512x512.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/images/favicon/favicon.ico" />

        {/* Theme colors */}
        <meta name="theme-color" content={getConfig('branding.colors.primary', '#2563EB')} />
        <meta name="theme-color" content="#000814" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* SEO Meta Tags */}
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="keywords" content={getConfig('seo.keywords', 'Discord bot, AI assistant, Discord AI, chat bot, Discord automation')} />
        <meta name="author" content={botNameWithoutSymbol} />
        <meta name="generator" content="Next.js" />
        <meta name="language" content="English" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={botLogoUrl} />
        <meta property="og:image:alt" content={getConfig('branding.images.logoAlt', `${botNameWithoutSymbol} Logo`)} />
        <meta property="og:image:width" content="200" />
        <meta property="og:image:height" content="200" />
        <meta property="og:site_name" content={botName} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={botLogoUrl} />
        <meta name="twitter:image:alt" content={getConfig('branding.images.logoAlt', `${botNameWithoutSymbol} Logo`)} />
        <meta name="twitter:site" content="@lydiaai" />
        <meta name="twitter:creator" content="@lydiaai" />

        {/* Discord Meta */}
        <meta property="discord:invite" content={getConfig('urls.discord.supportServer', 'https://discord.gg/bolt')} />

        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Optimized Font Loading with font-display: swap */}
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          /* Ensure font-display: swap for faster rendering */
          @font-face {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400 700;
            font-display: swap;
            src: url('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2') format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
          }
          
          /* Critical CSS for above-the-fold content */
          .critical {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          }
          
          /* Performance optimizations */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Reduce layout shifts */
          img {
            max-width: 100%;
            height: auto;
          }
          
          /* Optimize animations */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
      </Head>

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:shadow-lg"
        tabIndex="1"
      >
        Skip to main content
      </a>

      {isClient && (
        <ErrorBoundary minimal>
          <DevelopmentNotice />
        </ErrorBoundary>
      )}
      
      {isClient && (
        <ErrorBoundary minimal>
          <CookieConsent />
        </ErrorBoundary>
      )}

      <header className="navbar critical" role="banner">
        <ErrorBoundary minimal>
          <NavBar />
        </ErrorBoundary>
      </header>

      <div className="md:hidden h-16" aria-hidden="true"></div>

      <main 
        id="main-content" 
        className="flex-grow critical" 
        role="main"
        tabIndex="-1"
      >
        {children}
      </main>

      <footer role="contentinfo">
        <ErrorBoundary minimal>
          <Footer />
        </ErrorBoundary>
      </footer>

      <div className="md:hidden h-24" aria-hidden="true"></div>
    </div>
  );
}