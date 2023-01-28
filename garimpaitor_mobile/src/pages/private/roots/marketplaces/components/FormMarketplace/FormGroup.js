import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput, Text, HelperText, useTheme } from 'react-native-paper';

import Layout from '../../../../../../components/Layout';
import SnackbarAlert from '../../../../../../components/SnackbarAlert';
import LoadingSystemSimple from '../../../../../../components/LoadingSystemSimple';

import styles from '../../../../../../styles';

export default function FormGroup({
  formik,
  title,
  open,
  configSnackbar,
  setOpen,
  handleOpenModalNetwork,
  loadingGetAllNetwork,
  handleOpenModalBrand,
  loadingGetBrandForNetwork,
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
        {loadingGetAllNetwork ? <LoadingSystemSimple text='carregando as redes...' /> :
          <>
            <View style={styles.stylesViewsPagesFormItem}>
              <TouchableOpacity onPress={handleOpenModalNetwork} disabled={isView}>
                <TextInput
                  mode='outlined'
                  label="Rede"
                  placeholder="Informe a Rede"
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
            <View style={styles.stylesViewsPagesFormItem}>
              {loadingGetBrandForNetwork ? <LoadingSystemSimple text='carregando as marcas...' /> :
                <TouchableOpacity onPress={handleOpenModalBrand} disabled={isView}>
                  <TextInput
                    mode='outlined'
                    label="Marca"
                    placeholder="Informe a Marca"
                    placeholderTextColor={colors.inactiveTint.main}
                    outlineColor={colors.inactiveTint.main}
                    activeOutlineColor={colors.primaryApp.main}
                    name='brand'
                    disabled={true}
                    value={formik.values.brand}
                    onBlur={formik.handleBlur('brand')}
                    onChangeText={formik.handleChange('brand')}
                    error={Boolean(formik.touched.brand && formik.errors.brand)}
                  />
                  {Boolean(formik.touched.brand && formik.errors.brand) &&
                    <HelperText type="error" visible={Boolean(formik.touched.brand && formik.errors.brand)}>
                      {formik.errors.brand}
                    </HelperText>
                  }
                </TouchableOpacity>
              }
            </View>
          </>
        }
      </View>
    </Layout>
  );
}
