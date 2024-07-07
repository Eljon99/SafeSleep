import React from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
`;

const BodyText = styled.div`
  max-width: 600px;
  text-align: left;
`;

const Metrics = () => {
  return (
    <MainLayout>
          <div>
            <Title>Metrics</Title>
            <BodyText>
              Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:
              <br /><br />
              Excepteur efficient emerging, minim veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod iure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquid, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.
            </BodyText>
          </div>
    </MainLayout>
  );
}

export default Metrics;
