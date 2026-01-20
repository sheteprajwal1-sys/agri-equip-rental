import "../styles/pages/AboutPage.css";

function AboutPage() {
  return (
    <div className="page-wrapper">
      <div className="about-container">

        {/* ABOUT CARD */}
        <div className="about-card">
          <h1 className="about-title">🌾 About Shete Krushi Seva</h1>

          <p className="about-subtitle">
            Making farm equipment affordable, accessible, and reliable for every farmer.
          </p>

          <p>
            <strong>🌾Shete Krushi Seva</strong> is a simple digital platform built specially
            for farmers who need agricultural equipment but cannot afford to buy
            costly machines.
          </p>

          <p>
            🌱 Instead of spending lakhs on tractors, rotavators, harvesters, or seeders,
            farmers can <strong>rent equipment only for the days they need</strong>.
          </p>

          <p>
            We connect <strong>verified equipment owners</strong> with farmers,
            ensuring fair pricing, transparent bookings, and dependable service.
          </p>

          <p className="about-highlight">
            🌱 Our goal is simple: reduce farming costs, increase productivity,
            and support rural communities through technology.
          </p>
        </div>

        {/* CONTACT CARD */}
        <div className="contact-card">
          <h2>📞 Contact Us</h2>

          <p>
            Need help with booking or have questions?
            We are always ready to support you.
          </p>

          <div className="contact-row">
            <span>📧 Email</span>
            <strong>shetekrushiseva@gmail.com</strong>
          </div>

          <div className="contact-row">
            <span>📱 Phone</span>
            <strong>+91 80102 52662</strong>
          </div>

          <div className="contact-row">
            <span>📍 Location</span>
            <strong>Kolhapur, Maharashtra, India</strong>
          </div>

          <p className="contact-note">
            Trusted by farmers • Verified owners • Transparent pricing
          </p>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;
