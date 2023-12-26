import * as React from 'react';
import RecipeReviewCard from './Card';
import { useState } from 'react';
import { Paper,Card } from '@mui/material';
import Legend from './Legand';
import SelectArea from './SelectArea';

const SideBar = ({Statisc,  map })=>{

    console.log('Statistics')
    
    console.log(Statisc)
    console.log('Statistics')
   
    
    return(
    <>
   
    <RecipeReviewCard  StatiscticValues={Statisc}/>
    <Paper sx={{background: 'rgb(255,255,255,.4)', padding:'2px', margin:'2px', marginTop:'40px'} } >
        <Legend/>
    </Paper>
    
    </>

        
    )
}
export default SideBar;
