import { Dimensions, SafeAreaView } from 'react-native';

import Board from '../../components/Board/Board';

import { useState } from 'react';
import Promotion from '../../components/Promotion/Promotion';
import SquareColor from '../../constants/SquareColor';
import { Board as BoardLogic } from '../../logic/Board';
import SquareElementType from '../../logic/SquareElementType';
import { styles } from './MainScreenStyle';

const MainScreen = () => {
  const size = Dimensions.get('screen').width;
  const [promotion, setPromotion] = useState<SquareElementType>(); // eslint-disable-line

  return (
    <SafeAreaView style={styles.container}>
      {promotion === 'black' && (
        <Promotion
          size={size}
          squareColor={SquareColor.BLACK}
          squareElementType="black"
        />
      )}
      <Board size={size} boardLogic={new BoardLogic()} />
      {promotion === 'white' && (
        <Promotion
          size={size}
          squareColor={SquareColor.WHITE}
          squareElementType="white"
        />
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
