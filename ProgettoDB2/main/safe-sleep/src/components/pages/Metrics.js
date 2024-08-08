import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar } from 'recharts';

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  color: darkslategrey;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  background-color: rgba(245, 245, 245, 0.7);
  padding: 20px;
  width: 90%;
  max-width: 1200px;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
  }

  select {
    margin-top: 5px;
    padding: 10px;
    font-size: 16px;
  }
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: rgba(245, 245, 245, 0.7);
  margin-top: 20px;
`;

const ExplanationText = styled.div`
  max-width: 800px;
  text-align: center;
  margin: 0 auto;  // Center horizontally
  font-size: 18px;
  padding: 0px 20px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;    // Full height of the container
`;


const data = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Metrics = () => {
  const [dropdown1, setDropdown1] = useState('');
  const [dropdown2, setDropdown2] = useState('');
  const [optionsSelected, setOptionsSelected] = useState(false);

  const handleDropdown1Change = (e) => {
    setDropdown1(e.target.value);
    setOptionsSelected(e.target.value && dropdown2);
  };

  const handleDropdown2Change = (e) => {
    setDropdown2(e.target.value);
    setOptionsSelected(dropdown1 && e.target.value);
  };

  const getChartComponent = () => {
    if (dropdown1 === 'age' && dropdown2 === 'sleep quality') {
      return (
        <LineChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      );
    } else if (dropdown1 === 'income' && dropdown2 === 'expenses') {
      return (
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" />
          <Bar dataKey="uv" fill="#82ca9d" />
        </BarChart>
      );
    } else if (dropdown1 === 'category' && dropdown2 === 'percentage') {
      return (
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
    } else {
      return null;
    }
  };

  return (
    <MainLayout>
      <div>
        <Container>
          <Title>Metrics</Title>
          <DropdownContainer>
            <div>
              <label htmlFor="dropdown1">Selezionare Dati Persona</label>
              <select id="dropdown1" value={dropdown1} onChange={handleDropdown1Change}>
                <option value="">Select Option 1</option>
                <option value="age">Age</option>
                <option value="income">Income</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div>
              <label htmlFor="dropdown2">Selezionare Dati Registro</label>
              <select id="dropdown2" value={dropdown2} onChange={handleDropdown2Change}>
                <option value="">Select Option 2</option>
                <option value="sleep quality">Sleep Quality</option>
                <option value="expenses">Expenses</option>
                <option value="percentage">Percentage</option>
              </select>
            </div>
          </DropdownContainer>
          <GraphContainer>
            <ResponsiveContainer>
              {optionsSelected ? getChartComponent() : (
                <ExplanationText>
                  Selezionare una delle voci in entrambi menù per vedere i dati
                </ExplanationText>
              )}
            </ResponsiveContainer>
          </GraphContainer>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Metrics;
