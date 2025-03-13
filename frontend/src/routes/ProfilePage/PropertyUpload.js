import React, { useState } from "react";
import axios from "axios";

const PropertyUpload = ({ onPropertyAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

 
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      alert("You can upload a maximum of 5 images!");
      return;
    }
    setImages(selectedFiles);

    // Preview image URLs
    const imagePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(imagePreviews);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price || !location || images.length === 0) {
      alert("Please fill in all fields and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    images.forEach((image) => formData.append("images", image));

    try {
      await axios.post("http://localhost:8801/api/properties/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Property added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setLocation("");
      setImages([]);
      setPreviewUrls([]);
      onPropertyAdded();
    } catch (error) {
      console.error("Error uploading property:", error);
      alert("Failed to upload property. Please try again.");
    }
  };

  return (
    <div className="property-upload">
      <h2>Post a New Property</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" placeholder="Property Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="file" accept="image/*" multiple onChange={handleImageChange} required />

       
        <div className="image-preview">
          {previewUrls.map((url, index) => (
            <img key={index} src={url} alt={`Preview ${index}`} />
          ))}
        </div>

        <button type="submit">Upload Property</button>
      </form>
    </div>
  );
};

export default PropertyUpload;

