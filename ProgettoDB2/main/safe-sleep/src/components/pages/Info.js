import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';

const Title = styled.h1`
  color: darkslategrey;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  font-size: 72px;
  margin-bottom: 30px;
  text-align: center; // Centrare il titolo
`;

const BodyText = styled.p`
  font-size: 20px;
  color: #666;
  max-width: 600px;
  text-align: center;
`;

export const MainContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgba(245, 245, 245, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Info = () => {
  return (
    <MainLayout>
      <MainContainer>
          <div>
            <Title>Info</Title>
            <BodyText>
              Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:
              <br /><br />
              Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod iure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquid, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.
            </BodyText>
          </div>
      </MainContainer>
    </MainLayout>
  );
}

export default Info;
