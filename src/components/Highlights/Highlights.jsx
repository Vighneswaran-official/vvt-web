import { siteData } from '../../data/siteData';
import './Highlights.css';

export default function Highlights() {
  return (
    <section className="vvt-container">
      <div className="startup-values-grid">
        {siteData.highlights.map((h) => (
          <div className="startup-value-card" key={h.title}>
            <div className="startup-value-title">◆ {h.title}</div>
            <div className="startup-value-desc">{h.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
