import React from 'react';
import { TouchableOpacity, View, Image, ImageSourcePropType } from 'react-native';
import SquareColor from '../../constants/SquareColor';
import SquareElement from '../../logic/SquareElement';
import Displayable from '../../logic/Displayable';

const EMPTY_IMAGE_PATH: ImageSourcePropType = require('../../assets/Empty.png');

interface Props {
  size: number;
  squareColor: SquareColor;
  squareElement: SquareElement;
}

const Square = (props: Readonly<Props>) => {

  const isDisplayable = (obj: any): obj is Displayable => {
    return 'display' in obj;
  }

  const displayPiece = (): ImageSourcePropType => {
    if (isDisplayable(props.squareElement)) {
      const d: Displayable = props.squareElement as Displayable;
      return d.display();
    }
    return EMPTY_IMAGE_PATH; // fallback, but should never be executed, because of the isPiece check before
  }

  return (
    <TouchableOpacity
      testID="Square"
      style={{
        width: props.size,
        height: props.size,
        backgroundColor: props.squareColor,
      }}
    >
      {props.squareElement.isPiece() && (
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: '5%' }}>
          <Image source={displayPiece()} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Square;
