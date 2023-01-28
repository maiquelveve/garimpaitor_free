import { useRef } from 'react';
import { View } from 'react-native';
import { useTheme, TextInput, Checkbox, HelperText, Text } from 'react-native-paper';

import styles from '../../../styles';

export default function Form({ formik }) {
  const { colors } = useTheme();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <>
      <View style={styles.stylesSignUpFormItem}>
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
      <View style={styles.stylesSignUpFormItem}>
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
      <View style={styles.stylesSignUpFormItem}>
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
      <View style={styles.stylesSignUpAcceptConditionsView} >
        <View style={styles.stylesSignUpAcceptConditionsViewCheckbpx}>
          <Checkbox
            status={formik.values.policy ? 'checked' : 'unchecked'}
            color={colors.primaryApp.main}
            onPress={() => formik.setFieldValue('policy', !formik.values.policy)}
          />
        </View>
        <Text style={styles.stylesSignUpAcceptConditionsText}>
          {formik.values.policy ? 'Aceito os Termos e Condições' : 'Aceite os Termos e Condições para Continuar....'}
        </Text>
      </View>
    </>
  );
}
