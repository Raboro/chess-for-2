import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react-native';
import Board from './Board';

describe('Board UI', () => {
  test('Board renders enough Squares', () => {
    const rend = render(<Board size={400}/>);
    const squares = rend.getAllByTestId('Square');
    expect(squares.length).toBe(64);
  });
});
