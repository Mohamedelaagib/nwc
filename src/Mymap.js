import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import WCBLOCKS_q from './WCBLOCKS_q.geojson'

const Map = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  useEffect(() => {
    // Fetch the GeoJSON file from the public folder
    fetch(WCBLOCKS_q)
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((error) => console.error('Error fetching GeoJSON:', error));
  }, []);

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      let popupContent = '<table class="popup-table">'; // Start the table
  
      // Iterate through GeoJSON properties and add them to the table
      for (const [key, value] of Object.entries(feature.properties)) {
        popupContent += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;
      }
  
      popupContent += '</table>'; // End the table
  
      layer.bindPopup(popupContent);
    }
  };

  return (
    <MapContainer
      center={[ 21.4136950,39.8960253]} // Set your initial map center39.8960253°E 21.4136950°N
      zoom={13} // Set your initial zoom level
      style={{ height: '800px', width: '100%' }}
    >
      {/* Add a tile layer (replace with your preferred tile provider) */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Check if GeoJSON data is available before rendering GeoJSON layer */}
      {geojsonData && <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />}
    </MapContainer>
  );
};

export default Map;
