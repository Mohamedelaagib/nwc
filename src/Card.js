import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Avatar, CardContent, CardHeader, CardActionArea } from '@mui/material';
import PligrimAvatar from './Assets/T2MPxx01.svg';
import TOTAL_WC_Complex from './Assets/waterc.svg'
import Water_Drop from './Assets/water-drop-in-bg.svg'
import Faucet from './Assets/faucet.svg'
import MobileWCPIC from './Assets/mobile.svg'

export default function RecipeReviewCard({StatiscticValues}) {
  const mapStatistics1 = {
    'TOTAL PILGRIMS': 1570668,
    'TOTAL WC': 100479,
    'TOTAL WC Complex': 3422,
  };
  
  const mapStatistics =StatiscticValues
  console.log("mapStatistics last")
  console.log(mapStatistics['TOTAL PILGRIMS'])
  console.log("mapStatistics last")
  const avatarDict = {
    'TOTAL PILGRIMS': PligrimAvatar,
    'TOTAL WC': TOTAL_WC_Complex,
    'TOTAL WC Complex': Faucet,
    'MOBILE WC':MobileWCPIC
  };

  return (
    <div className='main-card-div'>
      {Object.entries(mapStatistics).map(([label, value]) => (
        <Card className= {label} key={label} elevation={6} sx={{ margin: 1.2, maxWidth: 300, maxHeight:80, background: 'rgb(255,255,255,.4)',backgroundImage:`${Water_Drop}` }}>
          <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar 
              alt="Avatar image"
              src= {avatarDict[label] } 
              sx={{ width: 20, height: 20, position: 'absolute', top: 0, left: 0, transform: 'translate(-1%, -1%)', fill:'blue'}}
            />
            <CardContent sx={{ textAlign: 'center', padding:0}}>
              <CardHeader
                title={label}
                titleTypographyProps={{ variant: 'subtitle2' ,sx:{color:'#58575c', font:'1.2em georgia blod'}} }

                subheader={value}
                subheaderTypographyProps={{sx:{font:'1.5em  blod', color:'#4474a3'}}}
              />
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}
