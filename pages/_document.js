import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="antialiased" suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
        
        <meta name="color-scheme" content="dark light" />
        <link rel="icon" href="/images/favicon/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getInitialTheme() {
                  const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
                  if (savedTheme) return savedTheme;
                  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                const theme = getInitialTheme();
                document.documentElement.classList.add(theme);
                document.documentElement.setAttribute('data-theme', theme);
                document.documentElement.style.setProperty('--initial-color-mode', theme);
              })();
            `,
          }}
        />
        
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background: #FFFFFF;
                --foreground: #121212;
                --primary: #2563EB;
                --secondary: #1D4ED8;
                --card: #F5F5F5;
                --card-hover: #EEEEEE;
                --card-border: #9CA3AF;
                --gray-300: #303030;
                --gray-400: #222222;
                --gray-500: #171717;
                --primary-rgb: 37, 99, 235;
              }

              .dark {
                --background: #000000;
                --foreground: #FFFFFF;
                --primary: #2563EB;
                --secondary: #1D4ED8;
                --card: #111111;
                --card-hover: #1A1A1A;
                --card-border: #333333;
                --gray-300: #D1D5DB;
                --gray-400: #9CA3AF;
                --gray-500: #6B7280;
              }

              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }

              html {
                scroll-behavior: smooth;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              }

              body {
                background-color: var(--background);
                color: var(--foreground);
                font-family: 'Inter', sans-serif;
                transition: none !important;
              }

              .loading-skeleton {
                background: linear-gradient(90deg, var(--card) 25%, var(--card-hover) 50%, var(--card) 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
              }

              @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
