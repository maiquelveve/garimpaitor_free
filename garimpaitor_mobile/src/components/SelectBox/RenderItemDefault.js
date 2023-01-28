import { useTheme, RadioButton } from "react-native-paper";
import styles from "../../styles";

export const RenderItemDefault = ({ item, valueCurrent, handleChangeValue, handleClosed }) => {
  const { colors } = useTheme();

  return (
    <>
      <RadioButton.Group onValueChange={() => { handleChangeValue(item); handleClosed(); }} value={valueCurrent.id}>
        <RadioButton.Item
          label={item.name}
          value={item.id}
          color={colors.greenApp.main}
          mode='ios'
          labelStyle={styles.stylesSelectBoxRadioButtonlabelStyle}
          style={{
            ...styles.stylesSelectBoxRadioButtonChecked,
            backgroundColor: valueCurrent.id === item.id ? 'rgba(0,0,0,0.1)' : 'transparent',
          }}
        />
      </RadioButton.Group>
    </>
  );
}
