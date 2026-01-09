import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
  priority?: boolean;
  onLoad?: () => void;
}

/**
 * Optimized image component with:
 * - Native lazy loading
 * - Blur-up placeholder effect
 * - Intersection Observer for deferred loading
 * - Smooth fade-in transition
 */
const OptimizedImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  priority = false,
  onLoad,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before entering viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div 
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-muted/20',
        wrapperClassName
      )}
    >
      {/* Placeholder skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-muted/10 animate-pulse" />
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
