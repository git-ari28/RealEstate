import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./listPage.scss";

import Filter from "../../components/filter/filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/map";

const ListPage = () => {
  const [posts, setPosts] = useState([]); // State to store posts

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8801/api/posts/all'); // Replace with your actual API endpoint
        console.log(response.data);
        setPosts(response.data); // Update state with fetched posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div className='listPage'>
      <div className='listcontainer'>
        <div className='wrapper'></div>
        <Filter />
        {posts.length > 0 ? (
          posts.map(item => (
            
            <Card key={item._id} item={item} /> // Assuming each post has a unique _id
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
      <div className="mapcontainer">
        <Map items={posts} />
      </div>
    </div>
  );
};

export default ListPage;
