import React, { useState } from "react";
import styles from "./InputDesign.module.css";
import Grassroot from "./Grassroot.png";
import { MapPin } from "lucide-react";

function LoginHeader() {
  const [selectedLocation, setSelectedLocation] = useState(""); // ✅ Fix: Define selectedLocation state

  const handleLocationSelect = (location) => {
    setSelectedLocation(location); // ✅ Fix: Update selected location
  };

  return (
    <header className={styles.header}>
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
    </header>
  );
}

export default LoginHeader;
