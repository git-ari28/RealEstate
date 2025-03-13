import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal"; 
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PropertyList.scss";

Modal.setAppElement("#root"); 

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedImages, setSelectedImages] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch properties
  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8801/api/properties");
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    applyFilters(value, priceFilter, locationFilter);
  };

  // Handle filter changes
  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceFilter(value);
    applyFilters(searchQuery, value, locationFilter);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value.toLowerCase();
    setLocationFilter(value);
    applyFilters(searchQuery, priceFilter, value);
  };

  // Apply filters based on search, price, and location
  const applyFilters = (search, price, location) => {
    let filtered = properties;

    if (search) {
      filtered = filtered.filter((property) =>
        property.title.toLowerCase().includes(search)
      );
    }

    if (price) {
      const [min, max] = price.split("-").map(Number);
      filtered = filtered.filter(
        (property) => property.price >= min && property.price <= max
      );
    }

    if (location) {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(location)
      );
    }

    setFilteredProperties(filtered);
  };

  
  const openModal = (images) => {
    setSelectedImages(images);
    setIsModalOpen(true);
  };

 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
  };

  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="property-list-container">
      <h2>Properties</h2>

      {/* Search and Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <select onChange={handlePriceChange}>
          <option value="">Filter by Price</option>
          <option value="0-50000">Below $50,000</option>
          <option value="50000-100000">$50,000 - $100,000</option>
          <option value="100000-200000">$100,000 - $200,000</option>
          <option value="200000-500000">$200,000 - $500,000</option>
          <option value="500000-1000000">Above $500,000</option>
        </select>

        <input
          type="text"
          placeholder="Filter by Location..."
          value={locationFilter}
          onChange={handleLocationChange}
        />
      </div>

      {/* Property Cards */}
      <div className="property-grid">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property._id} className="property-card">
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p><strong>Price:</strong> ${property.price}</p>
              <p><strong>Location:</strong> {property.location}</p>

              
              {property.images && property.images.length > 0 && (
                <img
                  src={property.images[0]} // Show first image
                  alt="Property"
                  onClick={() => openModal(property.images)}
                  style={{ width: "100%", cursor: "pointer" }}
                />
              )}
            </div>
          ))
        ) : (
          <p className="no-results">No properties found.</p>
        )}
      </div>

     
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal-content">
          <button onClick={closeModal} className="close-btn">Close</button>
          <Slider {...sliderSettings}>
            {selectedImages.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`Slide ${index}`} style={{ width: "100%" }} />
              </div>
            ))}
          </Slider>
        </Modal>
      )}
    </div>
  );
};

export default PropertyList;
