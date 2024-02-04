import { beforeEach, describe, expect, test } from '@jest/globals';
import { Board } from '../Board';
import Position from '../Position';
import PromotionType from '../promotion/PromotionType';
import SquareElement from '../SquareElement';
import Bishop from '../squareelements/Bishop';
import Empty from '../squareelements/Empty';
import King from '../squareelements/King';
import Pawn from '../squareelements/Pawn';
import Queen from '../squareelements/Queen';
import Rook from '../squareelements/Rook';
import SquareElementType from '../SquareElementType';

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
    board.selectSquare(new Pawn(new Position(1, 2), 'black'), 'black');
    expect(board.isMoveableTo(new Position(1, 3))).toBeTruthy();
  });

  test('Current Piece should be moveable to and after empty is set not anymore', () => {
    const position = new Position(1, 3);

    board.selectSquare(new Pawn(new Position(1, 2), 'black'), 'black');
    expect(board.isMoveableTo(position)).toBeTruthy();

    board.selectSquare(new Empty(new Position(2, 2)), undefined);
    expect(board.isMoveableTo(position)).toBeFalsy();
  });

  test('Current Piece should be moveable and after same is selected not anymore', () => {
    const pawn = new Pawn(new Position(1, 2), 'black');
    const position = new Position(1, 3);
    board.selectSquare(pawn, 'black');
    expect(board.isMoveableTo(position)).toBeTruthy();

    board.selectSquare(pawn, 'black');
    expect(board.isMoveableTo(position)).toBeFalsy();
  });

  test('Select Square after same element after other element after empty should be handled correctly', () => {
    const pawn = new Pawn(new Position(1, 2), 'black');
    expect(board.selectSquare(pawn, 'black')).toBeTruthy();

    expect(board.selectSquare(pawn, 'black')).toBeFalsy();

    expect(
      board.selectSquare(new Queen(new Position(1, 4), 'white'), 'white'),
    ).toBeTruthy();

    expect(
      board.selectSquare(new Empty(new Position(2, 3)), undefined),
    ).toBeFalsy();
  });

  test('After removeSelection, should not be moveableTo anymore', () => {
    const pawn = new Pawn(new Position(1, 2), 'black');
    expect(board.selectSquare(pawn, 'black')).toBeTruthy();

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
    expect(board.selectSquare(queen, 'black')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 7)))).toBeFalsy();
  });

  test('MovePiece should not be possible to same elementType', () => {
    const queen = new Queen(new Position(1, 2), 'black');
    expect(board.selectSquare(queen, 'black')).toBeTruthy();
    expect(board.movePiece(new Pawn(new Position(1, 3), 'black'))).toBeFalsy();
  });

  test('MovePiece should be possible to empty square', () => {
    const queen = new Queen(new Position(1, 2), 'black');
    expect(board.selectSquare(queen, 'black')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(1, 3)))).toBeTruthy();
  });

  test('Pawn can only move forward if nothing in the way', () => {
    const pawn = new Pawn(new Position(1, 1), 'black');
    expect(board.selectSquare(pawn, 'black')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(1, 3)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(1, 4)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(1, 5)))).toBeTruthy();
    expect(board.movePiece(new Pawn(new Position(1, 6), 'white'))).toBeFalsy();
  });

  test('Pawn can only move diagonal left/right if opponent in the way', () => {
    const pawn = new Pawn(new Position(1, 1), 'black');
    expect(board.selectSquare(pawn, 'black')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(2, 2)))).toBeFalsy();
    expect(board.movePiece(new Empty(new Position(1, 2)))).toBeTruthy();
    expect(board.movePiece(new Queen(new Position(2, 3), 'black'))).toBeFalsy(); // on own color it´s not working
    expect(
      board.movePiece(new Queen(new Position(2, 3), 'white')),
    ).toBeTruthy();
  });

  test.each([
    ['Queen', new Queen(new Position(3, 0), 'black'), new Position(3, 6)],
    ['Queen', new Queen(new Position(3, 0), 'black'), new Position(7, 4)],
    ['Bishop', new Bishop(new Position(2, 0), 'black'), new Position(5, 3)],
    ['Rook', new Rook(new Position(0, 0), 'black'), new Position(0, 4)],
  ])(
    '%s is blocked by Piece in the way and cannot move over piece',
    (pieceName: string, piece: SquareElement, destination: Position) => {
      expect(board.selectSquare(piece, 'black')).toBeTruthy();
      expect(board.movePiece(new Empty(destination))).toBeFalsy();
    },
  );

  test('MovePiece should not be possible if other SquareElementType is selected', () => {
    const pawn: Pawn = new Pawn(new Position(0, 1), 'black');
    expect(board.selectSquare(pawn, 'white')).toBeFalsy();
    expect(board.selectSquare(pawn, 'black')).toBeTruthy();
  });

  test.each([
    ['Black', 1],
    ['White', 6],
  ])(
    '%s Pawn should not be promotable at first',
    (color: string, y: number) => {
      const type: SquareElementType = color === 'White' ? 'white' : 'black';
      const pawn: Pawn = new Pawn(new Position(0, y), type);
      expect(board.selectSquare(pawn, type)).toBeTruthy();
      expect(board.isPromotable()).toBeFalsy();
    },
  );

  test('Should not promotable if currentSquareElement not Pawn', () => {
    const king: King = new King(new Position(4, 0), 'black');
    expect(board.selectSquare(king, 'black')).toBeTruthy();
    expect(board.isPromotable()).toBeFalsy();
  });

  test.each([
    ['Black', 1, [2, 3, 4, 5, 6, 7]],
    ['White', 6, [5, 4, 3, 2, 1, 0]],
  ])(
    '%s Pawn should promotable after moving to the other side border',
    (color: string, y: number, ys: number[]) => {
      const type: SquareElementType = color === 'White' ? 'white' : 'black';
      const pawn = new Pawn(new Position(1, y), type);
      expect(board.selectSquare(pawn, type)).toBeTruthy();
      expect(board.movePiece(new Empty(new Position(1, ys[0])))).toBeTruthy();
      expect(board.movePiece(new Empty(new Position(1, ys[1])))).toBeTruthy();
      expect(board.movePiece(new Empty(new Position(1, ys[2])))).toBeTruthy();
      expect(board.movePiece(new Empty(new Position(1, ys[3])))).toBeTruthy();
      expect(board.movePiece(new Empty(new Position(1, ys[4])))).toBeTruthy();
      expect(board.movePiece(new Empty(new Position(1, ys[5])))).toBeTruthy();
      expect(board.isPromotable()).toBeTruthy();
    },
  );

  test('HandlePromotion should create default piece if no selection', () => {
    expect(board.handlePromotion(PromotionType.QUEEN)).toEqual(
      new Queen(new Position(0, 0), 'white'),
    );
  });

  test('HandlePromotion should create correct Piece', () => {
    expect(
      board.selectSquare(new Pawn(new Position(1, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.handlePromotion(PromotionType.QUEEN)).toEqual(
      new Queen(new Position(1, 1), 'black'),
    );
  });

  test.each([['White'], ['Black']])(
    '%s King should not be moveable to any square at the start',
    (color: string) => {
      const pieceColor = color === 'White' ? 'white' : 'black';
      expect(
        board.selectSquare(
          new King(new Position(4, 7), pieceColor),
          pieceColor,
        ),
      ).toBeTruthy();

      for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
          expect(board.isMoveableTo(new Position(row, column))).toBeFalsy();
        }
      }
    },
  );
});
