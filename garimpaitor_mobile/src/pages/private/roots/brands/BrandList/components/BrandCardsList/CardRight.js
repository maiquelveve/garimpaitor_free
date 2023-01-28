import { TouchableOpacity, View } from 'react-native';

import MenusActions from '../MenuActions';

import styles from '../../../../../../../styles';

export default function CardRight({ brand, loadingActions, activateBrand, deactivateBrand, verifyBrand }) {
  return (
    <View style={styles.stylesListsSystemCardRightContainer} >
      <TouchableOpacity>
        <MenusActions
          brand={brand}
          loadingActions={loadingActions}
          activateBrand={activateBrand}
          deactivateBrand={deactivateBrand}
          verifyBrand={verifyBrand}
        />
      </TouchableOpacity>
    </View>
  )
}