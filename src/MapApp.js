
import SideBar from './Sidebar';
import './MapApp.css'; 
import React, { useEffect, useState,  useRef} from 'react';
import {useMap, MapContainer, TileLayer, GeoJSON, CircleMarker,Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { render } from 'react-dom';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Legend from './Legand';
import WCBLOCKS_q from './Assets/WCBLOCKS_q1.geojson'
import WCBLOCKS_Point from './Assets/WCBLOCKS_Point.geojson'
import pointJosnLayer from './PointGeoJosnLayer';
import './popupTable.css'; 
import iconSquare from './Assets/svg3.svg'; 
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';






const MapApp=()=>{

    const [curentmap, setCurentMap] = useState(null);
    const center=[ 21.4136950,39.8960253];
    const [geojsonData, setGeojsonData] = useState(null);
    const [pointgeojsonData, setpointGeojsonData] = useState(null);
    const [iconSize, setIconSize] = useState(20); 
    const [sidebarOpen, setsidebarOpen] = useState(true);



    
    
    
    
    
    const TOTALPILGRIMS= useRef(1570668);
    const TotalWC = useRef(100479);
    const TotalWCComplex = useRef(3422);
    const mobileWC= useRef(0)

    
        
    const mapStatisticsf = (mWC)=>{
      const tp = TOTALPILGRIMS.current;
      const tw = TotalWC.current;
      const twc= TotalWCComplex.current;
      mobileWC.current=mWC
     
      
      return ({
      'TOTAL PILGRIMS':tp, 
      'TOTAL WC':tw,
      'TOTAL WC Complex':twc,
      'MOBILE WC':mWC
    });}
      








      const sumGeoJSONColumn=(geoJsonData, columnName) =>{
        try {
          
          let sum = 0;
      
          
          geoJsonData.features.forEach(feature => {
            const columnValue = feature.properties[columnName];

            if (!isNaN(columnValue)) {
              sum += parseFloat(columnValue);
            }
          });

          return sum;
      
        } catch (error) {
          console.error('Error loading GeoJSON file:', error);
        }
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

    const countGeoJSONColumn=(geoJsonData, columnName,countValue) =>{
      try {
        
        let count = 0;
    
        
        geoJsonData.features.forEach(feature => {
          const columnValue = feature.properties[columnName];
          
          if (countValue) {
            if(columnValue === countValue ){          
              count+=1;
            } 
          }else{count+=1}
        });
        return count;
    
      } catch (error) {
        console.error('Error loading GeoJSON file:', error);
      }
    }


  



    const mobile_WC= countGeoJSONColumn(pointgeojsonData,"CATEGORY",'متنقلة')
       




    
    const onEachPolygonFeature = (feature, layer) => {
    
        if (feature.properties) {
          let popupContent = '<table class="popup-table">'; // Start the table
          //TOTALPILGRIMS.current += feature.properties.TOTAL_PILGRIMS
         //TOTALPILGRIMS.current = feature.properties.TOTAL_PILGRIMS
         //TotalWC.current += feature.properties.TOTAL_WC_COUNT    
         
          
          for (const [key, value] of Object.entries(feature.properties)) {
            popupContent += `<tr><td><strong>${key}</strong></td><td>${value}</td></tr>`;}
      
          popupContent += '</table>'; // End the table
      
          layer.bindPopup(popupContent);}};
         
        
    const  getColor = d => {
    
            return d === -1 ? '#b6b5b5' :
                  d < 41 ? '#0a4811' :
                   d < 81  ? '#10e929' :
                   d < 121 ? '#969407' :
                   d > 121 ? '#960707' :
                              '#FFEDA0';}
    
    
        
        
    const style= (feature) =>{
            return {
                fillColor: getColor(feature.properties.WC_PER_PERSON),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7
            };}

    
                
            const culureZoom = (zoom)=>{
              return zoom < 5 ? 60 :
                    zoom < 13 ? 50 :
                    zoom < 15  ? 40 :
                    zoom < 16 ? 30 :
                    zoom < 20 ? 10 :
                                  5
            }
      
            
      const customIcon= L.icon({
          iconUrl: iconSquare,
          iconSize: [60, 60], 
          iconAnchor: [0, 0],
          popupAnchor: [0, -16],}); 
    
    
      const mapStatistics = mapStatisticsf(mobile_WC)
          
           

    
    return (
    
 
    <div className="mapAppContaier">
    
    <div className='mapApp'>
     <Button 
        onClick={() => setsidebarOpen(!sidebarOpen)}
        aria-controls="leftSidbar"
        aria-expanded={sidebarOpen}
        style={{display:'none'}}
      >
       =
      </Button>
 <> { sidebarOpen &&
    <div className='leftSidbar' id='leftSidbar' >

   
     
    <SideBar Statisc={mapStatistics}/> 
    
    
    
    </div>}</>

    <div className='nwcmap'>
        

  <MapContainer 
        center={center} 
        zoom={13} 
        attributionControl  ={false} 
        style={{ height: '78vh', width: '400vw', 'border-radius': '10px'} }  
        whenCreated={setCurentMap}>
        
        <TileLayer
        attribution='@NWC'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"/>
        
        
      
       
        
        {geojsonData &&  <GeoJSON data={geojsonData} onEachFeature={onEachPolygonFeature} style={style}/>}
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
          
          
          
          {<useMap setView = {[21.405520 , 39.900130 ]} />}
          
          
          
 

  </MapContainer>,




                
          







    </div>
    
    
    </div>




</div>

);
}
export default MapApp;