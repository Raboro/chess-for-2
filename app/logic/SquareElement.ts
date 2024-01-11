import SquareElementType from "./SquareElementType";
import Position from "./Position";

export default interface SquareElement {
    position: Position,
    squareElementType: Readonly<SquareElementType>,
    isPiece(): boolean,
}; // eslint-disable-line
