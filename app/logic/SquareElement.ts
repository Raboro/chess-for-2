import Displayable from './Displayable';
import Position from './Position';
import SquareElementType from './SquareElementType';

export default interface SquareElement extends Displayable {
  position: Position;
  squareElementType: Readonly<SquareElementType>;
  isPiece(): boolean;
} // eslint-disable-line
