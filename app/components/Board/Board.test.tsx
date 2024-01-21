import { describe, expect, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import Board from './Board';

describe('Board UI', () => {
  test('Board renders enough Squares', () => {
    const rend = render(<Board size={400} />);
    const squares = rend.getAllByTestId('Square');
    expect(squares.length).toBe(64);
  });

  test('Square press should select it and rerender Board', () => {
    const rend = render(<Board size={400} />);
    const firstSquare = rend.getAllByTestId('Square')[0];
    expect(rend.getAllByTestId('SquareImage')[1].props.style[1]).toEqual({});

    expect(firstSquare.props.style.borderColor).toBe(undefined);

    fireEvent(firstSquare, 'press');

    expect(rend.getAllByTestId('SquareImage')[1].props.style[1]).not.toEqual(
      {},
    );
  });
});
