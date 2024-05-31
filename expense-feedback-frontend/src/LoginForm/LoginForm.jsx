import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './LoginForm.css';
import { TbShieldLockFilled } from "react-icons/tb";
import { FaUserAstronaut } from "react-icons/fa6";
import logo from '../assets/Claim AI.png';
import { IoMdCloseCircle } from "react-icons/io";


const SuccessPopup = ({ onClose, show }) => (
    <div className={`success-popup ${show ? 'fade-in' : ''}`}>
      <p>User logged in successfully!  <IoMdCloseCircle onClick={onClose}/></p>
    </div>
);

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);


    const navigate = useNavigate(); 

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
            const response = await fetch("http://localhost:5000/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.user._id) {
                setShowSuccessPopup(true);
                setTimeout(()=>{
                    navigate('/portal');
                },1000);
                const user = JSON.stringify(result.user);
                console.log(user)
                localStorage.setItem("user", user);
                localStorage.setItem("token", result.token);
                localStorage.setItem("isAuthenticated", result.isauthenticated); // Store the token correctly
            } else {
                console.error("Login failed");
            }
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            submit(e); // Call the submit function on Enter key press
        }
    };

    return (
        <>
            <div className='overall-login'>
                <div className='wrapper'>
                    <form className="entryform">
                        <img src={logo} alt="CostoSight Logo" />
                        <div className="input-box">
                            <input
                                type='text'
                                name="email"
                                placeholder='Email ID'
                                required
                                value={formData.email}
                                onKeyDown={handleKeyPress}
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
                                onKeyDown={handleKeyPress}
                                onChange={handleInputChange}
                            />
                            <TbShieldLockFilled className='FaIcon' />
                        </div>
                        <button type='button' onClick={submit}>Login</button>
                        {showSuccessPopup && <SuccessPopup onClose={() => setShowSuccessPopup(false)} show={showSuccessPopup} />}
                        <div className="register-link">
                            <p>Haven't created an account? <Link to="/register">Register here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
