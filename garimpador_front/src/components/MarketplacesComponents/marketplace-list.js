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
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import GppBadIcon from '@mui/icons-material/GppBad';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CreateIcon from '@mui/icons-material/Create';
import { blue, green, lightBlue, red, deepOrange, cyan } from '@mui/material/colors';
import { COLOR_BACKGROUND_ROW_HEAD_TABLES } from 'src/config/constant';

import { formatMaskCnpj, formatTextUpperCase } from 'src/utils/helpersText';
import { useAuth } from 'src/context/authContext';

export const MarketplaceList = ({
  marketplaces,
  handleOpenUpdateMarketplaceModal,
  handleDisableMarketplaceSystem,
  handleActivateMarketplaceSystem,
  handleActivateMarketplaceUser,
  handleDisableMarketplaceUser,
  handleAddMarketplaceUser
}) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { userCurrent } = useAuth();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!marketplaces?.length) {
    return (
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent sx={{ justifyContent: "center", display: "flex" }}>
            <Box sx={{ maxWidth: 500 }}>
              Não foi encontrado nenhum mercado.
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
                style={{ minWidth: 50, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                CNPJ
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 170, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Mercado
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 170, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Rede
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 170, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Cidade
              </TableCell>
              <TableCell
                align="center"
                style={{ minWidth: 170, backgroundColor: COLOR_BACKGROUND_ROW_HEAD_TABLES }}
              >
                Estado
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
                Ação
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marketplaces
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(marketplace => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={marketplace.id}>
                    <TableCell align='center'>
                      {marketplace.id}
                    </TableCell>
                    <TableCell align='center'>
                      {formatMaskCnpj(marketplace.cnpj)}
                    </TableCell>
                    <TableCell align='center'>
                      {formatTextUpperCase(marketplace.brand.name)}
                    </TableCell>
                    <TableCell align="center">
                      {formatTextUpperCase(marketplace.brand.network.name)}
                    </TableCell>
                    <TableCell align="center">
                      {formatTextUpperCase(marketplace.city.name)}
                    </TableCell>
                    <TableCell align="center">
                      {formatTextUpperCase(marketplace.city.state.initial)}
                    </TableCell>
                    <TableCell align="center">
                      {formatTextUpperCase(marketplace.status ? "ATIVO" : "DESATIVADO")}
                    </TableCell>
                    <TableCell align="center">
                      {userCurrent.isRoot &&
                        <>
                          <Tooltip title="Editar Mercado">
                            <IconButton
                              aria-label="edit"
                              size="small"
                              onClick={() => handleOpenUpdateMarketplaceModal(marketplace.id)}
                            >
                              <CreateIcon sx={{ color: green[900] }} />
                            </IconButton>
                          </Tooltip>
                          {marketplace.status ?
                            <Tooltip title="Desativar Mercado?">
                              <IconButton
                                aria-label="delete"
                                size="small"
                                onClick={() => handleDisableMarketplaceSystem(marketplace)}
                              >
                                <BlockIcon sx={{ color: red[800] }} />
                              </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title="Ativar Mercado?">
                              <IconButton
                                aria-label="active"
                                size="small"
                                onClick={() => handleActivateMarketplaceSystem(marketplace)}
                              >
                                <TaskAltIcon sx={{ color: blue[900] }} />
                              </IconButton>
                            </Tooltip>
                          }
                        </>
                      }
                      {!marketplace.status ? <></> :
                        marketplace.isMyMarketplace ?
                          marketplace.marketplaceUserStatus ?
                            <Tooltip title="Desativar Mercado do Usuário">
                              <IconButton
                                aria-label="edit"
                                size="small"
                                onClick={() => handleDisableMarketplaceUser(marketplace)}
                              >
                                <GppBadIcon sx={{ color: deepOrange['A700'] }} />
                              </IconButton>
                            </Tooltip>
                            :
                            <Tooltip title="Ativar Mercado do Usuário">
                              <IconButton
                                aria-label="edit"
                                size="small"
                                onClick={() => handleActivateMarketplaceUser(marketplace)}
                              >
                                <GppGoodIcon sx={{ color: cyan['A700'] }} />
                              </IconButton>
                            </Tooltip>
                          :
                          <Tooltip title="Adicionar ao Usuário">
                            <IconButton
                              aria-label="edit"
                              size="small"
                              onClick={() => handleAddMarketplaceUser(marketplace)}
                            >
                              <AddBusinessIcon sx={{ color: lightBlue[700] }} />
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
        count={marketplaces.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={"Resultados"}
      />
    </Paper>
  );
}

MarketplaceList.propTypes = {
  marketplaces: PropTypes.array.isRequired
};
