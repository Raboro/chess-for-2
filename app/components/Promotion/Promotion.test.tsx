import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import SquareColor from '../../constants/SquareColor';
import PromotionType from '../../logic/promotion/PromotionType';
import Promotion from './Promotion';

describe('Promotion', () => {
  test('render without error', () => {
    const rend = render(
      <Promotion
        squareColor={SquareColor.BLACK}
        squareElementType="black"
        size={0}
        setPromotion={() => {}}
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
        setPromotion={() => {}}
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
          setPromotion={() => {}}
        />,
      );

      const promotion = rend.getByTestId('Promotion');
      expect(promotion.props.style).toHaveLength(3);
      expect(promotion.props.style[2]).toEqual(style);
    },
  );

  test.each([
    [0, PromotionType.QUEEN],
    [1, PromotionType.ROOK],
    [2, PromotionType.BISHOP],
    [3, PromotionType.KNIGHT],
  ])(
    'Click on Square %d should trigger promotion to %s',
    (index: number, promotionType: PromotionType) => {
      const mockSetPromotion = jest.fn();
      const rend = render(
        <Promotion
          squareColor={SquareColor.BLACK}
          squareElementType={'black'}
          size={100}
          setPromotion={mockSetPromotion}
        />,
      );

      const firstSquare = rend.getAllByTestId('Square')[index];
      fireEvent(firstSquare, 'press');
      expect(mockSetPromotion).toBeCalledWith(promotionType);
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
