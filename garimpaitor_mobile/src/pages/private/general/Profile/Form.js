import { useRef } from 'react';
import { View } from 'react-native';
import { useTheme, TextInput, HelperText } from 'react-native-paper';

import styles from '../../../../styles';

export default function Form({ formik }) {
  const { colors } = useTheme();

  const nameRef = useRef();
  const emailRef = useRef();

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
          returnKeyType="next"
          ref={nameRef}
          onSubmitEditing={() => emailRef.current.focus()}
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
      <View style={styles.stylesProfileFormItem}>
        <TextInput
          mode='outlined'
          label="Email"
          placeholder="Email"
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          ref={emailRef}
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
