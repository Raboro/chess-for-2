import { ImageSourcePropType } from 'react-native';
import Displayable from '../Displayable';
import diagonalStrategy from '../move-strategies/DiagonalStrategy';
import straightStrategy from '../move-strategies/StraightStrategy';
import Moveable from '../Moveable';
import { PieceImagePaths } from '../PieceImagePaths';
import Position from '../Position';
import SquareElementType, { isWhite } from '../SquareElementType';
import Piece from './Piece';

export default class Queen extends Piece implements Moveable, Displayable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Queen');
  }

  isMoveableTo(position: Position): boolean {
    return (
      diagonalStrategy(this.position, position) ||
      straightStrategy(this.position, position)
    );
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }

  display(): ImageSourcePropType {
    return isWhite(this.squareElementType)
      ? PieceImagePaths.WHITE_QUEEN
      : PieceImagePaths.BLACK_QUEEN;
  }
}
