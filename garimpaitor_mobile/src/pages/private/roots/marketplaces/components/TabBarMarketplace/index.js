import React from 'react';
import { useTheme } from 'react-native-paper';
import { TabBar } from 'react-native-tab-view';
import styles from '../../../../../../styles';

import { getTabIcon } from '../../utils';

export default function TabBarMarketplace(props) {
  const { colors } = useTheme();

  return (
    <TabBar
      {...props}
      style={styles.stylesTabBarSystemContainer}
      renderIcon={({ route, focused }) => getTabIcon(route, focused, colors)}
      tabStyle={styles.stylesTabBarSystemTabStyles}
      labelStyle={styles.stylesTabBarSystemLabelStyle}
      indicatorStyle={styles.stylesTabBarSystemIndicatorStyle}
    />
  )
}