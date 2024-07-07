import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Crud from './components/pages/Crud';
import Metrics from './components/pages/Metrics';
import Info from './components/pages/Info';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/crud" element={<Crud />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/info" element={<Info />} />
        {/* Puoi aggiungere altre rotte qui */}
      </Routes>
    </Router>
  );
}

export default App;

