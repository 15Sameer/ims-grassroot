"use client";
import React, { useState } from "react";
import styles from "./InputDesign.module.css";
import Grassroot from "./Grassroot.png";

function LoginForm({ type, title, idLabel, buttonColor }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSlided, setIsSlided] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      
      if (!location) {
        alert("Please select a location before proceeding!");
        return;
      }
    
      // Proceed with form submission if location is selected
      alert("Form submitted successfully!");
    };
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSlide = () => {
    setIsSlided(!isSlided);
  };

  return (
    <div
      className={`${styles.flipContainer} ${isFlipped ? styles.flipped : ""} ${
        isSlided ? styles.slidded : ""
      } ${type === "volunteer" ? styles.volunteer : ""}`}
    >
      {/* Slide Card */}
      {(type === "volunteer" || isSlided) && (
        <section className={styles.slidecard}>
          {/* Floating Card Above Volunteer Form */}
          {!isSlided && (
            <div className={styles.floatingCard} onClick={handleSlide}>
              <img src={Grassroot} alt="Grassroot Logo" style={{ width: "200px", height: "auto" }}/>
              <button>Switch to admin</button>
            </div>
          )}
          {isSlided && (
            <div className={styles.floatingCard} onClick={handleSlide}>
              <img src={Grassroot} alt="Grassroot Logo" style={{ width: "200px", height: "auto" }}/>
              <button>Switch to Volunteer</button>
            </div>
          )}
        </section>
      )}

      {/* Login Form */}
      <section className={styles.formCard}>
        <h2 className={styles.formTitle}>{title}</h2>
        <div className={styles.divider} />
        <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor={`${type}-id`} className={styles.inputLabel}>
            {idLabel}
          </label>
          <input
            type="text"
            id={`${type}-id`}
            placeholder="Enter your Id"
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor={`${type}-password`} className={styles.passwordLabel}>
            Password
          </label>
          <input
            type="password"
            id={`${type}-password`}
            placeholder="Enter your password"
            required
            className={styles.inputField}
          />
        </div>

        {/* Volunteer Level Dropdown (Only for Volunteer Login) */}
        {type === "volunteer" && (
          <div className={styles.inputGroup}>
            <label htmlFor={`${type}-level`} className={styles.inputLabel}>
              Select Volunteer Level
            </label>
            <select id={`${type}-level`} className={styles.inputField} required>
              <option value="Level 1">Level 1 Volunteer</option>
              <option value="Level 2">Level 2 Volunteer</option>
              <option value="Level 3">Level 3 Volunteer</option>
            </select>
          </div>
        )}

        <div className={styles.checkboxContainer}>
          <a href="#">Forget password?</a>
          <input
            type="checkbox"
            id={`${type}-remember`}
            className={styles.checkbox}
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor={`${type}-remember`} className={styles.checkboxLabel}>
            Remember me
          </label>
        </div>

        <button type="submit" className={buttonColor}>Login</button>

        <p className={styles.registerText}>
          <span>Not registered?</span>
          <span className={styles.registerLink} onClick={handleFlip}>
            {" "}
            Click here
          </span>
        </p>
        </form>
      </section>

      {/* Register Form */}
      <section className={`${styles.formCard} ${isFlipped ? styles.compactPadding : ""}`}>
        <h2 className={styles.formTitle}>
          {type === "admin" ? "Admin Register" : "Volunteer Register"}
        </h2>
        <div className={styles.divider} />
        <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor={`${type}-name`} className={styles.inputLabel}>
            Full Name
          </label>
          <input
            type="text"
            id={`${type}-name`}
            placeholder="Enter your name"
            required
            className={styles.inputField}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor={`${type}-email`} className={styles.inputLabel}>
            Email
          </label>
          <input
            type="email"
            id={`${type}-email`}
            placeholder="Enter your email"
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor={`${type}-password`} className={styles.passwordLabel}>
            Password
          </label>
          <input
            type="password"
            id={`${type}-password`}
            placeholder="Enter your password"
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor={`${type}-confirm-password`} className={styles.passwordLabel}>
            Confirm Password
          </label>
          <input
            type="password"
            id={`${type}-confirm-password`}
            placeholder="Confirm your password"
            className={styles.inputField}
            required
          />
        </div>

        {type === "volunteer" && (
          <div className={styles.inputGroup}>
            <label htmlFor={`${type}-level`} className={styles.inputLabel}>
              Select Volunteer Level
            </label>
            <select id={`${type}-level`} className={styles.inputField} required>
              <option value="Level 1">Level 1 Volunteer</option>
              <option value="Level 2">Level 2 Volunteer</option>
              <option value="Level 3">Level 3 Volunteer</option>
            </select>
          </div>
        )}

        <button type="submit" className={buttonColor}>Register</button>

        <p className={styles.registerText}>
          <span>Already have an account?</span>
          <span className={styles.registerLink} onClick={handleFlip}>
            {" "}
            Login
          </span>
        </p>
        </form>
      </section>
    </div>
  );
}

export default LoginForm;