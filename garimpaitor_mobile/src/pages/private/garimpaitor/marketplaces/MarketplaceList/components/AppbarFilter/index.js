import { View } from 'react-native';
import { IconButton, useTheme, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from '../../../../../../../styles';

export default function AppbarFilter({ filters, openFilters }) {
  const configMessageFilterMarketplace = ({ filtersBrand, filtersNetwork, filtersCity, filtersCnpj }) => {
    let msg = ''
    if (filtersBrand) {
      msg = `${msg} - marca: '${filtersBrand}'`
    }
    if (filtersNetwork) {
      msg = `${msg} - rede: '${filtersNetwork}'`
    }
    if (filtersCity) {
      msg = `${msg} - cidade: '${filtersCity}'`
    }
    if (filtersCnpj) {
      msg = `${msg} - cnpj: '${filtersCnpj}'`
    }

    return msg;
  }
  const filtersObjects = configMessageFilterMarketplace(filters);

  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <View style={styles.stylesListsSystemFiltersView} >
      <View style={styles.stylesListsSystemFiltersViewText}>
        <IconButton
          icon={() => <FontAwesome5 name="search" size={25} color={colors.icon.main} />}
          onPress={openFilters}
        />
        {!!filtersObjects.length &&
          <View style={styles.stylesListsSystemFilterTextView}>
            <Text style={styles.stylesListsSystemFilterText} ellipsizeMode='tail' numberOfLines={3} >
              Filtros aplicados: {filtersObjects}
            </Text>
          </View>
        }
      </View>
      <View style={styles.stylesListsSystemViewIconPlus} >
        <IconButton
          icon={() => <FontAwesome5 name="plus" size={23} color={colors.icon.main} />}
          onPress={() => navigation.navigate('CreateMarketplace')}
        />
      </View>
    </View>
  );
}
