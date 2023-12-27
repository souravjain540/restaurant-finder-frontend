import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from '/Users/sauravjain/projects/my-restaurant-app/src/components/restaurantList.js';
import RestaurantForm from '/Users/sauravjain/projects/my-restaurant-app/src/components/restaurantForm.js';
import SearchForm from '/Users/sauravjain/projects/my-restaurant-app/src/components/searchForm.js';
import '/Users/sauravjain/projects/my-restaurant-app/src/index.css'; // Import the CSS file

function App() {
  const handleSearch = (searchResults) => {
    // Handle the search results (e.g., update state)
    console.log('Search results:', searchResults);
  };
  const handleFormSubmit = (newRestaurantData) => {
    // Update the state with the new restaurant data
    console.log('Restaurant data: ',newRestaurantData);
  };
  return (
    <Router>
      <div className="App">
        <h1>Restaurant Finder</h1>
        
        <Routes>
          <Route path="/" element={<SearchForm onSearch={handleSearch} />} />
          <Route path="/restaurants" element={<RestaurantList />} />
          <Route path="/restaurants/add" element={<RestaurantForm onFormSubmit={handleFormSubmit}/>}/>
          <Route path="/restaurants/edit/:id" element={<RestaurantForm />} />
        </Routes>
      </div>
      <footer>
  <p>Created by: Saurav Jain</p>
  <a href="https://x.com/Sauain">(Follow me on Twitter)</a><br></br>
  <a href ="https://amplication.com/">Backend Powered by Amplication</a>
</footer>
    </Router>
  );
}

export default App;
