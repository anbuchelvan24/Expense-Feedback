import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Landing.css';
import { TbShieldLockFilled } from "react-icons/tb";
import { FaUserAstronaut } from "react-icons/fa6";
import logo from '../assets/CostoSight.png';

const Landing = () => {

    return (
        <div className="main2">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <div className="button-container">
                <button className="policies-button"><a href="/policies" style={{color: 'white'}}>Policies</a></button>
                <button className="sign-in-button"><a href="/login" style={{color: 'white'}}>Sign in</a></button>
            </div>

          <div className="inside">
            <div className="info-container">
                <h2 className="heading">"Elevate Expense Insights:
                                            Empower Your Reports!"</h2><br></br>
                <p className="sub-content">Effortlessly streamline expense reporting with AI-driven insights, empowering informed decision-making and optimizing financial management.</p>
                <div class="button-container-start">
              <button class="get-started-button"><a href="/portal" style={{color: 'white'}}>Get Started!</a></button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Landing;
