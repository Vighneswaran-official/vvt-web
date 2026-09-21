import { siteData } from '../../data/siteData';
import './Header.css';

export default function Header({ onToggleMobile }) {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <a href="#/" className="brand-wrap">
          <img
            src="/assets/vvt-logo.png"
            alt="Vogue Ventures Technologies"
            className="brand-logo-img"
          />
          <span className="brand-name-full">VOGUE VENTURES TECHNOLOGIES</span>
        </a>

        <nav aria-label="Main Navigation">
          <ul className="nav-links-list">
            {siteData.navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link-item">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-right">
          <a
            href="#contact"
            className="btn-black btn-header-cta"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.78rem' }}
          >
            LET'S BUILD →
          </a>
          <button
            className="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
            onClick={onToggleMobile}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
