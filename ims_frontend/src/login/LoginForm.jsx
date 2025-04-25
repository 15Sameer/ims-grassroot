"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
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
    <div className={`flipContainer ${isFlipped ? "flipped" : ""} ${isSlided ? "slidded" : ""} ${type === "volunteer" ? "volunteer" : ""}`}>
      {/* Slide Card - Only for Volunteer */}
      {(type === "volunteer" || isSlided) && (
        <section className="slidecard">
          <div className="floatingCard" onClick={handleSlide}>
            <img src={Grassroot} alt="Grassroot Logo" style={{ width: "200px", height: "auto" }} />
            <button>{isSlided ? "Switch to Admin" : "Switch to Volunteer"}</button>
          </div>
        </section>
      )}

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modalOverlay">
          <div className="modal">
            <h3>Forgot Password</h3>
            <p>Enter your email and we'll send a reset link.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="inputField"
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <div className="modalActions">
              <button className="btnCancel" onClick={() => setShowForgotModal(false)}>Cancel</button>
              <button className="btnConfirm" onClick={() => {
                alert("Reset link sent to " + forgotEmail);
                setShowForgotModal(false);
              }}>Send Link</button>
            </div>
          </div>
        </div>
      )}

      {/* Register Success Modal */}
      {showRegisterModal && (
        <div className="modalOverlay">
          <div className="modal">
            <h3>Registration Successful 🎉</h3>
            <p>Your account has been created. You can now login.</p>
            <button className="btnConfirm" onClick={() => {
              setShowRegisterModal(false);
              setIsFlipped(false);
            }}>
              Go to Login
            </button>
          </div>
        </div>
      )}

      {/* Login Form */}
      <section className="formCard">
        <h2 className="formTitle">{title}</h2>
        <div className="divider" />

        {type === "admin" && (
          <div className="loginModeToggle">
            <button className={`modeButton ${loginMode === 'admin' ? 'activeMode' : ''}`} onClick={() => handleLoginModeChange('admin')}>
              Login as Admin
            </button>
            <button className={`modeButton ${loginMode === 'volunteer' ? 'activeMode' : ''}`} onClick={() => handleLoginModeChange('volunteer')}>
              Login as Volunteer
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor={`${type}-id`} className="inputLabel">{idLabel}</label>
            <input type="text" id={`${type}-id`} placeholder="Enter your Id" className="inputField" />
          </div>

          <div className="inputGroup">
            <label htmlFor={`${type}-password`} className="passwordLabel">Password</label>
            <input type="password" id={`${type}-password`} placeholder="Enter your password" className="inputField" />
          </div>

          {(type === "volunteer" || loginMode === "volunteer") && (
            <div className="inputGroup">
              <label htmlFor={`${type}-level`} className="inputLabel">Select Volunteer Level</label>
              <select id={`${type}-level`} className="inputField" required>
                <option value="Level 1">Level 1 Volunteer</option>
                <option value="Level 2">Level 2 Volunteer</option>
                <option value="Level 3">Level 3 Volunteer</option>
                <option value="Level 4">Level 4 Volunteer</option>
                <option value="Level 5">Level 5 Volunteer</option>
              </select>
            </div>
          )}

          <div className="checkboxContainer">
            <a href="#" onClick={(e) => { e.preventDefault(); setShowForgotModal(true); }}>Forget password?</a>
            <input type="checkbox" id={`${type}-remember`} className="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
            <label htmlFor={`${type}-remember`} className="checkboxLabel">Remember me</label>
          </div>

          <button type="submit" className={buttonColor}>Login</button>

          <p className="registerText">
            <span>Not registered?</span>
            <span className="registerLink" onClick={handleFlip}> Click here</span>
          </p>
        </form>
      </section>

      {/* Register Form */}
      <section className={`formCard ${isFlipped ? "compactPadding" : ""}`}>
        <h2 className="formTitle">{type === "admin" ? "Admin Register" : "Volunteer Register"}</h2>
        <div className="divider" />
        <form onSubmit={handleRegisterSubmit}>
          <div className="inputGroup">
            <label htmlFor={`${type}-name`} className="inputLabel">Full Name</label>
            <input type="text" id={`${type}-name`} placeholder="Enter your name" className="inputField" required />
          </div>

          <div className="inputGroup">
            <label htmlFor={`${type}-email`} className="inputLabel">Email</label>
            <input type="email" id={`${type}-email`} placeholder="Enter your email" className="inputField" required />
          </div>

          <div className="inputGroup">
            <label htmlFor={`${type}-password`} className="passwordLabel">Password</label>
            <input type="password" id={`${type}-password`} placeholder="Enter your password" className="inputField" required />
          </div>

          <div className="inputGroup">
            <label htmlFor={`${type}-confirm-password`} className="passwordLabel">Confirm Password</label>
            <input type="password" id={`${type}-confirm-password`} placeholder="Confirm your password" className="inputField" required />
          </div>

          {type === "volunteer" && (
            <div className="inputGroup">
              <label htmlFor={`${type}-level`} className="inputLabel">Select Volunteer Level</label>
              <select id={`${type}-level`} className="inputField" required>
                <option value="Level 1">Level 1 Volunteer</option>
                <option value="Level 2">Level 2 Volunteer</option>
                <option value="Level 3">Level 3 Volunteer</option>
              </select>
            </div>
          )}

          <button type="submit" className={buttonColor}>Register</button>

          <p className="registerText">
            <span>Already have an account?</span>
            <span className="registerLink" onClick={handleFlip}> Login</span>
          </p>
        </form>
      </section>
    </div>
  );
}

export default LoginForm;