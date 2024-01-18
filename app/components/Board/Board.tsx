import { View } from 'react-native';
import Square from '../Square/Square';

interface Props {
  size: number;
}

const Board = (props: Readonly<Props>) => {
  const squareSize: number = props.size / 8;

  const renderRow = (index: number) => {
    return (
      <View key={`row-${index}`} style={{ flexDirection: 'row' }}>
        {Array.from({ length: 8 }, (_, i) => (
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
      {[...Array(8)].map((_, i) => renderRow(i))}
    </View>
  );
};

export default Board;
