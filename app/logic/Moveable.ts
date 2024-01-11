import Position from "./Position";

export default interface Moveable {
    isMoveableTo(position: Position): boolean,
    moveTo(position: Position): void
};