import { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';

import styles from '../../../../../../../styles';

export default function BrandSearchForm({ handleSubmit, filtersCurrent }) {
  const [filter, setFilter] = useState(filtersCurrent);
  const { colors } = useTheme();

  return (
    <>
      <View>
        <TextInput
          mode='outlined'
          label="Nome"
          placeholder="Nome da Marca"
          name='name'
          value={filter}
          onChangeText={(value) => setFilter(value)}
          placeholderTextColor={colors.inactiveTint.main}
          outlineColor={colors.inactiveTint.main}
          activeOutlineColor={colors.primaryApp.main}
          onSubmitEditing={() => handleSubmit(filter)}
        />
      </View>
      <View style={styles.stylesListsSystemSearchModalViewButton}>
        <Button
          mode='contained'
          onPress={() => handleSubmit(filter)}
        >
          {filter ? 'Aplicar' : 'Buscar Todas Marcas'}
        </Button>
      </View>
    </>
  );
}