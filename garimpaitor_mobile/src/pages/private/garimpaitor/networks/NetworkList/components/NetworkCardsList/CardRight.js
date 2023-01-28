import { TouchableOpacity, View } from 'react-native';

import MenusActions from '../MenuActions';

import styles from '../../../../../../../styles';

export default function CardRight({ network, loadingActions, activateNetwork, deactivateNetwork, verifyNetwork }) {
  return (
    <View style={styles.stylesListsSystemCardRightContainer} >
      <TouchableOpacity>
        <MenusActions
          network={network}
          loadingActions={loadingActions}
          activateNetwork={activateNetwork}
          deactivateNetwork={deactivateNetwork}
          verifyNetwork={verifyNetwork}
        />
      </TouchableOpacity>
    </View>
  )
}