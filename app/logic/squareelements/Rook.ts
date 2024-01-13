import Moveable from '../Moveable';
import Position from '../Position';
import SquareElementType from '../SquareElementType';
import Piece from './Piece';

export default class Rook extends Piece implements Moveable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Rook');
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.same(position)) {
      return false;
    }
    return this.position.x == position.x || this.position.y == position.y;
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }
}
