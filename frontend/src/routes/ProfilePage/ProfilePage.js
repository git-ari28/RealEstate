import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import PropertyUpload from "./PropertyUpload"; 

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    avatar: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false); 
  const [showPropertyUpload, setShowPropertyUpload] = useState(false); 
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch user details
  useEffect(() => {
    axios
      .get("http://localhost:8801/api/auth/user-details", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [token, updateTrigger]); 

  // Handle text field changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle avatar file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, avatar: imageUrl })); // Preview before upload
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    try {
      const res = await axios.put("http://localhost:8801/api/auth/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Profile updated successfully! 🎉");

     
      setUpdateTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <h2>Update Profile</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="profile-avatar">
          <img
            src={user.avatar ? `${user.avatar}?t=${Date.now()}` : "/default-avatar.png"}
            alt="User Avatar"
          />
          <label className="upload-btn">
            Change Avatar
            <input type="file" onChange={handleFileChange} hidden />
          </label>
        </div>

        <label>Username</label>
        <input type="text" name="username" value={user.username} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" value={user.email} disabled />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

     
      <button className="toggle-property-btn" onClick={() => setShowPropertyUpload(!showPropertyUpload)}>
        {showPropertyUpload ? "Close Property Upload" : "Post a Property"}
      </button>

      
      {showPropertyUpload && <PropertyUpload userId={user._id} onPropertyAdded={() => setUpdateTrigger(!updateTrigger)} />}
    </div>
  );
};

export default Profile;








