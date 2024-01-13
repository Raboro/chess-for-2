import Position from '../Position';
import SquareElement from '../SquareElement';
import SquareElementType from '../SquareElementType';

export default class Piece implements SquareElement {
  position: Position;
  squareElementType: Readonly<SquareElementType>;

  constructor(
    position: Position,
    squareElementType: SquareElementType,
    name: string,
  ) {
    if (squareElementType == undefined) {
      throw new TypeError(`${name} should be black or white`);
    }

    this.position = position;
    this.squareElementType = squareElementType;
  }

  isPiece(): boolean {
    return true;
  }
}
