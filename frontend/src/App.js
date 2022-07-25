import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from './pages/home';
import Profile from './pages/profile';
import Login from './pages/login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route exact path="/timeline" element={<Home />} />
        <Route exact path="/userprofile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
