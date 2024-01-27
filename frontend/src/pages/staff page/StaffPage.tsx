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

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StaffTable: React.FC = () => {
  const [staff, setStaff] = React.useState<Staff[]>([]);

  React.useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await api.get("/staff");
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
      }
    };

    fetchStaff();
  }, []);

  if (staff.length === 0) {
    return <Loader />;
  }

  return (
    <Container maxWidth={false}>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Staff ID</StyledTableCell>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((staffMember) => (
              <StyledTableRow key={staffMember.id}>
                <StyledTableCell>{staffMember.id}</StyledTableCell>
                <StyledTableCell>{staffMember.firstName}</StyledTableCell>
                <StyledTableCell>{staffMember.lastName}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StaffTable;
