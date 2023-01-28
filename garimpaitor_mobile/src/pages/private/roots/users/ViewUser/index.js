import { View } from 'react-native';
import { Text } from 'react-native-paper';

import Layout from '../../../../../components/Layout';

import styles from '../../../../../styles';

import Form from './Form';
import ButtonForm from './ButtonForm';

export default function ViewUser({ route }) {
  const { user } = route.params;

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesViewUserContainer}>
        <View style={styles.stylesViewUserTitleHeader}>
          <Text style={styles.stylesViewUserTitle}>Visualizar Usuario</Text>
          <Text style={styles.stylesViewUserSubtitle}>Visualizar os dados</Text>
        </View>
        <>
          <Form user={user} />
          <ButtonForm />
        </>
      </View>
    </Layout>
  );
}
