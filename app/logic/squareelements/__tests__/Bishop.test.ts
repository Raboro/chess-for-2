import { describe, expect, test } from '@jest/globals';
import Bishop from '../Bishop';
import Position from '../../Position';

describe('Bishop', () => {
  test.each([['White'], ['Black']])(
    '%s Bishop should not be moveable to same position',
    (color: string) => {
      const position = new Position(
        randomIntFromInterval(0, 7),
        randomIntFromInterval(0, 7),
      );
      const bishop: Bishop = new Bishop(
        position,
        color === 'White' ? 'white' : 'black',
      );
      expect(bishop.isMoveableTo(position)).toBeFalsy();
    },
  );

  test.each([['White'], ['Black']])(
    '%s Bishop should be moveable to',
    (color: string) => {
      const bishop = new Bishop(
        new Position(5, 3),
        color === 'White' ? 'white' : 'black',
      );
      // 1 diagonal around
      expect(bishop.isMoveableTo(new Position(4, 2))).toBeTruthy();
      expect(bishop.isMoveableTo(new Position(6, 2))).toBeTruthy();
      expect(bishop.isMoveableTo(new Position(4, 4))).toBeTruthy();
      expect(bishop.isMoveableTo(new Position(6, 4))).toBeTruthy();

      // 2 diagonal´s around
      expect(bishop.isMoveableTo(new Position(3, 1))).toBeTruthy();
      expect(bishop.isMoveableTo(new Position(7, 1))).toBeTruthy();
      expect(bishop.isMoveableTo(new Position(3, 5))).toBeTruthy();
      expect(bishop.isMoveableTo(new Position(7, 5))).toBeTruthy();

      expect(bishop.isMoveableTo(new Position(1, 7))).toBeTruthy();
      expect(bishop.isMoveableTo(new Position(2, 6))).toBeTruthy();
    },
  );

  test.each([['White'], ['Black']])(
    '%s Bishop should not be moveable to',
    (color: string) => {
      const bishop = new Bishop(
        new Position(5, 3),
        color === 'White' ? 'white' : 'black',
      );
      // 1 around
      expect(bishop.isMoveableTo(new Position(5, 2))).toBeFalsy();
      expect(bishop.isMoveableTo(new Position(5, 4))).toBeFalsy();
      expect(bishop.isMoveableTo(new Position(6, 3))).toBeFalsy();
      expect(bishop.isMoveableTo(new Position(4, 3))).toBeFalsy();

      // 2 around
      expect(bishop.isMoveableTo(new Position(5, 1))).toBeFalsy();
      expect(bishop.isMoveableTo(new Position(5, 5))).toBeFalsy();
      expect(bishop.isMoveableTo(new Position(7, 3))).toBeFalsy();
      expect(bishop.isMoveableTo(new Position(3, 3))).toBeFalsy();

      expect(bishop.isMoveableTo(new Position(6, 6))).toBeFalsy();
      expect(bishop.isMoveableTo(new Position(3, 7))).toBeFalsy();
      expect(bishop.isMoveableTo(new Position(2, 4))).toBeFalsy();
    },
  );

  test('Bishop move to valid', () => {
    const bishop: Bishop = new Bishop(new Position(1, 0), 'black');
    const newPosition: Position = new Position(2, 1);
    bishop.moveTo(newPosition);
    expect(bishop.position).toEqual(newPosition);
  });

  test('Bishop move to invalid', () => {
    const bishop: Bishop = new Bishop(new Position(1, 0), 'black');
    const newPosition: Position = new Position(1, 1);
    bishop.moveTo(newPosition);
    expect(bishop.position).not.toEqual(newPosition);
  });
});

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min); //NOSONAR because random is okay here
};
