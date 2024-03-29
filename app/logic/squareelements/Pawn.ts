import { ImageSourcePropType } from 'react-native';
import Displayable from '../Displayable';
import Moveable from '../Moveable';
import Position from '../Position';
import { SquareElementImagePaths } from '../SquareElementImagePaths';
import SquareElementType, { isWhite } from '../SquareElementType';
import { SIZE } from './../../constants/Size';
import Piece from './Piece';

export default class Pawn extends Piece implements Moveable, Displayable {
  private movedTwoSquares: boolean;

  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Pawn');
    this.movedTwoSquares = false;
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.same(position)) {
      return false;
    }

    return this.squareElementType == 'black'
      ? this.isMoveableToBlack(position)
      : this.isMoveableToWhite(position);
  }

  private isMoveableToBlack(position: Position): boolean {
    if (this.isOneDiagonalUp(position, 1)) {
      return true;
    }

    // need to be checked after, because else oneDiagonal could never be true
    if (this.position.y >= position.y || this.position.notSameLine(position)) {
      return false;
    }

    return this.position.y == 1
      ? this.position.y + 2 >= position.y
      : this.position.y + 1 == position.y;
  }

  private isOneDiagonalUp(position: Position, addFactor: number): boolean {
    return (
      this.position.y + addFactor === position.y &&
      this.position.differenceOfOneX(position)
    );
  }

  private isMoveableToWhite(position: Position): boolean {
    if (this.isOneDiagonalUp(position, -1)) {
      return true;
    }

    // need to be checked after, because else oneDiagonal could never be true
    if (this.position.y <= position.y || this.position.notSameLine(position)) {
      return false;
    }

    return this.position.y == SIZE.POSITION_MAX - 1
      ? this.position.y - 2 <= position.y
      : this.position.y - 1 == position.y;
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.movedTwoSquares = this.position.differenceOfTwoY(position);
      this.position = position;
    }
  }

  display(): ImageSourcePropType {
    return isWhite(this.squareElementType)
      ? SquareElementImagePaths.WHITE_PAWN
      : SquareElementImagePaths.BLACK_PAWN;
  }

  isPromotable(): boolean {
    if (isWhite(this.squareElementType)) {
      return this.position.y === SIZE.POSITION_MIN;
    }
    return this.position.y === SIZE.POSITION_MAX;
  }

  hasMovedTwoSquares(): boolean {
    return this.movedTwoSquares;
  }
}
