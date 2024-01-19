import { ImageSourcePropType } from 'react-native';
import Displayable from '../Displayable';
import diagonalStrategy from '../move-strategies/DiagonalStrategy';
import Moveable from '../Moveable';
import { SquareElementImagePaths } from '../SquareElementImagePaths';
import Position from '../Position';
import SquareElementType, { isWhite } from '../SquareElementType';
import Piece from './Piece';

export default class Bishop extends Piece implements Moveable, Displayable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Bishop');
  }

  isMoveableTo(position: Position): boolean {
    return diagonalStrategy(this.position, position);
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }

  display(): ImageSourcePropType {
    return isWhite(this.squareElementType)
      ? SquareElementImagePaths.WHITE_BISHOP
      : SquareElementImagePaths.BLACK_BISHOP;
  }
}
