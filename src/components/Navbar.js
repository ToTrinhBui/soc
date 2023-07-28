import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem('isLogin'));
    const name = JSON.parse(localStorage.getItem('name'));
    setIsLogin(login);
    setUsername(name);
  }, []);

  const logout = () => {
    setIsLogin(false);
    localStorage.setItem("isLogin", false);
    localStorage.setItem("userID", null);
    localStorage.setItem("name", null);
    setUsername(null);
    window.location.reload(); // reload the page after logout
  };

  return (
    <div className='navbar'>
      <Link to="/">
        <h3>Home</h3>
      </Link>
      <div className='content'>
        <Link to={"/order"}><h3>Order</h3></Link>
        <Link to={"/inventory"}><h3>Inventory</h3></Link>
        <Link to={"/check-order"}><h3>Check Order</h3></Link>
      </div>
      <div className='user'>
        {isLogin && username ? (
          <>
            <h3>{username}</h3>
            <h3 onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </h3>
          </>
        ) : (
          <>
            <Link to="/login">
              <h3>Login</h3>
            </Link>
            <Link to="/register">
              <h3>Register</h3>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar;