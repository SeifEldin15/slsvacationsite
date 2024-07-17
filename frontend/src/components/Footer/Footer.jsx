import React from 'react';
import './Footer.css';
import appstore from '../../assets/app-store-badge-en-us.svg'
import googleplay from '../../assets/google-play-badge-en-us.svg'

const Footer = () => {
  return (
    <>
    <footer className="footer Container2 Container">
      <div className="footer-section">
        <p className='Footer-Header'>Language</p>
        <select>
          <option>English (United States)</option>
          <option>English (United States)</option>
          <option>French (France)</option>
          <option>German (Germany)</option>
          <option>Spanish (Spain)</option>
        </select>
        <p className='Footer-Header'>Currency</p>
        <select>
          <option>Egyptian Pound (E£)</option>
        </select>
      </div>
      
      <div className="footer-section">
        <p className='Footer-Header'>Mobile</p>
        <img src={appstore} alt="Get it on Google Play" className='appimg'/>
        <img src={googleplay} alt="Download on the App Store" className='appimg'/>
      </div>
      
      <div className="footer-section">
        <p className='Footer-Header'>Support</p>
        <ul>
          <li>Contact</li>
          <li>Legal Notice</li>
          <li>Privacy Policy</li>
          <li>Cookies and Marketing Preferences</li>
          <li>General Terms and Conditions</li>
          {/* <li>Information according to the Digital Services Act</li>
          <li>Sitemap</li>
          <li>Do not Sell or Share my Personal Information</li> */}
        </ul>
      </div>
      
      <div className="footer-section">
        <p className='Footer-Header'>Company</p>
        <ul>
          <li>About Us</li>
          <li>Careers</li>
          <li>Blog</li>
          <li>Press</li>
          <li>Gift Cards</li>
          <li>Explorer</li>
        </ul>
      </div>
      
      <div className="footer-section">
        <p className='Footer-Header'>Work With Us</p>
        <ul>
          <li>As a Supply Partner</li>
          <li>As a Content Creator</li>
          <li>As an Affiliate Partner</li>
        </ul>
        <p className='Footer-Header'>Ways You Can Pay</p>
        <div className="payment-methods">
          {/* Add payment method icons here */}
        </div>
      </div>
      </footer>

      <div className="footer-bottom Container">
      <div className="content">
        <p className="text">© 2020 — 2024 Sls Vacation. Egypt.</p>
        <div className="social-icons">
          <i class="fa-brands fa-whatsapp"></i>
          <i class="fa-brands fa-instagram"></i>
          <i class="fa-brands fa-facebook-f"></i>
          <i class="fa-brands fa-tiktok"></i>
        </div>
      </div>
    </div>
    
    </>
  );
};

export default Footer;