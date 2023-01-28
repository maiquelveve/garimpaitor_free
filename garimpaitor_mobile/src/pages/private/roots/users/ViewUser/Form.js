import { View } from 'react-native';
import { useTheme, TextInput } from 'react-native-paper';

import styles from '../../../../../styles';

export default function Form({ user }) {
  const { colors } = useTheme();

  return (
    <>
      <View style={styles.stylesViewUserFormItem}>
        <TextInput
          mode='outlined'
          label="Nome"
          placeholder="Nome"
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          returnKeyType="next"
          name='name'
          value={user.name}
          disabled={true}
        />
      </View>
      <View style={styles.stylesViewUserFormItem}>
        <TextInput
          mode='outlined'
          label="Email"
          placeholder="Email"
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          name='email'
          value={user.email}
          disabled={true}
        />
      </View>
      <View style={styles.stylesViewUserFormItem}>
        <TextInput
          mode='outlined'
          label="Tipo"
          placeholder="Tipo"
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          name='type'
          value={user.type === 'G' ? 'GARIMPADOR' : user.type === 'M' ? 'MERCADO' : 'ADMINISTRADOR'}
          disabled={true}
        />
      </View>
      <View style={styles.stylesViewUserFormItem}>
        <TextInput
          mode='outlined'
          label="Situação"
          placeholder="Situação"
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          name='status'
          value={user.status ? "ATIVO" : "INATIVO"}
          disabled={true}
        />
      </View>
    </>
  );
}
