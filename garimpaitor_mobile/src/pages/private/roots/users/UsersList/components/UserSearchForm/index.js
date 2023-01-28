import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

import styles from '../../../../../../../styles';

export default function UserSearchForm({ handleSubmit, filtersCurrent }) {
  const [filter, setFilter] = useState(filtersCurrent);
  const { colors } = useTheme();

  return (
    <>
      <View>
        <TextInput
          mode='outlined'
          label="Nome"
          placeholder="Nome do Usuario"
          name='name'
          value={filter}
          onChangeText={(value) => setFilter(value)}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          onSubmitEditing={() => handleSubmit(filter)}
        />
      </View>
      <View style={styles.stylesSearchModalUsersViewButton}>
        <Button
          mode='contained'
          onPress={() => handleSubmit(filter)}
        >
          {filter ? 'Aplicar' : 'Buscar Todos usuarios'}
        </Button>
      </View>
    </>
  );
}