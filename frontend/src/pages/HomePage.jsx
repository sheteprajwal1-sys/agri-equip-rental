import "../styles/pages/HomePage.css";

function HomePage({ setCurrentPage }) {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">

        {/* BACKGROUND SLIDES */}
        <div className="hero-slide slide1"></div>
        <div className="hero-slide slide2"></div>
        <div className="hero-slide slide3"></div>
        <div className="hero-slide slide4"></div>
        <div className="hero-slide slide5"></div>

        {/* CONTENT */}
        <div className="hero-overlay">
          <h1>SHETE KRUSHI SEVA</h1>
          <p>
            A simple, affordable platform connecting farmers and equipment owners.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => setCurrentPage("equipment")}
            >
              Browse Equipment
            </button>

            <button
              className="secondary-btn"
              onClick={() => setCurrentPage("login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      
      {/* POPULAR EQUIPMENT */}
      <section className="popular-section">
        <h2>🌾 Popular Equipment</h2>

        <div className="popular-grid">
          <div className="popular-card" onClick={() => setCurrentPage("equipment")}>
            <span className="emoji">🚜</span>
            <h3>Tractor</h3>
            <p>Best for ploughing, hauling and heavy farm work.</p>
          </div>

          <div className="popular-card" onClick={() => setCurrentPage("equipment")}>
            <span className="emoji">🌱</span>
            <h3>Seeder</h3>
            <p>Efficient and uniform seed sowing.</p>
          </div>

          <div className="popular-card" onClick={() => setCurrentPage("equipment")}>
            <span className="emoji">🌾</span>
            <h3>Harvester</h3>
            <p>Fast and reliable harvesting solution.</p>
          </div>

          <div className="popular-card" onClick={() => setCurrentPage("equipment")}>
            <span className="emoji">🛠</span>
            <h3>Rotavator</h3>
            <p>Perfect for soil preparation.</p>
          </div>
        </div>
      </section>

     
      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <h2>⚙️ How It Works</h2>

        <div className="steps">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Browse Equipment</h3>
            <p>Explore available farm equipment posted by verified owners.</p>
          </div>

          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Book for Required Days</h3>
            <p>Choose dates, check availability, and confirm your booking.</p>
          </div>

          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Use & Return Easily</h3>
            <p>Use the equipment and return it once your work is done.</p>
          </div>
        </div>
      </section>

      
      {/* TRUSTED BY FARMERS */}
      <section className="testimonials">
        <h2>🌾 Trusted by Farmers</h2>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              “This platform helped me rent a tractor during harvest season
              without spending huge money.”
            </p>
            <span>- Farmer, Maharashtra</span>
          </div>

          <div className="testimonial-card">
            <p>
              “Booking equipment is very easy and owners are verified.
              Highly recommended for small farmers.”
            </p>
            <span>- Small Farm Owner</span>
          </div>

          <div className="testimonial-card">
            <p>
              “I earned extra income by renting my unused equipment.
              Simple and reliable system.”
            </p>
            <span>- Equipment Owner</span>
          </div>
        </div>
      </section>

      
      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Shete Krushi Seva</h3>
          <p>
            Connecting farmers and equipment owners with affordable,
            reliable rental solutions.
          </p>

          <div className="footer-links">
            <span>© 2026 Shete Krushi Seva</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
