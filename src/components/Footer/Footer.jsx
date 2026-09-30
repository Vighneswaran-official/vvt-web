import { siteData } from '../../data/siteData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="vvt-container">
        <div className="footer-inner-grid">
          {/* Brand Column */}
          <div>
            <a
              href="#/"
              className="brand-wrap"
              style={{ color: '#ffffff', marginBottom: '1rem' }}
            >
              <img
                src="/assets/vvt-logo.png"
                alt="Vogue Ventures Technologies"
                className="brand-logo-img"
                style={{ background: '#000', borderColor: 'rgba(255,255,255,0.2)' }}
              />
              <div className="brand-text-block">
                <span className="brand-name-primary" style={{ color: '#ffffff' }}>
                  VOGUE VENTURES
                </span>
                <span className="brand-name-sub" style={{ color: 'var(--text-silver)' }}>
                  TECHNOLOGIES
                </span>
              </div>
            </a>
            <div className="footer-quote">
              {siteData.agencyInfo.quote}
            </div>
            <p className="footer-bio">
              Vogue Ventures Technologies is a digital growth and creative
              technology partner helping brands build, manage and grow their
              presence across e-commerce marketplaces, Shopify, Meta
              advertising, content creation and website development.
            </p>
          </div>

          {/* Capabilities Column */}
          <div>
            <div className="footer-col-title">Growth Capabilities</div>
            <ul className="footer-links-col">
              <li><a href="#capabilities" className="footer-link-text">E-Commerce Marketplaces</a></li>
              <li><a href="#capabilities" className="footer-link-text">Shopify D2C Storefronts</a></li>
              <li><a href="#capabilities" className="footer-link-text">Meta Advertising</a></li>
              <li><a href="#videos" className="footer-link-text">Content &amp; Short-form Video</a></li>
              <li><a href="#capabilities" className="footer-link-text">Website Development</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <div className="footer-col-title">Direct Contact</div>
            <ul className="footer-links-col">
              <li>
                <a
                  href={siteData.agencyInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-text"
                  style={{ color: '#ffffff', fontWeight: 700 }}
                >
                  WhatsApp: {siteData.agencyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteData.agencyInfo.emailHref}
                  className="footer-link-text"
                  style={{ color: '#d1d1d6' }}
                >
                  {siteData.agencyInfo.email}
                </a>
              </li>
              <li>
                <span className="footer-link-text" style={{ cursor: 'default' }}>
                  {siteData.agencyInfo.location}
                </span>
              </li>
              <li>
                <span className="footer-link-text" style={{ cursor: 'default' }}>
                  Agile Brand Partnership
                </span>
              </li>
              <li>
                <a href="#contact" className="footer-link-text">
                  Initiate Discussion →
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>© 2026 Vogue Ventures Technologies. All Rights Reserved.</div>
          <div>Digital Growth Partner &amp; Creative Tech</div>
        </div>
      </div>
    </footer>
  );
}
