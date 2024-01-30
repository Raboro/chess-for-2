import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react-native';
import SquareColor from '../../constants/SquareColor';
import Promotion from './Promotion';

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

  test.each([
    ['Black', { paddingTop: 150 }],
    ['White', { paddingBottom: 150 }],
  ])(
    '%s Promotion should correctly have padding based on type',
    (color: string, style: Style) => {
      const rend = render(
        <Promotion
          squareColor={
            color === 'Black' ? SquareColor.BLACK : SquareColor.WHITE
          }
          squareElementType={color === 'Black' ? 'black' : 'white'}
          size={100}
        />,
      );

      const promotion = rend.getByTestId('Promotion');
      expect(promotion.props.style).toHaveLength(3);
      expect(promotion.props.style[2]).toEqual(style);
    },
  );
});

type Style =
  | {
      paddingTop: number;
    }
  | {
      paddingBottom: number;
    };
