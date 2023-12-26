import React, { useEffect, useState,  useRef} from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker,Marker, ZoomControl } from 'react-leaflet';
import Legend from './Legand';
import L from 'leaflet';
import WCBLOCKS_q from './WCBLOCKS_q1.geojson'
import WCBLOCKS_Point from './WCBLOCKS_Point.geojson'
import Sidebar from './Sidebar';
import iconSquare from './svg3.svg'; // Adjust icon path
import MarkerClusterGroup from 'react-leaflet-cluster'



import GeoJSONMap from './GeojosnPointLayer';


const Map = () => {
  const [geojsonData, setGeojsonData] = useState(null);
  const [pointgeojsonData, setpointGeojsonData] = useState(null);
  const [map, setMap] = useState(null);
  const [iconSize, setIconSize] = useState(20); 
  const TOTALPILGRIMS = useRef(1570668);
  const TotalWC = useRef(100479);
  const TotalWCComplex = useRef(3422);
  
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
  .catch((error) => console.error('Error fetching point GeoJSON:', error));
}, []);

const customIcon= L.icon({
  iconUrl: iconSquare,
  iconSize: [60, 60], // Set the icon size dynamically
  iconAnchor: [0, 0],
  popupAnchor: [0, -16],
});
const createClusterCustomIcon  = (cluster)=> {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true)
  });
};


const onEachFeature1=(feature, layer) => {
  // Customize marker icon and bind tooltip
  
  const iconSquare1  = L.icon({
    iconUrl: iconSquare,
    iconSize: [20, 20], // Set the icon size dynamically
    iconAnchor: [10, 10],
    popupAnchor: [0, -16],
  });
  
  layer.setIcon(iconSquare1);
  layer.bindTooltip(feature.properties.New_CODE);
  layer.options.permanent = true; // Make tooltip permanent
}

  const  getColor = d => {
    
    return d === -1 ? '#b6b5b5' :
          d < 41 ? '#0a4811' :
           d < 81  ? '#10e929' :
           d < 121 ? '#969407' :
           d > 121 ? '#960707' :
                      '#FFEDA0';
}

const updateIconSize = () => {
  if (map) {
    const currentZoom = map.getZoom();
    // Set the icon size based on the current zoom level (adjust this formula as needed)
    const newSize = Math.max(8, Math.min(16, 10 * Math.pow(1.2, currentZoom - 13)));
    setIconSize(newSize);
  }
};

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

const culureZoom = (zoom)=>{
  return zoom < 5 ? 60 :
        zoom < 13 ? 50 :
        zoom < 15  ? 40 :
        zoom < 16 ? 30 :
        zoom < 20 ? 10 :
                      5
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
  
  useEffect(() => {
  
    if (map) {
      map.on('zoomend', updateIconSize(map.z));
    }


    return () => {
      if (map) {
        map.off('zoomend', updateIconSize);
        console.log(iconSize)
      }
    };
  }, [map]);


  return (
    
  
   <div className='nwcmap'>
    <Sidebar className ='mainSidebar' statistics={mapStatistics}/>
    
    <MapContainer className='map' attributionControl  ={false}
    
  
      center={[ 21.4136950,39.8960253]} // Set your initial map center39.8960253°E 21.4136950°N
      zoom={16} // Set your initial zoom level
      
      style={{ height: '90vh', width: '400vw' }}
      whenCreated={setMap}
      
    >
      
      {/* Add a tile layer (replace with your preferred tile provider) */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="@NWC"
        prefix= ""
       
      />

      
      {geojsonData &&  <GeoJSON data={geojsonData} onEachFeature={onEachFeature} style={style}/>
      
      
      
      
      
      
      }

      
        
      {pointgeojsonData&& <MarkerClusterGroup maxClusterRadius={culureZoom}>

        {pointgeojsonData.features.map((feature) => (
      <Marker
        key={feature.properties.No}
        position={[feature.geometry.coordinates[1],feature.geometry.coordinates[0]]}
        title={feature.properties.New_CODE}
        icon={customIcon}
      ></Marker>
    ))}

      </MarkerClusterGroup>}
  




   
      

   
    </MapContainer>
    </div>
  );
};

export default Map;
/*{pointgeojsonData && <GeoJSON data={pointgeojsonData} pointToLayer={pointToLayer} />}
{pointgeojsonData && <GeoJSONMap pgeojsonData={pointgeojsonData}/>}

export default React.memo(Map);


{pointgeojsonData && <GeoJSON data={pointgeojsonData} onEachFeature={onEachFeature1} />}
 



      {(geojsonData &&

<MarkerClusterGroup chunkedLoading>
    {pointgeojsonData.features.map((feature) => (
      <Marker
        key={feature.properties.No}
        position={feature.geometry.coordinates}
        title={feature.properties.New_CODE}
        icon={customIcon}
      ></Marker>
    ))}
  </MarkerClusterGroup>

      )} 






*/