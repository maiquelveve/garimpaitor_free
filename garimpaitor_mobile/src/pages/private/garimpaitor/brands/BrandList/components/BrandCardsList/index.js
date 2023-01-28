import { View } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

import CardRight from './CardRight';
import CardLeft from './CardLeft';

import CradSubTitleStatus from '../../../../../../../components/CardSubTitleStatus';
import CardSubTitleVerify from '../../../../../../../components/CardSubTitleVerify';

import styles from '../../../../../../../styles';

export default function BrandCardsList({ brand }) {
  const { colors } = useTheme();

  const Subtitle = () => {
    return (
      <>
        <CradSubTitleStatus status={brand.status} />
        {!brand.verified &&
          <CardSubTitleVerify status={brand.status} />
        }
      </>
    )
  }

  return (
    <View style={{ ...styles.stylesListsSystemViewCard, borderColor: brand.status ? colors.greenApp.main : colors.redApp.main }} >
      <Card.Title
        title={brand.name}
        subtitle={<Subtitle />}
        left={(props) => <CardLeft {...props} />}
        right={() =>
          <CardRight brand={brand} />
        }
        rightStyle={styles.stylesListsSystemCardRightStyle}
        titleStyle={styles.stylesListsSystemCardTitleStyle}
        subtitleStyle={styles.stylesListsSystemCardSubtitleStyle}
      />
    </View>
  );
}
