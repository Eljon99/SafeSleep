import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  width: 100%;
  background-color: lightblue;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const NavBar = styled.nav`
  a {
    margin-left: 20px;
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>Logo</Logo>
      <NavBar>
        <Link to="/">Home</Link>
        <Link to="/crud">Crud</Link>
        <Link to="/metrics">Metrics</Link>
        <Link to="/info">Info</Link>
      </NavBar>
    </HeaderContainer>
  );
};

export default Header;


