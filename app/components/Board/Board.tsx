import { useState } from 'react';
import { View } from 'react-native';
import { SIZE } from '../../constants/Size';
import SquareColor from '../../constants/SquareColor';
import { Board as BoardLogic } from '../../logic/Board';
import Position from '../../logic/Position';
import PromotionType from '../../logic/promotion/PromotionType';
import SquareElement from '../../logic/SquareElement';
import SquareElementType from '../../logic/SquareElementType';
import Square from '../Square/Square';

interface Props {
  size: number;
  boardLogic: BoardLogic;
  setPromotion: (type: SquareElementType) => void;
  promotionType: PromotionType | undefined;
}

const Board = (props: Props) => {
  const [selectTriggered, setSelectTriggered] = useState(false);
  const [currentType, setCurrentType] = useState<SquareElementType>('white');
  const [isPromotion, setIsPromotion] = useState(false);
  const squareSize: number = props.size / SIZE.LINE_SIZE;

  const selectSquare = (squareElement: SquareElement) => {
    if (!isPromotion) {
      props.boardLogic.selectSquare(squareElement, currentType);
      setSelectTriggered(!selectTriggered);
    }
  };

  const movePiece = (squareElement: SquareElement) => {
    const moved: boolean = props.boardLogic.movePiece(squareElement);

    if (moved) {
      if (props.boardLogic.isPromotable()) {
        props.setPromotion(currentType);
        setIsPromotion(true);
      } else {
        setCurrentType(() => (currentType === 'white' ? 'black' : 'white'));
      }
    }

    props.boardLogic.removeSelection();
    setSelectTriggered(!selectTriggered);
  };

  if (props.promotionType !== undefined && isPromotion) {
    props.boardLogic.handlePromotion(props.promotionType);
    setCurrentType(() => (currentType === 'white' ? 'black' : 'white'));
    setIsPromotion(false);
  }

  const renderRow = (row: number) => {
    return (
      <View key={`row-${row}`} style={{ flexDirection: 'row' }}>
        {Array.from({ length: SIZE.LINE_SIZE }, (_, column) => (
          <Square
            key={`square-${row}-${column}`}
            size={squareSize}
            squareColor={
              (row + column) % 2 === 0 ? SquareColor.WHITE : SquareColor.BLACK
            }
            squareElement={props.boardLogic.getAtPosition(
              new Position(column, row),
            )}
            isMoveableTo={props.boardLogic.isMoveableTo(
              new Position(column, row),
            )}
            selectSquare={selectSquare}
            movePiece={movePiece}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ width: props.size, height: props.size }}>
      {[...Array(SIZE.LINE_SIZE)].map((_, i) => renderRow(i))}
    </View>
  );
};

export default Board;
