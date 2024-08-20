import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import Slider from '../layout/Slider';

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
`;

const TextContainer = styled.div`
  max-width: 600px;
  padding: 30px; // Aggiungi padding se necessario
`;

const Container = styled.div`
  background-color: rgba(245, 245, 245, 0.7);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Home = () => {
  return (
    <MainLayout>
              <div>
              <Container>
                  <Slider />
                  <TextContainer>
                    <Title>safeSleep</Title>
                    <BodyText>
                      Benvenuto su safeSleep! Il nostro sito è dedicato a fornirti le migliori informazioni
                      e strumenti per migliorare la qualità del tuo sonno. Esplora le nostre funzionalità per
                      saperne di più.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                      parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
                      pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                      usto, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                      imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                      Integer tincidunt. Cras dapibus.
                    </BodyText>
                  </TextContainer>
             </Container>
          </div>
    </MainLayout>
  );
}

export default Home;
