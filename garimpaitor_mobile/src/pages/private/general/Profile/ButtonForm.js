import { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme, Button, Text } from 'react-native-paper';

import styles from '../../../../styles';
import AlertYesOrNo from '../../../../components/AlertYesOrNo';

export default function ButtonForm({ formik, loading, handleDisableUser }) {
  const [visible, setVisible] = useState(false);
  const { colors } = useTheme();

  const handleClosed = useCallback(() => {
    setVisible(false);
  }, [visible]);

  return (
    <>
      <View style={styles.stylesProfileFormItem}>
        <Button
          color={colors.primaryApp.main}
          mode='contained'
          loading={loading}
          disabled={formik.isSubmitting}
          style={styles.stylesProfileFormButton}
          labelStyle={styles.stylesProfileFormButtonlabel}
          onPress={formik.handleSubmit}
        >
          Salvar
        </Button>
        <TouchableOpacity
          style={styles.stylesProfileFormButtonDesactive}
          onPress={() => setVisible(true)}
        >
          <Text
            style={styles.stylesProfileFormButtonDesactiveText}
          >
            DESATIVAR MINHA CONTA
          </Text>
        </TouchableOpacity>
      </View>
      <AlertYesOrNo
        visible={visible}
        handleClosed={handleClosed}
        callback={handleDisableUser}
        message="Realmente deseja desativar sua conta?"
        showTitle={true}
        title="CUIDADO"
        type="info"
      />
    </>
  );
}
