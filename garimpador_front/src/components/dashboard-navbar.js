import PropTypes from 'prop-types';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import { AppBar, Badge, Box, Button, IconButton, Toolbar, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Bell as BellIcon } from '../icons/bell';

import { useAuth } from 'src/context/authContext';
import AvatarUserComponet from './AvatarUserComponet';
import { useEffect, useState } from 'react';
import LoadingSimple from './LoadingComponent/LoadingSimple';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const [loading, setLoading] = useState(false);
  const { getToken, userCurrent } = useAuth();
  const { onSidebarOpen, ...other } = props;

  useEffect(() => {
    setLoading(true);
  }, [])

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          {loading ?
            getToken() ?
              <>
                <Tooltip title="Notificações">
                  <IconButton sx={{ ml: 1 }}>
                    <Badge
                      badgeContent={4}
                      color="primary"
                      variant="dot"
                    >
                      <BellIcon fontSize="small" />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <AvatarUserComponet src={userCurrent?.avatarLink} />
              </>
              :
              <NextLink
                href={'/usuarios/login'}
                passHref
              >
                <Button variant='text'>ENTRAR</Button>
              </NextLink>
            :
            <LoadingSimple />
          }
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
