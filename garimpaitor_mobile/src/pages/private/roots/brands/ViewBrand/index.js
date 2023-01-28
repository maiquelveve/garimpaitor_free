import { View } from 'react-native';
import { Text } from 'react-native-paper';

import Layout from '../../../../../components/Layout';

import styles from '../../../../../styles';

import Form from './Form';
import ButtonForm from './ButtonForm';

export default function ViewBrand({ route }) {
  const { brand } = route.params;

  return (
    <Layout showHeader={false}>
      <View style={styles.stylesViewsPagesContainer}>
        <View style={styles.stylesViewsPagesTitleHeader}>
          <Text style={styles.stylesViewsPagesTitle}>Visualizar Rede</Text>
          <Text style={styles.stylesViewsPagesSubtitle}>Visualizar os dados</Text>
        </View>
        <>
          <Form brand={brand} />
          <ButtonForm />
        </>
      </View>
    </Layout>
  );
}
