import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: darkslategrey;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  max-width: 960px;
  margin: 0 auto;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-around;
`;

const NavbarLink = styled(Link)`
  text-decoration: none;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  color: wheat;
  font-weight: bold;
  padding: 10px 15px;
  margin: 0 5px; /* Aggiungi spazio tra i pulsanti */
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Navbar>
        <NavbarLink to="/">Home</NavbarLink>
        <NavbarLink to="/crudP">CRUD-P</NavbarLink>
        <NavbarLink to="/crudD">CRUD-R</NavbarLink>
        <NavbarLink to="/metrics">Metrics</NavbarLink>
        <NavbarLink to="/info">Info</NavbarLink>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;


