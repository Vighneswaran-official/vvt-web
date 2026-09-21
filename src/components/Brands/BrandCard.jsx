export default function BrandCard({ brand }) {
  return (
    <div className="brand-card">
      <div>
        <div className="brand-card-header">
          <img
            src={brand.logo}
            alt={`${brand.name} Logo`}
            className="brand-inline-logo"
          />
          <div className="brand-title-block">
            <h3>{brand.name}</h3>
            <div className="brand-tagline-text">{brand.tagline}</div>
          </div>
        </div>
        <p className="brand-desc-text">{brand.desc}</p>
      </div>

      <div className="brand-links-wrap">
        {brand.platforms.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="brand-platform-btn"
          >
            {p.name} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
