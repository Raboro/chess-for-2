import { beforeEach, describe, expect, test } from '@jest/globals';
import { Board } from '../Board';
import Position from '../Position';
import Empty from '../squareelements/Empty';
import Pawn from '../squareelements/Pawn';
import Queen from '../squareelements/Queen';

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

  test('After init isMoveableTo should always be false', () => {
    for (let column = 0; column < 8; column++) {
      for (let row = 0; row < 8; row++) {
        expect(board.isMoveableTo(new Position(column, row))).toBeFalsy();
      }
    }
  });

  test('Current Piece should be moveable to', () => {
    board.selectSquare(new Pawn(new Position(1, 2), 'black'));
    expect(board.isMoveableTo(new Position(1, 3))).toBeTruthy();
  });

  test('Current Piece should be moveable to and after empty is set not anymore', () => {
    const position = new Position(1, 3);

    board.selectSquare(new Pawn(new Position(1, 2), 'black'));
    expect(board.isMoveableTo(position)).toBeTruthy();

    board.selectSquare(new Empty(new Position(2, 2)));
    expect(board.isMoveableTo(position)).toBeFalsy();
  });

  test('Current Piece should be moveable and after same is selected not anymore', () => {
    const pawn = new Pawn(new Position(1, 2), 'black');
    const position = new Position(1, 3);
    board.selectSquare(pawn);
    expect(board.isMoveableTo(position)).toBeTruthy();

    board.selectSquare(pawn);
    expect(board.isMoveableTo(position)).toBeFalsy();
  });

  test('Select Square after same element after other element after empty should be handled correctly', () => {
    const pawn = new Pawn(new Position(1, 2), 'black');
    expect(board.selectSquare(pawn)).toBeTruthy();

    expect(board.selectSquare(pawn)).toBeFalsy();

    expect(
      board.selectSquare(new Queen(new Position(1, 4), 'white')),
    ).toBeTruthy();

    expect(board.selectSquare(new Empty(new Position(2, 3)))).toBeFalsy();
  });

  test('After removeSelection, should not be moveableTo anymore', () => {
    const pawn = new Pawn(new Position(1, 2), 'black');
    expect(board.selectSquare(pawn)).toBeTruthy();

    expect(board.isMoveableTo(new Position(1, 3))).toBeTruthy();

    board.removeSelection();

    expect(board.isMoveableTo(new Position(1, 3))).toBeFalsy();
  });

  test('MovePiece should not be possible to if no currentPiece', () => {
    board.removeSelection();
    expect(board.movePiece(new Pawn(new Position(1, 2), 'black'))).toBeFalsy();
  });

  test('MovePiece should not be possible to not moveable position', () => {
    const queen = new Queen(new Position(1, 2), 'black');
    expect(board.selectSquare(queen)).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 7)))).toBeFalsy();
  });

  test('MovePiece should not be possible to same elementType', () => {
    const queen = new Queen(new Position(1, 2), 'black');
    expect(board.selectSquare(queen)).toBeTruthy();
    expect(board.movePiece(new Pawn(new Position(1, 3), 'black'))).toBeFalsy();
  });

  test('MovePiece should be possible to empty square', () => {
    const queen = new Queen(new Position(1, 2), 'black');
    expect(board.selectSquare(queen)).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(1, 3)))).toBeTruthy();
  });

  test('Pawn can only move forward if nothing in the way', () => {
    const pawn = new Pawn(new Position(1, 1), 'black');
    expect(board.selectSquare(pawn)).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(1, 3)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(1, 4)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(1, 5)))).toBeTruthy();
    expect(board.movePiece(new Pawn(new Position(1, 6), 'white'))).toBeFalsy();
  });

  test('Pawn can only move diagonal left/right if opponent in the way', () => {
    const pawn = new Pawn(new Position(1, 1), 'black');
    expect(board.selectSquare(pawn)).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(2, 2)))).toBeFalsy();
    expect(board.movePiece(new Empty(new Position(1, 2)))).toBeTruthy();
    expect(board.movePiece(new Queen(new Position(2, 3), 'black'))).toBeFalsy(); // on own color it´s not working
    expect(
      board.movePiece(new Queen(new Position(2, 3), 'white')),
    ).toBeTruthy();
  });
});
