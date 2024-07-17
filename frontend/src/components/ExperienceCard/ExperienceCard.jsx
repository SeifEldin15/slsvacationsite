import React from 'react';
import './ExperienceCard.css';

const ExperienceCard = () => {
  return (
    <div className="experience-card">
      <h3>Experience</h3>
      
      <section className="highlights">
        <p className='experience-card-p'>Highlights</p>
        <ul>
          <li>Marvel at California's giant redwoods, the tallest trees in the world</li>
          <li>Enjoy free time in Sausalito to shop, sightsee, or take photographs of the amazing views</li>
          <li>Step out of the vehicle and walk around in walk around these amazing areas</li>
        </ul>
      </section>
      
      <section className="full-description">
        <p className='experience-card-p'>description</p>
      <div className=''>
      <p>
          Explore the ancient groves of coastal redwoods in Muir Woods National Monument
          alongside an expert guide on a half-day tour. Then discover the charming streets of
          Downtown Sausalito on a relaxed half-day tour.
          After a pick-up from a central San Francisco hotel, head north over the bridge 
        </p>
      </div>
      </section>
      
      <section className="includes">
        <p className='experience-card-p'>Includes</p>
        <ul>
          <li className="included">Round-trip transport from San Francisco to Muir Woods and Sausalito by coach</li>
          <li className="included">Professional, knowledgeable tour guide</li>
          <li className="included">Muir Woods entrance fees</li>
          <li className="not-included">Food and drinks</li>
          <li className="not-included">Tips</li>
        </ul>
      </section>
    </div>
  );
};

export default ExperienceCard;