import React from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell,
    TableContainer, TableFooter,
    TablePagination, TableRow,
    Paper, IconButton, TableHead,
} from '@material-ui/core';
import {
    FirstPage as FirstPageIcon, 
    KeyboardArrowLeft,
    KeyboardArrowRight,
    LastPage as LastPageIcon,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';

import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ShowPlace from './ShowPlace';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2)
    },
    pagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },  
    table: {
        minWidth: 500,
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.primary.light,
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

const TablePaginationActions = (props) => {

    const { selectedUser } = props;

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


export default (props) => {
    const classes = useStyles();
    const places = useSelector( state => state.places) || [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const { selectedUser } = props

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, places.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <TableContainer component={Paper} className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Yer Adı</StyledTableCell>
                        <StyledTableCell>Kayıt&nbsp;Tarihi</StyledTableCell>
                        <StyledTableCell align="left">Düzenle</StyledTableCell>
                        <StyledTableCell align="left">Sil</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? places.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : places 
                    ).map((place) => (
                        <TableRow key={place._id} hover={true}>
                            <TableCell align="left">
                                <ShowPlace placename={place.name} placeId={place._id} />
                            </TableCell>
                            <TableCell align="left">
                                {place.createdAt}
                            </TableCell>
                            <TableCell align="left">
                                <EditButton placeId={place._id} userId={selectedUser}/>
                            </TableCell>
                            <TableCell align="left">
                                <DeleteButton placeId={place._id} userId={selectedUser} />
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
                            labelRowsPerPage="Sayfa Başına Yer Sayısı"
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={places.length || 0}
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