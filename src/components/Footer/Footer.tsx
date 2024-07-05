import "./Footer.css";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="links">
        <div className="links-label">Links</div>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
      <div className="runefall">
        <h2>RUNEFALL</h2>
        <div>a powerful Legends of Runeterra card search</div>
      </div>
    </footer>
  );
}
