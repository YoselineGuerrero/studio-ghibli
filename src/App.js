import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/homepage.js';
import MoreInfoFilm from './pages/moreInfoFilms.js';
import MoreInfoLocation from './pages/moreInfoLocation';
import MoreInfoPeople from './pages/moreInfoPeople';
import MoreInfoSpecies from './pages/moreInfoSpecies';
import MoreInfoVehicles from './pages/moreInfoVehicles';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/Film/:id" element={<MoreInfoFilm/>}/>
          <Route path="/Location/:id" element={<MoreInfoLocation/>}/>
          <Route path="/People/:id" element={<MoreInfoPeople/>}/>
          <Route path="/Species/:id" element={<MoreInfoSpecies/>}/>
          <Route path="/Vehicles/:id" element={<MoreInfoVehicles/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
