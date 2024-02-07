import React from 'react';
import { Image, ImageSourcePropType, Pressable, View } from 'react-native';
import SquareColor from '../../constants/SquareColor';
import SquareElement from '../../logic/SquareElement';
import { styles } from './SquareStyle';

interface Props {
  size: number;
  squareColor: SquareColor;
  squareElement: SquareElement;
  isMoveableTo: boolean;
  inCheck: boolean;
  selectSquare: (squareElement: SquareElement) => void;
  movePiece: (squareElement: SquareElement) => void;
}

const Square = (props: Readonly<Props>) => {
  const displayPiece = (): ImageSourcePropType => {
    return props.squareElement.display();
  };

  return (
    <Pressable
      testID="Square"
      style={[
        {
          width: props.size,
          height: props.size,
          backgroundColor: props.squareColor,
        },
        props.inCheck ? styles.inCheck : {},
      ]}
      onPress={() =>
        props.isMoveableTo
          ? props.movePiece(props.squareElement)
          : props.selectSquare(props.squareElement)
      }
    >
      <View
        testID="SquareImage"
        style={[
          styles.image,
          props.isMoveableTo ? styles.isMoveableTo : {},
          props.squareElement.isPiece() ? styles.moveableToPiece : {},
        ]}
      >
        <Image source={displayPiece()} />
      </View>
    </Pressable>
  );
};

export default Square;
