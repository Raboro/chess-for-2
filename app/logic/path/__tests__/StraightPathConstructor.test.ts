import { describe, expect, test } from '@jest/globals';
import StraightPathConstructor from '../StraightPathConstructor';
import Position from '../../Position';
import Path from '../Path';

describe('StraightPathConstructor', () => {
  const pathConstructor = new StraightPathConstructor();

  test('Move to same position should be empty path', () => {
    const position: Position = new Position(3, 5);
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
});
