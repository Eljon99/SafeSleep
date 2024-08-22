import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell  } from 'recharts';



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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0px 20px 0px;  
`;


const ChartContainer = styled.div`
  width: 100%;
  height: 500px;
  margin-top: 30px;
`;

const Select = styled.select`
  margin-bottom: 20px;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ActivitySleepCorrelation = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/activity-sleep-correlation')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Age" domain={[0, 100]} />
                <YAxis domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Quality of Sleep" stroke="#8884d8" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
};

// Colori per le sezioni del diagramma a torta
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ActivityLevelDistribution = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/activity-level-distribution')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const COLORS = ['darkBlue', 'darkRed', 'darkGreen', '#FF6384'];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#8884d8"
                    label={({ name }) => `${name}`}  // Mostra il campo "name" nelle etichette
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>

                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
};



const Metrics = () => {

  // Stato per tenere traccia della metrica selezionata dal menu a tendina
  const [selectedMetric, setSelectedMetric] = useState('');

  return (
    <MainLayout>
      <div>
        <Container>
          <TextContainer>
            <Title>Metrics</Title>
            <BodyText>
              Benvenuto nella pagina delle metriche. Seleziona una metrica dal menu a tendina per visualizzarla.
            </BodyText>
          </TextContainer>

            <Select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
                <option value="">Seleziona una metrica</option>
                <option value="eta-qualitaSonno">Età-Qualità del Sonno</option>
                <option value="livelliAttivitaFisica">Distribuzione Livelli Attività Fisica</option>
                {/* Aggiungi altre metriche qui */}

            </Select>

            {selectedMetric === 'eta-qualitaSonno' && <ActivitySleepCorrelation/>}
            {selectedMetric === 'livelliAttivitaFisica' && <ActivityLevelDistribution />}

          {/* Condiziona la visualizzazione di altre metriche qui */}

        </Container>
      </div>
    </MainLayout>
  );
};

export default Metrics;
