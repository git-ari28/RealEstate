import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./navbar.scss";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const user = false; // Set to true if user is logged in, for testing

    return (
        <nav>
            <div className='left'>
                <a href="/" className='logo'>
                    <img src="./image.png" alt="Logo" />
                    <span>UrbanForYou</span>
                </a>
                <a href="/">Home</a>
                <a href="/">About</a>
                <a href="/">Contacts</a>
                <a href="/">Agents</a>
            </div>
            <div className='right'>
                {user ? (
                    <div className="user">
                        <img src="/user-profile.png" alt="User" />
                        <span>John Doe</span>
                        <Link to="/profile">Profile</Link>
                    </div>
                ) : (
                    <>
                        <a href="/">Login</a>
                        <a href="/" className='register'>SignUp</a>
                    </>
                )}

                <div className='menuicon'>
                    <img 
                        src="/menu.png" 
                        alt="Menu" 
                        onClick={() => setOpen(prev => !prev)} 
                    />
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Contacts</a>
                    <a href="/">Agents</a>
                    {user ? (
                        <Link to="/profile">Profile</Link>
                    ) : (
                        <>
                            <a href="/">Login</a>
                            <a href="/">SignUp</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
