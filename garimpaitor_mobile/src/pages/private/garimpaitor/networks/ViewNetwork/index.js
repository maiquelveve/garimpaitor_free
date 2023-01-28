import { View } from 'react-native';
import { Text } from 'react-native-paper';

import Layout from '../../../../../components/Layout';

import styles from '../../../../../styles';

import Form from './Form';
import ButtonForm from './ButtonForm';

export default function ViewNetwork({ route }) {
  const { network } = route.params;

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesViewsPagesContainer}>
        <View style={styles.stylesViewsPagesTitleHeader}>
          <Text style={styles.stylesViewsPagesTitle}>Visualizar Rede</Text>
          <Text style={styles.stylesViewsPagesSubtitle}>Visualizar os dados</Text>
        </View>
        <>
          <Form network={network} />
          <ButtonForm />
        </>
      </View>
    </Layout>
  );
}
