import { View, TouchableOpacity } from 'react-native';
import { useTheme, TextInput, HelperText } from 'react-native-paper';

import styles from '../../../../../styles';

export default function Form({ formik, handleOpenModalNetwork }) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesViewsPagesFormItem}>
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
      <View style={styles.stylesViewsPagesFormItem}>
        <TouchableOpacity onPress={handleOpenModalNetwork}>
          <TextInput
            mode='outlined'
            label="Rede"
            placeholder="Rede"
            placeholderTextColor={colors.inactiveTint.main}
            outlineColor={colors.inactiveTint.main}
            activeOutlineColor={colors.primaryApp.main}
            name='network'
            disabled={true}
            value={formik.values.network}
            onBlur={formik.handleBlur('network')}
            onChangeText={formik.handleChange('network')}
            error={Boolean(formik.touched.network && formik.errors.network)}
          />
          {Boolean(formik.touched.network && formik.errors.network) &&
            <HelperText type="error" visible={Boolean(formik.touched.network && formik.errors.network)}>
              {formik.errors.network}
            </HelperText>
          }
        </TouchableOpacity>
      </View>
    </>
  );
}
