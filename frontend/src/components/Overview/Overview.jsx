import React from 'react';
import './Overview.css';
import Overviewvideo from '../../assets/WhatsApp Video 2024-07-16 at 8.59.05 PM.mp4';

const Overview = () => {
  return (
    <div className="overview-wrapper">
      <section className="overview Container2">
        <div className="Offer-Header">
          <h3>OVERVIEW</h3>
          <div className="line"></div>
        </div>
        <div className="overview-container">
          <div className="overview-container-left">
            <h1>Why Sls Vacation?</h1>
            <p>Egypt is a captivating destination with rich history, stunning landscapes, and unique experiences.</p>
            <p>You can explore the iconic <b>Pyramids</b> of <b>Giza</b> and the <b>Sphinx</b>, cruise along the <b>Nile</b>, the longest river globally, and visit <b>Luxor</b> and <b>Aswan</b>. Dive into the crystal-clear waters of the <b>Marsa Alam</b>, home to vibrant corals and colorful fish.</p>
            <p>Enjoy dreamy beach getaways along the<b> Red Sea</b> coast and bask in year-round sunshine. Experience the welcoming nature of the Egyptian people.</p>
          </div>
          <div className="overview-container-right">
            <video src={Overviewvideo} type="video/mp4" controls></video>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Overview;