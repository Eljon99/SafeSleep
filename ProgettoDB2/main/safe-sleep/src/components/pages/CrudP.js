import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';
import Axios from 'axios';
import { MainContainer, Title, Description, Form, FormRow, FormGroup, FormLabel, FormInput, FormButton, TableContainer, Table,
  TableHeader, TableRow, TableCell, PaginationButton, SmallPaginationButton, PaginationContainer, PageNumber } from '../layout/Crud.js';

const FormSelect = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 24px;
  font-size: 14px;
  width: 100%;
  background-color: white;
  box-sizing: border-box;
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

const ErrorMessage = styled.div`
  color: red;
  background-color: #fdd;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid red;
  text-align: center;
`;

const CrudP = () => {
  // Stato per memorizzare i dati del sonno
  const [sleepData, setSleepData] = useState([]);
  // Stato per gestire la pagina corrente nella paginazione
  const [currentPage, setCurrentPage] = useState(1);
  // Stato per gestire il messaggio di errore
  const [errorMessage, setErrorMessage] = useState('');
  // Numero di elementi per pagina
  const itemsPerPage = 8;


  const [formData, setFormData] = useState({
    Gender: '',
    Age: '',
    Occupation: '',
    'Physical Activity Level': '',
    'BMI Category': '',
  });

  //Quando il componente viene montato, fetchSleepData viene chiamata per recuperare i dati dal server e memorizzarli nello stato sleepData.
  useEffect(() => {
    fetchSleepData();
  }, []);


  //Effettua una richiesta GET al server per ottenere i dati del sonno e aggiorna lo stato sleepData con questi dati.
  const fetchSleepData = async () => {
    try {
      const response = await Axios.get('http://127.0.0.1:5000/api/persona');
      setSleepData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Aggiorna lo stato formData quando l'utente modifica i valori nei campi del modulo.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateAge = (age) => {
    const parsedValue = parseInt(age, 10);
    const isValid = Number.isInteger(parsedValue) && parsedValue >= 1 && parsedValue <= 100;
    return isValid ? parsedValue : null;
  };

  const validateOccupation = (occupation) => {
  // Verifica se l'input è una stringa
  if (typeof occupation !== 'string') {
    return null;
  }

  // Controlla che la stringa non contenga numeri
  const hasNumbers = /\d/.test(occupation);
  if (hasNumbers) {
    return null;
  }

  // Se è una stringa e non contiene numeri, restituiscila
  return occupation;
};

  const validatePhysicalActivityLevel = (pal) => {
    const parsedValue = parseInt(pal, 10);
    const isValid = Number.isInteger(parsedValue) && parsedValue >= 1 && parsedValue <= 200;
    return isValid ? parsedValue : null;
  };

  //Quando l'utente invia il modulo, questa funzione invia una richiesta POST al server per aggiungere i dati del modulo.
  // Se ha successo, aggiorna lo stato sleepData e resetta il modulo.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Gender, Age, Occupation, 'Physical Activity Level': activityLevel, 'BMI Category': bmiCategory } = formData;

    if (!Gender || !Age || !Occupation || !activityLevel || !bmiCategory) {
      setErrorMessage('Per aggiungere i dati di una nuova persona, compila tutti i campi!');
      return;
    }

    const validAge = validateAge(Age);
    if (validAge === null) {
      setErrorMessage('L\'età deve essere un intero tra 1 e 100.');
      return;
    }

    const validOccupation = validateOccupation(Occupation);
    if (validOccupation === null) {
      setErrorMessage('L\'occupazione deve essere una stringa');
      return;
    }

    const validPAL = validatePhysicalActivityLevel(activityLevel);
    if (validPAL === null) {
      setErrorMessage('Il Livello di Attività Fisica deve essere un intero minore o uguale a 200.');
      return;
    }

    try {
      const response = await Axios.post('http://127.0.0.1:5000/api/persona', formData);
      if (response.data) {
        setSleepData(prevData => [...prevData, response.data]);
        setFormData({
          Gender: '',
          Age: '',
          Occupation: '',
          'Physical Activity Level': '',
          'BMI Category': '',
        });
        setErrorMessage(''); // Resetta il messaggio di errore
      }
    } catch (error) {
      console.error('Error adding data:', error);
      setErrorMessage('Si è verificato un errore durante l\'aggiunta dei dati.'); // Mostra un messaggio di errore generico
    }
  };

  //Permette di eliminare un dato specifico  e aggiorna lo stato sleepData per rimuovere l'elemento eliminato.
  const handleDelete = async (person_id) => {
    try {
      await Axios.delete(`http://127.0.0.1:5000/api/persona/${person_id}`);
      setSleepData(sleepData.filter((data) => data['Person ID'] !== person_id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  //Calcola il numero totale di pagine e i dati da visualizzare per la pagina corrente, gestendo la visualizzazione dei dati in pagine.
  const totalPages = Math.ceil(sleepData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sleepData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <MainLayout>
      <MainContainer>
        <Title>Operazioni CRUD-Persona</Title>
        <Description>In questa pagina, puoi gestire in modo completo le informazioni relative alle persone presenti nel database.
          <br />Hai la possibilità di visualizzare, creare, ed eliminare i dati delle persone.</Description>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* Mostra l'errore se presente */}

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
              <FormInput
                type="number"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                placeholder="Inserisci un numero"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Occupazione</FormLabel>
              <FormInput
                type="text"
                name="Occupation"
                value={formData.Occupation}
                onChange={handleChange}
                placeholder="Inserisci l'occupazione"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Livello Attività Fisica</FormLabel>
              <FormInput
                type="number"
                name="Physical Activity Level"
                value={formData['Physical Activity Level']}
                onChange={handleChange}
                placeholder="Inserisci un numero"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Categoria BMI</FormLabel>
              <FormSelect name="BMI Category" value={formData['BMI Category']} onChange={handleChange}>
                <option value="">Seleziona</option>
                <option value="Underweight">Underweight</option>
                <option value="Normal">Normal</option>
                <option value="Overweight">Overweight</option>
                <option value="Obese">Obese</option>
              </FormSelect>
            </FormGroup>
          </FormRow>
          <FormButton type="submit">Aggiungi</FormButton>
        </Form>
        <TableContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Person ID</TableHeader>
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
                  <TableCell>{data['Person ID']}</TableCell>
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
