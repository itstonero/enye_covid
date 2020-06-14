import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { HospitalTableHandler } from '../models/interfaces';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);


const useStyles = makeStyles({
    table: {
    },
});

export default function HospitalTable(receivedProps : HospitalTableHandler) {
    const classes = useStyles();
    const rows = receivedProps.hospitals.map(hospital => ({name:hospital.name, id:hospital.id}));

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell className="text-center font-weight-bold"> HOSPITAL NAME </StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((hospital) => (
                <StyledTableRow key={ hospital.id }>
                <StyledTableCell className="text-center" component="th" scope="row"> {hospital.name} </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}
