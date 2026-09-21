import { useRef, useState, useCallback } from 'react';

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

export default function ReelCard({ reel }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleVideoClick = useCallback(() => {
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
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  return (
    <div className="reel-item-card">
      <div className="reel-video-box" onClick={handleVideoClick}>
        <button
          className="reel-sound-toggle"
          title="Toggle Sound"
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          onClick={handleSoundToggle}
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
        />
        <div className="reel-play-overlay">
          <div className="reel-play-circle">▶</div>
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
