import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import Axios from 'axios';

import {MainContainer, Title, Description, Form, FormRow, FormGroup, FormLabel, FormInput, FormButton, TableContainer, Table, TableHeader, TableRow, TableCell, DeleteButton} from '../layout/Crud.js';

const PaginationButton = styled.button`
  background-color: darkslategrey;
  color: white;
  border: none;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 18px;
  &:hover {
    background-color: #555;
  }
  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const PageNumber = styled.span`
  font-size: 18px;
  margin: 0 10px;
  color: wheat;
`;

const CrudD = () => {
  const [sleepData, setSleepData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    'Sleep Duration': '',
    'Quality of Sleep': '',
    'Stress Level': '',
    'Blood Pressure': '',
    'Heart Rate': '',
    'Daily Steps': '',
    'Sleep Disorder': '',
  });

// useEffect esegue effetti collaterali nel componente. In questo caso, esegue la funzione fetchSleepData quando il componente è montato.
useEffect(() => {
  // Chiamata alla funzione per recuperare i dati sul sonno
  fetchSleepData();
  // L'array vuoto indica che l'effetto deve essere eseguito solo una volta, al montaggio del componente
}, []);

// Funzione asincrona per recuperare i dati sul sonno
const fetchSleepData = async () => {
  try {
    // Effettua una richiesta GET all'API per recuperare i dati
    const response = await Axios.get('http://127.0.0.1:5000/api/diario');
    // Stampa i dati ottenuti nella console per il debug
    console.log('Fetched data:', response.data);
    // Aggiorna lo stato del componente con i dati ottenuti
    setSleepData(response.data);
  } catch (error) {
    // Se si verifica un errore durante la richiesta, stampa l'errore nella console
    console.error('Error fetching data:', error);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post('http://127.0.0.1:5000/api/diario', formData);
      setSleepData([...sleepData, response.data]);
      setFormData({
            'Sleep Duration': '',
            'Quality of Sleep': '',
            'Stress Level': '',
            'Blood Pressure': '',
            'Heart Rate': '',
            'Daily Steps': '',
            'Sleep Disorder': '',
      });
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`/api/diario/${id}`);
      setSleepData(sleepData.filter((data) => data.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const totalPages = Math.ceil(sleepData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sleepData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <MainLayout>
      <MainContainer>
        <Title>Operazioni CRUD per il Diario</Title>
        <Description>In questa pagine è possibile visualizzare, modificare e creare nuove informazioni riguardo al diario degli utenti.</Description>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <FormLabel>Sleep Duration</FormLabel>
              <FormInput type="number" name="Sleep_Duration" value={formData['Sleep_Duration']} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Quality of Sleep</FormLabel>
              <FormInput type="number" name="Quality_of_Sleep" value={formData['Quality_of_Sleep']} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Stress level</FormLabel>
              <FormInput type="number" name="Stress_Level" value={formData['Stress_Level']} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Blood Pressure</FormLabel>
              <FormInput type="text" name="Blood_Pressure" value={formData['Blood_Pressure']} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Heart rate</FormLabel>
              <FormInput type="number" name="Heart_Rate" value={formData['Heart_Rate']} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Daily steps</FormLabel>
              <FormInput type="number" name="Daily_Steps" value={formData['Daily_Steps']} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Sleep Disorder</FormLabel>
              <FormInput type="text" name="Sleep_Disorder" value={formData['Sleep_Disorder']} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormButton type="submit">Aggiungi</FormButton>
        </Form>
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Sleep Duration</TableHeader>
                <TableHeader>Quality of Sleep</TableHeader>
                <TableHeader>Stress Level</TableHeader>
                <TableHeader>Blood Pressure</TableHeader>
                <TableHeader>Heart Rate</TableHeader>
                <TableHeader>Daily Steps</TableHeader>
                <TableHeader>Sleep Disorder</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data['Sleep Disorder']}</TableCell>
                  <TableCell>{data['Quality of Sleep']}</TableCell>
                  <TableCell>{data['Stress Level']}</TableCell>
                  <TableCell>{data['Blood Pressure']}</TableCell>
                  <TableCell>{data['Daily Steps']}</TableCell>
                  <TableCell>{data['Sleep Disorder']}</TableCell>
                  <TableCell>
                    <DeleteButton onClick={() => handleDelete(data.id)}>Elimina</DeleteButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </MainContainer>
      <PaginationContainer>
        <PaginationButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </PaginationButton>
        <PageNumber>{currentPage} / {totalPages}</PageNumber>
        <PaginationButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </PaginationButton>
      </PaginationContainer>
    </MainLayout>
  );
}

export default CrudD;