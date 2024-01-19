import { beforeEach, describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import { SquareElementImagePaths } from '../../SquareElementImagePaths';
import Rook from '../Rook';

describe('Rook', () => {
  let x: number, y: number;

  beforeEach(() => {
    x = randomIntFromInterval(0, 7);
    y = randomIntFromInterval(0, 7);
  });

  test.each([['Black'], ['White']])(
    '%s should not be moveable to same position',
    (color: string) => {
      for (let i: number = 0; i < 10; i++) {
        const position: Position = new Position(x, y);
        const rook: Rook = new Rook(
          position,
          color == 'White' ? 'white' : 'black',
        );
        expect(rook.isMoveableTo(position)).toBeFalsy();
      }
    },
  );

  test.each([['White'], ['Black']])(
    '%s Rook should be moveable on x axis',
    (color: string) => {
      for (let i = 0; i < 10; i++) {
        const rook: Rook = new Rook(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );

        expect(
          rook.isMoveableTo(new Position(x, getPositionNotEq(y))),
        ).toBeTruthy();
      }
    },
  );

  test.each([['White'], ['Black']])(
    '%s Rook should be moveable on y axis',
    (color: string) => {
      for (let i = 0; i < 10; i++) {
        const rook: Rook = new Rook(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );

        expect(
          rook.isMoveableTo(new Position(getPositionNotEq(x), y)),
        ).toBeTruthy();
      }
    },
  );

  test.each([['White'], ['Black']])(
    '%s Rook should not be moveable to',
    (color: string) => {
      for (let i = 0; i < 10; i++) {
        const rook: Rook = new Rook(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );

        expect(
          rook.isMoveableTo(
            new Position(getPositionNotEq(x), getPositionNotEq(y)),
          ),
        ).toBeFalsy();
      }
    },
  );

  test.each([['White'], ['Black']])('%s Rook moveTo valid', (color: string) => {
    for (let i = 0; i < 10; i++) {
      const rook: Rook = new Rook(
        new Position(x, y),
        color == 'White' ? 'white' : 'black',
      );
      const newPosition = new Position(x, getPositionNotEq(y));
      rook.moveTo(newPosition);
      expect(rook.position.same(newPosition)).toBeTruthy();
    }
  });

  test.each([['White'], ['Black']])(
    '%s Rook moveTo invalid',
    (color: string) => {
      for (let i = 0; i < 10; i++) {
        const rook: Rook = new Rook(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );
        const newPosition = new Position(
          getPositionNotEq(x),
          getPositionNotEq(y),
        );
        rook.moveTo(newPosition);
        expect(rook.position.same(newPosition)).toBeFalsy();
      }
    },
  );

  test('Rook should be displayed correctly', () => {
    const blackRook: Rook = new Rook(new Position(1, 0), 'black');
    const whiteRook: Rook = new Rook(new Position(1, 0), 'white');

    expect(blackRook.display()).toEqual(SquareElementImagePaths.BLACK_ROOK);
    expect(whiteRook.display()).toEqual(SquareElementImagePaths.WHITE_ROOK);
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
