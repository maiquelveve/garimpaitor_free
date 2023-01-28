import { useRef } from 'react';
import { View } from 'react-native';
import { useTheme, TextInput, HelperText } from 'react-native-paper';

import styles from '../../../styles';

export default function Form({ formik }) {
  const { colors } = useTheme();

  const emailRef = useRef();

  return (
    <>
      <View style={styles.stylesResetPasswordFormItem}>
        <TextInput
          mode='outlined'
          label="Email"
          placeholder="Email"
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          ref={emailRef}
          onSubmitEditing={() => emailRef.current.focus()}
          name='email'
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
          onChangeText={formik.handleChange('email')}
          error={Boolean(formik.touched.email && formik.errors.email)}
        />
        {Boolean(formik.touched.email && formik.errors.email) &&
          <HelperText type="error" visible={Boolean(formik.touched.email && formik.errors.email)}>
            {formik.errors.email}
          </HelperText>
        }
      </View>
    </>
  );
}
