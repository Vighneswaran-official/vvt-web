import { siteData } from '../../data/siteData';
import VideoSlider from './VideoSlider';
import './VideoShowcase.css';

export default function VideoShowcase() {
  return (
    <section
      className="vvt-container section-spacing"
      id="videos"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="vvt-pill">SHORT-FORM REELS &amp; MEDIA</div>
          <h2>Video Work &amp; Content Strategy</h2>
          <p style={{ maxWidth: 620, marginTop: '0.5rem' }}>
            Watch short-form video productions created for partner brands.
            Slide through our featured reels below.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="https://www.instagram.com/jpthangamaligai.tirupur/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ fontSize: '0.75rem', padding: '0.55rem 1rem' }}
          >
            @jpthangamaligai.tirupur ↗
          </a>
        </div>
      </div>

      <VideoSlider reels={siteData.reels} />
    </section>
  );
}
