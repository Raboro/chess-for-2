import { Modal, View, BackHandler } from 'react-native';
import { styles } from './GameOverModalStyle';
import PressableButton from '../primitives/PressableButton/PressableButton';

interface Props {
    gameRestart: () => void;
}

const GameOverModal = (props: Props) => {
    return (
        <Modal>
            <View style={styles.container}>
                <PressableButton text='Quit' onPress={() => BackHandler.exitApp()}/>
                <PressableButton text='Again' onPress={props.gameRestart}/>
            </View>
        </Modal>
    );
}

export default GameOverModal;