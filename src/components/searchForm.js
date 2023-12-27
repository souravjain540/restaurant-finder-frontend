import React, { useState } from 'react';
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

function SearchForm({ onSearch }) {
  const [zipCode, setZipCode] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  const handleSearch = () => {
    if (zipCode.trim() !== '') {
      api.get('/restaurants', {
        params: {
          where: { zipCode }, // Send the zipCode as a query parameter
        },
      })
  
        .then(response => {
          // Update the state with the search results
          console.log('API Response:', response.data);
          setRestaurants(response.data);

          // Call the onSearch function with the search results
          onSearch(response.data);
        })
        .catch(error => console.error('Error searching restaurants:', error));
    }
  };

  return (
    <div>
      <h2>Search Restaurants by Zip Code</h2>
      <div className="search-container">
      <input
        class = "search-text"
        type="text"
        placeholder="Enter Zip Code"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
      <br></br>
      <br></br>
      <button class = "search" onClick={handleSearch}>Search</button>
      </div>

      {/* Display the search results */}
      {restaurants.length > 0 && (
        <div>
          <h3>Search Results</h3>
          <ol>
            {restaurants.map(restaurant => (
               
              <li key={restaurant.id}>
                {restaurant.name} - {restaurant.address} - {restaurant.phone} - Zip Code: {restaurant.zipCode}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
