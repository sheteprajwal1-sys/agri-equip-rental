import "../styles/components/Navbar.css";

function Navbar({ setCurrentPage, currentPage, isLoggedIn, user, setIsLoggedIn }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
    setCurrentPage("home");
  };

  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className="navbar">
      
      <div
        className="navbar-brand"
        onClick={() => setCurrentPage("home")}
      >
        🌾🚜 SHETE KRUSHI SEVA
      </div>

      <div className="navbar-links">
        <button
          className={currentPage === "home" ? "active" : ""}
          onClick={() => setCurrentPage("home")}
        >
          Home
        </button>

        {isLoggedIn && isAdmin && (
          <>
            <button
              className={currentPage === "admin" ? "active" : ""}
              onClick={() => setCurrentPage("admin")}
            >
              Dashboard
            </button>

            <button
              className={currentPage === "owner-equipment" ? "active" : ""}
              onClick={() => setCurrentPage("owner-equipment")}
            >
              Manage Equipment
            </button>

            <button
              className={currentPage === "owner-rentals" ? "active" : ""}
              onClick={() => setCurrentPage("owner-rentals")}
            >
              Owner Rentals
            </button>
          </>
        )}

        {isLoggedIn && !isAdmin && (
          <>
            <button
              className={currentPage === "equipment" ? "active" : ""}
              onClick={() => setCurrentPage("equipment")}
            >
              Equipment
            </button>

            <button
              className={currentPage === "my-rentals" ? "active" : ""}
              onClick={() => setCurrentPage("my-rentals")}
            >
              My Rentals
            </button>

            <button
              className={currentPage === "about" ? "active" : ""}
              onClick={() => setCurrentPage("about")}
            >
              About
            </button>

            <button
              className={currentPage === "profile" ? "active" : ""}
              onClick={() => setCurrentPage("profile")}
            >
              Profile
            </button>
          </>
        )}

        {isLoggedIn ? (
          <button className="logout" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <button onClick={() => setCurrentPage("login")}>Login</button>
            <button onClick={() => setCurrentPage("register")}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
