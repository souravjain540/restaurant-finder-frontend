import React, { useState } from 'react';
import axios from 'axios';

const getAuthToken = () => {
  // Replace this with your logic to obtain the token
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbHFmY3Fya3IwMDAwd2p5bmFvMzBlNmNmIiwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTcwMzE3ODk4MywiZXhwIjoxNzAzMzUxNzgzfQ.FrGfhLZZMcksa7KYHFxn9RAiJ_IUCiGpremHXEi3_9U';
};

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Adjust the base URL to your API endpoint
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`, // Attach the token here
    },
  });
  function RestaurantForm({ onFormSubmit }) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phone, setPhone] = useState('');
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
  
      const newRestaurant = {
        name,
        address,
        zipCode,
        phone,
      };
  
      api.post('/restaurants', newRestaurant)
        .then(response => {
          // Call the onFormSubmit function with the newly created restaurant
          onFormSubmit(response.data);
  
          // Clear the form input fields
          setName('');
          setAddress('');
          setZipCode('');
          setPhone('');
  
          // Refresh the page after a successful submission
          window.location.reload();
        })
        .catch(error => console.error('Error creating restaurant:', error));
    };
  
    return (
      <div>
        <h2>Add a New Restaurant</h2>
        <form class="res-form" onSubmit={handleFormSubmit}>
          <div>
            <label>Name:</label>
            <input class="res-ip"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div><br></br>
            <label>Address:</label>
            <input class="res-ip"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div><br></br>
          <div>
            <label>Zip Code:</label>
            <input class="res-ip"
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div><br></br>
          <div>
            <label>Phone:</label>
            <input class="res-ip"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div><br></br>
          <tab></tab><button type="submit">Submit</button>
        </form>
      </div>
    );
  }
  
  export default RestaurantForm;