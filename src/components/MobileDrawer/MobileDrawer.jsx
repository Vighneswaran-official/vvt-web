import { useEffect } from 'react';
import { siteData } from '../../data/siteData';
import './MobileDrawer.css';

export default function MobileDrawer({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <nav
      id="mobile-drawer"
      className={`mobile-drawer ${isOpen ? 'open' : ''}`}
      aria-label="Mobile Navigation"
    >
      {siteData.navLinks.map((link) => (
        <a key={link.href} href={link.href} onClick={onClose}>
          {link.name}
        </a>
      ))}
      <a
        href="#contact"
        className="btn-black"
        style={{ marginTop: '1rem', textAlign: 'center' }}
        onClick={onClose}
      >
        LET'S BUILD →
      </a>
    </nav>
  );
}
