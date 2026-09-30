import { useVideoSlider } from '../../hooks/useVideoSlider';
import ReelCard from './ReelCard';

export default function VideoSlider({ reels }) {
  const {
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
  } = useVideoSlider(reels.length);

  return (
    <div className="video-slider-wrapper">
      <div className="video-slider-viewport">
        <div
          className="video-slider-track"
          ref={trackRef}
          style={getTrackStyle()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {reels.map((reel, idx) => (
            <div className="video-slide-item" key={reel.id} data-slide-index={idx}>
              <ReelCard reel={reel} />
            </div>
          ))}
        </div>
      </div>

      <div className="video-slider-controls">
        <button
          className="slider-nav-btn"
          aria-label="Previous Slide"
          disabled={!canPrev}
          onClick={prevSlide}
        >
          <span className="slider-nav-arrow">←</span>
          <span className="slider-nav-text">Prev</span>
        </button>

        <div className="slider-indicators">
          {reels.map((_, i) => (
            <button
              key={i}
              className={`slider-dot-btn ${i === currentIndex ? 'active' : ''}`}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goToSlide(i)}
            />
          ))}
          <span className="slider-counter-badge">
            {currentIndex + 1} / {totalSlides}
          </span>
        </div>

        <button
          className="slider-nav-btn"
          aria-label="Next Slide"
          disabled={!canNext}
          onClick={nextSlide}
        >
          <span className="slider-nav-text">Next</span>
          <span className="slider-nav-arrow">→</span>
        </button>
      </div>

      <div className="slider-swipe-hint">
        ↔ Swipe or use arrows to view reels
      </div>
    </div>
  );
}
