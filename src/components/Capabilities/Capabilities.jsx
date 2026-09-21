import { siteData } from '../../data/siteData';
import CapabilityRow from './CapabilityRow';
import './Capabilities.css';

export default function Capabilities() {
  return (
    <section
      className="vvt-container section-spacing"
      id="capabilities"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      <div>
        <div className="vvt-pill">OUR CAPABILITIES</div>
        <h2>One Partner. Complete Digital Solutions.</h2>
        <p style={{ maxWidth: 640, marginTop: '0.5rem' }}>
          Explore VVT's dedicated growth capabilities designed to take brands
          from initial listing to sustained revenue.
        </p>
      </div>

      <div className="capabilities-list">
        {siteData.capabilities.map((cap) => (
          <CapabilityRow key={cap.id} cap={cap} />
        ))}
      </div>
    </section>
  );
}
