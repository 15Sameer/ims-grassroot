import React from "react";
import styles from "./LoginPage.module.css";
import LoginForm from "./LoginForm";

function LoginContainer() {
  return (
    <div className={styles.formsContainer}>
      <LoginForm
        type="admin"
        title="Admin Login"
        idLabel="Admin Id"
        buttonColor={styles.adminButton}
      />
      <LoginForm
        type="volunteer"
        title="Volunteer Login"
        idLabel="Volunteer Id"
        buttonColor={styles.volunteerButton}
      />
    </div>
  );
}

export default LoginContainer;
