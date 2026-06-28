import "./TrustBar.css";

function TrustBar() {
  return (
    <section className="trust-bar">

      <div className="trust-item">
        <span>🧪</span>
        <h3>Lab Tested</h3>
        <p>Quality assured for purity.</p>
      </div>

      <div className="trust-item">
        <span>🍯</span>
        <h3>100% Pure</h3>
        <p>No artificial additives.</p>
      </div>

      <div className="trust-item">
        <span>🌿</span>
        <h3>No Added Sugar</h3>
        <p>Just natural honey.</p>
      </div>

      <div className="trust-item">
        <span>🐝</span>
        <h3>Hive to Home</h3>
        <p>Packed with care to preserve natural goodness.</p>
      </div>

    </section>
  );
}

export default TrustBar;
