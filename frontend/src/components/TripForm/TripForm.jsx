import React, { useState, useEffect } from 'react';
import './TripForm.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TripForm = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', country: '', phone: '', address: '',
    tripType: '', numberOfTravelers: '', averageAge: '', budget: '', destination: '',
    checkInDate: '', checkOutDate: '', additionalInfo: '', 
  });

  const [initialTripType, setInitialTripType] = useState('');

  useEffect(() => {
    if (location.state && location.state.tripType) {
      setFormData(prevState => ({
        ...prevState,
        tripType: location.state.tripType
      }));
      setInitialTripType(location.state.tripType);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:5000/submitTripForm', formData)
      .then(response => {
        console.log(response.data);
        toast.success('Form submitted successfully!');
        // Clear form data except tripType
        setFormData({
          firstName: '', lastName: '', email: '', country: '', phone: '', address: '',
          tripType: initialTripType, numberOfTravelers: '', averageAge: '', budget: '', destination: '',
          checkInDate: '', checkOutDate: '', additionalInfo: '', 
        });
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Error submitting form. Please try again later.');
      });
  };

  return (
    <div className="trip-form-container Container">
      <form onSubmit={handleSubmit} className="trip-form">
        <div className="form-header">
          <h3>PERSONAL DETAILS</h3>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">FIRST NAME *</label>
            <input type="text" id="firstName" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">LAST NAME *</label>
            <input type="text" id="lastName" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">EMAIL *</label>
          <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tripType">TRIP TYPE *</label>
            <input type="text" id="tripType" name="tripType" value={formData.tripType} onChange={handleChange} required readOnly />
          
            <label htmlFor="phone" className='Phone-Label'>PHONE *</label>
            <input type="text" placeholder='Phone' id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">ADDRESS</label>
          <input type="text" id="address" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        </div>

        <h3>TRIP DETAILS</h3>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="country">COUNTRY *</label>
            <input type="text" id="country" name="country" onChange={handleChange} required placeholder='Enter a country' value={formData.country} />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfTravelers">NUMBER OF TRAVELERS *</label>
            <input type="number" id="numberOfTravelers" name="numberOfTravelers" placeholder="Enter a number" value={formData.numberOfTravelers} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="averageAge">AVERAGE AGE OF TRAVELER/S *</label>
            <input type="number" id="averageAge" name="averageAge" placeholder="Enter a number" value={formData.averageAge} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="budget">BUDGET IN € *</label>
            <input type="text" id="budget" name="budget" placeholder="Enter a number" value={formData.budget} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="destination">DESTINATION *</label>
          <select id="destination" name="destination" onChange={handleChange} required value={formData.destination}>
            <option value="">Choose an option</option>
            <option value="Luxor">LUXOR WITH VALLEY OF KINGS BY BUS</option>
            <option value="Giza">Giza</option>
            {/* Add more destination options here */}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="checkInDate">CHECK IN DATE *</label>
            <input type="date" id="checkInDate" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="checkOutDate">CHECK OUT DATE *</label>
            <input type="date" id="checkOutDate" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="additionalInfo">ANYTHING YOU WOULD LIKE US TO KEEP IN MIND</label>
          <textarea id="additionalInfo" name="additionalInfo" placeholder="Add answer here" value={formData.additionalInfo} onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="submit-button">SUBMIT</button>
      </form>
    </div>
  );
};

export default TripForm;
