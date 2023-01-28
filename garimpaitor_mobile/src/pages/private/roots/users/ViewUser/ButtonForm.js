import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import styles from '../../../../../styles';

export default function ButtonForm() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesViewUserFormItem}>
        <Button
          color={colors.primaryApp.main}
          mode='contained'
          style={styles.stylesViewUserFormButton}
          labelStyle={styles.stylesViewUserFormButtonlabel}
          onPress={() => navigation.goBack()}
        >
          Fechar
        </Button>
      </View>
    </>
  );
}
