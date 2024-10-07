import React, { useState } from 'react';
import "./searchBar.scss"

const SearchBar = () => {
  const types = ["buy", "rent"];
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='searchbar'>
      <div className='type'>
        {types.map((type) => (
          <button 
            key={type} 
            onClick={() => switchType(type)} 
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input 
          type="text" 
          name="location" 
          placeholder="City Location" 
          value={query.location}
          onChange={handleInputChange}
        />
        <input 
          type="number" 
          name="minPrice" 
          min={0} 
          max={10000000} 
          placeholder="Min Price"
          value={query.minPrice}
          onChange={handleInputChange}
        />
        <input 
          type="number" 
          name="maxPrice" 
          min={0} 
          max={100000000} 
          placeholder="Max Price"
          value={query.maxPrice}
          onChange={handleInputChange}
        />
        <button type="submit">
          <img src="path/to/your/image" alt="Search" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
