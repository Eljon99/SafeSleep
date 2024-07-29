import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import Axios from 'axios';

import {MainContainer, Title, Description, Form, FormRow, FormGroup, FormLabel, FormInput, FormButton, TableContainer, Table,
  TableHeader, TableRow, TableCell, PaginationButton, SmallPaginationButton, PaginationContainer, PageNumber} from '../layout/Crud.js';

const FormSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 24px;
  font-size: 14px;
  width: 100%; /* Assicurati che la larghezza corrisponda agli altri campi di input */
  background-color: white;
  box-sizing: border-box; /* Assicura che il padding non influisca sulla larghezza totale */
`;

const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  &:hover {
    background-color: darkred;
  }
`;

const CrudP = () => {
  const [sleepData, setSleepData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [formData, setFormData] = useState({
    Gender: '',
    Age: '',
    Occupation: '',
    'Physical Activity Level' : '',
    'BMI Category' : '',
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
    const response = await Axios.get('http://127.0.0.1:5000/api/persona');
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

    const { Gender, Age, Occupation, 'Physical Activity Level': activityLevel, 'BMI Category': bmiCategory } = formData;
    if (!Gender || !Age || !Occupation || !activityLevel || !bmiCategory) {
        alert('Per aggiungere i dati di una nuova persona compila tutti i campi!');
        return;
    }

    try {
        // Invia i dati al server per aggiungere una nuova persona
        const response = await Axios.post('http://127.0.0.1:5000/api/persona', formData);

        // Verifica se la risposta contiene i nuovi dati e aggiornali
        if (response.data) {
            setSleepData(prevData => [...prevData, response.data]); // Aggiorna lo stato con il nuovo dato
        }

        // Resetta il form
        setFormData({
            Gender: '',
            Age: '',
            Occupation: '',
            'Physical Activity Level' : '',
            'BMI Category' : '',
        });
    } catch (error) {
        console.error('Error adding data:', error);
    }
};


const handleDelete = async (person_id) => {
  try {
    await Axios.delete(`http://127.0.0.1:5000/api/persona/${person_id}`);
    setSleepData(sleepData.filter((data) => data['Person ID'] !== person_id));
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

// Assicurati di passare il Persona ID corretto quando chiami handleDelete



  const totalPages = Math.ceil(sleepData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sleepData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <MainLayout>
      <MainContainer>
        <Title>Operazioni CRUD</Title>
        <Description>In questa pagine è possibile visualizzare, eliminare e creare nuove informazioni riguardo nuovi utenti.</Description>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <FormLabel>Genere</FormLabel>
              <FormSelect name="Gender" value={formData.Gender} onChange={handleChange}>
                <option value="">Seleziona</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Età</FormLabel>
              <FormInput type="number" name="Age" value={formData.Age} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Occupazione</FormLabel>
              <FormInput type="text" name="Occupation" value={formData.Occupation} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Livello Attività Fisica</FormLabel>
              <FormInput type="number" name="Physical Activity Level" value={formData['Physical Activity Level']} onChange={handleChange} />
            </FormGroup>
            <FormGroup>
              <FormLabel>Categoria BMI</FormLabel>
              <FormInput type="text" name="BMI Category" value={formData['BMI Category']} onChange={handleChange} />
            </FormGroup>
          </FormRow>
          <FormButton type="submit">Aggiungi</FormButton>
        </Form>
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Foto</TableHeader>
                <TableHeader>Genere</TableHeader>
                <TableHeader>Età</TableHeader>
                <TableHeader>Occupazione</TableHeader>
                <TableHeader>Livello Attività Fisica</TableHeader>
                <TableHeader>Categoria BMI</TableHeader>
                <TableHeader>Azione</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <TableRow key={data['Person ID']}>
                  <TableCell><img src={data.image} alt={data.name} /></TableCell>
                  <TableCell>{data.Gender}</TableCell>
                  <TableCell>{data.Age}</TableCell>
                  <TableCell>{data.Occupation}</TableCell>
                  <TableCell>{data['Physical Activity Level']}</TableCell>
                  <TableCell>{data['BMI Category']}</TableCell>
                  <TableCell>
                    <DeleteButton onClick={() => handleDelete(data['Person ID'])}>Elimina</DeleteButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </MainContainer>
      <PaginationContainer>
        <SmallPaginationButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          &lt;&lt;
        </SmallPaginationButton>
        <PaginationButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </PaginationButton>
        <PageNumber>{currentPage} / {totalPages}</PageNumber>
        <PaginationButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </PaginationButton>
        <SmallPaginationButton onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>
          &gt;&gt;
        </SmallPaginationButton>
      </PaginationContainer>
    </MainLayout>
  );
}

export default CrudP;