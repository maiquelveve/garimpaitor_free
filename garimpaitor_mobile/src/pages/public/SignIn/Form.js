import { useRef } from 'react';
import { View } from 'react-native';
import { useTheme, TextInput, HelperText } from 'react-native-paper';

import styles from '../../../styles';

export default function Form({ formik }) {
  const { colors } = useTheme();

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <>
      <View style={styles.stylesSignInFormItem}>
        <TextInput
          mode='outlined'
          label="Email"
          placeholder="Email"
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          returnKeyType="next"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
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
      <View style={styles.stylesSignInFormItem}>
        <TextInput
          mode='outlined'
          label="Senha"
          placeholder="Senha"
          secureTextEntry={true}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          ref={passwordRef}
          name='password'
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
          onChangeText={formik.handleChange('password')}
          error={Boolean(formik.touched.password && formik.errors.password)}
        />
        {Boolean(formik.touched.password && formik.errors.password) &&
          <HelperText type="error" visible={Boolean(formik.touched.password && formik.errors.password)}>
            {formik.errors.password}
          </HelperText>
        }
      </View>
    </>
  );
}
