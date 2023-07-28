import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/user/login", {
            username: user.username,
            password: user.password
        })
            .then(response => {
                localStorage.setItem("userID", JSON.stringify(response.data.data.id));
                localStorage.setItem("name", JSON.stringify(response.data.data.fullName));
                localStorage.setItem("isLogin", true);
                navigate(`/`);
            })
            .catch(error => {
                console.error(error);
                setErrorMessage(`Maybe you do not have an account yet or the password you entered is incorrect.`);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="login">
            <div className="left">
                <img src={process.env.PUBLIC_URL + '/images/login.png'} alt="login" />
                <h4>Welcome my friend</h4>
                <p>Just a couple of clicks and we start</p>
            </div>
            <div className="right">
                <h2>Welcome</h2>
                <h1 style={{ color: '#3949AB' }}>Sign in here</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-user">
                        <div className="input-part">
                            <img src={process.env.PUBLIC_URL + "/images/user.png"} alt="user" />
                            <input placeholder="Username" type="text" name="username"
                                value={user.username}
                                onChange={handleChange} />
                        </div>
                        <div className="input-part">
                            <img src={process.env.PUBLIC_URL + '/images/lock.png'} alt="password" />
                            <input placeholder="Password" type="password" value={user.password}
                                onChange={handleChange} name="password" />
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                    <button type="submit">Sign in</button>
                </form>
                <div className="redirect">
                    <p>Have no account yet? <Link to='/register'><span>Sign up</span></Link></p>
                </div>
            </div>
        </div>
    )
}