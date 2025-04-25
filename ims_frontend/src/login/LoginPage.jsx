import React from "react";
import "./Login.css"; // Changed import
import LoginHeader from "./LoginHeader";
import LoginContainer from "./LoginContainer";

function Login() {
  return (
    <main className="container"> {/* Removed styles. prefix */}
      <button 
        className="themeToggleBtn" 
        onClick={() => {
          const root = document.documentElement;
          const currentTheme = root.getAttribute('data-theme') || 'light';
          root.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
        }}
      >
        Toggle Theme
      </button>
      <LoginHeader />
      <LoginContainer />
    </main>
  );
}

export default Login;