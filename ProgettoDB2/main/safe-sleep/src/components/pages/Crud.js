import React, {useState} from 'react';
import styled from 'styled-components';
import MainLayout from '../layout/MainLayout';

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 7px; /* Angoli arrotondati */
  overflow: hidden; /* Assicura che il bordo arrotondato appaia correttamente */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  
`;

const TableHeader = styled.th`
  background-color: darkslategrey;;
  color: wheat;
  padding: 10px;
  text-align: left;
  border-bottom: 1px ridge rgba(245, 245, 245, 0.7);
  border-right: 1px ridge rgba(245, 245, 245, 0.3);  
    
`;

const TableRow = styled.tr`
 background-color: rgba(245, 245, 245, 0.7);
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  font-size: 14px;  
  border: 1px solid rgba(245, 245, 245, 0.75);
`;

const PaginationButton = styled.button`
  background-color: darkslategrey;
  color: white;
  border: none;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
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
`;

const PageNumber = styled.span`
  font-size: 15px;
  margin: 0 10px;
  color: wheat;
`;

const Crud = () => {
  const sleepData = [
    { id: 1, name: 'Mario Rossi', hours: 7, quality: 'Buona', image: 'https://via.placeholder.com/50', deepSleep: 2, lightSleep: 5 },
    { id: 2, name: 'Luigi Verdi', hours: 6, quality: 'Discreta', image: 'https://via.placeholder.com/50', deepSleep: 1, lightSleep: 5 },
    { id: 3, name: 'Anna Bianchi', hours: 8, quality: 'Ottima', image: 'https://via.placeholder.com/50', deepSleep: 3, lightSleep: 5 },
    // Aggiungi altri dati se necessario
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Numero di elementi per pagina

  const totalPages = Math.ceil(sleepData.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = sleepData.slice(startIdx, startIdx + itemsPerPage);


  return (
    <MainLayout>
      <TableContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Foto</TableHeader>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Ore di Sonno</TableHeader>
              <TableHeader>Qualità del Sonno</TableHeader>
              <TableHeader>Sonno Profondo</TableHeader>
              <TableHeader>Sonno Leggero</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {sleepData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.hours}</TableCell>
                <TableCell>{data.quality}</TableCell>
                <TableCell>{data.deepSleep}</TableCell>
                <TableCell>{data.lightSleep}</TableCell>
                  <TableCell>{data.lightSleep}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
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

export default Crud;
