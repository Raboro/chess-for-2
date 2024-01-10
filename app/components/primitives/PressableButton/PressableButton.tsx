import { Pressable, Text } from 'react-native';
import { styles } from './PressableButtonStyle';
import { BORDER } from '../../../constants/Border';

interface Props {
    text: string;
    onPress: () => void;
}

const PressableButton = (props : Readonly<Props>) => {
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
}

export default PressableButton;