import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ items }) => {
  return (
    <MapContainer className="map" center={[34.0522, -118.2437]} zoom={7} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {items.map(item => {
        const { latitude, longitude, title, id } = item;
        // Only render markers for items with valid latitude and longitude
        if (latitude !== undefined && longitude !== undefined) {
          return (
            <Marker key={id} position={[latitude, longitude]}>
              <Popup>{title}</Popup>
            </Marker>
          );
        }
        return null; // Skip rendering if latitude or longitude is invalid
      })}
    </MapContainer>
  );
};

export default Map;
