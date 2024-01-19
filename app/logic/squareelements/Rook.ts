import { ImageSourcePropType } from 'react-native';
import Displayable from '../Displayable';
import straightStrategy from '../move-strategies/StraightStrategy';
import Moveable from '../Moveable';
import Position from '../Position';
import { SquareElementImagePaths } from '../SquareElementImagePaths';
import SquareElementType, { isWhite } from '../SquareElementType';
import Piece from './Piece';

export default class Rook extends Piece implements Moveable, Displayable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Rook');
  }

  isMoveableTo(position: Position): boolean {
    return straightStrategy(this.position, position);
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }

  display(): ImageSourcePropType {
    return isWhite(this.squareElementType)
      ? SquareElementImagePaths.WHITE_ROOK
      : SquareElementImagePaths.BLACK_ROOK;
  }
}
