import React, { useState } from "react";
import styles from "./Login.module.css";
import Grassroot from "../assets/images/Grassroot.png";
import { MapPin } from "lucide-react";

function LoginHeader({ setLocation }) {
  const [selectedLocation, setSelectedLocation] = useState(""); // Track selected location

  const handleLocationSelect = (location) => {
    setSelectedLocation(location); // Update state
    setLocation(location); // Send to LoginForm
  };

  return (
    <header>
      <img src={Grassroot} alt="Grassroot Projects logo" className={styles.logo} />

      <div className={styles.locationWrapper}>
        <label className={styles.label}>
          <MapPin size={16} color="red" className={styles.icon} /> Location:
        </label>

        {/* Washington Button */}
        <button 
          className={`${styles.locationButton} ${selectedLocation === "Washington" ? styles.active : ""}`}
          onClick={() => handleLocationSelect("Washington")}
        >
          Washington
        </button>

        {/* Indiana Button */}
        <button 
          className={`${styles.locationButton} ${selectedLocation === "Indiana" ? styles.active : ""}`}
          onClick={() => handleLocationSelect("Indiana")}
        >
          Indiana
        </button>
      </div>

      <h1 className={styles.title}>Welcome to Inventory Management System</h1>
    </header>
  );
}

export default LoginHeader;
