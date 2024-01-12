import { beforeEach, describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import Empty from '../Empty';

describe('Empty', () => {
  let e: Empty;

  beforeEach(() => {
    e = new Empty(new Position(0, 0));
  });

  test('IsPiece should be false', () => {
    expect(e.isPiece()).toBeFalsy();
  });

  test('SquareElementType should be undefined', () => {
    expect(e.squareElementType).toBe(undefined);
  });
});
