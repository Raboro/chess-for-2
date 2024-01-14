import { describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import King from '../King';

describe('King', () => {
  test.each([['White'], ['Black']])(
    '%s King should not be moveable to same position',
    (color: string) => {
      const position: Position = new Position(0, 4);
      const king: King = new King(
        position,
        color === 'Black' ? 'black' : 'white',
      );
      expect(king.isMoveableTo(position)).toBeFalsy();
    },
  );

  test.each([
    ['White', 4, 7],
    ['Black', 4, 0],
  ])(
    '%s King should be moveable to left/right & up/down by one',
    (color: string, x: number, y: number) => {
      const king: King = new King(
        new Position(x, y),
        color === 'Black' ? 'black' : 'white',
      );
      expect(king.isMoveableTo(new Position(x + 1, y))).toBeTruthy(); // one right
      expect(king.isMoveableTo(new Position(x - 1, y))).toBeTruthy(); // one left
      expect(
        king.isMoveableTo(new Position(x, y === 7 ? y - 1 : y + 1)),
      ).toBeTruthy(); // up or down
    },
  );

  test('King should be moveable one diagonal', () => {
    const king: King = new King(new Position(1, 3), 'white');
    expect(king.isMoveableTo(new Position(0, 2))).toBeTruthy();
    expect(king.isMoveableTo(new Position(2, 2))).toBeTruthy();
    expect(king.isMoveableTo(new Position(0, 4))).toBeTruthy();
    expect(king.isMoveableTo(new Position(2, 4))).toBeTruthy();
  });

  test('King should not be moveable > one diagonal', () => {
    const king: King = new King(new Position(4, 4), 'white');
    expect(king.isMoveableTo(new Position(2, 2))).toBeFalsy();
    expect(king.isMoveableTo(new Position(6, 2))).toBeFalsy();
    expect(king.isMoveableTo(new Position(2, 6))).toBeFalsy();
    expect(king.isMoveableTo(new Position(6, 6))).toBeFalsy();
  });

  test('King should not be moveable > one left/right & up/down', () => {
    const king: King = new King(new Position(4, 4), 'white');
    expect(king.isMoveableTo(new Position(4, 2))).toBeFalsy();
    expect(king.isMoveableTo(new Position(4, 6))).toBeFalsy();
    expect(king.isMoveableTo(new Position(2, 4))).toBeFalsy();
    expect(king.isMoveableTo(new Position(6, 4))).toBeFalsy();
  });

  test('King move to valid', () => {
    const king: King = new King(new Position(4, 4), 'white');
    const newPos: Position = new Position(3, 4);
    king.moveTo(newPos);
    expect(king.position).toEqual(newPos);
  });

  test('King move to invalid', () => {
    const king: King = new King(new Position(4, 4), 'white');
    const newPos: Position = new Position(2, 4);
    king.moveTo(newPos);
    expect(king.position).not.toEqual(newPos);
  });
});
