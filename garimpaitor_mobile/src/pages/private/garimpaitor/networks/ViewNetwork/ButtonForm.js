import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import styles from '../../../../../styles';

export default function ButtonForm() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesViewsPagesFormItem}>
        <Button
          color={colors.primaryApp.main}
          mode='text'
          style={styles.stylesViewsPagesFormButton}
          labelStyle={styles.stylesViewsPagesFormButtonlabel}
          onPress={() => navigation.goBack()}
        >
          Fechar
        </Button>
      </View>
    </>
  );
}
