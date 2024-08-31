import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './EditProperty.css'; // Ensure this file is created for styling

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [amount, setAmount] = useState('');
  const [logoUrl, setLogoUrl] = useState('');  // New state for logo URL
  const [bgUrl, setBgUrl] = useState('');      // New state for background image URL
  const [description, setDescription] = useState('');  // New state for description
  const [wifiName, setWifiName] = useState('');  // New state for WiFi name
  const [wifiPassword, setWifiPassword] = useState('');  // New state for WiFi password
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/properties/${id}`)
      .then(response => {
        setProperty(response.data);
        setTitle(response.data.title);
        setCity(response.data.location.city);
        setState(response.data.location.state);
        setCountry(response.data.location.country);
        setAmount(response.data.price.amount); // Set initial amount
        setLogoUrl(response.data['splash-page'][0].logo || ''); // Set initial logo URL
        setBgUrl(response.data['splash-page'][0].background_img || ''); // Set initial background image URL
        setDescription(response.data.description || ''); // Set initial description
        setWifiName(response.data['wifi-details'].wifiName || ''); // Set initial WiFi name
        setWifiPassword(response.data['wifi-details'].wifiPassword || ''); // Set initial WiFi password
      })
      .catch(() => setError('Error fetching property details'));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedProperty = {
      title,
      location: { city, state, country },
      price: { amount },
      description,
      'splash-page': [
        {
          logo: logoUrl,
          background_img: bgUrl,
        }
      ],
      'wifi-details': {
        wifiName,
        wifiPassword
      }
    };

    axios.put(`http://localhost:8000/properties/${id}`, updatedProperty)
      .then(() => {
        navigate(`/property-details/${id}`);
      })
      .catch(() => setError('Error updating property details'));
  };

  return (
    <div className="edit-property-container">
      {error && <p className="error-message">{error}</p>}
      {property ? (
        <div className="edit-property-form">
          <h1>Edit Property</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="logoUrl">Logo URL:</label>
              <input
                id="logoUrl"
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bgUrl">Background Image URL:</label>
              <input
                id="bgUrl"
                type="text"
                value={bgUrl}
                onChange={(e) => setBgUrl(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="wifiName">WiFi Name:</label>
              <input
                id="wifiName"
                type="text"
                value={wifiName}
                onChange={(e) => setWifiName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="wifiPassword">WiFi Password:</label>
              <input
                id="wifiPassword"
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="save-button">Save</button>
              <Link to={`/property-details/${id}`}>
                <button type="button" className="cancel-button">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
}

export default EditProperty;
