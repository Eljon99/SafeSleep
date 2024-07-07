import React from 'react';
import styled from 'styled-components';
import Header from './Header'; // Assumendo che il tuo header sia in './Header'

// Definizione degli stili usando styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
`;

const ImageWrapper = styled.div`
  background-image: url('/fotoSonno4.jpg');
  background-repeat: repeat;
  background-size: auto;
  background-position: top left;
  min-height: 100vh;
  color: white;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  padding: 50px 0;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  border-top: 1px solid #ddd;
  margin-top: 50px;
`;

const FooterLink = styled.a`
  margin: 0 10px;
`;

// Definizione del componente MainLayout
const MainLayout = ({ children }) => {
  return (
    <ImageWrapper>
      <Container>
        <Header />
        <Content>
          <div>
            {children}
          </div>
        </Content>
        <Footer>
          <FooterLink href="https://instagram.com">Instagram</FooterLink>
          <FooterLink href="https://youtube.com">YouTube</FooterLink>
          <FooterLink href="https://linkedin.com">LinkedIn</FooterLink>
        </Footer>
      </Container>
    </ImageWrapper>
  );
};

export default MainLayout;
