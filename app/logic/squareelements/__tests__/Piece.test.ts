import { describe, expect, test } from '@jest/globals';
import Piece from '../Piece';
import Position from '../../Position';

describe('Piece', () => {
  test('Constructor throws TypeError when undefined as SquareElementType is Parsed', () => {
    expect(() => new Piece(new Position(2, 3), undefined, 'Piece')).toThrow(
      TypeError,
    );
  });

  test('IsPiece should be true', () => {
    const pieceWhite: Piece = new Piece(new Position(0, 1), 'white', 'Piece');
    expect(pieceWhite.isPiece()).toBeTruthy();

    const pieceBlack: Piece = new Piece(new Position(0, 1), 'black', 'Piece');
    expect(pieceBlack.isPiece()).toBeTruthy();
  });
});
