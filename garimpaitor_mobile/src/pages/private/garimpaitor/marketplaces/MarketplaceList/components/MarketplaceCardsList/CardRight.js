import { TouchableOpacity, View } from 'react-native';

import MenusActions from '../MenuActions';

import styles from '../../../../../../../styles';

export default function CardRight({
  marketplace,
  loadingActions,
  addMarketplaceUser,
  disableMarketplaceUser,
  activateMarketplaceUser,
}) {
  return (
    <View style={styles.stylesListsSystemCardRightContainer} >
      <TouchableOpacity>
        <MenusActions
          marketplace={marketplace}
          loadingActions={loadingActions}
          addMarketplaceUser={addMarketplaceUser}
          disableMarketplaceUser={disableMarketplaceUser}
          activateMarketplaceUser={activateMarketplaceUser}
        />
      </TouchableOpacity>
    </View>
  )
}
