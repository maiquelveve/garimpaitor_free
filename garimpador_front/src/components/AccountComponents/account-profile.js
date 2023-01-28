import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useAuth } from 'src/context/authContext';
import LoadingSimple from '../LoadingComponent/LoadingSimple';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

export const AccountProfile = (props) => {
  const { userCurrent } = useAuth();

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {!userCurrent ? <LoadingSimple /> :
            <>
              <Avatar
                src={userCurrent?.avatarLink}
                sx={{
                  height: 64,
                  mb: 2,
                  width: 64
                }}
              />
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              >
                {userCurrent?.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {userCurrent?.type === "A" ? "Administrador" : userCurrent?.type === "M" ? "Mercado" : "Garimpador"}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Escolha um Avatar
              </Typography>
            </>
          }
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          disabled={!userCurrent}
        >
          Salvar
        </Button>
      </CardActions>
    </Card>
  )
};
