import { Dimensions, SafeAreaView } from 'react-native';

import Board from '../../components/Board/Board';

import { Board as BoardLogic } from '../../logic/Board';
import { styles } from './MainScreenStyle';
import Promotion from '../../components/Promotion/Promotion';
import SquareColor from '../../constants/SquareColor';
import { useState } from 'react';
import SquareElementType from '../../logic/SquareElementType';

const MainScreen = () => {
  const [promotion, setPromotion] = useState<SquareElementType>();

  return (
    <SafeAreaView style={styles.container}>
      {promotion === 'black' && <Promotion size={Dimensions.get('screen').width} squareColor={SquareColor.BLACK} squareElementType='black'/>}
      <Board
        size={Dimensions.get('screen').width}
        boardLogic={new BoardLogic()}
      />
      {promotion === 'white' && <Promotion size={Dimensions.get('screen').width} squareColor={SquareColor.WHITE} squareElementType='white'/>}
    </SafeAreaView>
  );
};

export default MainScreen;
