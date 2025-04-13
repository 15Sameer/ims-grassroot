"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import Grassroot from "../assets/images/Grassroot.png";

function LoginForm({ type, title, idLabel, buttonColor }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSlided, setIsSlided] = useState(false);
  const [loginMode, setLoginMode] = useState(type); 
  const navigate = useNavigate();
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("rememberedId");
    const storedPwd = localStorage.getItem("rememberedPwd");
    const typePrefix = `${type}-`;

    if (storedId && storedPwd) {
      document.getElementById(`${typePrefix}id`).value = storedId;
      document.getElementById(`${typePrefix}password`).value = storedPwd;
      setRememberMe(true);
    }
  }, [type]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = document.getElementById(`${type}-id`).value;
    const pwd = document.getElementById(`${type}-password`).value;

    if (!id || !pwd) {
      alert("Please fill all fields");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberedId", id);
      localStorage.setItem("rememberedPwd", pwd);
    } else {
      localStorage.removeItem("rememberedId");
      localStorage.removeItem("rememberedPwd");
    }

    if (type === "admin" && loginMode === "admin") navigate("/admin/dashboard");
    else if (type === "admin" && loginMode === "volunteer") {
      const level = document.getElementById(`${type}-level`)?.value;
      if (level === "Level 1") navigate("/volunteer1");
      else if (level === "Level 2") navigate("/volunteer2");
      else if (level === "Level 3") navigate("/volunteer3");
      else if (level === "Level 4") navigate("/volunteer4");
      else if (level === "Level 5") navigate("/special-volunteer");
    } else if (type === "volunteer") {
      const level = document.getElementById(`${type}-level`)?.value;
      if (level === "Level 1") navigate("/volunteer1");
      else if (level === "Level 2") navigate("/volunteer2");
      else if (level === "Level 3") navigate("/volunteer3");
      else if (level === "Level 4") navigate("/volunteer4");
      else if (level === "Level 5") navigate("/special-volunteer");
    }
  };

  const handleLoginModeChange = (mode) => setLoginMode(mode);
  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleRememberMeChange = () => setRememberMe(!rememberMe);
  const handleSlide = () => setIsSlided(!isSlided);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setShowRegisterModal(true);
  };

  return (
    <div className={`${styles.flipContainer} ${isFlipped ? styles.flipped : ""} ${isSlided ? styles.slidded : ""} ${type === "volunteer" ? styles.volunteer : ""}`}>
      {/* Slide Card - Only for Volunteer */}
      {(type === "volunteer" || isSlided) && (
        <section className={styles.slidecard}>
          <div className={styles.floatingCard} onClick={handleSlide}>
            <img src={Grassroot} alt="Grassroot Logo" style={{ width: "200px", height: "auto" }} />
            <button>{isSlided ? "Switch to Admin" : "Switch to Volunteer"}</button>
          </div>
        </section>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Forgot Password</h3>
            <p>Enter your email and we'll send a reset link.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.inputField}
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setShowForgotModal(false)}>Cancel</button>
              <button className={styles.btnConfirm} onClick={() => {
                alert("Reset link sent to " + forgotEmail);
                setShowForgotModal(false);
              }}>Send Link</button>
            </div>
          </div>
        </div>
      )}

      {/* Register Success Modal */}
      {showRegisterModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Registration Successful 🎉</h3>
            <p>Your account has been created. You can now login.</p>
            <button className={styles.btnConfirm} onClick={() => {
              setShowRegisterModal(false);
              setIsFlipped(false);
            }}>
              Go to Login
            </button>
          </div>
        </div>
      )}

      {/* Login Form */}
      <section className={styles.formCard}>
        <h2 className={styles.formTitle}>{title}</h2>
        <div className={styles.divider} />

        {type === "admin" && (
          <div className={styles.loginModeToggle}>
            <button className={`${styles.modeButton} ${loginMode === 'admin' ? styles.activeMode : ''}`} onClick={() => handleLoginModeChange('admin')}>Login as Admin</button>
            <button className={`${styles.modeButton} ${loginMode === 'volunteer' ? styles.activeMode : ''}`} onClick={() => handleLoginModeChange('volunteer')}>Login as Volunteer</button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor={`${type}-id`} className={styles.inputLabel}>{idLabel}</label>
            <input type="text" id={`${type}-id`} placeholder="Enter your Id" className={styles.inputField} />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={`${type}-password`} className={styles.passwordLabel}>Password</label>
            <input type="password" id={`${type}-password`} placeholder="Enter your password" className={styles.inputField} />
          </div>

          {(type === "volunteer" || loginMode === "volunteer") && (
            <div className={styles.inputGroup}>
              <label htmlFor={`${type}-level`} className={styles.inputLabel}>Select Volunteer Level</label>
              <select id={`${type}-level`} className={styles.inputField} required>
                <option value="Level 1">Level 1 Volunteer</option>
                <option value="Level 2">Level 2 Volunteer</option>
                <option value="Level 3">Level 3 Volunteer</option>
                <option value="Level 4">Level 4 Volunteer</option>
                <option value="Level 5">Level 5 Volunteer</option>
              </select>
            </div>
          )}

          <div className={styles.checkboxContainer}>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowForgotModal(true); }}>Forget password?</a>
            <input type="checkbox" id={`${type}-remember`} className={styles.checkbox} checked={rememberMe} onChange={handleRememberMeChange} />
            <label htmlFor={`${type}-remember`} className={styles.checkboxLabel}>Remember me</label>
          </div>

          <button type="submit" className={buttonColor}>Login</button>

          <p className={styles.registerText}>
            <span>Not registered?</span>
            <span className={styles.registerLink} onClick={handleFlip}> Click here</span>
          </p>
        </form>
      </section>

      {/* Register Form */}
      <section className={`${styles.formCard} ${isFlipped ? styles.compactPadding : ""}`}>
        <h2 className={styles.formTitle}>{type === "admin" ? "Admin Register" : "Volunteer Register"}</h2>
        <div className={styles.divider} />
        <form onSubmit={handleRegisterSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor={`${type}-name`} className={styles.inputLabel}>Full Name</label>
            <input type="text" id={`${type}-name`} placeholder="Enter your name" className={styles.inputField} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={`${type}-email`} className={styles.inputLabel}>Email</label>
            <input type="email" id={`${type}-email`} placeholder="Enter your email" className={styles.inputField} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={`${type}-password`} className={styles.passwordLabel}>Password</label>
            <input type="password" id={`${type}-password`} placeholder="Enter your password" className={styles.inputField} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor={`${type}-confirm-password`} className={styles.passwordLabel}>Confirm Password</label>
            <input type="password" id={`${type}-confirm-password`} placeholder="Confirm your password" className={styles.inputField} required />
          </div>

          {type === "volunteer" && (
            <div className={styles.inputGroup}>
              <label htmlFor={`${type}-level`} className={styles.inputLabel}>Select Volunteer Level</label>
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
            <span className={styles.registerLink} onClick={handleFlip}> Login</span>
          </p>
        </form>
      </section>
    </div>
  );
}

export default LoginForm;
