import { describe, test, expect } from '@jest/globals';
import StraightAndDiagonalPathConstructor from '../StraightAndDiagonalPathConstructor';
import Position from '../../Position';
import Path from '../Path';

describe('StraightAndDiagonalPathConstructor', () => {
  const pathConstructor = new StraightAndDiagonalPathConstructor();

  test('Move to same position should be empty path', () => {
    const position: Position = new Position(4, 4);
    const path: Path = pathConstructor.construct(position, position);

    let counter = 0;
    for (const _ of path) {
      console.log(_);
      counter++;
    }

    expect(counter).toEqual(0);
  });

  test('Move on X-aches left', () => {
    const result: Position[] = [new Position(2, 5), new Position(1, 5)];
    const path: Path = pathConstructor.construct(
      new Position(3, 5),
      new Position(0, 5),
    );

    let index = 0;
    for (const element of path) {
      expect(element).toEqual(result[index++]);
    }
  });

  test('Move on X-aches right', () => {
    const result: Position[] = [
      new Position(4, 5),
      new Position(5, 5),
      new Position(6, 5),
    ];
    const path: Path = pathConstructor.construct(
      new Position(3, 5),
      new Position(7, 5),
    );
    let index = 0;
    for (const element of path) {
      expect(element).toEqual(result[index++]);
    }
  });

  test('Move on Y-aches down', () => {
    const result: Position[] = [new Position(5, 2), new Position(5, 1)];
    const path: Path = pathConstructor.construct(
      new Position(5, 3),
      new Position(5, 0),
    );

    let index = 0;
    for (const element of path) {
      expect(element).toEqual(result[index++]);
    }
  });

  test('Move on Y-aches up', () => {
    const result: Position[] = [
      new Position(5, 4),
      new Position(5, 5),
      new Position(5, 6),
    ];
    const path: Path = pathConstructor.construct(
      new Position(5, 3),
      new Position(5, 7),
    );

    let index = 0;
    for (const element of path) {
      expect(element).toEqual(result[index++]);
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
