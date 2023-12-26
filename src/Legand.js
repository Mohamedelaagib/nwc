import React from 'react';
import './Legend.css';

const Legend = () => {
    return (
        <div className="legend">
            <div className='Lname'>Pilgrim/ WC Distribution</div>
            <div style={{ "--color": '#960707'}}>Above 120</div>
            <div style={{ "--color": '#969407' }}>80-120</div>
            <div style={{ "--color": '#10e929' }}>40-80</div>
            <div style={{ "--color": '#0a4811' }}>0-40</div>
            <div style={{ "--color": '#b6b5b5' }}>null</div>
        </div>
    );
}
export default Legend

