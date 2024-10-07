import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import HomePage from '../homePage/HomePage'

const Layout = () => {
  return (
    <div className="layout">
        <div className='navbar'>
            <Navbar/>
        </div>
        <div className='content'>
            <HomePage/>
        </div>
    </div>
  )
}

export default Layout