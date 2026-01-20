import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import EquipmentPage from "./pages/EquipmentPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";

import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerEquipmentPage from "./pages/OwnerEquipmentPage";
import OwnerRentalsPage from "./pages/OwnerRentalsPage";

import MyRentals from "./pages/MyRentals";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  //restore login on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  //UI ROUTE GUARD
  useEffect(() => {
    if (!isLoggedIn) {
      if (
        [
          "equipment",
          "my-rentals",
          "admin",
          "owner-equipment",
          "owner-rentals",
          "profile",
        ].includes(currentPage)
      ) {
        setCurrentPage("home");
      }
      return;
    }

    if (user?.role === "ADMIN") {
      if (["equipment", "my-rentals"].includes(currentPage)) {
        setCurrentPage("home");
      }
    }

    if (user?.role === "USER") {
      if (
        ["admin", "owner-equipment", "owner-rentals"].includes(currentPage)
      ) {
        setCurrentPage("home");
      }
    }
  }, [currentPage, isLoggedIn, user]);

  return (
    <>
      <Navbar
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        user={user}
      />

      {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}

      {/* FARMER */}
      {currentPage === "equipment" && <EquipmentPage />}
      {currentPage === "my-rentals" && <MyRentals />}
      {currentPage === "profile" && <ProfilePage user={user} />}

      {/* OWNER */}
      {currentPage === "admin" && <OwnerDashboard />}
      {currentPage === "owner-equipment" && <OwnerEquipmentPage />}
      {currentPage === "owner-rentals" && <OwnerRentalsPage />}

      {/* AUTH */}
      {currentPage === "login" && (
        <LoginPage
          setIsLoggedIn={setIsLoggedIn}
          setCurrentPage={setCurrentPage}
          setUser={setUser}
        />
      )}

      {currentPage === "register" && (
        <RegisterPage setCurrentPage={setCurrentPage} />
      )}

      {/* INFO */}
      {currentPage === "about" && <AboutPage />}
    </>
  );
}

export default App;
