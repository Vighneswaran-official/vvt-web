import { useRef, useState, useEffect, useCallback } from 'react';

const MUTED_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const UNMUTED_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
  </svg>
);

export default function ReelCard({ reel, isActive = true }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Set mandatory mobile & iOS autoplay attributes directly on DOM element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsBuffering(true);
    const onPlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('playing', onPlaying);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('playing', onPlaying);
    };
  }, []);

  // IntersectionObserver to detect when reel is visible on screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause based on active slide & viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive && isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy prevented playback until user tap
          setIsPlaying(false);
        });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive, isInView]);

  const handleVideoClick = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const handleSoundToggle = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (video.paused) {
      video.play().catch(() => {});
    }
  }, []);

  return (
    <div className="reel-item-card" ref={containerRef}>
      <div className="reel-video-box" onClick={handleVideoClick}>
        <button
          className="reel-sound-toggle"
          title="Toggle Sound"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          onClick={handleSoundToggle}
          type="button"
        >
          {isMuted ? MUTED_ICON : UNMUTED_ICON}
        </button>

        <video
          ref={videoRef}
          src={reel.videoUrl}
          loop
          playsInline
          muted
          autoPlay
          preload="metadata"
        />

        {isBuffering && (
          <div className="reel-buffering-overlay">
            <div className="reel-spinner" />
          </div>
        )}

        <div className={`reel-play-overlay ${!isPlaying ? 'is-paused' : ''}`}>
          <div className="reel-play-center">
            <div className="reel-play-circle">
              {!isPlaying ? '▶' : '❚❚'}
            </div>
            {!isPlaying && (
              <span className="reel-play-label">TAP TO PLAY</span>
            )}
          </div>
        </div>
      </div>

      <div className="reel-content-box">
        <span className="reel-badge-pill">{reel.categoryTag}</span>
        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="reel-link"
        >
          ● @{reel.handle} ↗
        </a>
        <div className="reel-title-text">{reel.title}</div>
        <div className="reel-desc-text">{reel.desc}</div>
      </div>
    </div>
  );
}
