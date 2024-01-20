import { beforeEach, describe, expect, test } from '@jest/globals';
import { Board } from '../Board';
import Position from '../Position';

describe('Board', () => {
  let board: Board;  
  beforeEach(() => {
    board = new Board();
  });

  test.each([
    ['white', 6],
    ['black', 1],
  ])('Should return %s pawns at row %d', (color: string, row: number) => {
    for (let i = 0; i < 8; i++) {
      const pawn = board.getAtPosition(new Position(i, row));
      expect(pawn.isPiece()).toBeTruthy();
      expect(pawn.squareElementType).toBe(color);
    }
  });

  test('Not initialized position on board should be Empty', () => {
    const empty = board.getAtPosition(new Position(4, 4));
    expect(empty.isPiece()).toBeFalsy();
    expect(empty.squareElementType).toBe(undefined);
  });
});
