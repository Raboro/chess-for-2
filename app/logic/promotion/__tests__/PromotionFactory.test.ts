import { describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import SquareElement from '../../SquareElement';
import Bishop from '../../squareelements/Bishop';
import Knight from '../../squareelements/Knight';
import Queen from '../../squareelements/Queen';
import Rook from '../../squareelements/Rook';
import PromotionFactory from '../PromotionFactory';
import PromotionType from '../PromotionType';

describe('PromotionFactory', () => {
  test.each([
    [0, PromotionType.QUEEN, PromotionType.KNIGHT],
    [1, PromotionType.ROOK, PromotionType.BISHOP],
    [2, PromotionType.BISHOP, PromotionType.ROOK],
    [3, PromotionType.KNIGHT, PromotionType.QUEEN],
  ])(
    'createTypeByIndex should create correct type for index %d',
    (index: number, typeWhite: PromotionType, typeBlack: PromotionType) => {
      expect(PromotionFactory.createTypeByIndex(index, 'white')).toEqual(
        typeWhite,
      );
      expect(PromotionFactory.createTypeByIndex(index, 'black')).toEqual(
        typeBlack,
      );
    },
  );

  test.each([
    [PromotionType.QUEEN, new Queen(new Position(1, 5), 'black'), 'black'],
    [PromotionType.ROOK, new Rook(new Position(1, 5), 'black'), 'black'],
    [PromotionType.BISHOP, new Bishop(new Position(1, 5), 'black'), 'black'],
    [PromotionType.KNIGHT, new Knight(new Position(1, 5), 'black'), 'black'],
    [PromotionType.KNIGHT, new Knight(new Position(1, 5), 'white'), 'white'],
    [PromotionType.BISHOP, new Bishop(new Position(1, 5), 'white'), 'white'],
    [PromotionType.ROOK, new Rook(new Position(1, 5), 'white'), 'white'],
    [PromotionType.QUEEN, new Queen(new Position(1, 5), 'white'), 'white'],
    [PromotionType.QUEEN, new Queen(new Position(1, 5), 'white'), undefined],
  ])(
    'createPieceByType should create correct piece',
    (type: PromotionType, piece: SquareElement, color: string | undefined) => {
      const position = new Position(1, 5);
      expect(
        PromotionFactory.createPieceByType(
          type,
          position,
          color === 'black' ? 'black' : 'white',
        ),
      ).toEqual(piece);
    },
  );
});
