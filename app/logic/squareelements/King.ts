import Moveable from '../Moveable';
import Position from '../Position';
import SquareElementType from '../SquareElementType';
import aroundStrategy from '../movestrategies/AroundStrategy';
import Piece from './Piece';

export default class King extends Piece implements Moveable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'King');
  }

  isMoveableTo(position: Position): boolean {
    // need to implement Castling
    return aroundStrategy(this.position, position);
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }
}
