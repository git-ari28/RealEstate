import React from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import ImageSlider from './ImageSlider'; // Import the ImageSlider component
import { ListData, dummyData } from '../../lib/dummydata'; // Adjust the import path as necessary

const SinglePage = () => {
  const { id } = useParams(); // Get the property ID from the URL parameters
  const propertyId = parseInt(id); // Convert the ID to a number
  const property = ListData.find(item => item.id === propertyId); // Find the specific property
  const propertyDetail = dummyData.find(item => item.id === propertyId); // Fetch the property detail from dummyData

  if (!property || !propertyDetail) {
    return <div>Property not found</div>; // Handle case when property isn't found
  }

  const images = propertyDetail.images; // Use images from dummyData

  return (
    <div className="singlePage">
      <h1>{property.title}</h1>
      <ImageSlider images={images} /> {/* Pass images to the slider */}
      
      <div className="propertyContainer"> {/* New container for details and features */}
        <div className="propertyDetails">
          <p>{propertyDetail.description}</p> {/* Property description */}
          <p>Address: {property.address}</p> {/* Address */}
          <p>Price: ${property.price.toLocaleString()}</p> {/* Price formatted */}
          <p>Bedrooms: {property.bedrooms}</p> {/* Bedrooms */}
          <p>Bathrooms: {property.bathrooms}</p> {/* Bathrooms */}
        </div>

        {/* New section for property features */}
        <div className="propertyFeatures">
          <h2>Property Features</h2>
          <p><strong>Nearby Places:</strong> Park, School, Shopping Center</p> {/* Hardcoded nearby places */}
          <p><strong>Room Sizes:</strong> Living Room: 15x20, Bedroom: 12x14, Kitchen: 10x12</p> {/* Hardcoded room sizes */}
          <p><strong>Pets Allowed:</strong> Yes</p> {/* Hardcoded pets allowed */}
          <p><strong>Utilities:</strong> Water, Electricity, Gas</p> {/* Hardcoded utilities */}
          <p><strong>Location:</strong> City Center</p> {/* Hardcoded location */}
        </div>
      </div>

      {/* Buttons Section */}
      <div className="buttonContainer">
        <button className="messageButton">Send a Message</button>
        <button className="saveButton">Save the Place</button>
      </div>
    </div>
  );
};

export default SinglePage;








