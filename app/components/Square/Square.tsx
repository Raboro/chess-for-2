import React from 'react';
import { TouchableOpacity } from 'react-native';
import SquareType from '../../constants/SquareType';
import SquareColor from '../../constants/SquareColor';

interface Props {
  size: number;
  squareType: SquareType;
}

const Square = (props: Readonly<Props>) => {
  return (
    <TouchableOpacity
      testID="Square"
      style={{
        width: props.size,
        height: props.size,
        backgroundColor:
          props.squareType === 'black' ? SquareColor.BLACK : SquareColor.WHITE,
      }}
    ></TouchableOpacity>
  );
};

export default Square;
