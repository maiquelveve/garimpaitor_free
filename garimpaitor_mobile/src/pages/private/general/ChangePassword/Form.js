import { useRef } from 'react';
import { View } from 'react-native';
import { useTheme, TextInput, HelperText } from 'react-native-paper';

import styles from '../../../../styles';

export default function Form({ formik }) {
  const { colors } = useTheme();

  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const repetNewPassworddRef = useRef();

  return (
    <>
      <View style={styles.stylesChangePasswordFormItem}>
        <TextInput
          mode='outlined'
          label="Senha Atual"
          placeholder="Senha Atual"
          secureTextEntry={true}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          returnKeyType="next"
          ref={currentPasswordRef}
          onSubmitEditing={() => newPasswordRef.current.focus()}
          name='name'
          value={formik.values.currentPassword}
          onBlur={formik.handleBlur('currentPassword')}
          onChangeText={formik.handleChange('currentPassword')}
          error={Boolean(formik.touched.currentPassword && formik.errors.currentPassword)}
        />
        {Boolean(formik.touched.currentPassword && formik.errors.currentPassword) &&
          <HelperText type="error" visible={Boolean(formik.touched.currentPassword && formik.errors.currentPassword)}>
            {formik.errors.currentPassword}
          </HelperText>
        }
      </View>
      <View style={styles.stylesChangePasswordFormItem}>
        <TextInput
          mode='outlined'
          label="Nova Senha"
          placeholder="Nova Senha"
          secureTextEntry={true}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          returnKeyType="next"
          ref={newPasswordRef}
          onSubmitEditing={() => repetNewPassworddRef.current.focus()}
          name='newPassword'
          value={formik.values.newPassword}
          onBlur={formik.handleBlur('newPassword')}
          onChangeText={formik.handleChange('newPassword')}
          error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
        />
        {Boolean(formik.touched.newPassword && formik.errors.newPassword) &&
          <HelperText type="error" visible={Boolean(formik.touched.newPassword && formik.errors.newPassword)}>
            {formik.errors.newPassword}
          </HelperText>
        }
      </View>
      <View style={styles.stylesChangePasswordFormItem}>
        <TextInput
          mode='outlined'
          label="Repita Nova Senha"
          placeholder="Repita Nova Senha"
          secureTextEntry={true}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          ref={repetNewPassworddRef}
          name='repetNewPassword'
          value={formik.values.repetNewPassword}
          onBlur={formik.handleBlur('repetNewPassword')}
          onChangeText={formik.handleChange('repetNewPassword')}
          error={Boolean(formik.touched.repetNewPassword && formik.errors.repetNewPassword)}
        />
        {Boolean(formik.touched.repetNewPassword && formik.errors.repetNewPassword) &&
          <HelperText type="error" visible={Boolean(formik.touched.repetNewPassword && formik.errors.repetNewPassword)}>
            {formik.errors.repetNewPassword}
          </HelperText>
        }
      </View>
    </>
  );
}
