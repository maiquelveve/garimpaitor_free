import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function ListComponent({msgArray}) {
  return (
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      aria-label="contacts"
      dense={true}
    >
      {msgArray?.map( (msg, index) => (
        <ListItem
          disablePadding
          key={index}
        >
          <ArrowRightIcon
            style={{color: 'white'}}
            fontSize="small"
          />
          <ListItemText primary={msg} />
        </ListItem>
      ))}
    </List>
  );
}
