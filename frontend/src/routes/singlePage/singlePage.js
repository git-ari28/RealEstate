import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For getting the ID from the URL
import ImageSlider from './ImageSlider'; // Import the ImageSlider component
import axios from 'axios'; // To fetch property details

const SinglePage = () => {
  const { id } = useParams(); // Get the property ID from the URL parameters
  const [property, setProperty] = useState(null); // State to store property data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Function to fetch property details by ID
    const fetchPropertyById = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`); // Replace with your actual API endpoint
        setProperty(response.data); // Set the fetched data in state
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch property details.'); // Handle errors
        setLoading(false);
      }
    };

    fetchPropertyById(); // Fetch property data when component mounts
  }, [id]);

  if (loading) return <div>Loading...</div>; // Show a loading state
  if (error) return <div>{error}</div>; // Show error message if request fails
  if (!property) return <div>Property not found</div>; // If no property is found

  const { title, price, img, address, city, bedroom, bathroom, desc, size, utilities, pet, school, bus, restaurant } =
    property; // Destructure property details

  return (
    <div className="singlePage" style={{ display: 'flex', gap: '20px' }}>
      {/* Left Side - Image Slider */}
      <div className="imageSliderContainer" style={{ flex: '1' }}>
        <ImageSlider images={img} /> {/* Pass the images array to the ImageSlider */}
      </div>

      {/* Right Side - Property Details */}
      <div className="propertyDetailsContainer" style={{ flex: '1' }}>
        <h1>{title}</h1>
        <p><strong>Price:</strong> ${price.toLocaleString()}</p>
        <p><strong>Address:</strong> {address}, {city}</p>
        <p><strong>Description:</strong> {desc}</p>
        <p><strong>Size:</strong> {size}</p>
        <p><strong>Bedrooms:</strong> {bedroom}</p>
        <p><strong>Bathrooms:</strong> {bathroom}</p>
        <p><strong>Utilities:</strong> {utilities}</p>
        <p><strong>Pets Allowed:</strong> {pet}</p>
        <p><strong>Nearby Schools:</strong> {school}</p>
        <p><strong>Nearby Bus Stops:</strong> {bus}</p>
        <p><strong>Restaurants Nearby:</strong> {restaurant}</p>

        {/* Buttons Section */}
        <div className="buttonContainer" style={{ marginTop: '20px' }}>
          <button className="messageButton" style={{ marginRight: '10px', padding: '10px 20px', cursor: 'pointer' }}>
            Send a Message
          </button>
          <button className="saveButton" style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Save the Place
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;









