import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function createData(name: string, points: number, change: number) {
  return { name, points, change };
}

const rows = [createData("User", 1, 1)];

for (let i = 0; i < 100; i++) {
  rows.push(
    createData(
      `User${i + 1}`,
      Math.floor(Math.random() * 1000),
      Math.floor(Math.random() * 5),
    ),
  );
}

rows.sort((a, b) => b.points - a.points);

export default function Leaderboard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          top: 0,
          fontSize: "4rem",
          position: "sticky",
          backgroundColor: "black",
          color: "rgb(26, 67, 132)",
          width: "100%",
          margin: 0,
          padding: 0,
          textAlign: "center",
        }}
      >
        Leaderboard
      </h1>

      <TableContainer
        style={{
          position: "sticky",
          top: 100,
        }}
        component={Paper}
        sx={{
          maxWidth: 800,
          position: "sticky",
        }}
      >
        <Table sx={{ maxWidth: 800 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Points</TableCell>
              <TableCell align="right">Change</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 800,
        }}
      >
        <Table sx={{ maxWidth: 800 }} aria-label="simple table">
          <TableBody
            sx={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            {rows.map((row, index) => (
              <TableRow key={row.name}>
                <TableCell
                  sx={{
                    color: "white",
                  }}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "white",
                  }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "white",
                  }}
                >
                  {row.points}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "white",
                  }}
                >
                  {row.change}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
