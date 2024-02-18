import { ImageSourcePropType } from 'react-native';
import Displayable from '../Displayable';
import Moveable from '../Moveable';
import Position from '../Position';
import { SquareElementImagePaths } from '../SquareElementImagePaths';
import SquareElementType, { isWhite } from '../SquareElementType';
import Piece from './Piece';

export default class King extends Piece implements Moveable, Displayable {
  private castlingPossible: boolean;

  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'King');
    this.castlingPossible = true;
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.same(position)) {
      return false;
    }

    const oneUpOrDown =
      this.position.differenceOfOneX(position) && this.position.y == position.y;
    const oneLeftOrRight =
      this.position.differenceOfOneY(position) && this.position.x == position.x;
    const oneDiagonal =
      this.position.differenceOfOneX(position) &&
      this.position.differenceOfOneY(position);

    return oneUpOrDown || oneLeftOrRight || oneDiagonal;
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.castlingPossible = false;
      this.position = position;
    }
  }

  display(): ImageSourcePropType {
    return isWhite(this.squareElementType)
      ? SquareElementImagePaths.WHITE_KING
      : SquareElementImagePaths.BLACK_KING;
  }

  castleTo(position: Position): void {
    if (this.castlingPossible) {
      this.position = position;
    }
  }

  isCastlingPossible(): boolean {
    return this.castlingPossible;
  }
}
