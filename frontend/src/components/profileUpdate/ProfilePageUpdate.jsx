import React, { useState } from 'react';
import axios from 'axios';
import './profilePageUpdate.scss';

const ProfilePageUpdate = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    const userData = {
      username,
      email,
      password,
    };

    try {
      // Retrieve token from localStorage or wherever it is stored
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to update your profile');
        return;
      }

      const response = await axios.put(
        'http://localhost:8801/api/auth/update', 
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token in headers for authentication
          },
        }
      );
      setSuccess('Profile updated successfully!');
      setError('');
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="profile-update-container">
      <h2>Update Profile</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="profile-update-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your new username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your new email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
          />
        </div>

        <button type="submit" className="update-btn">Update</button>
      </form>
    </div>
  );
};

export default ProfilePageUpdate;
