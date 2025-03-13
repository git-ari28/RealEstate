import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Card = ({ item }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPostById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8801/api/posts/${item._id}`
        );
        if (response.data && response.data.img && response.data.img.length > 0) {
          setPost(response.data);
        } else {
          setError("No images uploaded");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post", error);
        setError("Failed to fetch post data");
        setLoading(false);
      }
    };

    if (item._id) {
      getPostById();
    }
  }, [item._id]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show the error message
  }

  if (!post) {
    return <div>Post not found</div>; // Fallback message if post is not found
  }

  // Filter out empty strings from the images array
  const validImages = post.img.filter((image) => image && image.trim() !== "");

  if (validImages.length === 0) {
    return <div>No images available</div>; // Handle case if no valid images
  }

  return (
    <div className="card">
      {/* Image Section */}
      <div className="imageContainer">
        <Link to={`/post/${post._id}`}>
          <img
            className="mainimg"
            style={{ height: "150px", width: "150px", objectFit: "cover" }}
            src={validImages[0]}
            alt="img"
          />
        </Link>
      </div>

      {/* Text Section */}
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h2>
        <p className="address">{post.address}</p>
      </div>
    </div>
  );
};

export default Card;




