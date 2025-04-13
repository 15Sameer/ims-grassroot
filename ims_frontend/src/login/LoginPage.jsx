"use client";
import React from "react";
import styles from "./LoginPage.module.css";
import LoginHeader from "./LoginHeader";
import LoginContainer from "./LoginContainer";

function Login() {
  return (
    <main className={styles.container}>
      <button 
        className={styles.themeToggleBtn}
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