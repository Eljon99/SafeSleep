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
  color: #555;
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
  margin: 20px 0px 20px 0px;  
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
                        Benvenuto su <b>safeSleep</b>, scopri un'analisi completa dei dati sul sonno e le abitudini quotidiane, basata sul dataset "<b>Sleep Health and Lifestyle</b>".
                        Esplora metriche chiave come la durata e la qualità del sonno, livelli di attività fisica, stress, salute cardiovascolare e la presenza di disturbi del sonno.
                        Naviga tra le sezioni per comprendere come questi fattori influenzano il benessere generale.
                    </BodyText>
                  </TextContainer>
             </Container>
          </div>
    </MainLayout>
  );
}

export default Home;
