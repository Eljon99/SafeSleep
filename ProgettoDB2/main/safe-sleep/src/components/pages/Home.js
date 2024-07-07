import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import myImage from '../../assets/a.png';

const ImageContainer = styled.div`
  width: 500px;
  height: 500px;
  margin-right: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

const BodyText = styled.div`
  max-width: 600px;
  text-align: left;
`;

const Home = () => {
  return (
    <MainLayout>
          <ImageContainer>
            <Image src={myImage} alt="Descrizione dell'immagine" />
          </ImageContainer>
              <div>
                <Title>safe-Sleep</Title>
                <BodyText>
                  Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:
                  <br /><br />
                  Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod iure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquid, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.
                </BodyText>
          </div>
    </MainLayout>
  );
}


export default Home;
