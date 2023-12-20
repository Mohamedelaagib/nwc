import React, { useEffect, useState,  useRef} from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import Legend from './Legand';
import L from 'leaflet';
import WCBLOCKS_q from './WCBLOCKS_q1.geojson'
import WCBLOCKS_Point from './WCBLOCKS_Point.geojson'
import Sidebar from './Sidebar';






const Map = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [pointgeojsonData, setpointGeojsonData] = useState(null);
  const [map, setMap] = useState(null);
  const TOTALPILGRIMS = useRef(1570668)
  const TotalWC = useRef(35978)
  const TotalWCComplex = useRef(2029)
  
  let mapStatistics = {
    'TOTAL PILGRIMS': TOTALPILGRIMS.current,
    
    'TOTAL WC':TotalWC.current,
    'TOTAL WC Complex':TotalWCComplex.current
  }

  useEffect(() => {

    // Fetch the GeoJSON file from the public folder
    fetch(WCBLOCKS_q)
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((error) => console.error('Error fetching GeoJSON:', error));
  
  fetch(WCBLOCKS_Point)
  .then((response) => response.json())
  .then((pointdata) => setpointGeojsonData(pointdata))
  .catch((error) => console.error('Error fetching GeoJSON:', error));
}, []);



  const  getColor = d => {
    
    return d === -1 ? '#b6b5b5' :
          d < 41 ? '#0a4811' :
           d < 81  ? '#10e929' :
           d < 121 ? '#969407' :
           d > 121 ? '#960707' :
                      '#FFEDA0';
}


const pointToLayer = (feature, latlng) => {
  // Customize the marker style
  const markerOptions = {
    radius: 2.5,
    fillColor: '#220781', // Blue fill color
    color: '#ffffff', // White border color
    weight: .5,
    opacity: 1,
    fillOpacity: 0.8,
  };

  return L.circleMarker(latlng, markerOptions);
};



const style= (feature) =>{
  return {
      fillColor: getColor(feature.properties.WC_PER_PERSON),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

  



const onEachFeature = (feature, layer) => {
    
    
    if (feature.properties) {
      let popupContent = '<table class="popup-table">'; // Start the table
      //TOTALPILGRIMS.current += feature.properties.TOTAL_PILGRIMS
      
      

     //TOTALPILGRIMS.current = feature.properties.TOTAL_PILGRIMS
     //TotalWC.current += feature.properties.TOTAL_WC_COUNT    
     mapStatistics = {
      'TOTAL PILGRIMS': TOTALPILGRIMS.current,
      
      'TOTAL WC':TotalWC.current,}



      // Iterate through GeoJSON properties and add them to the table
      for (const [key, value] of Object.entries(feature.properties)) {
        popupContent += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
      }
  
      popupContent += '</table>'; // End the table
  
      layer.bindPopup(popupContent);
    
    
  }

    

    
  };
  



  return (
    
  
   <div className='nwcmap'>
    <Sidebar statistics={mapStatistics}/>
    
    <MapContainer attributionControl  ={false}
    
  
      center={[ 21.4136950,39.8960253]} // Set your initial map center39.8960253°E 21.4136950°N
      zoom={13} // Set your initial zoom level
      
      style={{ height: '90vh', width: '400vw' }}
      whenCreated={setMap}
    >
      {/* Add a tile layer (replace with your preferred tile provider) */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="@NWC"
        prefix= ""
       
      />

      {/* Check if GeoJSON data is available before rendering GeoJSON layer */}
      {geojsonData && <GeoJSON data={geojsonData} onEachFeature={onEachFeature} style={style}/>}
      
      {pointgeojsonData && <GeoJSON data={pointgeojsonData} pointToLayer={pointToLayer}/>}
      
      
      <Legend map={map} />
    </MapContainer>
    </div>
  );
};

export default Map;
