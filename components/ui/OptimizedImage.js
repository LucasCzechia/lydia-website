import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  sizes,
  fill = false,
  loading = 'lazy',
  blurDataURL,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate a simple blur placeholder if none provided
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLijzOSUUtNW1EjhIlx1FnIGsssyGhKmFBZXHZ6Jt44uw5BPgZgHRhsAqPqGvZ3Rl7ub9lFhRngJU8rJxKM8sU5UxsLigTjyJZqYxcF1XCgr0yKzl9+j/2Q==';

  const handleLoad = (e) => {
    setIsLoading(false);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    if (onError) onError(e);
  };

  // Fallback image for errors
  if (hasError) {
    return (
      <div 
        className={clsx(
          "flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600",
          className
        )}
        style={!fill ? { width, height } : undefined}
        {...props}
      >
        <svg 
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path 
            fillRule="evenodd" 
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" 
            clipRule="evenodd" 
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={clsx("relative overflow-hidden", className)} {...props}>
      {/* Loading placeholder */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse"
          style={!fill ? { width, height } : undefined}
        />
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        sizes={sizes || (fill ? '100vw' : undefined)}
        loading={priority ? 'eager' : loading}
        className={clsx(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          fill && "object-cover"
        )}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

// Preset components for common use cases
OptimizedImage.Avatar = ({ size = 40, ...props }) => (
  <OptimizedImage
    width={size}
    height={size}
    className="rounded-full"
    {...props}
  />
);

OptimizedImage.Hero = ({ ...props }) => (
  <OptimizedImage
    priority={true}
    quality={85}
    placeholder="blur"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...props}
  />
);

OptimizedImage.Logo = ({ size = 32, ...props }) => (
  <OptimizedImage
    width={size}
    height={size}
    priority={true}
    quality={90}
    placeholder="empty"
    {...props}
  />
);

OptimizedImage.Thumbnail = ({ size = 200, ...props }) => (
  <OptimizedImage
    width={size}
    height={size}
    quality={70}
    loading="lazy"
    placeholder="blur"
    {...props}
  />
);

export default OptimizedImage;