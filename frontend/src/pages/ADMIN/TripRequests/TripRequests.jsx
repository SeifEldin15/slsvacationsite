import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TripRequests.css';

function TripRequests() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getTrips');
      setTrips(response.data);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await axios.delete(`http://localhost:5000/deleteTrip/${id}`);
        setTrips(trips.filter(trip => trip.id !== id));
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  };

  return (
    <div className="TripDashboard">
      <h1>Trip Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Trip Type</th>
            <th>Number of Travelers</th>
            <th>Average Age</th>
            <th>Budget</th>
            <th>Destination</th>
            <th>Check-in Date</th>
            <th>Check-out Date</th>
            <th>Additional Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.firstName}</td>
              <td>{trip.lastName}</td>
              <td>{trip.email}</td>
              <td>{trip.country}</td>
              <td>{trip.phone}</td>
              <td>{trip.address}</td>
              <td>{trip.tripType}</td>
              <td>{trip.numberOfTravelers}</td>
              <td>{trip.averageAge}</td>
              <td>{trip.budget}</td>
              <td>{trip.destination}</td>
              <td>{trip.checkInDate}</td>
              <td>{trip.checkOutDate}</td>
              <td>{trip.additionalInfo}</td>
              <td>
                <button onClick={() => handleDelete(trip.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TripRequests;