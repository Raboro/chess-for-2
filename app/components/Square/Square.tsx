import React from 'react';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import SquareColor from '../../constants/SquareColor';
import SquareElement from '../../logic/SquareElement';
import { styles } from './SquareStyle';

interface Props {
  size: number;
  squareColor: SquareColor;
  squareElement: SquareElement;
  isMoveableTo: boolean;
}

const Square = (props: Readonly<Props>) => {
  const displayPiece = (): ImageSourcePropType => {
    return props.squareElement.display();
  };

  return (
    <TouchableOpacity
      testID="Square"
      style={{
        width: props.size,
        height: props.size,
        backgroundColor: props.squareColor,
      }}
    >
      <View
        style={[
          styles.image,
          props.isMoveableTo ? styles.isMoveableTo : {},
          props.squareElement.isPiece() ? styles.moveableToPiece : {},
        ]}
      >
        <Image source={displayPiece()} />
      </View>
    </TouchableOpacity>
  );
};

export default Square;
