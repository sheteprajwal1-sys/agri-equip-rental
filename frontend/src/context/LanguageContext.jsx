import { createContext, useContext, useState } from "react";

// 1️⃣ Create context
const LanguageContext = createContext();

// 2️⃣ Language provider
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en"); // en | mr

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "mr" : "en"));
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// 3️⃣ Custom hook (easy usage)
export function useLanguage() {
  return useContext(LanguageContext);
}
