import Moveable from '../Moveable';
import Position from '../Position';
import SquareElementType from '../SquareElementType';
import diagonalStrategy from '../move-strategies/DiagonalStrategy';
import straightStrategy from '../move-strategies/StraightStrategy';
import Piece from './Piece';

export default class Queen extends Piece implements Moveable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Queen');
  }

  isMoveableTo(position: Position): boolean {
    return (
      diagonalStrategy(this.position, position) ||
      straightStrategy(this.position, position)
    );
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }
}
