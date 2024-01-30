import Position from './Position';
import PromotionType from './PromotionType';
import SquareElement from './SquareElement';
import SquareElementType from './SquareElementType';
import Bishop from './squareelements/Bishop';
import Knight from './squareelements/Knight';
import Queen from './squareelements/Queen';
import Rook from './squareelements/Rook';

export default class PromotionFactory {
  static createTypeByIndex(index: number): PromotionType {
    if (index === 0) {
      return PromotionType.QUEEN;
    } else if (index === 1) {
      return PromotionType.ROOK;
    } else if (index === 2) {
      return PromotionType.BISHOP;
    }
    return PromotionType.KNIGHT;
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
