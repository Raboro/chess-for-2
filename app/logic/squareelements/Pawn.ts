import Moveable from '../Moveable';
import Position from '../Position';
import SquareElementType from '../SquareElementType';
import Piece from './Piece';

export default class Pawn extends Piece implements Moveable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Pawn');
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.notSameLine(position) || this.position.same(position)) {
      return false;
    }

    if (this.squareElementType == 'black') {
      return this.position.y == 1
        ? this.position.y + 2 >= position.y
        : this.position.y + 1 == position.y;
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
}
