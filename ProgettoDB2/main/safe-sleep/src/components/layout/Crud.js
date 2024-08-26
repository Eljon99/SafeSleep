// SharedStyles.js
import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgba(245, 245, 245, 0.7);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.9);
  border-radius: 10px;
  margin-top: 20px;
`;

export const Title = styled.h1`
  color: darkslategrey;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);  
  text-align: center;
  margin-bottom: 10px;
  font-size: 42px;
`;

export const Description = styled.p`
  font-size: 20px;  
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  flex: 0 0 auto;  /* Impedisce al FormGroup di espandersi */
  min-width: 200px;
  display: flex;
  flex-direction: column;
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  margin-bottom: 5px;
  color: darkslategrey;
  font-size: 18px;
  font-weight: bold;
`;

export const FormInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 24px;
  font-size: 14px;
  width: 250px;  /* Imposta una larghezza fissa */  
`;

export const FormButton = styled.button`
  background-color: darkslategrey;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
  align-self: flex-start;
  &:hover {
    background-color: #555;
  }
`;

export const DeleteButton = styled.button`
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

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 7px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);  
`;

export const TableHeader = styled.th`
  background-color: darkslategrey;;
  color: wheat;
  padding: 10px;
  text-align: left;
  border-bottom: 1px ridge rgba(245, 245, 245, 0.7);
  border-right: 1px ridge rgba(245, 245, 245, 0.3);
`;

export const TableRow = styled.tr`
 background-color: white;
`;

export const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  font-size: 14px;  
  border: 1px solid darkgrey;
`;

export const PaginationButton = styled.button`
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

export const SmallPaginationButton = styled(PaginationButton)`
  padding: 8px;
  font-size: 16px;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const PageNumber = styled.span`
  font-size: 18px;
  margin: 0 10px;
  color: wheat;
`;