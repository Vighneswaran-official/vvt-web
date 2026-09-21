import { siteData } from '../../data/siteData';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import './Hero.css';

export default function Hero() {
  const { feedback, handleSubmit } = useFormSubmit();

  return (
    <section className="vvt-container hero-wrapper" id="hero">
      <div className="hero-grid">
        {/* Left: Copy */}
        <div>
          <div className="vvt-pill">
            <span className="vvt-dot vvt-dot-pulse" />
            DIGITAL GROWTH PARTNER &amp; CREATIVE TECH
          </div>
          <h1>We Build Digital Presence That Moves Brands Forward.</h1>
          <p className="hero-subheadline">
            From marketplaces and Shopify stores to advertising, content and
            websites — VVT brings strategy, creativity and technology together
            to help brands grow.
          </p>

          <div className="hero-cta-wrap">
            <a href="#capabilities" className="btn-black">EXPLORE CAPABILITIES ↓</a>
            <a href="#contact" className="btn-outline">WORK WITH VVT →</a>
          </div>

          <div className="hero-focus-pills">
            <span className="hero-focus-label">CORE FOCUS:</span>
            <a href="#capabilities" className="vvt-pill" style={{ marginBottom: 0, textDecoration: 'none' }}>Marketplaces</a>
            <a href="#capabilities" className="vvt-pill" style={{ marginBottom: 0, textDecoration: 'none' }}>Shopify D2C</a>
            <a href="#capabilities" className="vvt-pill" style={{ marginBottom: 0, textDecoration: 'none' }}>Meta Ads</a>
            <a href="#videos" className="vvt-pill" style={{ marginBottom: 0, textDecoration: 'none' }}>Video Reels</a>
          </div>
        </div>

        {/* Right: Lead Capture Card */}
        <div className="startup-lead-card">
          <h2 className="lead-card-heading">Start a Conversation</h2>
          <p className="lead-card-sub">Direct strategy discussion with our core partners</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="hero-name" className="form-label">Your Name *</label>
              <input type="text" id="hero-name" name="name" className="form-input" placeholder="e.g. Rahul Sharma" required />
            </div>

            <div className="form-group">
              <label htmlFor="hero-brand" className="form-label">Company / Brand *</label>
              <input type="text" id="hero-brand" name="brand" className="form-input" placeholder="e.g. Benny Brooks" required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="hero-email" className="form-label">Email *</label>
                <input type="email" id="hero-email" name="email" className="form-input" placeholder="name@brand.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="hero-phone" className="form-label">Phone *</label>
                <input type="tel" id="hero-phone" name="phone" className="form-input" placeholder="+91 98765 43210" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="hero-service" className="form-label">What do you need help with? *</label>
              <select id="hero-service" name="service" className="form-select">
                {siteData.serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn-black" style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}>
              SUBMIT INQUIRY →
            </button>

            {feedback && (
              <div className="form-status-alert success">
                <strong>Thank you, {feedback.name}!</strong><br />
                Your inquiry for <strong>{feedback.brand}</strong> regarding{' '}
                <em>{feedback.service}</em> has been received. Our team will
                contact you at <strong>{feedback.email}</strong> shortly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
