import React from 'react';
import { Link } from 'react-router-dom';
import svg from "../assets/404.svg";
import './NotFound.css';

const NotFound = () => {
  return (
    <>
    <div className="cont-404">
        <img src={svg} alt="svg" />
        <Link to="/portal">
        <button>Back to Form</button>
        </Link>
    </div>
    </>
    
  );
}

export default NotFound;
