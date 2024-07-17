import React from 'react'
import './Logo.css'
import { Link } from 'react-router-dom';
import LogoPic from '../../assets/logo.png'
const Logo = () => {
  return (    
    <>
      <Link to="/">
        <img className="logo" src={LogoPic} alt="" />
      </Link>
    </>
  )
}

export default Logo
