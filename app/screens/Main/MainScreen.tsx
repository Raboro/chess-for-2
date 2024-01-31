import { Dimensions, SafeAreaView } from 'react-native';

import Board from '../../components/Board/Board';

import { useState } from 'react';
import Promotion from '../../components/Promotion/Promotion';
import SquareColor from '../../constants/SquareColor';
import { Board as BoardLogic } from '../../logic/Board';
import PromotionType from '../../logic/promotion/PromotionType';
import SquareElementType from '../../logic/SquareElementType';
import { styles } from './MainScreenStyle';

const MainScreen = () => {
  const size = Dimensions.get('screen').width;
  const [promotion, setPromotion] = useState<SquareElementType>();
  const [boardLogic, setBoardLogic] = useState<BoardLogic>(new BoardLogic()); // eslint-disable-line
  const [promotionType, setPromotionType] = useState<PromotionType | undefined>(
    undefined,
  );

  const triggerPromotion = (type: SquareElementType) => {
    setPromotionType(undefined);
    setPromotion(type);
  }

  const usePromotion = (type: PromotionType) => {
    setPromotion(undefined);
    setPromotionType(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      {promotion === 'black' && (
        <Promotion
          size={size}
          squareColor={SquareColor.BLACK}
          squareElementType="black"
          setPromotion={usePromotion}
        />
      )}
      <Board
        size={size}
        boardLogic={boardLogic}
        setPromotion={triggerPromotion}
        promotionType={promotionType}
      />
      {promotion === 'white' && (
        <Promotion
          size={size}
          squareColor={SquareColor.WHITE}
          squareElementType="white"
          setPromotion={usePromotion}
        />
      )}
    </SafeAreaView>
  );
};

export default MainScreen;
