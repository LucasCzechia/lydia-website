import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function AnimatedBackground({ 
  intensity = "medium", 
  theme = "primary",
  enableParallax = false,
  blendMode = "normal" 
}) {
  const { resolvedTheme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  const animationIdRef = useRef(null);

  const isDarkMode = resolvedTheme === 'dark';

  const handleScroll = useCallback(() => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    animationIdRef.current = requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);

  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
      const isLowEnd = window.navigator?.hardwareConcurrency <= 2 || 
                       window.navigator?.deviceMemory <= 2;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setShouldRender(!isLowEnd && !prefersReducedMotion);
    }
  }, []);

  useEffect(() => {
    if (enableParallax && shouldRender && isDarkMode && typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
      };
    }
  }, [enableParallax, shouldRender, isDarkMode, handleScroll]);

  const config = useMemo(() => {
    let opacityLevel;
    switch(intensity) {
      case "light":
        opacityLevel = 0.3;
        break;
      case "strong":
        opacityLevel = 0.7;
        break;
      case "medium":
      default:
        opacityLevel = 0.5;
    }
    
    let primaryColor = "37, 99, 235";
    let secondaryColor = "29, 78, 216";
    let accentColor = "59, 130, 246";
    
    if (theme === "dark") {
      primaryColor = "30, 41, 59";
      secondaryColor = "17, 24, 39";
      accentColor = "37, 99, 235";
    } else if (theme === "purple") {
      primaryColor = "139, 92, 246";
      secondaryColor = "91, 33, 182";
      accentColor = "168, 85, 247";
    }
    
    return { opacityLevel, primaryColor, secondaryColor, accentColor };
  }, [intensity, theme]);

  const parallaxTransforms = useMemo(() => {
    if (!enableParallax || !shouldRender || !isDarkMode) {
      return { translateX1: 0, translateY1: 0, translateX2: 0, translateY2: 0 };
    }
    
    const maxTranslate = 100;
    const translateX1 = Math.min(Math.max(scrollY * 0.015, -maxTranslate), maxTranslate);
    const translateY1 = Math.min(Math.max(scrollY * 0.008, -maxTranslate), maxTranslate);
    const translateX2 = Math.min(Math.max(scrollY * -0.012, -maxTranslate), maxTranslate);
    const translateY2 = Math.min(Math.max(scrollY * -0.006, -maxTranslate), maxTranslate);
    
    return { translateX1, translateY1, translateX2, translateY2 };
  }, [enableParallax, shouldRender, isDarkMode, scrollY]);

  if (!isMounted) return null;

  if (!isDarkMode) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          zIndex: -1,
          backgroundColor: '#ffffff'
        }}
      />
    );
  }

  if (!shouldRender) {
    return (
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{ 
          zIndex: -1,
          backgroundColor: '#0f172a'
        }}
      />
    );
  }

  const { opacityLevel, primaryColor, secondaryColor, accentColor } = config;
  const { translateX1, translateY1, translateX2, translateY2 } = parallaxTransforms;

  const uniqueId = Math.random().toString(36).substr(2, 9);

  return (
    <>
      <div 
        ref={containerRef}
        className={`fixed pointer-events-none overflow-hidden ${blendMode !== "normal" ? `mix-blend-${blendMode}` : ""}`}
        style={{ 
          top: 0,
          right: 0,
          bottom: 0,
          left: '-10%',
          width: '110%',
          zIndex: -1,
          isolation: 'isolate'
        }}
      >
        <div 
          className={`absolute inset-0 w-full h-full bg-gradient-animated-${uniqueId}`}
          style={{
            background: `
              linear-gradient(135deg, 
                rgba(${primaryColor}, ${opacityLevel * 0.25}) 0%, 
                rgba(${secondaryColor}, ${opacityLevel * 0.15}) 25%, 
                rgba(${accentColor}, ${opacityLevel * 0.2}) 50%, 
                rgba(${primaryColor}, ${opacityLevel * 0.15}) 75%, 
                rgba(${secondaryColor}, ${opacityLevel * 0.1}) 100%
              ),
              radial-gradient(circle at 25% 25%, 
                rgba(${primaryColor}, ${opacityLevel * 0.3}) 0%, 
                transparent 60%
              ),
              radial-gradient(circle at 75% 75%, 
                rgba(${accentColor}, ${opacityLevel * 0.25}) 0%, 
                transparent 60%
              )
            `,
            backgroundSize: '300% 300%, 150% 150%, 150% 150%',
            transform: enableParallax ? `translate3d(${translateX1}px, ${translateY1}px, 0)` : 'none',
            animation: 'backgroundShift 25s ease-in-out infinite'
          }}
        />

        <div 
          className={`absolute top-1/4 left-1/4 w-80 h-80 rounded-full orb-${uniqueId}-1`}
          style={{
            background: `radial-gradient(circle, rgba(${primaryColor}, ${opacityLevel * 0.4}) 0%, transparent 65%)`,
            filter: 'blur(60px)',
            transform: enableParallax ? 
              `translate3d(${translateX1 * 0.3}px, ${translateY1 * 0.3}px, 0)` : 
              'none',
            animation: 'float1 15s ease-in-out infinite'
          }}
        />
        
        <div 
          className={`absolute top-3/4 right-1/4 w-72 h-72 rounded-full orb-${uniqueId}-2`}
          style={{
            background: `radial-gradient(circle, rgba(${secondaryColor}, ${opacityLevel * 0.45}) 0%, transparent 65%)`,
            filter: 'blur(50px)',
            transform: enableParallax ? 
              `translate3d(${translateX2 * 0.25}px, ${translateY2 * 0.25}px, 0)` : 
              'none',
            animation: 'float2 18s ease-in-out infinite 3s'
          }}
        />

        <div 
          className={`absolute top-1/2 left-1/2 w-60 h-60 rounded-full orb-${uniqueId}-3`}
          style={{
            background: `radial-gradient(circle, rgba(${accentColor}, ${opacityLevel * 0.5}) 0%, transparent 65%)`,
            filter: 'blur(40px)',
            transform: enableParallax ? 
              `translate3d(calc(-50% + ${translateX1 * 0.15}px), calc(-50% + ${translateY1 * 0.15}px), 0)` : 
              'translate3d(-50%, -50%, 0)',
            animation: 'float3 12s ease-in-out infinite 1.5s'
          }}
        />
      </div>

      <style jsx>{`
        @keyframes backgroundShift {
          0%, 100% { 
            background-position: 0% 50%, 0% 0%, 100% 100%; 
          }
          25% { 
            background-position: 100% 50%, 100% 50%, 0% 50%; 
          }
          50% { 
            background-position: 100% 0%, 50% 100%, 100% 0%; 
          }
          75% { 
            background-position: 0% 0%, 0% 50%, 50% 100%; 
          }
        }
        
        @keyframes float1 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.7; 
          }
          33% { 
            transform: translateY(-20px) translateX(15px) scale(1.05); 
            opacity: 0.9; 
          }
          66% { 
            transform: translateY(10px) translateX(-10px) scale(0.95); 
            opacity: 0.8; 
          }
        }
        
        @keyframes float2 {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.8; 
          }
          33% { 
            transform: translateY(15px) translateX(-20px) scale(1.08); 
            opacity: 1; 
          }
          66% { 
            transform: translateY(-12px) translateX(18px) scale(0.92); 
            opacity: 0.85; 
          }
        }
        
        @keyframes float3 {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1); 
            opacity: 0.9; 
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.15); 
            opacity: 1; 
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bg-gradient-animated-${uniqueId},
          .orb-${uniqueId}-1,
          .orb-${uniqueId}-2,
          .orb-${uniqueId}-3 {
            animation: none !important;
          }
        }

        .orb-${uniqueId}-1,
        .orb-${uniqueId}-2,
        .orb-${uniqueId}-3 {
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
      `}</style>
    </>
  );
}
