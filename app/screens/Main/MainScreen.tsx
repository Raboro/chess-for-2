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
  const [boardLogic, setBoardLogic] = useState<BoardLogic>(new BoardLogic());
  const [promotionType, setPromotionType] = useState<PromotionType | undefined>(
    undefined,
  );

  const triggerPromotion = (type: SquareElementType) => {
    setPromotionType(undefined);
    setPromotion(type);
  };

  const usePromotion = (type: PromotionType) => {
    setPromotion(undefined);
    setPromotionType(type);
  };

  const updateBoardLogic = () => {
    setBoardLogic(() => new BoardLogic());
  };

  const renderPromotion = (color: SquareElementType) => {
    return (
      <Promotion
        size={size}
        squareColor={color === 'black' ? SquareColor.BLACK : SquareColor.WHITE}
        squareElementType={color}
        setPromotion={usePromotion}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {promotion === 'black' && renderPromotion(promotion)}
      <Board
        size={size}
        boardLogic={boardLogic}
        setPromotion={triggerPromotion}
        promotionType={promotionType}
        gameRestart={updateBoardLogic}
      />
      {promotion === 'white' && renderPromotion(promotion)}
    </SafeAreaView>
  );
};

export default MainScreen;
