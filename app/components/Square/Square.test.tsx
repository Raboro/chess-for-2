import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import SquareColor from '../../constants/SquareColor';
import Position from '../../logic/Position';
import Empty from '../../logic/squareelements/Empty';
import Queen from '../../logic/squareelements/Queen';
import Square from './Square';

describe('Square UI', () => {
  test('Square should have correct size', () => {
    const { getByTestId } = render(
      <Square
        size={100}
        squareColor={SquareColor.WHITE}
        squareElement={new Queen(new Position(1, 2), 'black')}
        isMoveableTo={true}
        inCheck={false}
        selectSquare={() => {}}
        movePiece={() => {}}
      />,
    );
    const square = getByTestId('Square');
    expect(square.props.style[0].width).toBe(100);
    expect(square.props.style[0].height).toBe(100);
  });

  test('Square should have correct backgroundColor based of SquareType', () => {
    const rendWhite = render(
      <Square
        size={100}
        squareColor={SquareColor.WHITE}
        squareElement={new Empty(new Position(1, 2))}
        isMoveableTo={true}
        inCheck={false}
        selectSquare={() => {}}
        movePiece={() => {}}
      />,
    );
    const rendBlack = render(
      <Square
        size={100}
        squareColor={SquareColor.BLACK}
        squareElement={new Empty(new Position(1, 2))}
        isMoveableTo={true}
        inCheck={false}
        selectSquare={() => {}}
        movePiece={() => {}}
      />,
    );

    const squareWhite = rendWhite.getByTestId('Square');
    const squareBlack = rendBlack.getByTestId('Square');

    expect(squareWhite.props.style[0].backgroundColor).toBe(SquareColor.WHITE);
    expect(squareBlack.props.style[0].backgroundColor).toBe(SquareColor.BLACK);
  });

  test('Square should call selectSquare when selected', () => {
    const selectSquare = jest.fn();
    const rend = render(
      <Square
        size={100}
        squareColor={SquareColor.WHITE}
        squareElement={new Empty(new Position(1, 2))}
        isMoveableTo={false}
        inCheck={false}
        selectSquare={selectSquare}
        movePiece={() => {}}
      />,
    );
    fireEvent(rend.getByTestId('Square'), 'press');
    expect(selectSquare).toHaveBeenCalled();
  });

  test('Square should call movePiece when selected', () => {
    const movePiece = jest.fn();
    const rend = render(
      <Square
        size={100}
        squareColor={SquareColor.WHITE}
        squareElement={new Empty(new Position(1, 2))}
        isMoveableTo={true}
        inCheck={false}
        selectSquare={() => {}}
        movePiece={movePiece}
      />,
    );
    fireEvent(rend.getByTestId('Square'), 'press');
    expect(movePiece).toHaveBeenCalled();
  });

  test('Square should have no check styling if not check', () => {
    const { getByTestId } = render(
      <Square
        size={100}
        squareColor={SquareColor.WHITE}
        squareElement={new Queen(new Position(1, 2), 'black')}
        isMoveableTo={true}
        inCheck={false}
        selectSquare={() => {}}
        movePiece={() => {}}
      />,
    );
    const square = getByTestId('Square');
    expect(square.props.style).toHaveLength(2);
    expect(square.props.style[1]).toEqual({});
  });

  test('Square should have check styling if check', () => {
    const { getByTestId } = render(
      <Square
        size={100}
        squareColor={SquareColor.WHITE}
        squareElement={new Queen(new Position(1, 2), 'black')}
        isMoveableTo={true}
        inCheck={true}
        selectSquare={() => {}}
        movePiece={() => {}}
      />,
    );
    const square = getByTestId('Square');
    expect(square.props.style).toHaveLength(2);
    expect(square.props.style[1]).toEqual({
      borderColor: 'red',
      borderWidth: 2,
      paddingRight: '5%',
    });
  });
});
