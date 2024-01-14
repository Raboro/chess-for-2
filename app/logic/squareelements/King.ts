import Moveable from '../Moveable';
import Position from '../Position';
import SquareElementType from '../SquareElementType';
import Piece from './Piece';

export default class King extends Piece implements Moveable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'King');
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.same(position)) {
      return false;
    }

    // need to implement Castling
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
      this.position = position;
    }
  }
}
