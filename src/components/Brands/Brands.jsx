import { siteData } from '../../data/siteData';
import BrandCard from './BrandCard';
import './Brands.css';

export default function Brands() {
  return (
    <section
      className="vvt-container section-spacing"
      id="brands"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      <div>
        <div className="vvt-pill">PARTNER BRANDS</div>
        <h2>Brands We Work With</h2>
        <p style={{ maxWidth: 640, marginTop: '0.5rem' }}>
          Take a look at the partner apparel and jewelry brands whose
          marketplace presence, Shopify storefronts, and video storytelling we
          support.
        </p>
      </div>

      <div className="brands-grid">
        {siteData.partnerBrands.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </div>
    </section>
  );
}
