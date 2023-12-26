import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Tooltip } from 'react-leaflet';
import iconSquare from './wc.png'; // Adjust icon path
import MarkerClusterGroup from 'react-leaflet-markercluster';

const LayerWithTooltips = ({ jsonFilePath }) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    // Fetch JSON data asynchronously
    fetch(jsonFilePath)
      .then((response) => response.json())
      .then((data) => setFeatures(data.features))
      .catch((error) => console.error('Error fetching JSON data:', error));
  }, [jsonFilePath]);

  return (
    
      <GeoJSON data={features} onEachFeature={(feature, layer) => {
        // Customize marker icon and bind tooltip
        layer.setIcon(iconSquare);
        layer.bindTooltip(feature.properties.name || feature.properties.title);
        layer.options.permanent = true; // Make tooltip permanent
      }} >

        <MarkerClusterGroup>
        {(cluster) => (
          <div>
            {cluster.layer._markers.map((marker) => (
              <customMarker feature={marker.feature} position={marker._latlng} />
            ))}
          </div>
        )}
      </MarkerClusterGroup>
      </GeoJSON>

  );
};

export default LayerWithTooltips;
