import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react-native';
import Promotion from './Promotion';
import SquareColor from '../../constants/SquareColor';

describe('Promotion', () => {
  test('render without error', () => {
    const rend = render(
      <Promotion
        squareColor={SquareColor.BLACK}
        squareElementType="black"
        size={0}
      />,
    );
    expect(rend).not.toBe(null);
  });

  test('should render four squares', () => {
    const { getAllByTestId } = render(
      <Promotion
        squareColor={SquareColor.BLACK}
        squareElementType="black"
        size={100}
      />,
    );

    const squares = getAllByTestId('Square');
    expect(squares).toHaveLength(4);
  });
});
