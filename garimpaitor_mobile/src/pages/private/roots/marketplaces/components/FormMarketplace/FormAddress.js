import React, { useRef } from 'react';
import { View } from 'react-native';
import { TextInput, Text, HelperText, useTheme, Button } from 'react-native-paper';

import Layout from '../../../../../../components/Layout';
import SnackbarAlert from '../../../../../../components/SnackbarAlert';

import styles from '../../../../../../styles';

export default function FormAddress({ formik, title, open, configSnackbar, setOpen, isView }) {
  const { colors } = useTheme();

  const streetRef = useRef();
  const numberRef = useRef();
  const neighborhoodRef = useRef();
  const complementRef = useRef();

  return (
    <Layout showHeader={false} keyboardVerticalOffset={150}>
      <View style={styles.stylesViewsPagesContainer}>
        <View style={styles.stylesViewsPagesTitleHeader}>
          <Text style={styles.stylesViewsPagesTitle}>{title}</Text>
          <Text style={styles.stylesViewsPagesSubtitle}>Informe os dados</Text>
        </View>
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <View style={styles.stylesViewsPagesFormItem}>
          <TextInput
            ref={streetRef}
            returnKeyType="next"
            onSubmitEditing={() => numberRef.current.focus()}
            mode='outlined'
            label="Rua"
            placeholder="Informe a Rua"
            placeholderTextColor={colors.inactiveTint.main}
            outlineColor={colors.inactiveTint.main}
            activeOutlineColor={colors.primaryApp.main}
            name='street'
            value={formik.values.street}
            onBlur={formik.handleBlur('street')}
            onChangeText={formik.handleChange('street')}
            error={Boolean(formik.touched.street && formik.errors.street)}
            disabled={isView}
          />
          {Boolean(formik.touched.street && formik.errors.street) &&
            <HelperText type="error" visible={Boolean(formik.touched.street && formik.errors.street)}>
              {formik.errors.street}
            </HelperText>
          }
        </View>
        <View style={styles.stylesViewsPagesFormItem}>
          <TextInput
            ref={numberRef}
            returnKeyType="next"
            onSubmitEditing={() => neighborhoodRef.current.focus()}
            mode='outlined'
            label="Número"
            placeholder="Informe o Número"
            placeholderTextColor={colors.inactiveTint.main}
            outlineColor={colors.inactiveTint.main}
            activeOutlineColor={colors.primaryApp.main}
            name='number'
            value={formik.values.number}
            onBlur={formik.handleBlur('number')}
            onChangeText={formik.handleChange('number')}
            error={Boolean(formik.touched.number && formik.errors.number)}
            disabled={isView}
          />
          {Boolean(formik.touched.number && formik.errors.number) &&
            <HelperText type="error" visible={Boolean(formik.touched.number && formik.errors.number)}>
              {formik.errors.number}
            </HelperText>
          }
        </View>
        <View style={styles.stylesViewsPagesFormItem}>
          <TextInput
            ref={neighborhoodRef}
            returnKeyType="next"
            onSubmitEditing={() => complementRef.current.focus()}
            mode='outlined'
            label="Bairro"
            placeholder="Informe o Bairro"
            placeholderTextColor={colors.inactiveTint.main}
            outlineColor={colors.inactiveTint.main}
            activeOutlineColor={colors.primaryApp.main}
            name='neighborhood'
            value={formik.values.neighborhood}
            onBlur={formik.handleBlur('neighborhood')}
            onChangeText={formik.handleChange('neighborhood')}
            error={Boolean(formik.touched.neighborhood && formik.errors.neighborhood)}
            disabled={isView}
          />
          {Boolean(formik.touched.neighborhood && formik.errors.neighborhood) &&
            <HelperText type="error" visible={Boolean(formik.touched.neighborhood && formik.errors.neighborhood)}>
              {formik.errors.neighborhood}
            </HelperText>
          }
        </View>
        <View style={styles.stylesViewsPagesFormItem}>
          <TextInput
            ref={complementRef}
            mode='outlined'
            label="Complemento"
            placeholder="Informe o Complemento"
            placeholderTextColor={colors.inactiveTint.main}
            outlineColor={colors.inactiveTint.main}
            activeOutlineColor={colors.primaryApp.main}
            name='complement'
            value={formik.values.complement}
            onBlur={formik.handleBlur('complement')}
            onChangeText={formik.handleChange('complement')}
            error={Boolean(formik.touched.complement && formik.errors.complement)}
            disabled={isView}
          />
          {Boolean(formik.touched.complement && formik.errors.complement) &&
            <HelperText type="error" visible={Boolean(formik.touched.complement && formik.errors.complement)}>
              {formik.errors.complement}
            </HelperText>
          }
        </View>
      </View>
    </Layout>
  );
}
