import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react-native';
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
      />,
    );
    const square = getByTestId('Square');
    expect(square.props.style.width).toBe(100);
    expect(square.props.style.height).toBe(100);
  });

  test('Square should have correct backgroundColor based of SquareType', () => {
    const rendWhite = render(
      <Square
        size={100}
        squareColor={SquareColor.WHITE}
        squareElement={new Empty(new Position(1, 2))}
        isMoveableTo={true}
      />,
    );
    const rendBlack = render(
      <Square
        size={100}
        squareColor={SquareColor.BLACK}
        squareElement={new Empty(new Position(1, 2))}
        isMoveableTo={true}
      />,
    );

    const squareWhite = rendWhite.getByTestId('Square');
    const squareBlack = rendBlack.getByTestId('Square');

    expect(squareWhite.props.style.backgroundColor).toBe(SquareColor.WHITE);
    expect(squareBlack.props.style.backgroundColor).toBe(SquareColor.BLACK);
  });
});
