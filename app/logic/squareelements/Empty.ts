import { ImageSourcePropType } from 'react-native';
import Position from '../Position';
import SquareElement from '../SquareElement';
import SquareElementType from '../SquareElementType';
import { PieceImagePaths } from '../PieceImagePaths';

export default class Empty implements SquareElement {
  position: Position;
  squareElementType: Readonly<SquareElementType>;

  constructor(position: Position) {
    this.position = position;
    this.squareElementType = undefined;
  }

  isPiece(): boolean {
    return false;
  }

  display(): ImageSourcePropType {
    return PieceImagePaths.EMPTY_IMAGE_PATH;
  }
}
