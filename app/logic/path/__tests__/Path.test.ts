import { describe, test, expect } from '@jest/globals';
import Path from '../Path';
import Position from '../../Position';

describe('Path', () => {
  test('Path should be iterable', () => {
    const path: Path = new Path();
    const firstPos = new Position(1, 2);
    const secondPos = new Position(1, 2);
    const thirdPos = new Position(1, 2);
    const fourthPos = new Position(1, 2);
    const positions = [firstPos, secondPos, thirdPos, fourthPos];

    expect(path.add(firstPos)).toBeTruthy();
    expect(path.add(secondPos)).toBeTruthy();
    expect(path.add(thirdPos)).toBeTruthy();
    expect(path.add(fourthPos)).toBeTruthy();

    let index = 0;
    for (const pos of path) {
      expect(pos).toEqual(positions[index++]);
    }
  });

  test('Path should not contain same Position multiple times', () => {
    const path: Path = new Path();
    const position = new Position(1, 1);
    expect(path.add(position)).toBeTruthy();
    expect(path.add(position)).toBeFalsy();
  });

  test('Empty Path should be skipped if iterating over', () => {
    const path: Path = new Path();
    let counter = 0;
    for (const _ of path) {
      console.log(_);
      counter++;
    }
    expect(counter).toEqual(0);
  });
});
