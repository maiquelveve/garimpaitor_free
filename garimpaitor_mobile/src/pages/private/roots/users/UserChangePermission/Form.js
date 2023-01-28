import { View } from 'react-native';
import { useTheme, RadioButton } from 'react-native-paper';

import styles from '../../../../../styles';

export default function Form({ permission, handlePermission }) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesChangePermissionFormItem}>
        <RadioButton.Group onValueChange={value => handlePermission(value)} value={permission}>
          <RadioButton.Item
            label="ADMINISTRADOR"
            value="A"
            color={colors.greenApp.main}
            mode='ios'
            labelStyle={styles.stylesChangePermissionRadioButtonlabelStyle}
            style={{
              ...styles.stylesChangePermissionRadioButtonChecked,
              backgroundColor: permission === 'A' ? 'rgba(0,0,0,0.1)' : 'transparent',
            }}
          />
          <RadioButton.Item
            label="GARIMPADOR"
            value="G"
            color={colors.greenApp.main}
            mode='ios'
            labelStyle={styles.stylesChangePermissionRadioButtonlabelStyle}
            style={{
              ...styles.stylesChangePermissionRadioButtonChecked,
              backgroundColor: permission === 'G' ? 'rgba(0,0,0,0.1)' : 'transparent',
            }}
          />
          <RadioButton.Item
            label="MERCADO"
            value="M"
            color={colors.greenApp.main}
            mode='ios'
            labelStyle={styles.stylesChangePermissionRadioButtonlabelStyle}
            style={{
              ...styles.stylesChangePermissionRadioButtonChecked,
              backgroundColor: permission === 'M' ? 'rgba(0,0,0,0.1)' : 'transparent',
            }}
          />
        </RadioButton.Group>
      </View>
    </>
  );
}
