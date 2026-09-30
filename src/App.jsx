import { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import MobileDrawer from './components/MobileDrawer/MobileDrawer';
import Hero from './components/Hero/Hero';
import Highlights from './components/Highlights/Highlights';
import Brands from './components/Brands/Brands';
import VideoShowcase from './components/VideoShowcase/VideoShowcase';
import Capabilities from './components/Capabilities/Capabilities';
import Approach from './components/Approach/Approach';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import MobileQuickBar from './components/MobileQuickBar/MobileQuickBar';

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <div className="subtle-grid-bg">
      <Header onToggleMobile={toggleMobile} isMobileOpen={mobileOpen} />
      <MobileDrawer isOpen={mobileOpen} onClose={closeMobile} />

      <main id="main-content">
        <Hero />
        <Highlights />
        <Brands />
        <VideoShowcase />
        <Capabilities />
        <Approach />
        <Contact />
      </main>

      <Footer />
      <MobileQuickBar />
    </div>
  );
}
