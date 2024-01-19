import { describe, expect, test } from '@jest/globals';
import { SquareElementImagePaths } from '../../SquareElementImagePaths';
import Position from '../../Position';
import Queen from '../Queen';

describe('Queen', () => {
  test.each([['White'], ['Black']])(
    '%s Queen should not be moveable to same position',
    (color: string) => {
      const position = new Position(
        randomIntFromInterval(0, 7),
        randomIntFromInterval(0, 7),
      );
      const queen: Queen = new Queen(
        position,
        color === 'White' ? 'white' : 'black',
      );
      expect(queen.isMoveableTo(position)).toBeFalsy();
    },
  );

  test.each([['White'], ['Black']])(
    '%s Queen should be moveable - diagonal',
    (color: string) => {
      const queen = new Queen(
        new Position(5, 3),
        color === 'White' ? 'white' : 'black',
      );
      // 1 diagonal around
      expect(queen.isMoveableTo(new Position(4, 2))).toBeTruthy();
      expect(queen.isMoveableTo(new Position(6, 2))).toBeTruthy();
      expect(queen.isMoveableTo(new Position(4, 4))).toBeTruthy();
      expect(queen.isMoveableTo(new Position(6, 4))).toBeTruthy();

      // 2 diagonal´s around
      expect(queen.isMoveableTo(new Position(3, 1))).toBeTruthy();
      expect(queen.isMoveableTo(new Position(7, 1))).toBeTruthy();
      expect(queen.isMoveableTo(new Position(3, 5))).toBeTruthy();
      expect(queen.isMoveableTo(new Position(7, 5))).toBeTruthy();

      expect(queen.isMoveableTo(new Position(1, 7))).toBeTruthy();
      expect(queen.isMoveableTo(new Position(2, 6))).toBeTruthy();
    },
  );

  test.each([['White'], ['Black']])(
    '%s Queen should be moveable on x axis',
    (color: string) => {
      for (let i = 0; i < 10; i++) {
        const x = randomIntFromInterval(0, 7);
        const y = randomIntFromInterval(0, 7);
        const queen: Queen = new Queen(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );

        expect(
          queen.isMoveableTo(new Position(x, getPositionNotEq(y))),
        ).toBeTruthy();
      }
    },
  );

  test.each([['White'], ['Black']])(
    '%s Queen should be moveable on y axis',
    (color: string) => {
      for (let i = 0; i < 10; i++) {
        const x = randomIntFromInterval(0, 7);
        const y = randomIntFromInterval(0, 7);
        const queen: Queen = new Queen(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );

        expect(
          queen.isMoveableTo(new Position(getPositionNotEq(x), y)),
        ).toBeTruthy();
      }
    },
  );

  test.each([['White'], ['Black']])(
    '%s Queen should not be moveable like Knight',
    (color: string) => {
      const queen: Queen = new Queen(
        new Position(4, 4),
        color == 'White' ? 'white' : 'black',
      );

      // jumps like Knight
      expect(queen.isMoveableTo(new Position(2, 3))).toBeFalsy();
      expect(queen.isMoveableTo(new Position(2, 5))).toBeFalsy();
      expect(queen.isMoveableTo(new Position(2, 5))).toBeFalsy();
      expect(queen.isMoveableTo(new Position(2, 5))).toBeFalsy();
    },
  );

  test.each([['White'], ['Black']])(
    '%s Queen should not be moveable to',
    (color: string) => {
      const queen: Queen = new Queen(
        new Position(4, 4),
        color == 'White' ? 'white' : 'black',
      );

      expect(queen.isMoveableTo(new Position(0, 7))).toBeFalsy();
      expect(queen.isMoveableTo(new Position(7, 0))).toBeFalsy();

      expect(queen.isMoveableTo(new Position(0, 3))).toBeFalsy();
      expect(queen.isMoveableTo(new Position(0, 5))).toBeFalsy();
      expect(queen.isMoveableTo(new Position(7, 3))).toBeFalsy();
      expect(queen.isMoveableTo(new Position(7, 5))).toBeFalsy();

      expect(queen.isMoveableTo(new Position(3, 7))).toBeFalsy();
      expect(queen.isMoveableTo(new Position(5, 1))).toBeFalsy();
    },
  );

  test.each([['White'], ['Black']])(
    '%s Queen move to valid',
    (color: string) => {
      const position = new Position(
        randomIntFromInterval(0, 6),
        randomIntFromInterval(0, 6),
      );
      const queen: Queen = new Queen(
        position,
        color === 'White' ? 'white' : 'black',
      );
      const newPosition = new Position(position.x + 1, position.y + 1);
      queen.moveTo(newPosition);
      expect(queen.position).toEqual(newPosition);
    },
  );

  test.each([['White'], ['Black']])(
    '%s Queen move to invalid',
    (color: string) => {
      const position = new Position(3, 5);
      const queen: Queen = new Queen(
        position,
        color === 'White' ? 'white' : 'black',
      );
      const newPosition = new Position(4, 3);
      queen.moveTo(newPosition);
      expect(queen.position).not.toEqual(newPosition);
    },
  );

  test('Queen should be displayed correctly', () => {
    const blackQueen: Queen = new Queen(new Position(1, 0), 'black');
    const whiteQueen: Queen = new Queen(new Position(1, 0), 'white');

    expect(blackQueen.display()).toEqual(SquareElementImagePaths.BLACK_QUEEN);
    expect(whiteQueen.display()).toEqual(SquareElementImagePaths.WHITE_QUEEN);
  });
});

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min); //NOSONAR because random is okay here
};

const getPositionNotEq = (element: number): number => {
  let newPosElement;
  do {
    newPosElement = randomIntFromInterval(0, 7);
  } while (newPosElement === element);
  return newPosElement;
};
