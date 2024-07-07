import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';

const ImageContainer = styled.div`
  max-width: 200px; /* Larghezza massima dell'immagine */
  height: auto; /* Altezza automatica in base alla larghezza */
  border-radius: 5px; /* Bordi arrotondati all'immagine */
`;

const Title = styled.h1`
  color: darkslategrey;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  font-size: 52px;
  margin-bottom: 30px;
`;

const BodyText = styled.p`
  font-size: 16px;
  color: #666;
  max-width: 600px;
`;

const FormContainer = styled.div`
  background-color: rgba(245, 245, 245, 0.7);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Home = () => {
  return (
    <MainLayout>

              <div>
              <FormContainer>
                <Title>safe-Sleep</Title>
                <BodyText>
                  Benvenuto su safeSleep! Il nostro sito è dedicato a fornirti le migliori informazioni
                  e strumenti per migliorare la qualità del tuo sonno. Esplora le nostre funzionalità per
                  saperne di più.Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
                  parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
                  pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede
                  usto, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
                  imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                  Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate
                  eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim
                  . Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                  nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
                  nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
                  Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet
                  adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
                  hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
                  ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros
                  faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales s agittis magna.
                  Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
                </BodyText>
             </FormContainer>
          </div>
    </MainLayout>
  );
}


export default Home;
