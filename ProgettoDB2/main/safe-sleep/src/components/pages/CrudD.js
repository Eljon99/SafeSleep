import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import Axios from 'axios';

import { MainContainer, Title, Description, Form, FormRow, FormGroup, FormLabel, FormInput, FormButton, TableContainer, Table,
  TableHeader, TableRow, TableCell, PaginationButton, SmallPaginationButton, PaginationContainer, PageNumber } from '../layout/Crud.js';

const UpdateButton = styled.button`
  background-color: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  &:hover {
    background-color: green;
  }
`;

const CrudD = () => {
  const [sleepData, setSleepData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Stato per tracciare la riga attualmente in modifica
  const [editRow, setEditRow] = useState(null);

  const [formData, setFormData] = useState({
    'Person ID': '',
    'Sleep Duration': '',
    'Quality of Sleep': '',
    'Stress Level': '',
    'Blood Pressure': '',
    'Heart Rate': '',
    'Daily Steps': '',
    'Sleep Disorder': '',
  });

  // Stato per gestire i dati del form di modifica
  const [editFormData, setEditFormData] = useState({
    'Person ID': '',
    'Sleep Duration': '',
    'Quality of Sleep': '',
    'Stress Level': '',
    'Blood Pressure': '',
    'Heart Rate': '',
    'Daily Steps': '',
    'Sleep Disorder': '',
  });

  useEffect(() => {
    fetchSleepData();
  }, []);

  const fetchSleepData = async () => {
    try {
      const response = await Axios.get('http://127.0.0.1:5000/api/diario');
      console.log('Fetched data:', response.data);
      setSleepData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Funzione per gestire i cambiamenti nel form di modifica
  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    const { 'Person ID': personID, 'Sleep Duration': sleepDuration, 'Quality of Sleep': qualityOfSleep, 'Stress Level': stressLevel,
      'Blood Pressure': bloodPressure, 'Heart Rate': heartRate, 'Daily Steps': dailySteps, 'Sleep Disorder': sleepDisorder } = formData;

    if (!personID || !sleepDuration || !qualityOfSleep || !stressLevel || !bloodPressure || !heartRate || !dailySteps || !sleepDisorder) {
      alert('Per aggiungere i dati di una nuova persona compila tutti i campi!');
      return;
    }

    try {
      // Verifica se il Person ID esiste nel database
      const personResponse = await Axios.get(`http://127.0.0.1:5000/api/persona/${personID}`);

      if (!personResponse.data) {
        alert('Person ID non trovato nel database. Verifica che la persona esista prima di aggiungere un diario.');
        return;
      }

      // Se il Person ID esiste, invia i dati del diario
      console.log("Dati inviati:", formData);
      const response = await Axios.post('http://127.0.0.1:5000/api/diario', formData);

      if (response.data) {
        setSleepData(prevData => [...prevData, response.data]);
      }

      setFormData({
        'Person ID': '',
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

      // Se c'è un errore nel trovare il Person ID o nell'aggiungere il diario
      if (error.response && error.response.status === 404) {
        alert('Person ID non trovato. Impossibile creare un diario per una persona inesistente.');
      } else {
        alert('Errore nella creazione del diario. Riprova più tardi.');
      }
    }
};

  const handleUpdate = async (id) => {
  try {
    // Invia una richiesta PUT al server per aggiornare i dati
    const response = await Axios.put(`http://127.0.0.1:5000/api/diario/${id}`, editFormData);

    if (response.data) {
      // Aggiorna i dati locali nello stato
      setSleepData(prevData => prevData.map(item => (item.id === id ? response.data : item)));

      // Esci dalla modalità di modifica
      setEditRow(null);
    }
  } catch (error) {
    console.error('Error updating data:', error);
  }
};


  // Funzione per gestire l'inizio della modifica di una riga
  const handleEdit = (data) => {
    setEditRow(data['Person ID']); // Imposta lo stato di modifica sulla riga selezionata
    setEditFormData({ ...data }); // Imposta i dati del form di modifica con i dati della riga selezionata
  };

  // Funzione per annullare la modifica
  const handleCancelEdit = () => {
    setEditRow(null); // Rimuove lo stato di modifica senza salvare
  };

  const totalPages = Math.ceil(sleepData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sleepData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <MainLayout>
      <MainContainer>
        <Title>Operazioni CRUD-Registro</Title>
        <Description>In questa pagina è possibile visualizzare, modificare e aggiungere nuove informazioni riguardanti il sonno degli utenti.</Description>

        <Form onSubmit={handleSubmit}>
          <FormRow>
            <FormGroup>
              <FormLabel>Person ID</FormLabel>
              <FormInput type="number" name="Person ID" value={formData['Person ID']} onChange={handleChange} placeholder="Inserisci un numero" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Durata del Sonno</FormLabel>
              <FormInput type="number" name="Sleep Duration" value={formData['Sleep Duration']} onChange={handleChange} placeholder="Inserisci un numero" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Qualità del Sonno</FormLabel>
              <FormInput type="number" name="Quality of Sleep" value={formData['Quality of Sleep']} onChange={handleChange} placeholder="Inserisci un numero" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Livello dello Stress</FormLabel>
              <FormInput type="number" name="Stress Level" value={formData['Stress Level']} onChange={handleChange} placeholder="Inserisci un numero" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Pressione Sanguigna</FormLabel>
              <FormInput type="text" name="Blood Pressure" value={formData['Blood Pressure']} onChange={handleChange} placeholder="Inserisci la pressione sanguigna" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Battito Cardiaco</FormLabel>
              <FormInput type="number" name="Heart Rate" value={formData['Heart Rate']} onChange={handleChange} placeholder="Inserisci un numero" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Passi Giornalieri</FormLabel>
              <FormInput type="number" name="Daily Steps" value={formData['Daily Steps']} onChange={handleChange} placeholder="Inserisci un numero" />
            </FormGroup>
            <FormGroup>
              <FormLabel>Disturbo del Sonno</FormLabel>
              <FormInput type="text" name="Sleep Disorder" value={formData['Sleep Disorder']} onChange={handleChange} placeholder="Inserisci la durata del sonno" />
            </FormGroup>
          </FormRow>
          <FormButton type="submit">Aggiungi</FormButton>
        </Form>
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Person ID</TableHeader>
                <TableHeader>Durata del Sonno</TableHeader>
                <TableHeader>Qualità del Sonno</TableHeader>
                <TableHeader>Livello dello Stress</TableHeader>
                <TableHeader>Pressione Sanguigna</TableHeader>
                <TableHeader>Battito Cardiaco</TableHeader>
                <TableHeader>Passi Giornalieri</TableHeader>
                <TableHeader>Disturbo del Sonno</TableHeader>
                <TableHeader>Azione</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <TableRow key={data['Person ID']}>
                  {editRow === data['Person ID'] ? (
                    // Se la riga è in modifica, mostra il form di modifica
                    <>
                      <TableCell>
                        <FormInput type="number" name="Person ID" value={editFormData['Person ID']} onChange={handleEditChange} />
                      </TableCell>
                      <TableCell>
                        <FormInput type="number" name="Sleep Duration" value={editFormData['Sleep Duration']} onChange={handleEditChange} />
                      </TableCell>
                      <TableCell>
                        <FormInput type="number" name="Quality of Sleep" value={editFormData['Quality of Sleep']} onChange={handleEditChange} />
                      </TableCell>
                      <TableCell>
                        <FormInput type="number" name="Stress Level" value={editFormData['Stress Level']} onChange={handleEditChange} />
                      </TableCell>
                      <TableCell>
                        <FormInput type="text" name="Blood Pressure" value={editFormData['Blood Pressure']} onChange={handleEditChange} />
                      </TableCell>
                      <TableCell>
                        <FormInput type="number" name="Heart Rate" value={editFormData['Heart Rate']} onChange={handleEditChange} />
                      </TableCell>
                      <TableCell>
                        <FormInput type="number" name="Daily Steps" value={editFormData['Daily Steps']} onChange={handleEditChange} />
                      </TableCell>
                      <TableCell>
                        <FormInput type="text" name="Sleep Disorder" value={editFormData['Sleep Disorder']} onChange={handleEditChange} />
                      </TableCell>
                      <TableCell>
                        {/* Pulsante per salvare le modifiche */}
                        <UpdateButton onClick={() => handleUpdate(data['Person ID'])}>Salva</UpdateButton>
                        {/* Pulsante per annullare le modifiche */}
                        <UpdateButton onClick={handleCancelEdit}>Annulla</UpdateButton>
                      </TableCell>
                    </>
                  ) : (
                    // Se la riga non è in modifica, mostra i dati normali
                    <>
                      <TableCell>{data['Person ID']}</TableCell>
                      <TableCell>{data['Sleep Duration']}</TableCell>
                      <TableCell>{data['Quality of Sleep']}</TableCell>
                      <TableCell>{data['Stress Level']}</TableCell>
                      <TableCell>{data['Blood Pressure']}</TableCell>
                      <TableCell>{data['Heart Rate']}</TableCell>
                      <TableCell>{data['Daily Steps']}</TableCell>
                      <TableCell>{data['Sleep Disorder']}</TableCell>
                      <TableCell>
                        {/* Pulsante per iniziare la modifica */}
                        <UpdateButton onClick={() => handleEdit(data)}>Modifica</UpdateButton>
                      </TableCell>
                    </>
                  )}
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
};

export default CrudD;