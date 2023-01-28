import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Text, HelperText, useTheme } from 'react-native-paper';

import Layout from '../../../../../../components/Layout';
import SnackbarAlert from '../../../../../../components/SnackbarAlert';
import LoadingSystemSimple from '../../../../../../components/LoadingSystemSimple';

import styles from '../../../../../../styles';
import { formatMaskCep } from '../../../../../../utils/helpersText';

export default function FormAddressInitial({
  formik,
  title,
  open,
  configSnackbar,
  setOpen,
  handleOpenModalState,
  loadingGetStates,
  handleOpenModalCity,
  loadingGetCitys,
  isView,
}) {
  const { colors } = useTheme();

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesViewsPagesContainer}>
        <View style={styles.stylesViewsPagesTitleHeader}>
          <Text style={styles.stylesViewsPagesTitle}>{title}</Text>
          <Text style={styles.stylesViewsPagesSubtitle}>Informe os dados</Text>
        </View>
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <View style={styles.stylesViewsPagesFormItem}>
          <HelperText visible={formik.values.cep && formik.values.cep.length < 8} style={styles.stylesViewsPagesWarningTextInput} >
            * Somente os Números
          </HelperText>
          <TextInput
            mode='outlined'
            label="CEP"
            placeholder="Informe o CEP"
            placeholderTextColor={colors.inactiveTint.main}
            outlineColor={colors.inactiveTint.main}
            activeOutlineColor={colors.primaryApp.main}
            name='cep'
            value={formik.values.cep}
            onBlur={formik.handleBlur('cep')}
            onChangeText={text => formik.setFieldValue('cep', formatMaskCep(text))}
            error={Boolean(formik.touched.cep && formik.errors.cep)}
            maxLength={formik.values.cep.length <= 8 ? 8 : 9}
            keyboardType="number-pad"
            disabled={isView}
          />
          {Boolean(formik.touched.cep && formik.errors.cep) &&
            <HelperText type="error" visible={Boolean(formik.touched.cep && formik.errors.cep)}>
              {formik.errors.cep}
            </HelperText>
          }
        </View>
        <View style={styles.stylesViewsPagesFormItem}>
          {loadingGetStates ? <LoadingSystemSimple text='carregando os Estados...' /> :
            <TouchableOpacity onPress={handleOpenModalState} disabled={isView}>
              <TextInput
                mode='outlined'
                label="Estado"
                placeholder="Informe o Estado"
                placeholderTextColor={colors.inactiveTint.main}
                outlineColor={colors.inactiveTint.main}
                activeOutlineColor={colors.primaryApp.main}
                name='state'
                disabled={true}
                value={formik.values.state}
                onBlur={formik.handleBlur('state')}
                onChangeText={formik.handleChange('state')}
                error={Boolean(formik.touched.state && formik.errors.state)}
              />
              {Boolean(formik.touched.state && formik.errors.state) &&
                <HelperText type="error" visible={Boolean(formik.touched.state && formik.errors.state)}>
                  {formik.errors.state}
                </HelperText>
              }
            </TouchableOpacity>
          }
        </View>
        <View style={styles.stylesViewsPagesFormItem}>
          {loadingGetCitys ? <LoadingSystemSimple text='carregando as Cidades...' /> :
            <TouchableOpacity onPress={handleOpenModalCity} disabled={isView}>
              <TextInput
                mode='outlined'
                label="Cidade"
                placeholder="Informe o Cidade"
                placeholderTextColor={colors.inactiveTint.main}
                outlineColor={colors.inactiveTint.main}
                activeOutlineColor={colors.primaryApp.main}
                name='city'
                disabled={true}
                value={formik.values.city}
                onBlur={formik.handleBlur('city')}
                onChangeText={formik.handleChange('city')}
                error={Boolean(formik.touched.city && formik.errors.city)}
              />
              {Boolean(formik.touched.city && formik.errors.city) &&
                <HelperText type="error" visible={Boolean(formik.touched.city && formik.errors.city)}>
                  {formik.errors.city}
                </HelperText>
              }
            </TouchableOpacity>
          }
        </View>
      </View>
    </Layout>
  );
}
