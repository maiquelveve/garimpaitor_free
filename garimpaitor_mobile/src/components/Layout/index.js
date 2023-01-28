import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from '../../styles';
import Header from '../Header';

export default function Layout({ children, showHeader = true, setScrollView = true, keyboardVerticalOffset = 100 }) {

  return (
    <>
      {showHeader &&
        <Header />
      }
      <SafeAreaView style={styles.stylesLayoutSafeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.stylesLayoutContainerKeyboardAvoidingView}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={styles.stylesLayoutContainerView}>

            {setScrollView ?
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.stylesLayoutContainerScrollView}
              >
                {children}
              </ScrollView>
              :
              children
            }
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}