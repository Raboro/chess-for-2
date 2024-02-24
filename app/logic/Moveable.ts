import Position from './Position';

export default interface Moveable {
  /**
   * Is moveable to parsed position
   * @param position
   */
  isMoveableTo(position: Position): boolean;

  /**
   * Move Piece to parsed position
   * @param position
   */
  moveTo(position: Position): void;
} // eslint-disable-line
