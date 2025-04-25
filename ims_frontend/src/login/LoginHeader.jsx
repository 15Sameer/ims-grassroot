import React, { useState } from "react";
import "./Login.css"; // Changed import
import Grassroot from "../assets/images/Grassroot.png";
import { MapPin, Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";

function LoginHeader() {
  const [selectedLocation, setSelectedLocation] = useState(localStorage.getItem('selectedLocation') || "");
  const { theme, toggleTheme } = useTheme();

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    localStorage.setItem('selectedLocation', location);
  };

  return (
    <header className="header"> {/* Removed styles. prefix */}
      <img src={Grassroot} alt="Grassroot Projects logo" className="logo" /> {/* Removed styles. prefix */}

      <div className="locationWrapper"> {/* Removed styles. prefix */}
        <label className="label"> {/* Removed styles. prefix */}
          <MapPin size={16} color="red" className="icon" /> {/* Removed styles. prefix */}
          Location:
        </label>
        <button
          className={`locationButton ${selectedLocation === "Washington" ? "active" : ""}`} 
                    onClick={() => handleLocationSelect("Washington")}
        >
          Washington
        </button>
        <button
          className={`locationButton ${selectedLocation === "Indiana" ? "active" : ""}`}
          onClick={() => handleLocationSelect("Indiana")}
        >
          Indiana
        </button>
      </div>

      <div className="themeToggle"> {/* Removed styles. prefix */}
        <button onClick={toggleTheme} className="themeToggleBtn"> {/* Removed styles. prefix */}
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}

export default LoginHeader;