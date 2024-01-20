import { View } from 'react-native';
import SquareColor from '../../constants/SquareColor';
import Position from '../../logic/Position';
import Square from '../Square/Square';
import { useState } from 'react';
import { Board as BoardLogic } from '../../logic/Board';

interface Props {
  size: number;
}

const LINE_SIZE = 8;

const Board = (props: Readonly<Props>) => {
  const [boardLogic, setBoardLogic] = useState<BoardLogic>(new BoardLogic()); // eslint-disable-line
  const squareSize: number = props.size / LINE_SIZE;

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
            squareElement={boardLogic.getAtPosition(new Position(column, row))}
            isMoveableTo={false}
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
