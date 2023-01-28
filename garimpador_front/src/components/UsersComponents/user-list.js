import { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { blue, green, red } from '@mui/material/colors';
import { COLOR_BACKGROUND_ROW_HEAD_TABLES } from 'src/config/constant';

export const UserList = ({ users, handleDeactiveUser, handleActiveUser, handleOpenModalChangePermmisionUser, ...rest }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!users.length) {
    return (
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ justifyContent: "center", display: "flex" }}>
            <Box sx={{ maxWidth: 500 }}>
              Não foi encontrado nenhum usuário.
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{ minWidth: 170, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Nome
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 100, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Email
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 10, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 170, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Perfil
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 170, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Ação
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(user => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                    <TableCell align='center'>
                      {user.name}
                    </TableCell>
                    <TableCell align="center">
                      {user.email}
                    </TableCell>
                    <TableCell align="center">
                      {user.status ? "ATIVO" : "DESATIVADO"}
                    </TableCell>
                    <TableCell align="center">
                      {user.type === "A" ? "ADMINISTRADOR" : user.type === "M" ? "MERCADO" : "GARIMPADOR"}
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Trocar Acesso">
                        <IconButton aria-label="edit" size="small" onClick={() => handleOpenModalChangePermmisionUser(user)}>
                          <EngineeringIcon sx={{ color: green[900] }} />
                        </IconButton>
                      </Tooltip>
                      {user.status ?
                        <Tooltip title="Desativar Usuário?">
                          <IconButton aria-label="delete" size="small" onClick={() => handleDeactiveUser(user)}>
                            <NoAccountsIcon sx={{ color: red[800] }} />
                          </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Ativar Usuário?">
                          <IconButton aria-label="delete" size="small" onClick={() => handleActiveUser(user)}>
                            <HowToRegIcon sx={{ color: blue[900] }} />
                          </IconButton>
                        </Tooltip>
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Resultados"}
      />
    </Paper>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired
};
