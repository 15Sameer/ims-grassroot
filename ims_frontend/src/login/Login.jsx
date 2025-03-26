"use client";
import React from "react";
import styles from "./Login.module.css";
import LoginHeader from "./LoginHeader";
import LoginContainer from "./LoginContainer";

function Login() {
  return (
    <main className={styles.container}>
      <LoginHeader />
      <LoginContainer />
    </main>
  );
}

export default Login;