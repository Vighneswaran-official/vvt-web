import { siteData } from '../../data/siteData';
import './Approach.css';

export default function Approach() {
  return (
    <section
      className="vvt-container section-spacing"
      id="approach"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      <div className="approach-wrapper">
        <div className="vvt-pill vvt-pill-dark">OUR APPROACH</div>
        <h2 style={{ color: '#ffffff', marginTop: '0.5rem', marginBottom: '1rem' }}>
          Integrated Growth Strategy. Zero Fragmented Agencies.
        </h2>
        <p style={{ color: 'var(--text-silver)', maxWidth: 680, marginBottom: '2.5rem' }}>
          Instead of hiring separate freelancers or siloed agencies for
          marketplace ads, video shoots, Shopify stores, and listings, VVT
          coordinates everything through one dedicated team.
        </p>

        <div className="approach-steps-grid">
          {siteData.approachSteps.map((step) => (
            <div className="approach-step" key={step.num}>
              <div className="approach-step-title">
                {step.num}. {step.title}
              </div>
              <p className="approach-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
