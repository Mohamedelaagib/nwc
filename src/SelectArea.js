import React from 'react';
import Form from 'react-bootstrap/Form';
import { Map } from 'leaflet';

const ARAFAT_CENTER= [21.351104 , 39.977129 ]
const  MOZDALIFA_CENER= [21.371167 ,39.936773]
const MINA_CENTER= [21.405520 , 39.900130 ]
const changeCenter=()=>{

  return
}
function SelectArea() {
  return (
    <Form.Select aria-label="select" size ={3} style={{backgroundColor:'AppWorkspace'}}>
      
      <option value="1">All </option>
      <option value="2">MINA</option>
      <option value="2">MOZDALIFA</option>
      <option value="3" onClick={changeCenter}>ARAFAT</option>
    </Form.Select>
  );
}

export default SelectArea;