import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function DenseTable(props) {

  const { department } = props;

  const classes = useStyles();



  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Kapı</TableCell>
            <TableCell >Blok</TableCell>
            <TableCell>Başlangıç Tarihi</TableCell>
            <TableCell>Bitiş Tarihi</TableCell>
            <TableCell>Başlangıç Saati</TableCell>
            <TableCell>Bitiş Saati</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[].map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >{row.calories}</TableCell>
              <TableCell >{row.fat}</TableCell>
              <TableCell >{row.carbs}</TableCell>
              <TableCell >{row.protein}</TableCell>
              <TableCell >{row.carbs}</TableCell>
              <TableCell >{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}