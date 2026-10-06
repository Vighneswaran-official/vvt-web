import { useState, useMemo } from 'react';
import { siteData } from '../../data/siteData';
import VideoSlider from './VideoSlider';
import './VideoShowcase.css';

export default function VideoShowcase() {
  const [selectedBrand, setSelectedBrand] = useState('all');

  const filteredReels = useMemo(() => {
    if (selectedBrand === 'tamizhi') {
      return siteData.reels.filter((r) => r.handle === 'houseoftamizhi');
    }
    if (selectedBrand === 'jp') {
      return siteData.reels.filter((r) => r.handle.startsWith('jp'));
    }
    return siteData.reels;
  }, [selectedBrand]);

  const tamizhiCount = useMemo(
    () => siteData.reels.filter((r) => r.handle === 'houseoftamizhi').length,
    []
  );
  const jpCount = useMemo(
    () => siteData.reels.filter((r) => r.handle.startsWith('jp')).length,
    []
  );

  return (
    <section
      className="vvt-container section-spacing"
      id="videos"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      <div className="video-showcase-header">
        <div>
          <div className="vvt-pill">SHORT-FORM REELS &amp; MEDIA</div>
          <h2>Video Work &amp; Content Strategy</h2>
          <p style={{ maxWidth: 620, marginTop: '0.5rem' }}>
            Watch short-form video productions created for partner brands.
            Featuring viral fashion campaigns for <strong>House of Tamizhi</strong> and jewelry storytelling for <strong>JP Thangamaligai</strong>.
          </p>
        </div>

        <div className="video-header-links">
          <a
            href="https://www.instagram.com/houseoftamizhi?stkn=MXg0cGljNXZ6YmduZQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline brand-ig-badge"
          >
            <span className="ig-dot" /> @houseoftamizhi ↗
          </a>
          <a
            href="https://www.instagram.com/jpthangamaligai.tirupur/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline brand-ig-badge"
          >
            <span className="ig-dot" /> @jpthangamaligai.tirupur ↗
          </a>
        </div>
      </div>

      {/* Brand Filter Tabs */}
      <div className="video-filter-bar">
        <button
          type="button"
          className={`video-filter-btn ${selectedBrand === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedBrand('all')}
        >
          All Reels ({siteData.reels.length})
        </button>
        <button
          type="button"
          className={`video-filter-btn ${selectedBrand === 'tamizhi' ? 'active' : ''}`}
          onClick={() => setSelectedBrand('tamizhi')}
        >
          ✨ House of Tamizhi ({tamizhiCount})
        </button>
        <button
          type="button"
          className={`video-filter-btn ${selectedBrand === 'jp' ? 'active' : ''}`}
          onClick={() => setSelectedBrand('jp')}
        >
          💎 JP Thangamaligai ({jpCount})
        </button>
      </div>

      <VideoSlider reels={filteredReels} />
    </section>
  );
}
