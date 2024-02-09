import { describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import DiagonalPathConstructor from '../DiagonalPathConstructor';
import Path from '../Path';

describe('DiagonalPathConstructor', () => {
  const pathConstructor: DiagonalPathConstructor =
    new DiagonalPathConstructor();
  test('Move to same position should be empty path', () => {
    const position: Position = new Position(2, 3);
    const path: Path = pathConstructor.construct(position, position);

    let counter = 0;
    for (const _ of path) {
      console.log(_);
      counter++;
    }
    expect(counter).toEqual(0);
  });

  test('Move from 7:4 to 0:0 should throw error in position and catch', () => {
    const path: Path = pathConstructor.construct(
      new Position(7, 4),
      new Position(0, 0),
    );
    const result = [
      new Position(6, 3),
      new Position(5, 2),
      new Position(4, 1),
      new Position(3, 0),
    ];
    let index = 0;
    for (const pos of path) {
      expect(pos).toEqual(result[index++]);
    }
  });

  test.each([
    [
      'up',
      'left',
      new Position(1, 1),
      [new Position(3, 3), new Position(2, 2)],
    ],
    [
      'up',
      'right',
      new Position(1, 7),
      [new Position(3, 5), new Position(2, 6)],
    ],
    [
      'down',
      'left',
      new Position(7, 1),
      [new Position(5, 3), new Position(6, 2)],
    ],
    [
      'down',
      'right',
      new Position(7, 7),
      [new Position(5, 5), new Position(6, 6)],
    ],
  ])(
    'Move diagonal %s %s',
    (
      upDown: string,
      leftRight: string,
      destination: Position,
      result: Position[],
    ) => {
      const path: Path = pathConstructor.construct(
        new Position(4, 4),
        destination,
      );

      let index = 0;
      for (const pos of path) {
        expect(pos).toEqual(result[index++]);
      }
    },
  );
});
