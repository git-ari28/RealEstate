import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import './pin.scss';

const Pin = ({ item }) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <Link to={`/${item.id}`} className='popup-container'> {/* Wrapped in Link */}
          <img src={item.img} alt="" />
          <div className='textContainer'>
            <span>{item.title}</span>
          </div>
        </Link>
      </Popup>
    </Marker>
  );
};

export default Pin;

