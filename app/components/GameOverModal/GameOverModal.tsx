import { BackHandler, Modal, View } from 'react-native';
import PressableButton from '../primitives/PressableButton/PressableButton';
import { styles } from './GameOverModalStyle';

interface Props {
  gameRestart: () => void;
}

const GameOverModal = (props: Props) => {
  return (
    <Modal>
      <View style={styles.container}>
        <PressableButton text="Quit" onPress={() => BackHandler.exitApp()} />
        <PressableButton text="Again" onPress={props.gameRestart} />
      </View>
    </Modal>
  );
};

export default GameOverModal;
