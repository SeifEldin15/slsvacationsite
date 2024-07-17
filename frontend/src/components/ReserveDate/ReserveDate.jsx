import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ReserveDate.css';
const ParticipantSelector = ({ Person, setPerson}) => {
  return (
    <div className="participant-selector" onClick={(e) => e.stopPropagation()}>
      <div className="participant-type">
        <span>Persons</span>
        <div className="counter">
          <button onClick={() => setPerson(Math.max(0, Person - 1))}>-</button>
          <span>{Person}</span>
          <button onClick={() => setPerson(Person + 1)}>+</button>
        </div>
      </div>
      <div className="participant-type">
        <div className="counter">

        </div>
      </div>
    </div>
  );
};

const DatePicker = ({ selectedDate, setSelectedDate, closeDatePicker }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const changeMonth = (offset) => {
    setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + offset, 1));
  };

  const changeYear = (year) => {
    setCurrentMonth(prevMonth => new Date(year, prevMonth.getMonth(), 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<button key={`empty-${i}`} disabled></button>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentMonth.getFullYear()}-${(currentMonth.getMonth() + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      days.push(
        <button
          key={day}
          className={selectedDate === date ? 'selected' : ''}
          onClick={() => {
            setSelectedDate(date);
            closeDatePicker();
          }}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="date-picker" onClick={(e) => e.stopPropagation()}>
      <div className="date-picker-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <select 
          value={currentMonth.getMonth()} 
          onChange={(e) => setCurrentMonth(new Date(currentMonth.getFullYear(), parseInt(e.target.value), 1))}
        >
          {months.map((month, index) => (
            <option key={month} value={index}>{month}</option>
          ))}
        </select>
        <select 
          value={currentMonth.getFullYear()} 
          onChange={(e) => changeYear(parseInt(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => currentMonth.getFullYear() - 5 + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>
      <div className="calendar">
        <div className="day-labels">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>
        <div className="days">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

const ReserveDate = () => {
  const [person, setPerson] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [showParticipants, setShowParticipants] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { productId: offerId } = useParams();

  const handleGetOffer = async () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/addToCart', {
        productId: offerId,
        quantity: person,
        date: selectedDate
      });
      
      if (response.status === 201 || response.status === 200) {
        alert('Offer added to cart successfully!');
      }
    } catch (error) {
      console.error('Error adding offer to cart:', error);
      alert('Failed to add offer to cart. Please try again.');
    }
  };

  return (
    <div className="ReserveDate">
      <h3>Select participants and date</h3>
      <div className="selector-container">
        <div className="dropdown" onClick={() => setShowParticipants(!showParticipants)}>
          <span>Person x {person}</span>
          {showParticipants && (
            <ParticipantSelector
              Person={person}
              setPerson={setPerson}
            />
          )}
        </div>
        <div className="dropdown" onClick={() => setShowDatePicker(!showDatePicker)}>
          <span>{selectedDate || 'Select date'}</span>
          {showDatePicker && (
            <DatePicker 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
              closeDatePicker={() => setShowDatePicker(false)} 
            />
          )}
        </div>
        <button className="check-availability" onClick={handleGetOffer}>Get Offer</button>
      </div>
    </div>
  );
};

export default ReserveDate;