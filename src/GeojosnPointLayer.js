
import React from "react";
import 'leaflet/dist/leaflet.css';

import * as l from 'leaflet';

import {  GeoJSON } from "react-leaflet";
import L, { divIcon, icon } from "leaflet";


const pointToLayer1 = (feature, latlng) => {
    // Customize the marker style
    const markerOptions = {
      radius: 0,
      fillColor: '#220781', // Blue fill color
      color: '#ffffff', // White border color
      weight: .5,
      opacity: 1,
      fillOpacity: 0.8,
    };

    const customMarkerIcon = (name) =>
    divIcon({
        icon:'o',
      html: name,
      className: "icon"
    });



    const pointm= L.marker(latlng, { icon: " " });
  
    pointm.bindTooltip(`<div> ${feature.properties.New_CODE}</div>`,{direction:"top"},{alwaysOpen: true} , {permanent:true});
    
    return pointm
  };

const GeoJSONMap = ({pgeojsonData})=>{
    const customMarkerIcon = (name) =>
    divIcon({
      html: name,
      className: "icon"
    });

  const setIcon = ({ properties }, latlng) => {
    return L.marker(latlng, { icon: customMarkerIcon(properties.No) });
    
  };



return(
<GeoJSON data={pgeojsonData} onEachFeature={pointToLayer1} />


);

};



export default GeoJSONMap;
