import React from 'react'
import "./navbar.scss"
import { useState } from 'react';

const Navbar = () => {
    const [open,setOpen]=useState(false);
  return (
    <nav>
     <div className='left'>
     <a href="/" className='logo'>
      <img src="./image.png"  alt=""/>
      <span>UrbanForYou</span>
     </a>
     <a href="/">Home</a>
     <a href="/">About</a>
     <a href="/">Contacts</a>
     <a href="/">Agents</a>
     </div>
     <div className='right'>
     <a href="/">Login</a>
     <a href="/" className='register'>SignUp</a>
     <div className='menuicon'>
        <img 
        src="/menu.png"
        alt=""
        onClick={()=>setOpen((prev)=>!prev)}/>
     </div>
     <div className={open?"menu active":"menu"}>
     <a href="/">Home</a>
     <a href="/">About</a>
     <a href="/">Contacts</a>
     <a href="/">Agents</a> 
     <a href="/">Login</a>
     <a href="/">SignUp</a>  
     </div>

        </div> 
    </nav>
  )
}

export default Navbar