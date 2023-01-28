import { useTheme, Avatar } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

export default function CardLeft(props) {
  const { colors } = useTheme();

  return (
    <Avatar.Icon
      {...props}
      backgroundColor={colors.infoApp.dark}
      icon={() => <FontAwesome5 name="user-alt" size={20} color={colors.whiteApp.main} />}
    />
  )
}