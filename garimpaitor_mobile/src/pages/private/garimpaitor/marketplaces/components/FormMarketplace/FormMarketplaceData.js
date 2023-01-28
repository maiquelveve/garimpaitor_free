import React from 'react';
import { View } from 'react-native';
import { TextInput, Text, HelperText, useTheme } from 'react-native-paper';

import Layout from '../../../../../../components/Layout';
import SnackbarAlert from '../../../../../../components/SnackbarAlert';

import styles from '../../../../../../styles';
import { formatMaskCnpj } from '../../../../../../utils/helpersText';

export default function FormMarketplaceData({ formik, title, open, configSnackbar, setOpen, isView }) {
  const { colors } = useTheme();

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesViewsPagesContainer}>
        <View style={styles.stylesViewsPagesTitleHeader}>
          <Text style={styles.stylesViewsPagesTitle}>{title}</Text>
          <Text style={styles.stylesViewsPagesSubtitle}>Informe o CNPJ</Text>
        </View>
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <View style={styles.stylesViewsPagesFormItem}>
          <HelperText visible={formik.values.cnpj && formik.values.cnpj.length < 14} style={styles.stylesViewsPagesWarningTextInput}>
            * Somente os Números
          </HelperText>
          <TextInput
            mode='outlined'
            label="CNPJ"
            placeholder="Informe o CNPJ"
            placeholderTextColor={colors.inactiveTint.main}
            outlineColor={colors.inactiveTint.main}
            activeOutlineColor={colors.primaryApp.main}
            name='cnpj'
            value={formik.values.cnpj}
            onBlur={formik.handleBlur('cnpj')}
            onChangeText={text => formik.setFieldValue('cnpj', formatMaskCnpj(text))}
            error={Boolean(formik.touched.cnpj && formik.errors.cnpj)}
            maxLength={formik.values.cnpj.length <= 14 ? 14 : 18}
            keyboardType="number-pad"
            disabled={isView}
          />
          {Boolean(formik.touched.cnpj && formik.errors.cnpj) &&
            <HelperText type="error" visible={Boolean(formik.touched.cnpj && formik.errors.cnpj)}>
              {formik.errors.cnpj}
            </HelperText>
          }
        </View>
      </View>
    </Layout>
  );
}
