import { View } from 'react-native';
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
            squareType={(index + i) % 2 === 0 ? 'white' : 'black'}
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
