import React from 'react';
import { View } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';

import Layout from '../../../../../../components/Layout';
import SnackbarAlert from '../../../../../../components/SnackbarAlert';

import styles from '../../../../../../styles';

export default function FormActions({ formik, title, open, configSnackbar, setOpen, loading, isView }) {
  const { colors } = useTheme();

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesViewsPagesContainer}>
        <View style={styles.stylesViewsPagesTitleHeader}>
          <Text style={styles.stylesViewsPagesTitle}>{title}</Text>
        </View>
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <View style={styles.stylesViewsPagesFormItem}>
          <Button
            color={colors.primaryApp.main}
            mode='contained'
            loading={loading}
            disabled={formik.isSubmitting || !!Object.keys(formik.errors).length}
            style={styles.stylesSignUpFormButton}
            labelStyle={styles.stylesSignUpFormButtonlabel}
            onPress={formik.handleSubmit}
          >
            {isView ? 'Fechar' : 'Salvar'}
          </Button>
        </View>
        {!!Object.keys(formik.errors).length &&
          <View style={[styles.stylesViewsPagesCenterText]}>
            <Text style={styles.stylesViewsPagesSubtitleErrorAlert}>Verifique se todos os dado estão corretos</Text>
          </View>
        }
      </View>
    </Layout>
  );
}
