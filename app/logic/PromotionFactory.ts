import PromotionType from './PromotionType';

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
}
