import { siteData } from '../../data/siteData';
import './MobileQuickBar.css';

export default function MobileQuickBar() {
  return (
    <div className="mobile-quick-bar" aria-label="Quick mobile contact actions">
      <div className="mobile-quick-inner">
        <a
          href={siteData.agencyInfo.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="quick-btn quick-wa"
          aria-label="Direct WhatsApp chat with Vogue Ventures Technologies"
        >
          <span className="quick-icon">💬</span>
          <span>WhatsApp</span>
        </a>

        <a
          href={siteData.agencyInfo.phoneHref}
          className="quick-btn quick-call"
          aria-label="Direct Call to Vogue Ventures Technologies"
        >
          <span className="quick-icon">📞</span>
          <span>Call Us</span>
        </a>

        <a
          href="#contact"
          className="quick-btn quick-inquire"
          aria-label="Inquire or request a proposal"
        >
          <span className="quick-icon">⚡</span>
          <span>Get Proposal</span>
        </a>
      </div>
    </div>
  );
}
