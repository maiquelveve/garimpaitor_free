import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import MenusComponent from './MenusComponent';
import styles from '../../styles';

export default function Header() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.styleHeaderContainerSafeAreaView}>
      <View style={styles.styleHeaderContainerView}>
        <TouchableOpacity style={styles.styleHeaderButtonMenuDrawer}>
          <Feather
            name="align-justify"
            color={colors.icon.main}
            size={30}
            onPress={() => { navigation.toggleDrawer() }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MenusComponent />
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
}
