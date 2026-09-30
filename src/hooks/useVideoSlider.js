import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for video slider / carousel logic.
 * @param {number} totalSlides — total number of slides
 * @param {number} mobileBreakpoint — pixel width below which show 1 slide at a time
 */
export function useVideoSlider(totalSlides, mobileBreakpoint = 820) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  const getMaxIndex = useCallback(() => {
    const isMobile = window.innerWidth <= mobileBreakpoint;
    return isMobile ? totalSlides - 1 : Math.max(0, totalSlides - 2);
  }, [totalSlides, mobileBreakpoint]);

  const clampIndex = useCallback((idx) => {
    const max = getMaxIndex();
    return Math.max(0, Math.min(idx, max));
  }, [getMaxIndex]);

  const goToSlide = useCallback((idx) => {
    setCurrentIndex(clampIndex(idx));
  }, [clampIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => clampIndex(prev + 1));
  }, [clampIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => clampIndex(prev - 1));
  }, [clampIndex]);

  // Recalculate on resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentIndex((prev) => clampIndex(prev));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampIndex]);

  // Calculate transform offset
  const getTrackStyle = useCallback(() => {
    if (!trackRef.current) return {};
    const slides = trackRef.current.children;
    if (!slides || slides.length === 0) return {};
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = 24; // 1.5rem
    const offset = currentIndex * (slideWidth + gap);
    return { transform: `translateX(-${offset}px)` };
  }, [currentIndex]);

  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0);

  // Touch handlers for swipe
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchCurrentY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchCurrentX.current = e.touches[0].clientX;
    touchCurrentY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diffX = touchStartX.current - touchCurrentX.current;
    const diffY = touchStartY.current - touchCurrentY.current;
    const threshold = 40;

    // Only swipe if horizontal movement is greater than vertical movement
    if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }, [nextSlide, prevSlide]);

  const maxIndex = getMaxIndex();
  const canPrev = currentIndex > 0;
  const canNext = currentIndex < maxIndex;

  return {
    currentIndex,
    trackRef,
    goToSlide,
    nextSlide,
    prevSlide,
    getTrackStyle,
    canPrev,
    canNext,
    totalSlides,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
