import { DefaultTheme } from 'react-native-paper';
import { colorsTheme } from './colorsTheme';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...colorsTheme,
    }
};

export default theme;