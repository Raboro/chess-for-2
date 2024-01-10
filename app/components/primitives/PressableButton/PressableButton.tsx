import { Pressable, Text } from 'react-native';
import { BORDER } from '../../../constants/Border';
import { styles } from './PressableButtonStyle';

interface Props {
  text: string;
  onPress: () => void;
}

const PressableButton = (props: Readonly<Props>) => {
  return (
    <Pressable
      testID="PressableButton"
      style={({ pressed }) => [
        styles.button,
        BORDER.default,
        pressed && styles.pressedButton,
      ]}
      onPress={props.onPress}
    >
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
};

export default PressableButton;
