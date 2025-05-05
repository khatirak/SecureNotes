import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { AuthContext } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to notes if already authenticated
    if (isAuthenticated) {
      navigate("/notes");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-page">
      <h1>SecureNotes</h1>
      <p>A simple and secure note-taking application</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

