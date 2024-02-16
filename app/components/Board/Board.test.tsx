import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import { Board as BoardLogic } from '../../logic/Board';
import PromotionType from '../../logic/promotion/PromotionType';
import Board from './Board';

describe('Board UI', () => {
  test('Board renders enough Squares', () => {
    const rend = render(
      <Board
        size={400}
        boardLogic={new BoardLogic()}
        setPromotion={() => {}}
        promotionType={undefined}
        gameRestart={() => {}}
      />,
    );
    const squares = rend.getAllByTestId('Square');
    expect(squares.length).toBe(64);
  });

  test('Square press should select it and rerender Board', () => {
    const rend = render(
      <Board
        size={400}
        boardLogic={new BoardLogic()}
        setPromotion={() => {}}
        promotionType={undefined}
        gameRestart={() => {}}
      />,
    );
    const whiteRightKnight = rend.getAllByTestId('Square')[62];
    expect(rend.getAllByTestId('SquareImage')[47].props.style[1]).toEqual({});

    expect(whiteRightKnight.props.style.borderColor).toBe(undefined);

    fireEvent(whiteRightKnight, 'press');

    expect(rend.getAllByTestId('SquareImage')[47].props.style[1]).not.toEqual(
      {},
    );
  });

  test('Square movePiece should work', () => {
    const rend = render(
      <Board
        size={400}
        boardLogic={new BoardLogic()}
        setPromotion={() => {}}
        promotionType={undefined}
        gameRestart={() => {}}
      />,
    );
    const firstPawn = rend.getAllByTestId('SquareImage')[55];

    fireEvent(firstPawn, 'press');

    const freeSquare = rend.getAllByTestId('SquareImage')[47];

    fireEvent(freeSquare, 'press');
  });

  test('Move white and then black', () => {
    const rend = render(
      <Board
        size={400}
        boardLogic={new BoardLogic()}
        setPromotion={() => {}}
        promotionType={undefined}
        gameRestart={() => {}}
      />,
    );

    // white pawn move
    const whitePawn = rend.getAllByTestId('Square')[55];
    expect(rend.getAllByTestId('SquareImage')[47].props.style[1]).toEqual({});
    expect(whitePawn.props.style.borderColor).toBe(undefined);
    fireEvent(whitePawn, 'press');
    const moveableSquareForWhitePawn = rend.getAllByTestId('SquareImage')[47];
    expect(moveableSquareForWhitePawn.props.style[1]).not.toEqual({});
    fireEvent(moveableSquareForWhitePawn, 'press');

    // black pawn move
    const blackPawn = rend.getAllByTestId('Square')[8];
    expect(blackPawn.props.style.borderColor).toBe(undefined);
    fireEvent(blackPawn, 'press');
    const moveableSquareForBlackPawn = rend.getAllByTestId('SquareImage')[16];
    expect(moveableSquareForBlackPawn.props.style[1]).not.toEqual({});
    fireEvent(moveableSquareForBlackPawn, 'press');
  });

  test('Black should not be moveable at the start', () => {
    const rend = render(
      <Board
        size={400}
        boardLogic={new BoardLogic()}
        setPromotion={() => {}}
        promotionType={undefined}
        gameRestart={() => {}}
      />,
    );
    const blackPawn = rend.getAllByTestId('Square')[8];
    expect(rend.getAllByTestId('SquareImage')[16].props.style[1]).toEqual({});

    expect(blackPawn.props.style.borderColor).toBe(undefined);

    fireEvent(blackPawn, 'press');
    const moveableSquareForBlackPawn = rend.getAllByTestId('SquareImage')[16];
    expect(moveableSquareForBlackPawn.props.style[1]).toEqual({});
    fireEvent(moveableSquareForBlackPawn, 'press');
  });

  test('White pawn should not be moveable left at the start', () => {
    const rend = render(
      <Board
        size={400}
        boardLogic={new BoardLogic()}
        setPromotion={() => {}}
        promotionType={undefined}
        gameRestart={() => {}}
      />,
    );
    const firstPawn = rend.getAllByTestId('SquareImage')[55];

    fireEvent(firstPawn, 'press');
    const freeSquare = rend.getAllByTestId('SquareImage')[47];
    expect(freeSquare.props.style[1]).not.toEqual({});
    const notMoveableFreeSquare = rend.getAllByTestId('SquareImage')[46];
    expect(notMoveableFreeSquare.props.style[1]).toEqual({});
    fireEvent(notMoveableFreeSquare, 'press');
  });

  test('White pawn should be promotable', () => {
    const mockSetPromotion = jest.fn();
    const rend = render(
      <Board
        size={400}
        boardLogic={new BoardLogic()}
        setPromotion={() => mockSetPromotion}
        promotionType={PromotionType.QUEEN}
        gameRestart={() => {}}
      />,
    );

    const whitePositions = [
      [55, 47],
      [47, 39],
      [39, 31],
      [31, 23],
      [23, 14],
    ];
    const blackPositions = [
      [8, 16],
      [16, 24],
      [24, 32],
      [32, 40],
      [9, 17],
    ];

    let whitePawn;
    let whiteMoveSquare;
    let blackPawn;
    let blackMoveSquare;
    for (let i = 0; i < 5; i++) {
      whitePawn = rend.getAllByTestId('SquareImage')[whitePositions[i][0]];
      fireEvent(whitePawn, 'press');
      whiteMoveSquare =
        rend.getAllByTestId('SquareImage')[whitePositions[i][1]];
      fireEvent(whiteMoveSquare, 'press');

      blackPawn = rend.getAllByTestId('SquareImage')[blackPositions[i][0]];
      fireEvent(blackPawn, 'press');
      blackMoveSquare =
        rend.getAllByTestId('SquareImage')[blackPositions[i][1]];
      fireEvent(blackMoveSquare, 'press');
    }

    whitePawn = rend.getAllByTestId('SquareImage')[14];
    fireEvent(whitePawn, 'press');
    whiteMoveSquare = rend.getAllByTestId('SquareImage')[5];
    fireEvent(whiteMoveSquare, 'press');
  });
});
