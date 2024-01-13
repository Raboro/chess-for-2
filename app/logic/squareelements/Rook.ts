import Moveable from '../Moveable';
import Position from '../Position';
import SquareElement from '../SquareElement';
import SquareElementType from '../SquareElementType';

export default class Rook implements SquareElement, Moveable {
  position: Position;
  squareElementType: Readonly<SquareElementType>;

  constructor(position: Position, squareElementType: SquareElementType) {
    if (squareElementType == undefined) {
      throw new TypeError('Rook should be black or white');
    }

    this.position = position;
    this.squareElementType = squareElementType;
  }

  isPiece(): boolean {
    return true;
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
