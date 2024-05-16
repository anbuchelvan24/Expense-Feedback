import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import { TbShieldLockFilled } from "react-icons/tb";
import { FaUserAstronaut } from "react-icons/fa6";
import logo from '../assets/CostoSight.png';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const isValidEmail = () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if (!isValidEmail()) {
            window.alert("Enter a Valid Email");
            return;
        }

    }

    return (
        <>
            <div className='overall-login'>
                <div className='wrapper'>
                    <form className="entryform">
                        <img src={logo} alt="CostoSight Logo" />
                        <div className="input-box">
                            <input
                                type='text'
                                placeholder='Email ID'
                                required
                                value={email}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FaUserAstronaut className='FaIcon'/>
                        </div>
                        <div className="input-box">
                            <input
                                type='password'
                                placeholder='Password'
                                required
                                value={password}
                                onKeyDown={handleKeyPress}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TbShieldLockFilled className='FaIcon'/>
                        </div>
                        <button type='button' onClick={handleLogin}>Login</button>
                        {/* <div className="register-link">
                            <p>Ready to Dive In? <a href="/register">Register here</a></p>
                        </div> */}
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
