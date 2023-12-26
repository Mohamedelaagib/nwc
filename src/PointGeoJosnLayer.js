import {MarkerClusterGroup} from 'react-leaflet-cluster'
import { Marker } from 'react-leaflet';
import L from 'leaflet';

import iconSquare from './Assets/svg3.svg';




const pointJosnLayer=(JosnData)=>{

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



return(

<MarkerClusterGroup maxClusterRadius={culureZoom}>

{JosnData.features.map((feature) => (
<Marker
key={feature.properties.No}
position={[feature.geometry.coordinates[1],feature.geometry.coordinates[0]]}
title={feature.properties.New_CODE}
icon={customIcon}
></Marker>
))}

</MarkerClusterGroup>
);
}
export default pointJosnLayer;




