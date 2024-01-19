import { ImageSourcePropType } from 'react-native';
import Displayable from '../Displayable';
import Moveable from '../Moveable';
import { PieceImagePaths } from '../PieceImagePaths';
import Position from '../Position';
import SquareElementType, { isWhite } from '../SquareElementType';
import Piece from './Piece';

export default class Knight extends Piece implements Moveable, Displayable {
  constructor(position: Position, squareElementType: SquareElementType) {
    super(position, squareElementType, 'Knight');
  }

  isMoveableTo(position: Position): boolean {
    if (this.position.same(position)) {
      return false;
    }

    if (this.position.differenceOfOneX(position)) {
      return this.position.differenceOfTwoY(position);
    } else if (this.position.differenceOfOneY(position)) {
      return this.position.differenceOfTwoX(position);
    }

    return false;
  }

  moveTo(position: Position): void {
    if (this.isMoveableTo(position)) {
      this.position = position;
    }
  }

  display(): ImageSourcePropType {
    return isWhite(this.squareElementType)
      ? PieceImagePaths.WHITE_KNIGHT
      : PieceImagePaths.BLACK_KNIGHT;
  }
}
