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
          <SocialIcon href="https://github.com/Eljon99/SafeSleep">GitHub</SocialIcon>
          <SocialIcon href="https://www.kaggle.com/datasets/uom190346a/sleep-health-and-lifestyle-dataset">Kaggle</SocialIcon>
        </Footer>
      </Container>
  );
};

export default MainLayout;
