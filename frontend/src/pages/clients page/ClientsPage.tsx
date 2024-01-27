import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import api from "../../apis/backendApi";
import Loader from "../../components/Loader";
import { Container } from "@mui/material";

interface Client {
  id: number;
  name: string;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const SingleClientTable: React.FC = () => {
  const [clients, setClients] = React.useState<Client[]>([]);

  React.useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get("/client");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  if (clients.length === 0) {
    return <Loader />;
  }

  return (
    <Container maxWidth={false}>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Client ID</StyledTableCell>
              <StyledTableCell>Client Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <StyledTableRow key={client.id}>
                <StyledTableCell>{client.id}</StyledTableCell>
                <StyledTableCell>{client.name}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default SingleClientTable;
