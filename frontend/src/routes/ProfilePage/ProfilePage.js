import React from 'react';
import './ProfilePage.scss';
import Chat from '../../components/Chat/Chat';

const ProfilePage = () => {
  return (
    <div className="profilePageContainer">
      {/* Left Section with Profile Information */}
      <div className="leftSection">
        {/* User Information Section */}
        <div className="userInfo">
          <h2>User Information</h2>
          <div className="userDetails">
            <img src="/avatar.png" alt="User Avatar" className="avatar" />
            <div className="userText">
              <p><strong>Username:</strong> John Doe</p>
              <p><strong>Email:</strong> john@example.com</p>
            </div>
          </div>
          <button className="updateProfileBtn">Update Profile</button>
        </div>

        {/* Create New Post Section */}
        <div className="createPost">
          <button className="createPostBtn">Create New Post</button>
        </div>

        {/* Saved List Section */}
        <div className="savedList">
          <h2>Saved List</h2>
          {/* Additional content for saved list can go here */}
        </div>
      </div>

      {/* Right Section with Chatbox */}
      <div className="chatbox">
        <h2>Chatbox</h2>
        <Chat/>
      </div>
    </div>
  );
};

export default ProfilePage;
