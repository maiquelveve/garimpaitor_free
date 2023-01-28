import { Alert } from 'react-native';

const AlertCatchSystem = () => {
  Alert.alert('ERRO!', 'Ocorreu um erro. Tente mais tarde.', [
    { text: 'OK' },
  ]);
}

export default AlertCatchSystem;