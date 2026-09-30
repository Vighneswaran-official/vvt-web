import { useEffect } from 'react';
import { siteData } from '../../data/siteData';
import './MobileDrawer.css';

export default function MobileDrawer({ isOpen, onClose }) {
  // Lock body scroll when mobile drawer is open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`mobile-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        id="mobile-drawer"
        className={`mobile-drawer ${isOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-links">
          {siteData.navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={onClose} className="mobile-nav-link">
              <span>{link.name}</span>
              <span className="mobile-nav-arrow">→</span>
            </a>
          ))}
        </div>

        <div className="mobile-drawer-cta-group">
          <a
            href="#contact"
            className="btn-black"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={onClose}
          >
            START A PROJECT →
          </a>

          <div className="mobile-drawer-contact-grid">
            <a
              href={siteData.agencyInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-contact-pill wa"
            >
              💬 WhatsApp (+91 89250 73448)
            </a>
            <a
              href={siteData.agencyInfo.emailHref}
              className="mobile-contact-pill mail"
            >
              ✉️ {siteData.agencyInfo.email}
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
