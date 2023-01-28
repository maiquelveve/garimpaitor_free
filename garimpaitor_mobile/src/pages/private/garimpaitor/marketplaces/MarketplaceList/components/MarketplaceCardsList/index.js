import { View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

import CardRight from './CardRight';
import CardLeft from './CardLeft';

import CradSubTitleStatus from '../../../../../../../components/CardSubTitleStatus';
import CardSubTitleVerify from '../../../../../../../components/CardSubTitleVerify';

import styles from '../../../../../../../styles';

export default function MarketplaceCardsList({
  marketplace,
  loadingActions,
  addMarketplaceUser,
  disableMarketplaceUser,
  activateMarketplaceUser,
}) {
  const { colors } = useTheme();

  const Subtitle = () => {
    return (
      <>
        <CradSubTitleStatus status={marketplace.status} />
      </>
    )
  }

  return (
    <View style={{
      ...styles.stylesListsSystemViewCard,
      borderColor: marketplace.status ? colors.greenApp.main : colors.redApp.main
    }} >
      <Card.Title
        title={`${marketplace.brand.name} - ${marketplace.city.name}`}
        subtitle={<Subtitle />}
        left={(props) => <CardLeft {...props} />}
        right={() =>
          <CardRight
            marketplace={marketplace}
            loadingActions={loadingActions}
            addMarketplaceUser={addMarketplaceUser}
            disableMarketplaceUser={disableMarketplaceUser}
            activateMarketplaceUser={activateMarketplaceUser}
          />
        }
        rightStyle={styles.stylesListsSystemCardRightStyle}
        titleStyle={styles.stylesListsSystemCardTitleStyle}
        subtitleStyle={styles.stylesListsSystemCardSubtitleStyle}
      />
    </View>
  );
}
