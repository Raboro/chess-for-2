import React from 'react';
import { TouchableOpacity } from 'react-native';
import SquareColor from '../../constants/SquareColor';

interface Props {
  size: number;
  squareColor: SquareColor;
}

const Square = (props: Readonly<Props>) => {
  return (
    <TouchableOpacity
      testID="Square"
      style={{
        width: props.size,
        height: props.size,
        backgroundColor: props.squareColor,
      }}
    ></TouchableOpacity>
  );
};

export default Square;
