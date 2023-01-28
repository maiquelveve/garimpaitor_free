import { View } from 'react-native';
import { useTheme, TextInput, HelperText } from 'react-native-paper';

import styles from '../../../../../styles';

export default function Form({ formik }) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesProfileFormItem}>
        <TextInput
          mode='outlined'
          label="Nome"
          placeholder="Nome"
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          name='name'
          value={formik.values.name}
          onBlur={formik.handleBlur('name')}
          onChangeText={formik.handleChange('name')}
          error={Boolean(formik.touched.name && formik.errors.name)}
        />
        {Boolean(formik.touched.name && formik.errors.name) &&
          <HelperText type="error" visible={Boolean(formik.touched.name && formik.errors.name)}>
            {formik.errors.name}
          </HelperText>
        }
      </View>
    </>
  );
}
