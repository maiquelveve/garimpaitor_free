import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

import styles from '../../../../../../../styles';

export default function MarketplaceSearchForm({ handleSubmit, filtersCurrent }) {
  const { filtersBrand, filtersNetwork, filtersCity, filtersCnpj } = filtersCurrent;

  const [brand, setBrand] = useState(filtersBrand);
  const [network, setNetwork] = useState(filtersNetwork);
  const [city, setCity] = useState(filtersCity);
  const [cnpj, setCnpj] = useState(filtersCnpj);

  const { colors } = useTheme();

  const handleSubmitFilter = () => {
    handleSubmit({ brand, network, city, cnpj })
  }

  return (
    <>
      <View style={styles.stylesListsSystemSearchModalViewItem}>
        <TextInput
          mode='outlined'
          label="Marca"
          placeholder="Nome da Marca"
          name='name'
          value={brand}
          onChangeText={(value) => setBrand(value)}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          onSubmitEditing={handleSubmitFilter}
        />
      </View>
      <View style={styles.stylesListsSystemSearchModalViewItem}>
        <TextInput
          mode='outlined'
          label="Rede"
          placeholder="Nome da Rede"
          name='name'
          value={network}
          onChangeText={(value) => setNetwork(value)}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          onSubmitEditing={handleSubmitFilter}
        />
      </View>
      <View style={styles.stylesListsSystemSearchModalViewItem}>
        <TextInput
          mode='outlined'
          label="Cidade"
          placeholder="Nome da Cidade"
          name='name'
          value={city}
          onChangeText={(value) => setCity(value)}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          onSubmitEditing={handleSubmitFilter}
        />
      </View>
      <View style={styles.stylesListsSystemSearchModalViewItem}>
        <TextInput
          mode='outlined'
          label="CNPJ"
          placeholder="Informe CNPJ"
          name='name'
          value={cnpj}
          onChangeText={(value) => setCnpj(value)}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          onSubmitEditing={handleSubmitFilter}
        />
      </View>
      <View style={styles.stylesListsSystemSearchModalViewButton}>
        <Button
          mode='contained'
          onPress={handleSubmitFilter}
        >
          {brand || network || city || cnpj
            ?
            'Aplicar'
            :
            'Buscar Todos os Mercados'
          }
        </Button>
      </View>
    </>
  );
}