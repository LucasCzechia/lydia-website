/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    // Make sure to include all files that might contain Tailwind classes
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        card: 'var(--card)',
        'card-hover': 'var(--card-hover)',
        'card-border': 'var(--card-border)'
      },
      fontFamily: {
        mono: ['Roboto Mono', 'monospace'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'sans-serif']
      },
      fontSize: {
        // Optimize font sizes to reduce variants
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem'
      },
      spacing: {
        // Limit spacing values to reduce CSS size
        '18': '4.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      },
      opacity: {
        '5': '0.05',
        '10': '0.1',
        '15': '0.15',
        '20': '0.2',
        '30': '0.3'
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'shine': 'shine 8s infinite linear'
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        },
        'shine': {
          'from': { backgroundPosition: '200% center' },
          'to': { backgroundPosition: '-200% center' }
        }
      },
      // Add performance-focused utilities
      willChange: {
        'transform': 'transform',
        'opacity': 'opacity',
        'filter': 'filter'
      }
    }
  },
  
  // Reduce plugin overhead
  plugins: [],
  
  // Minimal safelist for critical classes only
  safelist: [
    // Critical opacity variants only
    'bg-primary/5',
    'bg-primary/10',
    'bg-primary/15',
    'bg-blue-900/20',
    'bg-blue-900/30',
    'hover:bg-primary/10',
    'border-primary/20',
    'text-blue-500',
    'text-green-500',
    'text-red-500',
    'text-yellow-500',
    'text-purple-500',
    'text-cyan-500',
    'backdrop-blur-sm',
    'critical'
  ],
  
  // Essential core plugins - re-enabled spacing and layout utilities
  corePlugins: {
    // Basic functionality - ALWAYS ENABLED
    preflight: true,
    accessibility: true,
    alignContent: true,
    alignItems: true,
    alignSelf: true,
    
    // Essential layout and spacing - CRITICAL FOR LAYOUT
    display: true,
    flex: true,
    flexBasis: true,
    flexDirection: true,
    flexGrow: true,
    flexShrink: true,
    flexWrap: true,
    gap: true,
    gridTemplateColumns: true,
    justifyContent: true,
    
    // CRITICAL: Re-enable all spacing utilities
    margin: true,
    padding: true,
    space: true, // Re-enabled for space-y-* utilities
    
    // CRITICAL: Re-enable sizing utilities
    height: true,
    width: true,
    maxHeight: true,
    maxWidth: true,
    minHeight: true,
    minWidth: true,
    
    // CRITICAL: Re-enable positioning
    position: true,
    inset: true,
    
    // Typography essentials
    fontFamily: true,
    fontSize: true,
    fontWeight: true,
    fontStyle: true,
    fontSmoothing: true,
    lineHeight: true,
    letterSpacing: true,
    textAlign: true,
    textColor: true,
    textDecorationLine: true,
    textOpacity: true,
    
    // Visual essentials
    backgroundColor: true,
    backgroundImage: true,
    backgroundPosition: true,
    backgroundSize: true,
    backgroundClip: true,
    backgroundOpacity: true,
    
    borderColor: true,
    borderOpacity: true,
    borderRadius: true,
    borderStyle: true,
    borderWidth: true,
    
    boxShadow: true,
    boxSizing: true,
    
    // Interactive elements
    cursor: true,
    opacity: true,
    overflow: true,
    pointerEvents: true,
    visibility: true,
    zIndex: true,
    
    // Transitions and animations
    animation: true,
    transitionDuration: true,
    transitionProperty: true,
    transitionTimingFunction: true,
    transform: true,
    willChange: true,
    
    // Essential responsive design
    container: false, // Keep disabled - we use custom containers
    
    // Backdrop filters for dropdowns
    backdropBlur: true,
    
    // DISABLED - Non-essential features to reduce bundle size
    appearance: false,
    backdropBrightness: false,
    backdropContrast: false,
    backdropGrayscale: false,
    backdropHueRotate: false,
    backdropInvert: false,
    backdropOpacity: false,
    backdropSaturate: false,
    backdropSepia: false,
    backgroundAttachment: false,
    backgroundRepeat: false,
    blur: false,
    borderCollapse: false,
    borderSpacing: false,
    boxDecorationBreak: false,
    boxShadowColor: false,
    brightness: false,
    captionSide: false,
    caretColor: false,
    clear: false,
    columns: false,
    content: false,
    contrast: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
    dropShadow: false,
    fill: true, // Keep for icons
    filter: false,
    float: false,
    fontVariantNumeric: false,
    gradientColorStops: true, // Keep for gradients
    grayscale: false,
    gridAutoColumns: false,
    gridAutoFlow: false,
    gridAutoRows: false,
    gridColumn: false,
    gridColumnEnd: false,
    gridColumnStart: false,
    gridRow: false,
    gridRowEnd: false,
    gridRowStart: false,
    gridTemplateRows: false,
    hueRotate: false,
    invert: false,
    isolation: false,
    justifyItems: false,
    justifySelf: false,
    listStylePosition: false,
    listStyleType: false,
    mixBlendMode: false,
    objectFit: true, // Keep for images
    objectPosition: false,
    order: false,
    outline: true, // Keep for accessibility
    outlineColor: false,
    outlineOffset: false,
    outlineStyle: false,
    outlineWidth: false,
    overscrollBehavior: false,
    placeContent: false,
    placeItems: false,
    placeSelf: false,
    placeholderColor: false,
    placeholderOpacity: false,
    resize: false,
    ringColor: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    ringOpacity: false,
    ringWidth: false,
    rotate: false,
    saturate: false,
    scale: false,
    scrollBehavior: false,
    scrollMargin: false,
    scrollPadding: false,
    scrollSnapAlign: false,
    scrollSnapStop: false,
    scrollSnapType: false,
    sepia: false,
    skew: false,
    stroke: false,
    strokeWidth: false,
    tableLayout: false,
    textDecorationColor: false,
    textDecorationStyle: false,
    textDecorationThickness: false,
    textIndent: false,
    textOverflow: false,
    textTransform: false,
    textUnderlineOffset: false,
    transformOrigin: false,
    transitionDelay: false,
    translate: false,
    userSelect: false,
    verticalAlign: false,
    whitespace: false,
    wordBreak: false
  }
}