import Moveable from '../Moveable';
import Position from '../Position';
import SquareElementType from '../SquareElementType';
import Piece from './Piece';

export default class Queen extends Piece implements Moveable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Queen');
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.same(position)) {
      return false;
    }
    return true; // need to implement the rest
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }
}
