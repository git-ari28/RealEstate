import React from 'react';
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  return (
    <div className='card'>
      <Link to={`/${item.id}`} className="imageContainer">
        <img className="mainimg" src={item.img} alt="img" />
      </Link>
      <div className='textContainer'>
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p>
          <img src="" alt="" />
          <span>{item.address}</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
