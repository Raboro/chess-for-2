import React from 'react';
import { View } from 'react-native';
import Square from '../Square/Square';
import SquareElement from '../../logic/SquareElement';
import SquareColor from '../../constants/SquareColor';
import Queen from '../../logic/squareelements/Queen';
import Position from '../../logic/Position';
import SquareElementType from '../../logic/SquareElementType';
import Rook from '../../logic/squareelements/Rook';
import Bishop from '../../logic/squareelements/Bishop';
import Knight from '../../logic/squareelements/Knight';

interface Props {
  squareColor: SquareColor;
  squareElementType: SquareElementType;
  size: number;
}

const LINE_SIZE = 8;

const Promotion = (props: Props) => {
  const squareSize: number = props.size / LINE_SIZE;
  const squareElements: SquareElement[] = [
    new Queen(new Position(0, 0), props.squareElementType),
    new Rook(new Position(1, 0), props.squareElementType),
    new Bishop(new Position(2, 0), props.squareElementType),
    new Knight(new Position(3, 0), props.squareElementType),
  ];

  return (
    <View style={{ borderWidth: 2, width: (4 * squareSize) + 4, margin: squareSize * 2, flexDirection: 'row' }}>
      {squareElements.map((element, _) => (
        <Square
          key={`Element-${element.position.x}`}
          size={squareSize}
          squareColor={props.squareColor}
          squareElement={element}
          isMoveableTo={false}
          selectSquare={() => {}}
          movePiece={() => {}}
        />
      ))}
    </View>
  );
};

export default Promotion;
