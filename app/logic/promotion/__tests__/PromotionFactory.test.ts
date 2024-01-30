import { describe, expect, test } from '@jest/globals';
import PromotionFactory from '../PromotionFactory';
import PromotionType from '../PromotionType';
import Position from '../../Position';
import Queen from '../../squareelements/Queen';
import Rook from '../../squareelements/Rook';
import Bishop from '../../squareelements/Bishop';
import Knight from '../../squareelements/Knight';
import SquareElement from '../../SquareElement';

describe('PromotionFactory', () => {
  test.each([
    [0, PromotionType.QUEEN],
    [1, PromotionType.ROOK],
    [2, PromotionType.BISHOP],
    [3, PromotionType.KNIGHT],
  ])(
    'createTypeByIndex should create correct type for index %d',
    (index: number, type: PromotionType) => {
      expect(PromotionFactory.createTypeByIndex(index)).toEqual(type);
    },
  );

  test.each([
    [PromotionType.QUEEN, new Queen(new Position(1, 5), 'black')],
    [PromotionType.ROOK, new Rook(new Position(1, 5), 'black')],
    [PromotionType.BISHOP, new Bishop(new Position(1, 5), 'black')],
    [PromotionType.KNIGHT, new Knight(new Position(1, 5), 'black')],
  ])(
    'createPieceByType should create correct piece',
    (type: PromotionType, piece: SquareElement) => {
      const position = new Position(1, 5);
      expect(
        PromotionFactory.createPieceByType(type, position, 'black'),
      ).toEqual(piece);
    },
  );
});
