import { ImageSourcePropType } from 'react-native';
import Displayable from '../Displayable';
import straightStrategy from '../move-strategies/StraightStrategy';
import Moveable from '../Moveable';
import Position from '../Position';
import { SquareElementImagePaths } from '../SquareElementImagePaths';
import SquareElementType, { isWhite } from '../SquareElementType';
import Piece from './Piece';

export default class Rook extends Piece implements Moveable, Displayable {
  private castlingPossible: boolean;

  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Rook');
    this.castlingPossible = true;
  }

  isMoveableTo(position: Position): boolean {
    return straightStrategy(this.position, position);
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.castlingPossible = false;
      this.position = position;
    }
  }

  display(): ImageSourcePropType {
    return isWhite(this.squareElementType)
      ? SquareElementImagePaths.WHITE_ROOK
      : SquareElementImagePaths.BLACK_ROOK;
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
