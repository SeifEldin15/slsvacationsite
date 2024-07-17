import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const Dropdown = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [content]);

  return (
    <div className={`dropdown ${isOpen ? 'active' : ''}`}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <i className="fa-solid fa-chevron-down arrow"></i>
      </div>
      <div 
        className="dropdown-content" 
        style={{ maxHeight: isOpen ? `${contentHeight}px` : '0px' }}
      >
        <div ref={contentRef}>
          {content}
        </div>
      </div>
    </div>
  );
};
const DropdownQnA = () => {
  const bookingSteps = (
    <>
      <p><span className='DropdownQnA-step'>Step 1:</span> Click on the button below and fill in the form with your preferences.</p>
      <p>Step 2: Lay back while one of our agents cooks up the perfect experience for you, contacts you with all the details you need and answer all your questions.</p>
      <p>Step 3: Confirm and pay to book your spot.</p>
      <p>Step 4: Pack your bags and get ready to experience the beauty of Egypt.</p>
    </>
  );

  return (
    <div className='Container2 Container DropdownQnA'>
      <Dropdown 
        title="How can I book my Egyptian Experience?" 
        content={bookingSteps} 
      />
      <Dropdown 
        title="Payment & Refund policy" 
        content={bookingSteps} 
      />
    </div>
  );
};

export default DropdownQnA;