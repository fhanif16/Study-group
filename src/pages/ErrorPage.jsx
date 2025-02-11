import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
        <p style={styles.description}>Oops! Page Not Found</p>
        <div style={styles.linkContainer}>
          <Link to="/" style={styles.backLink}>
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    opacity: 0,
    animation: "fadeIn 1s forwards",
  },
  content: {
    textAlign: "center",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 1s ease-in-out",
  },
  errorCode: {
    fontSize: "100px",
    fontWeight: "bold",
    color: "#e74c3c",
    margin: 0,
    animation: "fadeInUp 1s ease-out",
  },
  description: {
    fontSize: "20px",
    color: "#7f8c8d",
    marginTop: "20px",
    animation: "fadeInUp 1.5s ease-out",
  },
  linkContainer: {
    marginTop: "30px",
    animation: "fadeInUp 2s ease-out",
  },
  backLink: {
    padding: "12px 25px",
    backgroundColor: "#3498db",
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

export default ErrorPage;