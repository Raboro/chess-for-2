import { ImageSourcePropType } from 'react-native';
import Position from '../Position';
import SquareElement from '../SquareElement';
import SquareElementType from '../SquareElementType';
import { SquareElementImagePaths } from '../SquareElementImagePaths';

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
    return SquareElementImagePaths.EMPTY_IMAGE_PATH;
  }
}
