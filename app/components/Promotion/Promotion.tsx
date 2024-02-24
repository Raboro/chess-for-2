import React from 'react';
import { View } from 'react-native';
import { SIZE } from '../../constants/Size';
import SquareColor from '../../constants/SquareColor';
import Position from '../../logic/Position';
import PromotionFactory from '../../logic/promotion/PromotionFactory';
import PromotionType from '../../logic/promotion/PromotionType';
import SquareElement from '../../logic/SquareElement';
import Bishop from '../../logic/squareelements/Bishop';
import Knight from '../../logic/squareelements/Knight';
import Queen from '../../logic/squareelements/Queen';
import Rook from '../../logic/squareelements/Rook';
import SquareElementType, { isWhite } from '../../logic/SquareElementType';
import Square from '../Square/Square';
import { styles } from './PromotionStyle';

interface Props {
  squareColor: SquareColor;
  squareElementType: SquareElementType;
  size: number;
  setPromotion: (promotionType: PromotionType) => void;
}

const Promotion = (props: Readonly<Props>) => {
  const squareSize: number = props.size / SIZE.LINE_SIZE;
  const squareElements: SquareElement[] = [
    new Queen(new Position(0, 0), props.squareElementType),
    new Rook(new Position(1, 0), props.squareElementType),
    new Bishop(new Position(2, 0), props.squareElementType),
    new Knight(new Position(3, 0), props.squareElementType),
  ];

  const setPromotion = (index: number) => {
    props.setPromotion(PromotionFactory.createTypeByIndex(index));
  };

  return (
    <View
      testID="Promotion"
      style={[
        styles.container,
        { width: 4 * squareSize + 4, margin: squareSize * 2 },
        isWhite(props.squareElementType)
          ? { paddingBottom: squareSize * 12 }
          : { paddingTop: squareSize * 12 },
      ]}
    >
      {squareElements.map((element, index) => (
        <Square
          key={`Element-${element.position.x}`}
          size={squareSize}
          squareColor={props.squareColor}
          squareElement={element}
          isMoveableTo={false}
          selectSquare={() => setPromotion(index)}
          movePiece={() => {}}
          inCheck={false}
        />
      ))}
    </View>
  );
};

export default Promotion;
