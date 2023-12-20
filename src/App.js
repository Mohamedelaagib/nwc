import React from 'react';
import Map from './Mymap';
import 'leaflet/dist/leaflet.css';
import './App.css';
import Header from './Header';


const App = () => {
  

  
  return (
    <div>
      
      <header>
      <Header/>   
      </header>
      
        
      <Map   />
     
      
    </div>
  );
};

export default App;
