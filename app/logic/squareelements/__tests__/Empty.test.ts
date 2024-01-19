import { beforeEach, describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import Empty from '../Empty';
import { SquareElementImagePaths } from '../../SquareElementImagePaths';

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

  test('Empty should be displayed correctly', () => {
    const empty: Empty = new Empty(new Position(1, 0));

    expect(empty.display()).toEqual(SquareElementImagePaths.EMPTY_IMAGE_PATH);
  });
});
