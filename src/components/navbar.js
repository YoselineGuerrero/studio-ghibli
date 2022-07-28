import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Navbar(backButton) {
  let navigate = useNavigate();
  return (
    <nav style={{display: 'flex', margin: '0 5px'}}>
      {backButton.back
        ? ''
        : <button id='back-button' onClick={() => navigate(-1)}>Back</button>
      }
      <span className='center font-large' style={{margin: 'auto'}}>Studio Ghibli</span>
    </nav>
  );
}
