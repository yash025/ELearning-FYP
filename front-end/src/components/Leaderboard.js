import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getRequest } from '../services/httpService';
import { tempstorage } from '../services/TempStorage';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(row) {
//   return { row.userRank, row.firstName + row.lastName, row.points };
// }

// const rows = [
//   createData(1, 'Paavana', 70),
//   createData(2, 'Fieuhsaf', 70),
//   createData(3, 'Diushaik', 70),
//   createData(4, 'Sijaeoik', 70),
//   createData(5, 'Rijaoidj', 70),
//   createData(6, 'Lisuhdlkv', 70),
//   createData(7, 'Wskuhiocas', 70),
//   createData(8, 'Giuash', 70),
//   createData(9, 'Ciaushd', 70),
//   createData(10, 'Duihsaud', 70),
//   createData(11, 'siuahf', 987),
//   createData(12, 'Ekuahs', 872)
// ];

const useStyles = makeStyles({
  table: {
    maxWidth: 300,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [rows,setRows] = React.useState([]);
  useEffect(() => {
    let email = tempstorage.getProfile('email');
    let promise = getRequest('/fetchRanks',{email: email});
    promise.then(res => {
        if(res.status === 200) {
            console.log("LeaderBoardRecieved");
            console.log(res.data);
              if(res.data.rankList.length !== 0) {
                let list= [...res.data.rankList];
                setRows(list);
              }
        } else {
            alert("Leaderboard not recievd");
            // router.stateService.reload();
          }
        }).catch(res=>{
              alert("Could not connect.");
              
          })
  },[])
 
  return (
    // <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Rank</StyledTableCell>
            <StyledTableCell >Name</StyledTableCell>
            <StyledTableCell >Points</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.rank}>
              <StyledTableCell >{row.rank}</StyledTableCell>
              <StyledTableCell >{row.firstName + row.lastName}</StyledTableCell>
              <StyledTableCell >{row.points}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    // </TableContainer>
  );
}