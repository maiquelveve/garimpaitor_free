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
import BlockIcon from '@mui/icons-material/Block';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CreateIcon from '@mui/icons-material/Create';
import { blue, green, lightBlue, red } from '@mui/material/colors';
import { COLOR_BACKGROUND_ROW_HEAD_TABLES } from 'src/config/constant';

import { useAuth } from 'src/context/authContext';

export const BrandList = ({ brands, handleOpenUpdateBrandModal, handleActivateBrand, handleDisableBrand, handleVerifyBrand }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { userCurrent } = useAuth();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!brands.length) {
    return (
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ justifyContent: "center", display: "flex" }}>
            <Box sx={{ maxWidth: 500 }}>
              Não foi encontrado nenhuma marca.
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
                style={{ minWidth: 50, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                #
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 170, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Nome
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 10, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Rede
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
                Verificada?
              </TableCell>
              {userCurrent.isRoot &&
                <TableCell
                  align="center"
                  style={{ minWidth: 170, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
                >
                  Ação
                </TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {brands
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(brand => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={brand.id}>
                    <TableCell align='center'>
                      {brand.id}
                    </TableCell>
                    <TableCell align="center">
                      {brand.name}
                    </TableCell>
                    <TableCell align="center">
                      {brand.network.name}
                    </TableCell>
                    <TableCell align="center">
                      {brand.status ? "ATIVO" : "DESATIVADO"}
                    </TableCell>
                    <TableCell align="center">
                      {brand.verified ? "SIM" : "NÃO"}
                    </TableCell>
                    {userCurrent.isRoot &&
                      <TableCell align="center">
                        <Tooltip title="Editar Rede">
                          <IconButton aria-label="edit" size="small" onClick={() => handleOpenUpdateBrandModal(brand)}>
                            <CreateIcon sx={{ color: green[900] }} />
                          </IconButton>
                        </Tooltip>
                        {brand.status ?
                          <Tooltip title="Desativar Rede?">
                            <IconButton aria-label="delete" size="small" onClick={() => handleDisableBrand(brand)}>
                              <BlockIcon sx={{ color: red[800] }} />
                            </IconButton>
                          </Tooltip>
                          : !brand.verified ?
                            <Tooltip title="Validar Rede?">
                              <IconButton aria-label="verified" size="small" onClick={() => handleVerifyBrand(brand)}>
                                <ThumbUpAltIcon sx={{ color: lightBlue['A400'] }} />
                              </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title="Ativar Rede?">
                              <IconButton aria-label="active" size="small" onClick={() => handleActivateBrand(brand)}>
                                <TaskAltIcon sx={{ color: blue[900] }} />
                              </IconButton>
                            </Tooltip>
                        }
                      </TableCell>
                    }
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={brands.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Resultados"}
      />
    </Paper>
  );
}

BrandList.propTypes = {
  brands: PropTypes.array.isRequired
};
