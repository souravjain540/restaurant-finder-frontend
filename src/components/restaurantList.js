import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getAuthToken = () => {
  // Replace this with your logic to obtain the token
  return 'ADD_YOUR_TOKEN_HERE';
};

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Adjust the base URL to your API endpoint
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAuthToken()}`, // Attach the token here
    },
  });

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurants when component mounts
  useEffect(() => {
    api.get('/restaurants')
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => console.error('Error fetching restaurants:', error));
  }, []);

  const handleDelete = (restaurantId) => {
    api.delete(`/restaurants/${restaurantId}`)
      .then(() => {
        // Filter out the deleted restaurant
        setRestaurants(restaurants.filter(restaurant => restaurant.id !== restaurantId));
      })
      .catch(error => console.error('Error deleting restaurant:', error));
  };

  return (
    <div>
      <h2>Restaurants List</h2>
      {restaurants.map(restaurant => (
        <div class = "res-list" key={restaurant.id}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.address}</p>
          <p>{restaurant.phone}</p>
          <p>Zip Code: {restaurant.zipCode}</p> {/* Display the Zip Code */}
          <button class='btn' onClick={() => handleDelete(restaurant.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default RestaurantList;
