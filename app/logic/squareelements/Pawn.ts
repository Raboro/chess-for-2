import Moveable from "../Moveable";
import Position from "../Position";
import SquareElement from "../SquareElement";
import SquareElementType from "../SquareElementType";

export default class Pawn implements SquareElement, Moveable {
    position: Position;
    squareElementType: Readonly<SquareElementType>;

    constructor(position: Position, squareElementType: SquareElementType) {
        this.position = position;
        this.squareElementType = squareElementType;
    }

    isPiece(): boolean {
        return true;
    }

    isMoveableTo(position: Position): boolean {
        if (this.position.notSameLine(position)) {
            return false;
        }
        return (this.squareElementType == 'black') ? this.position.y < position.y : this.position.y > position.y;
    }

    moveTo(position: Position): void {
        if (this.isMoveableTo(position)) {
            this.position = position;
        }
    }
}
