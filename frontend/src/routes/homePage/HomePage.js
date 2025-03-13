import React, { useState, useEffect } from "react";
import "./homePage.css";
import PropertyList from "../../components/searchBar/PropertyList";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="homePage">
      <div className="textcontainer">
        <div className="wrapper">
          <h1 className="title">Real Estate for You</h1>
          <p>Find the best properties suited to your needs.</p>

          {/* Show PropertyList if logged in, otherwise show platform details */}
          {user ? (
            <PropertyList />
          ) : (
            <div className="platform-details">
              <p>Welcome to our platform! Here’s what we offer:</p>
              <div className="boxes">
                <div className="box">
                  <h1>16+</h1>
                  <h2>Years of Experience</h2>
                </div>
                <div className="box">
                  <h1>200</h1>
                  <h2>Awards Gained</h2>
                </div>
                <div className="box">
                  <h1>12000+</h1>
                  <h2>Properties Rented</h2>
                </div>
              </div>
              <p className="login-message">Please log in to explore properties!</p>
            </div>
          )}
        </div>
      </div>

      <div className="imgContainer">
      <img
  src="https://media.istockphoto.com/id/1159873271/photo/residential-area-in-the-city-modern-apartment-buildings.jpg?s=1024x1024&w=is&k=20&c=1gbLy7yUxgRLnK1H4zMIUi08Vsg62Ye_s0jOmDMWYq0="
  alt="Real Estate"
  style={{ width: 500, height: 500, objectFit: "cover" }}
/>


      </div>
    </div>
  );
};

export default HomePage;
