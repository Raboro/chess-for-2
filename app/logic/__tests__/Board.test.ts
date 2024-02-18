import { beforeEach, describe, expect, test } from '@jest/globals';
import { Board } from '../Board';
import Position from '../Position';
import PromotionType from '../promotion/PromotionType';
import SquareElement from '../SquareElement';
import Bishop from '../squareelements/Bishop';
import Empty from '../squareelements/Empty';
import King from '../squareelements/King';
import Knight from '../squareelements/Knight';
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
    let pawn = new Pawn(new Position(1, 1), 'black');
    expect(board.selectSquare(pawn, 'black')).toBeTruthy();
    pawn = new Pawn(new Position(1, 1), 'black');
    expect(board.selectSquare(pawn, 'black')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(2, 2)))).toBeFalsy();
    expect(board.movePiece(new Empty(new Position(1, 2)))).toBeTruthy();

    const bPawn = new Pawn(new Position(3, 1), 'black');
    expect(board.selectSquare(bPawn, 'black')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(3, 3)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(3, 4)))).toBeTruthy();

    const bQueen = new Queen(new Position(3, 0), 'black');
    expect(board.selectSquare(bQueen, 'black')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(3, 2)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(2, 2)))).toBeTruthy();

    pawn = new Pawn(new Position(1, 1), 'black');
    expect(board.selectSquare(pawn, 'black')).toBeTruthy();
    expect(board.movePiece(bQueen)).toBeFalsy(); // on own color it´s not working

    expect(board.selectSquare(bQueen, 'black')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(2, 3)))).toBeTruthy();

    const wPawn = new Pawn(new Position(4, 6), 'white');
    expect(board.selectSquare(wPawn, 'white')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 5)))).toBeTruthy();

    const wQueen = new Queen(new Position(3, 7), 'white');
    expect(board.selectSquare(wQueen, 'white')).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(5, 5)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(2, 2)))).toBeTruthy();

    pawn = new Pawn(new Position(1, 1), 'black');
    expect(board.selectSquare(pawn, 'black')).toBeTruthy();
    expect(board.movePiece(wQueen)).toBeTruthy();
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
      expect(
        board.movePiece(
          new Pawn(
            new Position(2, ys[4]),
            color === 'White' ? 'black' : 'white',
          ),
        ),
      ).toBeTruthy();
      expect(
        board.movePiece(
          new Bishop(
            new Position(3, ys[5]),
            color === 'White' ? 'black' : 'white',
          ),
        ),
      ).toBeTruthy();
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

  test('King should be moveable to specific squares', () => {
    expect(board.isKingInCheck('white')).toBeFalsy();
    expect(
      board.selectSquare(new Pawn(new Position(4, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 4)))).toBeTruthy();

    expect(
      board.selectSquare(new Pawn(new Position(4, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 3)))).toBeTruthy();

    expect(board.isKingInCheck('white')).toBeFalsy();

    expect(
      board.selectSquare(new Pawn(new Position(5, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(5, 4)))).toBeTruthy();

    expect(
      board.selectSquare(new Queen(new Position(3, 0), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 4)))).toBeTruthy();

    expect(
      board.selectSquare(new King(new Position(4, 7), 'white'), 'white'),
    ).toBeTruthy();

    expect(board.isKingInCheck('white')).toBeTruthy();

    checkKingAndMoveToOnlyPossibleSquare(board);

    expect(
      board.selectSquare(new Pawn(new Position(4, 3), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Pawn(new Position(5, 4), 'white'))).toBeTruthy();

    expect(
      board.selectSquare(new King(new Position(4, 6), 'white'), 'white'),
    ).toBeTruthy();

    for (let row = 0; row < 8; row++) {
      for (let column = 0; column < 8; column++) {
        if ((row === 3 && column === 5) || (row === 5 && column === 5)) {
          expect(board.isMoveableTo(new Position(row, column))).toBeTruthy();
          continue;
        }
        expect(board.isMoveableTo(new Position(row, column))).toBeFalsy();
      }
    }
    expect(board.isKingInCheck('white')).toBeFalsy();

    expect(board.movePiece(new Empty(new Position(5, 5)))).toBeTruthy();

    expect(
      board.selectSquare(new Queen(new Position(7, 4), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(6, 5)))).toBeTruthy();

    expect(board.isKingInCheck('white')).toBeTruthy();

    expect(
      board.selectSquare(new King(new Position(5, 5), 'white'), 'white'),
    ).toBeTruthy();

    checkKingAndMoveToOnlyPossibleSquare(board);
  });

  test.each([['White'], ['Black']])(
    '%s King should not be in check at the beginning of the game',
    (color: string) => {
      const type = color === 'White' ? 'white' : 'black';
      expect(
        board.selectSquare(new King(new Position(4, 7), type), type),
      ).toBeTruthy();

      expect(board.isKingInCheck(type)).toBeFalsy();
    },
  );

  test('Pawn should prevent check by Queen on 7;4 - Queen and other pawn should not', () => {
    // move pawns
    expect(
      board.selectSquare(new Pawn(new Position(4, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 4)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(4, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 3)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(5, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(5, 4)))).toBeTruthy();

    // move Queen
    expect(
      board.selectSquare(new Queen(new Position(3, 0), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 4)))).toBeTruthy();

    // Pawn could only move front
    expect(board.isKingInCheck('white')).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(6, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.isMoveableTo(new Position(6, 5))).toBeTruthy();

    // Pawn could not move
    expect(
      board.selectSquare(new Pawn(new Position(6, 7), 'white'), 'white'),
    ).toBeTruthy();

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        expect(board.isMoveableTo(new Position(i, j))).toBeFalsy();
      }
    }

    // Queen could not move
    expect(
      board.selectSquare(new Queen(new Position(3, 7), 'white'), 'white'),
    ).toBeTruthy();

    noPossibleMove(board);
  });

  test('Pawn should not be moveable two squares if piece is blocking', () => {
    expect(
      board.selectSquare(new Knight(new Position(6, 7), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 5)))).toBeTruthy();

    expect(
      board.selectSquare(new Pawn(new Position(7, 6), 'white'), 'white'),
    ).toBeTruthy();

    noPossibleMove(board);
  });

  test('Pawn in front of king should not trigger check', () => {
    expect(
      board.selectSquare(new Pawn(new Position(4, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 4)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(4, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 3)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(5, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(5, 4)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(4, 3), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Pawn(new Position(5, 4), 'white'))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(4, 4), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 3)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 2)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 1)))).toBeTruthy();
    expect(board.isKingInCheck('black')).toBeFalsy();
  });

  test('Pawn should be possible to take check giving Queen on 7;4 as pinned pawn', () => {
    // move pawns
    expect(
      board.selectSquare(new Pawn(new Position(4, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 4)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(4, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 3)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(5, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(5, 4)))).toBeTruthy();

    // move Queen
    expect(
      board.selectSquare(new Queen(new Position(3, 0), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 4)))).toBeTruthy();

    // Pawn could only move front
    expect(board.isKingInCheck('white')).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(6, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.isMoveableTo(new Position(6, 5))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(6, 5)))).toBeTruthy();

    // Pawn could take queen
    expect(board.isKingInCheck('white')).toBeFalsy();
    expect(board.isMoveableTo(new Position(7, 4))).toBeTruthy();
  });

  test('Pawn is pinned but cannot take pinning piece', () => {
    // move pawns
    expect(
      board.selectSquare(new Pawn(new Position(4, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 4)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(4, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 3)))).toBeTruthy();
    expect(
      board.selectSquare(new King(new Position(4, 7), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 6)))).toBeTruthy();
    expect(
      board.selectSquare(new Queen(new Position(3, 0), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 4)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 3)))).toBeTruthy();
    expect(board.isKingInCheck('white')).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(5, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(5, 5)))).toBeTruthy();
    expect(board.isKingInCheck('white')).toBeFalsy();
    noPossibleMove(board);
  });

  test('King not in check should not be a checkmate', () => {
    expect(board.isCheckmate('white')).toBeFalsy();
    expect(board.isCheckmate('black')).toBeFalsy();
  });

  test('King in check, but should not be in checkmate', () => {
    // move pawns
    expect(
      board.selectSquare(new Pawn(new Position(4, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 4)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(4, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 3)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(5, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(5, 4)))).toBeTruthy();

    // move Queen
    expect(
      board.selectSquare(new Queen(new Position(3, 0), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 4)))).toBeTruthy();

    expect(board.isKingInCheck('white')).toBeTruthy();
    expect(board.isCheckmate('white')).toBeFalsy();
  });

  test('King should be in checkmate', () => {
    // move pawns
    expect(
      board.selectSquare(new Pawn(new Position(5, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(5, 4)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(4, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 3)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(6, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(6, 4)))).toBeTruthy();

    // move Queen
    expect(
      board.selectSquare(new Queen(new Position(3, 0), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 4)))).toBeTruthy();

    expect(board.isKingInCheck('white')).toBeTruthy();
    expect(board.isCheckmate('white')).toBeTruthy();
  });

  test('Pinned Knight should not be able to move', () => {
    // move pawns
    expect(
      board.selectSquare(new Pawn(new Position(3, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(3, 4)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(2, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(2, 3)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(6, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(6, 4)))).toBeTruthy();

    // move Queen
    expect(
      board.selectSquare(new Queen(new Position(3, 0), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(0, 3)))).toBeTruthy();

    expect(board.isKingInCheck('white')).toBeTruthy();

    expect(
      board.selectSquare(new Knight(new Position(1, 7), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(3, 6)))).toBeTruthy();

    expect(board.isKingInCheck('white')).toBeFalsy();
    noPossibleMove(board);
  });

  test('Pinned Bishop should be able to move and kept pin', () => {
    // move pawns
    expect(
      board.selectSquare(new Pawn(new Position(3, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(3, 4)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(2, 1), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(2, 3)))).toBeTruthy();
    expect(
      board.selectSquare(new Pawn(new Position(6, 6), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(6, 4)))).toBeTruthy();

    // move Queen
    expect(
      board.selectSquare(new Queen(new Position(3, 0), 'black'), 'black'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(0, 3)))).toBeTruthy();

    expect(board.isKingInCheck('white')).toBeTruthy();

    expect(
      board.selectSquare(new Bishop(new Position(2, 7), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(3, 6)))).toBeTruthy();
    expect(board.isKingInCheck('white')).toBeFalsy();
    expect(board.isMoveableTo(new Position(2, 5)));
  });

  test('Castling should not be possible for position.x out of range to prevent error', () => {
    cleanUpSpaceForCastling(board);

    expect(
      board.selectSquare(new King(new Position(3, 7), 'white'), 'white'),
    ).toBeTruthy();

    const errorXs = [0, 1, 7];
    for (const errorX of errorXs) {
      expect(board.isMoveableTo(new Position(errorX, 7))).toBeFalsy();
    }
  });

  test('Castling should be possible', () => {
    cleanUpSpaceForCastling(board);

    expect(
      board.selectSquare(new King(new Position(4, 7), 'white'), 'white'),
    ).toBeTruthy();
    const xs = [2, 6];

    for (const x of xs) {
      expect(board.isMoveableTo(new Position(x, 7))).toBeTruthy();
    }
  });

  test('Castling should not be possible if king moved previously', () => {
    cleanUpSpaceForCastling(board);

    expect(
      board.selectSquare(new King(new Position(4, 7), 'white'), 'white'),
    ).toBeTruthy();
    const xs = [2, 6];

    for (const x of xs) {
      expect(board.isMoveableTo(new Position(x, 7))).toBeTruthy();
    }

    expect(board.movePiece(new Empty(new Position(5, 7)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(4, 7)))).toBeTruthy();

    for (const x of xs) {
      expect(board.isMoveableTo(new Position(x, 7))).toBeFalsy();
    }
  });

  test('Castling should not be possible if rooks moved previously', () => {
    cleanUpSpaceForCastling(board);

    expect(
      board.selectSquare(new Rook(new Position(0, 7), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(1, 7)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(0, 7)))).toBeTruthy();

    expect(
      board.selectSquare(new Rook(new Position(7, 7), 'white'), 'white'),
    ).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(6, 7)))).toBeTruthy();
    expect(board.movePiece(new Empty(new Position(7, 7)))).toBeTruthy();

    expect(
      board.selectSquare(new King(new Position(4, 7), 'white'), 'white'),
    ).toBeTruthy();
    const xs = [2, 6];
    for (const x of xs) {
      expect(board.isMoveableTo(new Position(x, 7))).toBeFalsy();
    }
  });
});

function noPossibleMove(board: Board) {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      expect(board.isMoveableTo(new Position(i, j))).toBeFalsy();
    }
  }
}

function checkKingAndMoveToOnlyPossibleSquare(board: Board) {
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < 8; column++) {
      if (row === 4 && column === 6) {
        expect(board.isMoveableTo(new Position(row, column))).toBeTruthy();
        continue;
      }
      expect(board.isMoveableTo(new Position(row, column))).toBeFalsy();
    }
  }
  expect(board.movePiece(new Empty(new Position(4, 6)))).toBeTruthy();
}

function cleanUpSpaceForCastling(board: Board) {
  expect(
    board.selectSquare(new Knight(new Position(1, 7), 'white'), 'white'),
  ).toBeTruthy();
  expect(board.movePiece(new Empty(new Position(0, 5)))).toBeTruthy();

  expect(
    board.selectSquare(new Pawn(new Position(1, 6), 'white'), 'white'),
  ).toBeTruthy();
  expect(board.movePiece(new Empty(new Position(1, 5)))).toBeTruthy();

  expect(
    board.selectSquare(new Bishop(new Position(2, 7), 'white'), 'white'),
  ).toBeTruthy();
  expect(board.movePiece(new Empty(new Position(1, 6)))).toBeTruthy();

  expect(
    board.selectSquare(new Pawn(new Position(3, 6), 'white'), 'white'),
  ).toBeTruthy();
  expect(board.movePiece(new Empty(new Position(3, 4)))).toBeTruthy();

  expect(
    board.selectSquare(new Queen(new Position(3, 7), 'white'), 'white'),
  ).toBeTruthy();
  expect(board.movePiece(new Empty(new Position(3, 6)))).toBeTruthy();

  expect(
    board.selectSquare(new Pawn(new Position(4, 6), 'white'), 'white'),
  ).toBeTruthy();
  expect(board.movePiece(new Empty(new Position(4, 5)))).toBeTruthy();

  expect(
    board.selectSquare(new Bishop(new Position(5, 7), 'white'), 'white'),
  ).toBeTruthy();
  expect(board.movePiece(new Empty(new Position(4, 6)))).toBeTruthy();

  expect(
    board.selectSquare(new Knight(new Position(6, 7), 'white'), 'white'),
  ).toBeTruthy();
  expect(board.movePiece(new Empty(new Position(7, 5)))).toBeTruthy();
}
