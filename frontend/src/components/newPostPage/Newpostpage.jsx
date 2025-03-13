import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const [postDetails, setPostDetails] = useState({
    id: "", // User ID
    title: "",
    price: "",
    address: "",
    city: "",
    bedroom: "",
    bathroom: "",
    latitude: "",
    longitude: "",
    type: "",
    property: "",
    desc: "",
    utilities: "",
    pet: "",
    income: "",
    size: "",
    school: "",
    bus: "",
    restaurant: "",
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!postDetails.title || !postDetails.price || !postDetails.address) {
      alert("Please fill out all required fields (Title, Price, Address).");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      // Append post details
      Object.keys(postDetails).forEach((key) => {
        formData.append(key, postDetails[key]);
      });

      // Append images
      images.forEach((image) => {
        formData.append("images", image);
      });

      // Send the request
      const response = await axios.post("http://localhost:8801/api/posts/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Post details added successfully!");
        navigate(`/post/${postDetails.id}`);
      } else {
        alert("Failed to add post details.");
      }
    } catch (error) {
      console.error("Error adding post details", error);
      alert("Failed to add post details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newPostPage">
      <h1>Add Post Details</h1>
      <form onSubmit={handleSubmit}>
        {/* User ID */}
        <div className="form-group">
          <label>User ID</label>
          <input
            type="text"
            name="id"
            value={postDetails.id}
            onChange={handleChange}
            required
          />
        </div>

        {/* Title */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={postDetails.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={postDetails.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={postDetails.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* City */}
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={postDetails.city}
            onChange={handleChange}
          />
        </div>

        {/* Bedroom */}
        <div className="form-group">
          <label>Bedroom</label>
          <input
            type="number"
            name="bedroom"
            value={postDetails.bedroom}
            onChange={handleChange}
          />
        </div>

        {/* Bathroom */}
        <div className="form-group">
          <label>Bathroom</label>
          <input
            type="number"
            name="bathroom"
            value={postDetails.bathroom}
            onChange={handleChange}
          />
        </div>

        {/* Latitude and Longitude */}
        <div className="form-group">
          <label>Latitude</label>
          <input
            type="text"
            name="latitude"
            value={postDetails.latitude}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Longitude</label>
          <input
            type="text"
            name="longitude"
            value={postDetails.longitude}
            onChange={handleChange}
          />
        </div>

        {/* Type and Property */}
        <div className="form-group">
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={postDetails.type}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Property</label>
          <input
            type="text"
            name="property"
            value={postDetails.property}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="desc"
            value={postDetails.desc}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Utilities */}
        <div className="form-group">
          <label>Utilities</label>
          <input
            type="text"
            name="utilities"
            value={postDetails.utilities}
            onChange={handleChange}
          />
        </div>

        {/* Other Fields */}
        <div className="form-group">
          <label>Pet Friendly</label>
          <input
            type="text"
            name="pet"
            value={postDetails.pet}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Income</label>
          <input
            type="text"
            name="income"
            value={postDetails.income}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Size</label>
          <input
            type="text"
            name="size"
            value={postDetails.size}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>School</label>
          <input
            type="text"
            name="school"
            value={postDetails.school}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Bus Station</label>
          <input
            type="text"
            name="bus"
            value={postDetails.bus}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Restaurants Nearby</label>
          <input
            type="text"
            name="restaurant"
            value={postDetails.restaurant}
            onChange={handleChange}
          />
        </div>

        {/* Image Upload */}
        <div className="form-group">
          <label>Upload Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          <div className="image-previews">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt="Preview" style={{ width: "100px", margin: "5px" }} />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Post Details"}
        </button>
      </form>
    </div>
  );
};

export default NewPostPage;






