import React, { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import { TbShieldLockFilled } from "react-icons/tb";
import { IoPlanet } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import './RegisterForm.css';

const RegisterForm = () => {
    const navigate = useNavigate();

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
            const result = await response.json();
            if (result.user._id) {
                navigate("../login");
            } else {
                console.error("Signup failed");
            }
            console.log(result);
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleSignInClick = () => {
        navigate("../login");
    };

    return (
        <div className='overall-register'>
            <div className='wrapper'>
                <form className="entryform" onSubmit={submit}>
                    <h1>CostoSight</h1>
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
                        <IoPlanet className='FaIcon' />
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
                        <RiTeamFill className='FaIcon' />
                    </div>
                    <button type='submit'>Register</button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link variant="body2" onClick={handleSignInClick}>
                                <span>Already have an account? Sign in</span>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
