import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './PropertyDetails.css';

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/properties/${id}`)
      .then(response => {
        setProperty(response.data);
      })
      .catch(() => setError('Error fetching property details'));
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="property-details-container">
      {property ? (
        <div className="property-details">
          <h1 className="property-title">Property Details</h1>
          <div className="property-info">
            <div className="property-info-item">
              <span className="property-info-label">Title:</span>
              <span className="property-info-value">{property.title}</span>
            </div>
            <div className="property-info-item">
              <span className="property-info-label">City:</span>
              <span className="property-info-value">{property.location?.city}</span>
            </div>
            <div className="property-info-item">
              <span className="property-info-label">State:</span>
              <span className="property-info-value">{property.location?.state}</span>
            </div>
            <div className="property-info-item">
              <span className="property-info-label">Country:</span>
              <span className="property-info-value">{property.location?.country}</span>
            </div>
            <div className="property-info-item">
              <span className="property-info-label">Amount:</span>
              <span className="property-info-value">${property.price?.amount.toLocaleString()}</span>
            </div>
            
            {/* <div className="property-info-item">
              <span className="property-info-label">Description:</span>
              <span className="property-info-value">{property.splashPage?.description}</span>
            </div> */}
            <div className="property-info-item">
              <span className="property-info-label">WiFi Name:</span>
              <span className="property-info-value">{property['wifi-details']?.wifiName}</span>
            </div>
            <div className="property-info-item">
              <span className="property-info-label">WiFi Password:</span>
              <span className="property-info-value"> {property['wifi-details']?.wifiPassword}</span>
            </div>
          </div>
          <button className="back-button" onClick={() => navigate('/')}>Back to List</button>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

export default PropertyDetails;
