import "../styles/pages/ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-page">
      <h2 className="contact-title">📞 Contact Us</h2>

      <p className="contact-subtitle">
        We are here to support farmers and equipment owners.
        Feel free to reach out anytime.
      </p>

      <div className="contact-cards">
        <div className="contact-card">
          <h3>📍 Address</h3>
          <p>Rural Agriculture Support Center</p>
          <p>Maharashtra, India</p>
        </div>

        <div className="contact-card">
          <h3>📧 Email</h3>
          <p>support@agriequip.com</p>
        </div>

        <div className="contact-card">
          <h3>📱 Phone</h3>
          <p>+91 98765 43210</p>
        </div>
      </div>

      <div className="contact-footer-note">
        🌾 Our mission is to make farming equipment accessible and affordable
        for every farmer.
      </div>
    </div>
  );
}

export default ContactPage;
