import React, {useState} from "react";
import { FaUserAstronaut } from "react-icons/fa6";
import { TbShieldLockFilled } from "react-icons/tb";
import { IoPlanet } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import './RegisterForm.css'

const handleKeyPress = (e) => {
    if (e.key === "Enter") {
        addUser();
    }
}

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();    
    const [organization, setOrganization] = useState("");
    const [team, setTeam] = useState("");

    const addUser = async (e) => {

        e.preventDefault();

        const isValidEmail = () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        if (!isValidEmail()) {
            window.alert("Enter a Valid Email");
            return;
        }
        // try {
        //     const response = await axios.post('http://localhost:8080/register', {
        //         email: email,
        //         password: password,
        //         organization: organization,
        //         team: team
        //     });
            
        //     let message= response.data;
        //     alert(message);

        //     navigate('/login');

        // } catch (error) {
        //     console.error(error);
        // }
    }
    return(
        <div className='overall-register'>
        <div className='wrapper'>
            <form className="entryform">
                <h1>Expense Feedback</h1>
                <div className="input-box">
                    <input type='text' placeholder='Email ID' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
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
                <div className="input-box">
                    <input
                    type='text'
                    placeholder='Organization'
                    onKeyDown={handleKeyPress}
                    required value={organization} onChange={(e)=> setOrganization(e.target.value)}
                    />
                    <IoPlanet className='FaIcon'/>
                </div>
                <div className="input-box">
                    <input
                    type='text'
                    onKeyDown={handleKeyPress}
                    placeholder='Team'
                    required value={team} onChange={(e)=> setTeam(e.target.value)}
                    />
                    <RiTeamFill className='FaIcon'/>
                </div>



                <button type='submit' onClick={addUser}>Register</button>

            </form>
        </div>
        </div>
    );
}

export default RegisterForm;