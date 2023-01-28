import { View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

import CardRight from './CardRight';
import CardLeft from './CardLeft';

import CradSubTitleStatus from '../../../../../../../components/CardSubTitleStatus';
import CardSubTitleVerify from '../../../../../../../components/CardSubTitleVerify';

import styles from '../../../../../../../styles';

export default function NetworkCardsList({ network, loadingActions, activateNetwork, deactivateNetwork, verifyNetwork }) {
  const { colors } = useTheme();

  const Subtitle = () => {
    return (
      <>
        <CradSubTitleStatus status={network.status} />
        {!network.verified &&
          <CardSubTitleVerify status={network.status} />
        }
      </>
    )
  }

  return (
    <View style={{ ...styles.stylesListsSystemViewCard, borderColor: network.status ? colors.greenApp.main : colors.redApp.main }} >
      <Card.Title
        title={network.name}
        subtitle={<Subtitle />}
        left={(props) => <CardLeft {...props} />}
        right={() =>
          <CardRight
            network={network}
            loadingActions={loadingActions}
            activateNetwork={activateNetwork}
            deactivateNetwork={deactivateNetwork}
            verifyNetwork={verifyNetwork}
          />
        }
        rightStyle={styles.stylesListsSystemCardRightStyle}
        titleStyle={styles.stylesListsSystemCardTitleStyle}
        subtitleStyle={styles.stylesListsSystemCardSubtitleStyle}
      />
    </View>
  );
}
