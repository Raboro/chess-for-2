import { ImageSourcePropType } from 'react-native';
import Displayable from '../Displayable';
import Moveable from '../Moveable';
import Position from '../Position';
import { SquareElementImagePaths } from '../SquareElementImagePaths';
import SquareElementType, { isWhite } from '../SquareElementType';
import Piece from './Piece';

export default class Pawn extends Piece implements Moveable, Displayable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Pawn');
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.notSameLine(position) || this.position.same(position)) {
      return false;
    }

    if (this.squareElementType == 'black') {
      if (this.position.y >= position.y) {
        // not behind pawn
        return false;
      }
      return this.position.y == 1
        ? this.position.y + 2 >= position.y
        : this.position.y + 1 == position.y;
    }
    if (this.position.y <= position.y) {
      // not behind pawn
      return false;
    }
    return this.position.y == 6
      ? this.position.y - 2 <= position.y
      : this.position.y - 1 == position.y;
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }

  display(): ImageSourcePropType {
    return isWhite(this.squareElementType)
      ? SquareElementImagePaths.WHITE_PAWN
      : SquareElementImagePaths.BLACK_PAWN;
  }
}
