import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    phone: '',
    email: '',
    inquiry: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/submitCall', formData);
      console.log('Form submitted successfully:', response.data);
      toast.success('Form submitted successfully!');
      // Optionally, you can reset form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        country: '',
        phone: '',
        email: '',
        inquiry: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="schedule-call-form ">
      <div className="FormHeader-Container">
        <FormHeader />
      </div>

      <div className="ContactUs">
        <FormFields onChange={handleInputChange} formData={formData} />
        <SubmitButton />
      </div>
    </form>
  );
};

const FormHeader = () => (
  <div >
    <p className='form-header'>SCHEDULE A CALL</p>
    <p className='Traveler'>Hey Traveler,</p>
    <p>
      I'm Hanya, your assigned Travel Agent. Once we get on
      this discovery call, I'll walk you through our destinations
      & answer all your enquires about your upcoming
      travels!
    </p>
    <p className='Lookingforward'>Looking forward to assisting you.</p>
    <p>Have a lovely day,</p>
    <p>Hanya Sherif</p>
  </div>
);

const FormFields = ({ onChange, formData }) => (
  <div className="form-fields  ">
    <div className="form-group">
      <label htmlFor="firstName">First Name *</label>
      <input type="text" id="firstName" value={formData.firstName} onChange={onChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="lastName">Last Name *</label>
      <input type="text" id="lastName" value={formData.lastName} onChange={onChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="country">Country *</label>
      <input type="text" id="country" placeholder="Country" value={formData.country} onChange={onChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="phone">Phone *</label>
      <input type="tel" id="phone" placeholder="Phone" value={formData.phone} onChange={onChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="email">Email *</label>
      <input type="email" id="email" value={formData.email} onChange={onChange} required />
    </div>
    <div className="form-group">
      <label htmlFor="inquiry">Which trip are you inquiring about? </label>
      <textarea id="inquiry" value={formData.inquiry} onChange={onChange} required></textarea>
    </div>
  </div>
);

// SubmitButton component (unchanged)
const SubmitButton = () => (
  <button type="submit" className="submit-button">Send</button>
);

export default ContactUs;
