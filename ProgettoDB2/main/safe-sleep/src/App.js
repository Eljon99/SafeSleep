import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import CrudP from './components/pages/CrudP';
import Metrics from './components/pages/Metrics';
import Info from './components/pages/Info';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/crud" element={<CrudP />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/info" element={<Info />} />
        {/* Puoi aggiungere altre rotte qui */}
      </Routes>
    </Router>
  );
}

export default App;

