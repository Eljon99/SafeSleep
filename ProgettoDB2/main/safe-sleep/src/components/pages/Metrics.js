import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Title = styled.h1`
  color: darkslategrey;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  font-size: 72px;
  margin-bottom: 30px;
  text-align: center;
`;

const BodyText = styled.p`
  font-size: 20px;
  color: #666;
  max-width: 600px;
`;

const TextContainer = styled.div`
  max-width: 600px;
  padding: 30px;
`;

const Container = styled.div`
  background-color: rgba(245, 245, 245, 0.7);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;  // Cambia a colonna per includere il grafico
  align-items: center;
  justify-content: center;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 30px;
`;

const ActivitySleepCorrelation = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/activity-sleep-correlation')  // Chiamata all'API Flask
            .then(response => response.json())
            .then(data => setData(data))  // Imposta i dati nel state
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="Age"  // Modificato per usare 'Age'
                    domain={[0, 100]} // Imposta il range dell'asse X
                />
                <YAxis
                    domain={[0, 10]} // Imposta il range dell'asse Y
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Quality of Sleep" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

const Metrics = () => {
  return (
    <MainLayout>
      <div>
        <Container>
          <TextContainer>
            <Title>Metrics</Title>
            <BodyText>
              Body text for your whole article or post. We'll put in some lorem ipsum to show how a filled-out page might look:
            </BodyText>
          </TextContainer>
          <ActivitySleepCorrelation />  {/* Aggiungi il grafico qui */}
        </Container>
      </div>
    </MainLayout>
  );
};

export default Metrics;
