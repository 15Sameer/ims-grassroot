import React from "react";
import "./Login.css"; // Changed import
import LoginForm from "./LoginForm";

function LoginContainer() {
  return (
    <div className="formsContainer"> {/* Removed styles. prefix */}
      <LoginForm
        type="admin"
        title="Admin Login"
        idLabel="Admin Id"
        buttonColor="adminButton" 
      />
      <LoginForm
        type="volunteer"
        title="Volunteer Login"
        idLabel="Volunteer Id"
        buttonColor="volunteerButton"
      />
    </div>
  );
}

export default LoginContainer;