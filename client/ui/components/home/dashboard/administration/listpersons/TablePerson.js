import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell,
    TableContainer, TableFooter,
    TablePagination, TableRow,
    Paper, IconButton
} from '@material-ui/core';
import {
    FirstPage as FirstPageIcon, 
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage as LastPageIcon
} from '@material-ui/icons';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    pagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },  
    table: {
        minWidth: 500,
    },
}));

const TablePaginationActions = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.pagination}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
                <IconButton 
                    onClick={handleBackButtonClick} 
                    disabled={page === 0} 
                >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}


export default () => {
    const classes = useStyles();
    const persons = useSelector( state => state.persons) || [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, persons.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    console.log(persons)

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableBody>
                    {(rowsPerPage > 0
                        ? persons.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : persons
                    ).map((person) => (
                        <TableRow key={person._id}>
                            <TableCell component="th" scope="row" style={{ width: '5vw'}} align="left">
                                {person.firstName} {person.lastName}
                            </TableCell>
                            <TableCell style={{ width: '1vw' }} align="left">
                                {person.fat}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            labelRowsPerPage="Sayfa Başına Kişi Sayısı"
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={persons.length || 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                native: true,
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}