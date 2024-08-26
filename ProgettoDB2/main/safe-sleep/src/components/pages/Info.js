import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import image from '../../assets/SleepLogo2.png'; // Importa l'immagine

const Title = styled.h1`
  color: darkslategrey;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  font-size: 72px;
  margin-bottom: 1px;
  text-align: center;
`;

const Subtitle = styled.h1`
  color: darkslategrey;
  margin-bottom: 1px;
  text-align: center;
`;

const Image = styled.img`
  max-width: 300px;
  height: auto;
  display: block;
  margin: 0 auto 30px;
  border-radius: 10px;
`;

const LicenseText = styled.p`
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
  font-style: italic;

  a {
    color: #007BFF; /* Colore del link */
    text-decoration: none; /* Rimuove la sottolineatura */
    
    &:hover {
      text-decoration: underline; /* Sottolinea il link al passaggio del mouse */
    }
  }
`;

const BodyText = styled.p`
  font-size: 20px;
  color: #555;
  max-width: 600px;
  text-align: center;
  padding-bottom: 20px;
`;

export const MainContainer = styled.div`
  width: 100%;
  padding: 10px;
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
          <Title>safeSleep</Title>
          <Image src={image} alt="Descrizione dell'immagine" />
          <LicenseText>
            Progetto creato da <a href="https://github.com/Eljon99">Eljon Hida</a> e <a href="https://github.com/luicons01">Luigi Consiglio</a>.
            Licenza MIT.
            <br/>
            Tutti i diritti riservati © 2024.
          </LicenseText>
          <Subtitle>Informazioni</Subtitle>
          <BodyText>
            L'obiettivo di <em>SafeSleep</em> è quello di registrare dati inerenti al sonno di persone e notare come
            fattori
            quali:età, livello attività fisica, BMI ecc. influiscano sulla qualità del sonno e viceversa.
            <br/><br/>
            Le tecnologie utilizzate per lo sviluppo di tale progetto sono:<br/> <br/>
            <strong style={{color: 'black', fontSize: '20px'}}>Python | React | MongoDB | Flask | PyCharm</strong>
            <br/><br/>
            Il progetto è stato effettuato usando dati provenienti dal dataset di <a
              href={'https://www.kaggle.com/datasets/uom190346a/sleep-health-and-lifestyle-dataset'}>Kaggle</a>
            &nbsp;ed è situato nella seguente repository di <a href={'https://github.com/Eljon99/SafeSleep'}>GitHub</a>.
          </BodyText>
        </div>
      </MainContainer>
    </MainLayout>
  );
}

export default Info;
