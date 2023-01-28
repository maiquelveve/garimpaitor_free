import React, { useState } from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

import Form from './Form';
import ButtonForm from './ButtonForm';

import { CHANGE_PERMISSION_ROOT } from '../../../../../graphql/users/mutation';
import { useMutation } from '@apollo/client';

import Layout from '../../../../../components/Layout';
import SnackbarAlert from '../../../../../components/SnackbarAlert';
import AlertCatchSystem from '../../../../../components/AlertCatchSystem';

import styles from '../../../../../styles';

export default function UserChangePermission({ route }) {
  const [open, setOpen] = useState(false);
  const [permission, setPermission] = useState(route.params.user.type);
  const [configSnackbar, setConfigSnackbar] = useState(false);

  const { user } = route.params;


  /***************************************************************/
  /*************** BEGINNING CONFIGURATIONS GRAPHQL **************/
  /***************************************************************/

  /********* CHANGE PERMISSION USERS ***********/
  const optionsChangePermissionRoot = {
    onCompleted() {
      setConfigSnackbar({
        type: 'success',
        textMsg: 'Usuário Aletrado com Sucesso!'
      });
      setOpen(true);
    },
    onError(error) {
      setConfigSnackbar({
        error,
        type: 'ERROR',
      });
      setOpen(true);
    }
  }
  const [changePermissionRoot, { loading }] = useMutation(CHANGE_PERMISSION_ROOT, optionsChangePermissionRoot);

  /***************************************************************/
  /******************* END CONFIGURATIONS GRAPHQL ****************/
  /***************************************************************/


  const handlePermission = (value) => setPermission(value);

  const handleSave = async () => {
    try {
      await changePermissionRoot({ variables: { user_id: user.id, permission } })

    } catch (error) {
      AlertCatchSystem();
    }
  }

  return (
    <Layout showHeader={false}>
      <View style={{ ...styles.stylesChangePermissionContainer }}>
        <View style={styles.stylesChangePermissionTitleHeader}>
          <Text style={styles.stylesChangePermissionTitle}>Trocar Acesso</Text>
          <Text style={styles.stylesChangePermissionSubtitle}>Escolha um tipo de acesso</Text>
        </View>
        {open &&
          <SnackbarAlert open={open} configSnackbar={configSnackbar} onClosed={() => setOpen(false)} />
        }
        <View style={styles.stylesChangePermissionLabelUserContainer}>
          <Text style={styles.stylesChangePermissionLabelUser} ellipsizeMode='tail' numberOfLines={3} >
            USUÁRIO:
          </Text>
          <Text style={styles.stylesChangePermissionNameUser} ellipsizeMode='tail' numberOfLines={3} >
            {user.name.toUpperCase()}
          </Text>
        </View>
        <Divider style={styles.stylesChangePermissionDividerLabelUser} />
        <Form permission={permission} handlePermission={handlePermission} />
        <ButtonForm handleSave={handleSave} loading={loading} />
      </View>
    </Layout>
  );
}
