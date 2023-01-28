import 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/config/client-graphql';
import { StatusBar, LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_900Black,
  Montserrat_600SemiBold,
  Montserrat_700Bold_Italic
} from '@expo-google-fonts/montserrat';

import AuthProvider from './src/contexts/authContext';

import LoadingApp from './src/components/LoadingFullPage';
import Routes from './src/routes';
import theme from './src/theme';

LogBox.ignoreAllLogs(); // Ignores all notifications because of apolo client cache error
console.disableYellowBox = true;

export default function App() {

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_900Black,
    Montserrat_600SemiBold,
    Montserrat_700Bold_Italic
  });

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <AuthProvider>
          <PaperProvider theme={theme}>
            <StatusBar backgroundColor={theme.colors.blackApp.main} barStyle='light-content' />
            {!fontsLoaded ? <LoadingApp /> : <Routes />}
          </PaperProvider>
        </AuthProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
}
