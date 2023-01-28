import { View, TextInput } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

import styles from '../../styles';
import debounce from '../../utils/debounce';

const Header = ({ handleFindItem }) => {

  const { colors } = useTheme();

  return (
    <View style={styles.stylesSelectBoxHeaderContainer} >
      <View style={styles.stylesSelectBoxHeaderTitleView}>
        <Text style={styles.stylesSelectBoxHeaderTitleText}>
          Selecione um Item
        </Text>
      </View>
      <View style={styles.stylesSelectBoxHeaderSearchContainer}>
        <View style={styles.stylesSelectBoxHeaderSearchInputView} >
          <TextInput
            placeholder='Pesquisar'
            onChangeText={(value) => debounce(() => handleFindItem(value), 1000)}
          />
        </View>
        <View style={styles.stylesSelectBoxHeaderSearchButtonView} >
          <Feather
            name="search"
            color={colors.icon.main}
            size={15}
          />
        </View>
      </View>
    </View>
  )
}

export default Header;
