import Moveable from '../Moveable';
import Position from '../Position';
import SquareElementType from '../SquareElementType';
import diagonalStrategy from '../move-strategies/DiagonalStrategy';
import Piece from './Piece';

export default class Bishop extends Piece implements Moveable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Bishop');
  }

  isMoveableTo(position: Position): boolean {
    return diagonalStrategy(this.position, position);
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }
}
