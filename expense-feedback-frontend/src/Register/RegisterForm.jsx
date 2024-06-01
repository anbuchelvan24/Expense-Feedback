import React, { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import { TbShieldLockFilled } from "react-icons/tb";
import { IoPlanet } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { Link,useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import './RegisterForm.css';
import logo from '../assets/CostoSight.png';
import { IoMdCloseCircle } from "react-icons/io";


const SuccessPopup = ({ onClose, show }) => (
    <div className={`success-popup ${show ? 'fade-in' : ''}`}>
      <p>User registered successfully!</p>
      <IoMdCloseCircle onClick={onClose}/>
    </div>
);

const ErrorPopup = ({ onClose, show }) => (
    <div className={`error-popup ${show ? 'fade-in' : ''}`}>
        <p>Check credentials again!  </p>
        <IoMdCloseCircle onClick={onClose}/>
    </div>

);

const RegisterForm = () => {
    const navigate = useNavigate();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/user/register", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                setShowErrorPopup(true);
                throw new Error('Registration Failed! '); 
            }

            const result = await response.json();

            if (result.user._id && result.user._id) {
                setShowSuccessPopup(true);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                setShowErrorPopup(true);
                console.error("Signup failed");
            }
            console.log(result);
        } catch (error) {
            setShowErrorPopup(true);
            console.error(error.message);
        }
    };

    return (
        <div className='overall-register'>
            <div className='wrapper'>
                <form className="entryform" onSubmit={submit}>
                    <img src={logo} alt="CostoSight Logo" />
                    <div className="input-box">
                        <input
                            type='text'
                            name="email"
                            className="txt"
                            placeholder='Email ID'
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <FaUserAstronaut className='FaIcon' />
                    </div>
                    <div className="input-box">
                        <input
                            type='password'
                            name="password"
                            placeholder='Password'
                            required
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <TbShieldLockFilled className='FaIcon' />
                    </div>
                    <div className="input-box">
                        <input
                            type='text'
                            name="firstName"
                            placeholder='First Name'
                            required
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                        {/* <IoPlanet className='FaIcon' /> */}
                    </div>
                    <div className="input-box">
                        <input
                            type='text'
                            name="lastName"
                            placeholder='Last Name'
                            required
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                        {/* <RiTeamFill className='FaIcon' /> */}
                    </div>
                    <button type='submit'>Register</button>
                    {showSuccessPopup && <SuccessPopup onClose={() => setShowSuccessPopup(false)} show={showSuccessPopup} />}
                    {showErrorPopup && <ErrorPopup onClose={() => setShowErrorPopup(false)} show={showErrorPopup} />}                    
                    <div className="register-link" style={{display: 'flex',justifyContent:'flex-end'}}>
                        <p>Already Registered? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
