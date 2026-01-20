import "../styles/components/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        🌾 AgriRent © {new Date().getFullYear()} · Empowering Farmers
      </p>
    </footer>
  );
}

export default Footer;
