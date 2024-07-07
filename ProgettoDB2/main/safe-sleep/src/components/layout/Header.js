import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav className="navbar">
        <a href="#home">Home</a>
        <a href="#crud">CRUD</a>
        <a href="#metrics">Metrics</a>
        <a href="#info">Info</a>
      </nav>
    </header>
  );
}

export default Header;

