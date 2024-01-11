import Position from './Position';
import SquareElementType from './SquareElementType';

export default interface SquareElement {
  position: Position;
  squareElementType: Readonly<SquareElementType>;
  isPiece(): boolean;
} // eslint-disable-line
