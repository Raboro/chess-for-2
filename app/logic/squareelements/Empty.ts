import Position from "../Position";
import SquareElement from "../SquareElement";
import SquareElementType from "../SquareElementType";

export default class Empty implements SquareElement {
    position: Position;
    squareElementType: Readonly<SquareElementType>;

    constructor(position: Position) {
        this.position = position;
        this.squareElementType = undefined
    }

    isPiece(): boolean {
        return false;
    } 
}
