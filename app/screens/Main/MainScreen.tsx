import { Dimensions, SafeAreaView } from 'react-native';

import Board from '../../components/Board/Board';
import { styles } from './MainScreenStyle';

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Board size={Dimensions.get('screen').width} />
    </SafeAreaView>
  );
};

export default MainScreen;
