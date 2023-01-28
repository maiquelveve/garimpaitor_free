import { TouchableOpacity, View } from 'react-native';

import MenusActions from '../MenuActions';

import styles from '../../../../../../../styles';

export default function CardRight({ brand }) {
  return (
    <View style={styles.stylesListsSystemCardRightContainer} >
      <TouchableOpacity>
        <MenusActions brand={brand} />
      </TouchableOpacity>
    </View>
  )
}