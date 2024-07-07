import React from 'react';
import styled from 'styled-components';
import Header from './Header'; // Assumendo che il tuo header sia in './Header'

// Definizione degli stili usando styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.footer`
  background-color: darkslategrey;
  color: white;
  padding: 10px 0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SocialIcon = styled.a`
  margin: 0 10px;
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;


// Definizione del componente MainLayout
const MainLayout = ({ children }) => {
  return (
      <Container>
        <Header />
        <Content>
          <div>
            {children}
          </div>
        </Content>
        <Footer>
          <SocialIcon href="https://instagram.com">Instagram</SocialIcon>
          <SocialIcon href="https://youtube.com">YouTube</SocialIcon>
          <SocialIcon href="https://linkedin.com">LinkedIn</SocialIcon>
        </Footer>
      </Container>
  );
};

export default MainLayout;
