import { TouchableOpacity, View } from 'react-native';

import MenusActions from '../MenuActions';

import styles from '../../../../../../../styles';

export default function CardRight({ user, loadingActions, activateUser, deactivateUser }) {
  return (
    <View style={styles.stylesListsSystemCardRightContainer} >
      <TouchableOpacity>
        <MenusActions
          user={user}
          loadingActions={loadingActions}
          activateUser={activateUser}
          deactivateUser={deactivateUser}
        />
      </TouchableOpacity>
    </View>
  )
}