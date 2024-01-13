import Moveable from '../Moveable';
import Position from '../Position';
import SquareElement from '../SquareElement';
import SquareElementType from '../SquareElementType';

export default class Pawn implements SquareElement, Moveable {
  position: Position;
  squareElementType: Readonly<SquareElementType>;

  constructor(position: Position, squareElementType: SquareElementType) {
    if (squareElementType == undefined) {
      throw new TypeError('Pawn should be black or white');
    }

    this.position = position;
    this.squareElementType = squareElementType;
  }

  isPiece(): boolean {
    return true;
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.notSameLine(position) || this.position.same(position)) {
      return false;
    }

    if (this.squareElementType == 'black') {
      return (this.position.y == 1) ? (this.position.y + 2) >= position.y : (this.position.y + 1) == position.y;
    } 
    return (this.position.y == 6) ? (this.position.y - 2) <= position.y : (this.position.y - 1) == position.y;
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }
}
