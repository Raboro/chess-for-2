import { useState } from 'react';
import { View } from 'react-native';
import SquareColor from '../../constants/SquareColor';
import { Board as BoardLogic } from '../../logic/Board';
import Position from '../../logic/Position';
import SquareElement from '../../logic/SquareElement';
import Square from '../Square/Square';

interface Props {
  size: number;
  boardLogic: BoardLogic;
}

const LINE_SIZE = 8;

const Board = (props: Readonly<Props>) => {
  const [selectTriggered, setSelectTriggered] = useState(false);
  const squareSize: number = props.size / LINE_SIZE;

  const selectSquare = (squareElement: SquareElement) => {
    props.boardLogic.selectSquare(squareElement);
    setSelectTriggered(!selectTriggered);
  };

  const movePiece = (squareElement: SquareElement) => {
    props.boardLogic.movePiece(squareElement);
    props.boardLogic.removeSelection();
    setSelectTriggered(!selectTriggered);
  };

  const renderRow = (row: number) => {
    return (
      <View key={`row-${row}`} style={{ flexDirection: 'row' }}>
        {Array.from({ length: LINE_SIZE }, (_, column) => (
          <Square
            key={`square-${row}-${column}`}
            size={squareSize}
            squareColor={
              (row + column) % 2 === 0 ? SquareColor.WHITE : SquareColor.BLACK
            }
            squareElement={props.boardLogic.getAtPosition(new Position(column, row))}
            isMoveableTo={props.boardLogic.isMoveableTo(new Position(column, row))}
            selectSquare={selectSquare}
            movePiece={movePiece}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ width: props.size, height: props.size }}>
      {[...Array(LINE_SIZE)].map((_, i) => renderRow(i))}
    </View>
  );
};

export default Board;
