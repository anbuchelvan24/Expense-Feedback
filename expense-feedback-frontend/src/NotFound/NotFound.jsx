import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import svg from "../assets/404.svg";
import './NotFound.css';

const NotFound = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    // Retrieve authentication status from localStorage
    const authStatus = JSON.parse(localStorage.getItem("isAuthenticated"));
    setIsAuthenticated(authStatus);
    console.log(isAuthenticated)
  }, []);

  return (
    <>
      <div className="cont-404">
        <img src={svg} alt="404" />
        <Link to={isAuthenticated ? "/portal" : "/login"}>
          <button>{isAuthenticated ? "Back to Form" : "Back to Login"}</button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
