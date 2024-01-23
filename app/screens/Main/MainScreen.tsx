import { Dimensions, SafeAreaView } from 'react-native';

import Board from '../../components/Board/Board';

import { Board as BoardLogic } from '../../logic/Board';
import { styles } from './MainScreenStyle';

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Board
        size={Dimensions.get('screen').width}
        boardLogic={new BoardLogic()}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
