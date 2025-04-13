// src/login/LoginHeader.jsx
import React, { useState } from "react";
import styles from "./LoginPage.module.css";
import Grassroot from "../assets/images/Grassroot.png";
import { MapPin, Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";

function LoginHeader() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <header className={styles.header}>
      <img src={Grassroot} alt="Grassroot Projects logo" className={styles.logo} />

      {/* Location Selector */}
      <div className={styles.locationWrapper}>
        <label className={styles.label}>
          <MapPin size={16} color="red" className={styles.icon} /> Location:
        </label>
        <button
          className={`${styles.locationButton} ${selectedLocation === "Washington" ? styles.active : ""}`}
          onClick={() => handleLocationSelect("Washington")}
        >
          Washington
        </button>
        <button
          className={`${styles.locationButton} ${selectedLocation === "Indiana" ? styles.active : ""}`}
          onClick={() => handleLocationSelect("Indiana")}
        >
          Indiana
        </button>
      </div>

      {/* Global Theme Toggle */}
      <div className={styles.themeToggle}>
        <button onClick={toggleTheme} className={styles.themeToggleBtn}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}

export default LoginHeader;
