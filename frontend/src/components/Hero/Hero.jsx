import React from 'react'
import './Hero.css'
import HeroImg from '../../assets/test3.jpg'
import CheckOfferBtn from '../CheckOfferBtn/CheckOfferBtn'
import Plane from "../../assets/airplane-6-xxl.png"
import { Link } from 'react-router-dom';  

const Hero = () => {
  return (
    <div className="hero Container2">
      <div className="overlay"></div>
      <img className='HeroImgBackground' src={HeroImg} alt="Egyptian Art" />
      <div className="hero-section Container">
      {/* <i class="fa-solid fa-plane planeicon"></i> */}
      <img src={Plane} className='planeicon' alt="" />
      <p className='hero-header'>Travel, Discover, Enjoy</p>
      <p className="hero-header-p">
      Create and personalize your dream getaway with SLS Vacation! 
      </p>
      <Link to="/Products" > 
      <CheckOfferBtn />
        </Link>
      </div>
    </div>
  )
}

export default Hero
