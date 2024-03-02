import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface Row {
  userId: string;
  profileName: string;
  since: string;
  address: string;
}

function createData(
  userId: string,
  profileName: string,
  since: string,
  address: string
): Row {
  return { userId, profileName, since, address };
}

interface FollowersTableProps {
  apiData: Row[]; // Specify the type of apiData as an array of Row
}

const FarcasterTable: React.FC<FollowersTableProps> = ({ apiData }) => {
  const rows: Row[] = apiData.map((data) => {
    return createData(data.userId, data.profileName, data.address, data.since);
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Following Since</TableCell>
            <TableCell align="right">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.userId} // Fix the key to use a unique identifier
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.userId}
              </TableCell>
              <TableCell align="right">{row.userId}</TableCell>
              <TableCell align="right">{row.profileName}</TableCell>
              <TableCell align="right">{row.since}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FollowersTable;
