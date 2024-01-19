import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react-native';
import Square from './Square';
import SquareColor from '../../constants/SquareColor';

describe('Square UI', () => {
  test('Square should have correct size', () => {
    const { getByTestId } = render(<Square size={100} squareType="white" />);
    const square = getByTestId('Square');
    expect(square.props.style.width).toBe(100);
    expect(square.props.style.height).toBe(100);
  });

  test('Square should have correct backgroundColor based of SquareType', () => {
    const rendWhite = render(<Square size={100} squareType="white" />);
    const rendBlack = render(<Square size={100} squareType="black" />);

    const squareWhite = rendWhite.getByTestId('Square');
    const squareBlack = rendBlack.getByTestId('Square');

    expect(squareWhite.props.style.backgroundColor).toBe(SquareColor.WHITE);
    expect(squareBlack.props.style.backgroundColor).toBe(SquareColor.BLACK);
  });
});
