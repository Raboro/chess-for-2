import { View } from 'react-native';
import SquareColor from '../../constants/SquareColor';
import Position from '../../logic/Position';
import Empty from '../../logic/squareelements/Empty';
import Square from '../Square/Square';

interface Props {
  size: number;
}

const LINE_SIZE = 8;

const Board = (props: Readonly<Props>) => {
  const squareSize: number = props.size / LINE_SIZE;

  const renderRow = (index: number) => {
    return (
      <View key={`row-${index}`} style={{ flexDirection: 'row' }}>
        {Array.from({ length: LINE_SIZE }, (_, i) => (
          <Square
            key={`square-${index}-${i}`}
            size={squareSize}
            squareColor={
              (index + i) % 2 === 0 ? SquareColor.WHITE : SquareColor.BLACK
            }
            squareElement={new Empty(new Position(index, i))}
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
