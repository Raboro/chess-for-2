import Position from '../Position';
import SquareElement from '../SquareElement';
import Bishop from '../squareelements/Bishop';
import Knight from '../squareelements/Knight';
import Queen from '../squareelements/Queen';
import Rook from '../squareelements/Rook';
import SquareElementType from '../SquareElementType';
import PromotionType from './PromotionType';

const toType = [
  { white: PromotionType.QUEEN, black: PromotionType.KNIGHT },
  { white: PromotionType.ROOK, black: PromotionType.BISHOP },
  { white: PromotionType.BISHOP, black: PromotionType.ROOK },
  { white: PromotionType.KNIGHT, black: PromotionType.QUEEN },
];

export default class PromotionFactory {
  static createTypeByIndex(
    index: number,
    type: SquareElementType,
  ): PromotionType {
    return type === 'white' ? toType[index].white : toType[index].black;
  }

  static createPieceByType(
    promotionType: PromotionType,
    position: Position,
    elementType: SquareElementType,
  ): SquareElement {
    if (promotionType === PromotionType.QUEEN) {
      return new Queen(position, elementType);
    } else if (promotionType === PromotionType.ROOK) {
      return new Rook(position, elementType);
    } else if (promotionType === PromotionType.BISHOP) {
      return new Bishop(position, elementType);
    }
    return new Knight(position, elementType);
  }
}
