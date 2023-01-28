import { View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

import CardRight from './CardRight';
import CardLeft from './CardLeft';
import CradSubTitleStatus from '../../../../../../../components/CardSubTitleStatus';

import styles from '../../../../../../../styles';

export default function UserCardsList({ user, loadingActions, activateUser, deactivateUser }) {
  const { colors } = useTheme();

  return (
    <View style={{ ...styles.stylesListsSystemViewCard, borderColor: user.status ? colors.greenApp.main : colors.redApp.main }} >
      <Card.Title
        title={user.name}
        subtitle={<CradSubTitleStatus status={user.status} />}
        left={(props) => <CardLeft {...props} />}
        right={() =>
          <CardRight
            user={user}
            loadingActions={loadingActions}
            activateUser={activateUser}
            deactivateUser={deactivateUser}
          />
        }
        rightStyle={styles.stylesListsSystemCardRightStyle}
        titleStyle={styles.stylesListsSystemCardTitleStyle}
        subtitleStyle={styles.stylesListsSystemCardSubtitleStyle}
      />
    </View>
  );
}
