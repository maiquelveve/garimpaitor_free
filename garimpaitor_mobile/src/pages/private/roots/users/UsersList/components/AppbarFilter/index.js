import { View } from 'react-native';
import { IconButton, useTheme, Text } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from '../../../../../../../styles';

export default function AppbarFilter({ filters, openFilters }) {
  const { colors } = useTheme();

  return (
    <View style={styles.stylesListsSystemFiltersView} >
      <View style={styles.stylesListsSystemFiltersViewText}>
        <IconButton
          icon={() => <FontAwesome5 name="search" size={25} color={colors.icon.main} />}
          onPress={openFilters}
        />
        {!!filters.length &&
          <View style={styles.stylesListsSystemFilterTextView}>
            <Text style={styles.stylesListsSystemFilterText} ellipsizeMode='tail' numberOfLines={3} >
              Filtros aplicados: {filters}
            </Text>
          </View>
        }
      </View>
    </View>
  );
}
