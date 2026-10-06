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

const INSTAGRAM_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function ReelCard({ reel, isActive = true }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [userClickedPlay, setUserClickedPlay] = useState(false);

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

    const onPlay = () => {
      setIsPlaying(true);
      setIsBuffering(false);
    };
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);
    const onPlaying = () => {
      setIsBuffering(false);
      setIsPlaying(true);
      setHasError(false);
    };
    const onError = () => {
      console.warn('Video failed to load/play for reel:', reel.id, reel.videoUrl);
      setIsBuffering(false);
      setIsPlaying(false);
      setHasError(true);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('playing', onPlaying);
    video.addEventListener('error', onError);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
    };
  }, [reel.id, reel.videoUrl]);

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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Play/pause based on active slide & viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    if ((isActive && isInView) || userClickedPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            // Autoplay prevented by browser until explicit user tap
            console.log('Autoplay deferred for reel:', reel.id, err.message);
            setIsPlaying(false);
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isActive, isInView, userClickedPlay, hasError, reel.id]);

  const handleVideoClick = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setUserClickedPlay(true);
      video.play().then(() => {
        setIsPlaying(true);
        setHasError(false);
      }).catch(() => {
        // Fallback
      });
    } else {
      setUserClickedPlay(false);
      video.pause();
      setIsPlaying(false);
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
      setUserClickedPlay(true);
      video.play().catch(() => {});
    }
  }, []);

  const handleRetry = useCallback((e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    setHasError(false);
    setIsBuffering(true);
    video.load();
    video.play().then(() => {
      setIsPlaying(true);
      setIsBuffering(false);
    }).catch(() => {
      setIsBuffering(false);
    });
  }, []);

  return (
    <div className="reel-item-card" ref={containerRef}>
      <div className="reel-video-box" onClick={handleVideoClick}>
        {/* Top Sound Toggle */}
        <button
          className="reel-sound-toggle"
          title="Toggle Sound"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          onClick={handleSoundToggle}
          type="button"
        >
          {isMuted ? MUTED_ICON : UNMUTED_ICON}
        </button>

        {/* Top Instagram Link Pill */}
        <a
          href={reel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="reel-top-ig-pill"
          onClick={(e) => e.stopPropagation()}
          title={`Open @${reel.handle} on Instagram`}
        >
          {INSTAGRAM_ICON}
          <span>@{reel.handle}</span>
          <span style={{ fontSize: '0.7em' }}>↗</span>
        </a>

        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.posterUrl}
          loop
          playsInline
          muted
          autoPlay
          preload="auto"
        />

        {/* Poster Fallback Image if video errors out */}
        {hasError && (
          <div className="reel-error-fallback">
            {reel.posterUrl && (
              <img
                src={reel.posterUrl}
                alt={reel.title}
                className="reel-fallback-poster-img"
              />
            )}
            <div className="reel-error-backdrop">
              <span className="reel-error-badge">HD Reel Preview</span>
              <div className="reel-error-actions">
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reel-error-ig-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  {INSTAGRAM_ICON} Watch on Instagram ↗
                </a>
                <button
                  type="button"
                  className="reel-error-retry-btn"
                  onClick={handleRetry}
                >
                  ↻ Retry Playback
                </button>
              </div>
            </div>
          </div>
        )}

        {isBuffering && !hasError && (
          <div className="reel-buffering-overlay">
            <div className="reel-spinner" />
          </div>
        )}

        {!hasError && (
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
        )}
      </div>

      <div className="reel-content-box">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="reel-badge-pill">{reel.categoryTag}</span>
          {reel.brand && (
            <span className="reel-brand-pill">{reel.brand}</span>
          )}
        </div>

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

        <div className="reel-action-bar">
          <a
            href={reel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-reel-ig"
          >
            {INSTAGRAM_ICON} View on Instagram ↗
          </a>
        </div>
      </div>
    </div>
  );
}
