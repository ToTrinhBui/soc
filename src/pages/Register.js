import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {

    const [user, setUser] = useState({
        fullName: "",
        password: "",
        username: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (user.password !== confirmPassword) {
            alert("Passwords do not match");
        }
        else if (!user.fullName || !user.password || !user.username) {
            alert("Please fill fields");
        }
        else {
            fetch("http://localhost:8080/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                    fullName: user.fullName
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to register");
                    } else {
                        navigate(`/login`);
                    }
                })
                .catch(error => {
                    console.error(error);
                    setErrorMessage(`${error.message}. It's possible that an account with this email already exists.`);
                });
        }
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "password") {
            setUser(prevState => ({
                ...prevState,
                password: value
            }));
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        } else {
            setUser(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };


    return (
        <div>
            <div className="login">
                <div className="left">
                    <img src={process.env.PUBLIC_URL + '/images/login.png'} alt="login" />
                    <h4>Welcome my friend</h4>
                    <p>Just a couple of clicks and we start</p>
                </div>
                <div className="right">
                    <h2>Welcome</h2>
                    <h1 style={{ color: "#3949AB" }}>Create an account</h1>
                    <form>
                        <div className="input-user">
                            <div className="input-part">
                                <img src={process.env.PUBLIC_URL + "/images/user.png"} alt="user" />
                                <input type="text" placeholder="FullName" name="fullName"
                                    value={user.fullName}
                                    onChange={handleChange} />
                            </div>
                            <div className="input-part">
                                <img src={process.env.PUBLIC_URL + "/images/user.png"} alt="user" />
                                <input placeholder="Username" type="text" name="username"
                                    value={user.username}
                                    onChange={handleChange} />
                            </div>
                            <div className="input-part">
                                <img src={process.env.PUBLIC_URL + "/images/lock.png"} alt="password" />
                                <input
                                    placeholder="Password"
                                    type="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    name="password"
                                />
                            </div>
                            <div className="input-part">
                                <img src={process.env.PUBLIC_URL + "/images/lock.png"} alt="confirm password" />
                                <input
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    name="confirmPassword"
                                />
                            </div>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                        </div>
                        <button type="submit" onClick={handleSubmit}>Sign up</button>
                    </form>
                    <div className="redirect">
                        <p>
                            Already have an account? <Link to="/login"><span>Sign in</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}