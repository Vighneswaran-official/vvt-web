import { siteData } from '../../data/siteData';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import './Contact.css';

export default function Contact() {
  const { feedback, handleSubmit } = useFormSubmit();

  return (
    <section
      className="vvt-container section-spacing"
      id="contact"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      <div>
        <div className="vvt-pill">INITIATE PARTNERSHIP</div>
        <h2>Let's Talk About Your Brand</h2>
        <p style={{ maxWidth: 640, marginTop: '0.5rem' }}>
          Whether you need marketplace management, a Shopify store, Meta ads,
          video content, or a custom website — we are here to help your brand
          grow.
        </p>
      </div>

      <div className="contact-section-grid">
        {/* Left: Info Panel */}
        <div className="contact-info-panel">
          <div className="vvt-pill vvt-pill-dark">● Vogue Ventures Technologies</div>
          <div className="contact-tagline-quote">
            {siteData.agencyInfo.quote}
          </div>
          <p style={{ color: 'var(--text-silver)', fontSize: '0.92rem', lineHeight: 1.6 }}>
            We operate as an agile partner for growing brands. Reach out
            directly to discuss your requirements or request an exploratory
            audit.
          </p>

          <div className="contact-direct-items">
            <div>
              <div className="contact-direct-label">Phone &amp; WhatsApp</div>
              <a
                href={siteData.agencyInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-direct-val"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                {siteData.agencyInfo.phone}
              </a>
            </div>
            <div>
              <div className="contact-direct-label">Direct Email</div>
              <a
                href={siteData.agencyInfo.emailHref}
                className="contact-direct-val"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                {siteData.agencyInfo.email}
              </a>
            </div>
            <div>
              <div className="contact-direct-label">Location</div>
              <div className="contact-direct-val">{siteData.agencyInfo.location}</div>
            </div>
            <div>
              <div className="contact-direct-label">Focus Areas</div>
              <div className="contact-direct-val">
                Amazon, Flipkart, Shopify, Meta Ads, AI Video &amp; Reels
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form-panel">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">Your Name *</label>
                <input type="text" id="contact-name" name="name" className="form-input" placeholder="e.g. Rahul Sharma" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-brand" className="form-label">Company / Brand *</label>
                <input type="text" id="contact-brand" name="brand" className="form-input" placeholder="e.g. Manlino Apparel" required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="contact-email" className="form-label">Email Address *</label>
                <input type="email" id="contact-email" name="email" className="form-input" placeholder="name@company.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="contact-phone" className="form-label">Phone Number *</label>
                <input type="tel" id="contact-phone" name="phone" className="form-input" placeholder="+91 98765 43210" required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-service" className="form-label">What do you need help with? *</label>
              <select id="contact-service" name="service" className="form-select">
                {siteData.serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">Your Message / Requirements *</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                placeholder="Tell us about your brand, products or requirements..."
                required
              />
            </div>

            <button type="submit" className="btn-black" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}>
              SEND ENQUIRY →
            </button>

            {feedback && (
              <div className="form-status-alert success">
                <strong>Enquiry Sent Successfully!</strong><br />
                Thank you, {feedback.name} ({feedback.brand}). Your inquiry regarding{' '}
                <em>{feedback.service}</em> has been initiated to Vogue Ventures Technologies via WhatsApp and Email.
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                  <a
                    href={feedback.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-black"
                    style={{
                      fontSize: '0.78rem',
                      padding: '0.5rem 0.9rem',
                      backgroundColor: '#25D366',
                      borderColor: '#25D366',
                      color: '#ffffff',
                      textDecoration: 'none',
                    }}
                  >
                    💬 Chat on WhatsApp (+91 89250 73448)
                  </a>
                  <a
                    href={feedback.mailUrl}
                    className="btn-outline"
                    style={{
                      fontSize: '0.78rem',
                      padding: '0.5rem 0.9rem',
                      textDecoration: 'none',
                    }}
                  >
                    ✉️ Open Email Draft
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
