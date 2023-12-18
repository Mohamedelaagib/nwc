import React from 'react';
import Map from './Mymap';
import 'leaflet/dist/leaflet.css';
import './App.css';

const App = () => {
  return (
    <div>
      <h1>NMC Map</h1>
      <Map />
    </div>
  );
};

export default App;
