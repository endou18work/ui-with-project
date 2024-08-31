import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./SplashPage.css";
function SplashPage() {
  const { id } = useParams();
  // const [property, setProperty] = useState(null);
  const [hide, setHide]= useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [wifiDetails, setWifiDetails] = useState(null);
  const [error, setError] = useState(null);
  const [propertyData, setPropertyData] = useState({
    logo: "",
    backgroundImg: "",
    title: "",
    description: "",
    wifiName: "",
    wifiPassword: "",
  });
  useEffect(() => {
    // Ensure the `id` is used in the request URL
    axios.get(`http://localhost:8000/properties/${id}`)
      .then((response) => {
        const data = response.data;
        if (data) {  // Assuming data is an object, not an array
          const splashPage = data["splash-page"] ? data["splash-page"][0] : {};
          const wifiDetails = data["wifi-details"] || {};
  
          setPropertyData({
            logo: splashPage.logo || "",
            backgroundImg: splashPage.background_img || "",
            title: data.title || "",
            description: data.description || "",
            wifiName: wifiDetails.wifiName || "",
            wifiPassword: wifiDetails.wifiPassword || "",
          });
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]); // Dependency on 'id' ensures re-fetching on URL change
  
  const backgroundChange = {
    backgroundImage: `url(${propertyData.backgroundImg})`,
    backgroundSize: "cover", // Optional: Adjusts the size of the image
    backgroundPosition: "center", // Optional: Centers the image
    backgroundRepeat: "no-repeat" // Optional: Prevents repeating the image
  };


  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  const handleConnect = () => {
    const postData = { firstName, lastName, email };

    axios.post('http://localhost:8000/connect', postData)
      .then(() => {
        return axios.get(`http://localhost:8000/properties/${id}`);
      })
      .then(response => {
        // Ensure `response.data` contains `wifi-details`
        if (response.data['wifi-details']) {
          setWifiDetails(response.data['wifi-details']);
        } else {
          setError('No WiFi details found');
        }
      })
      .catch(() => setError('Error connecting to the property'));
      handleClear();
      setHide(true);
  };

  // const splashPageData = property && property['splash-page'] && property['splash-page'][0];

  return (
    <div style={backgroundChange}>

      <div className='navbar'>
        <div className='width'>
          <div className='logo'>
            <img className='logo-img' src={propertyData.logo} alt="Property Logo" />
          </div>
          <div className='blank-container'>

          </div>
        </div>
      </div>
      <div className='hero-section'>
        <div className='hero-inner-section'>
          <div className='form-section'>
            <h1>{propertyData.title}</h1>
            {console.log(propertyData.title)}
            <form className='form-att'>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type="button" className='submit-button ' onClick={handleConnect}>Connect</button>
              <button type="button" className='clear-buttons' onClick={handleClear}>Clear</button>
            </form>
          </div>
          <div className='text-section'>
            <p>{propertyData.description}</p>
          </div>
        </div>
      </div>
      {hide && <div className='wifi-container'>
        <div className='wifi-inner-container'>
          <h2>Wifi Details</h2>
          <div className='wifi-details'>
            <h4>Wifi: {propertyData.wifiName}</h4>
            <h4>Password: {propertyData.wifiPassword}</h4>
          </div>
        </div>
      </div>}
      
    </div>
  );
}

export default SplashPage;
