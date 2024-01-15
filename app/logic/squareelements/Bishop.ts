import Moveable from '../Moveable';
import Position from '../Position';
import SquareElementType from '../SquareElementType';
import Piece from './Piece';

export default class Bishop extends Piece implements Moveable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Bishop');
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.same(position)) {
      return false;
    }

    const differenceOfX = this.getPositiveDifferenceOf(
      this.position.x,
      position.x,
    );

    const differenceOfY = this.getPositiveDifferenceOf(
      this.position.y,
      position.y,
    );

    return differenceOfX === differenceOfY || differenceOfX === -differenceOfY;
  }

  private getPositiveDifferenceOf(n1: number, n2: number): number {
    return n1 >= n2 ? n1 - n2 : n2 - n1;
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }
}
