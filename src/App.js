import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetails from './components/PropertyDetails';
import EditProperty from './components/EditProperty';
import SplashPage from './components/SplashPage'; // If you have this component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PropertyGrid />} />
        <Route path="/property-details/:id" element={<PropertyDetails />} />
        <Route path="/edit-property/:id" element={<EditProperty />} />
        
        <Route path="/properties/:id" element={<SplashPage />} />
        <Route path="/*" element={"Error"} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
