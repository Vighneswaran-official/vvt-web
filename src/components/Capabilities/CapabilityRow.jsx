export default function CapabilityRow({ cap }) {
  return (
    <div className="capability-card-row">
      <div className="cap-index">{cap.id}</div>
      <div className="cap-heading-block">
        <h4>{cap.name}</h4>
        <h3>{cap.title}</h3>
      </div>
      <div className="cap-desc-block">
        <p>{cap.desc}</p>
      </div>
      <div className="cap-pills-wrap">
        {cap.pills.map((pill) => (
          <span className="cap-tag-badge" key={pill}>{pill}</span>
        ))}
      </div>
    </div>
  );
}
