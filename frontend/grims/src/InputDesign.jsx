"use client";
import React from "react";
import styles from "./InputDesign.module.css";
import LoginHeader from "./LoginHeader";
import LoginContainer from "./LoginContainer";

function InputDesign() {
  return (
    <main className={styles.container}>
      <LoginHeader />
      <LoginContainer />
    </main>
  );
}

export default InputDesign;
