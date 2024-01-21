import { ImageSourcePropType } from 'react-native';
import Position from '../Position';
import SquareElement from '../SquareElement';
import { SquareElementImagePaths } from '../SquareElementImagePaths';
import SquareElementType from '../SquareElementType';

export default class Piece implements SquareElement {
  position: Position;
  squareElementType: Readonly<SquareElementType>;

  constructor(
    position: Position,
    squareElementType: SquareElementType,
    name: string,
  ) {
    if (squareElementType == undefined) {
      throw new TypeError(`${name} should be black or white`);
    }

    this.position = position;
    this.squareElementType = squareElementType;
  }

  display(): ImageSourcePropType {
    return SquareElementImagePaths.EMPTY_IMAGE_PATH;
  }

  isPiece(): boolean {
    return true;
  }
}
