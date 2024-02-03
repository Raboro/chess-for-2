import MoveablePiece from '../MoveablePiece';
import Position from '../Position';
import Bishop from '../squareelements/Bishop';
import Knight from '../squareelements/Knight';
import Queen from '../squareelements/Queen';
import Rook from '../squareelements/Rook';
import SquareElementType from '../SquareElementType';
import PromotionType from './PromotionType';

const toType = [
  PromotionType.QUEEN,
  PromotionType.ROOK,
  PromotionType.BISHOP,
  PromotionType.KNIGHT,
];

export default class PromotionFactory {
  static createTypeByIndex(index: number): PromotionType {
    return toType[index];
  }

  static createPieceByType(
    promotionType: PromotionType,
    position: Position,
    elementType: SquareElementType,
  ): MoveablePiece {
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
