import Moveable from '../Moveable';
import Position from '../Position';
import SquareElementType from '../SquareElementType';
import straightStrategy from '../movestrategies/StraightStrategy';
import Piece from './Piece';

export default class Rook extends Piece implements Moveable {
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
}
