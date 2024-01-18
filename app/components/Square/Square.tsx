import React from 'react';
import SquareType from '../../constants/SquareType';
import { TouchableOpacity } from 'react-native';

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
        backgroundColor: props.squareType,
      }}
    ></TouchableOpacity>
  );
};

export default Square;
