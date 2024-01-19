import { beforeEach, describe, expect, test } from '@jest/globals';
import { SquareElementImagePaths } from '../../SquareElementImagePaths';
import Position from '../../Position';
import Pawn from '../Pawn';

describe('Pawn', () => {
  let x: number;
  beforeEach(() => {
    x = randomIntFromInterval(0, 7);
  });

  test.each([
    ['Black', 1, 7],
    ['White', 0, 6],
  ])(
    '%s should not be moveable to same position',
    (color: string, min: number, max: number) => {
      for (let i: number = 0; i < 10; i++) {
        const y = randomIntFromInterval(min, max);
        const position: Position = new Position(x, y);
        const pawn: Pawn = new Pawn(
          position,
          color == 'White' ? 'white' : 'black',
        );
        expect(pawn.isMoveableTo(position)).toBeFalsy();
      }
    },
  );

  test.each([
    ['Black', 1, 3],
    ['White', 6, 4],
  ])(
    '%s should be moveable to two positions away at the beginning',
    (color: string, y: number, newY: number) => {
      const pawn: Pawn = new Pawn(
        new Position(x, y),
        color == 'White' ? 'white' : 'black',
      );
      expect(pawn.isMoveableTo(new Position(x, newY))).toBeTruthy();
    },
  );

  test.each([
    ['Black', 2],
    ['White', -2],
  ])(
    '%s should not be moveable to two positions away at the beginning',
    (color: string, added: number) => {
      for (let i: number = 0; i < 10; i++) {
        const y = randomIntFromInterval(2, 5);
        const pawn: Pawn = new Pawn(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );
        expect(pawn.isMoveableTo(new Position(x, y + added))).toBeFalsy();
      }
    },
  );

  test.each([
    ['Black', 0, 6, 1],
    ['White', 1, 7, -1],
  ])(
    '%s Pawn should be moveable to',
    (color: string, min: number, max: number, added: number) => {
      for (let i: number = 0; i < 10; i++) {
        const y = randomIntFromInterval(min, max);
        const pawn: Pawn = new Pawn(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );
        expect(pawn.isMoveableTo(new Position(x, y + added))).toBeTruthy();
      }
    },
  );

  test.each([
    ['Black', 0, 6, 1],
    ['White', 1, 7, -1],
  ])(
    '%s Pawn should not be moveable to',
    (color: string, min: number, max: number, added: number) => {
      for (let i = 0; i < 10; i++) {
        const y = randomIntFromInterval(min, max);
        const pawn: Pawn = new Pawn(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );

        expect(
          pawn.isMoveableTo(new Position(getPositionNotEq(x), y + added)),
        ).toBeFalsy();
      }
    },
  );

  test.each([
    ['Black', 0, 6, 1],
    ['White', 1, 7, -1],
  ])(
    '%s Pawn moveTo valid',
    (color: string, min: number, max: number, added: number) => {
      for (let i: number = 0; i < 10; i++) {
        const y = randomIntFromInterval(min, max);
        const pawn: Pawn = new Pawn(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );
        const newPosition = new Position(x, y + added);
        pawn.moveTo(newPosition);
        expect(pawn.position).toEqual(newPosition);
      }
    },
  );

  test.each([
    ['Black', 0, 6, 1],
    ['White', 1, 7, -1],
  ])(
    '%s Pawn moveTo invalid',
    (color: string, min: number, max: number, added: number) => {
      for (let i: number = 0; i < 10; i++) {
        const y = randomIntFromInterval(min, max);
        const currentPosition = new Position(x, y);
        const pawn: Pawn = new Pawn(
          currentPosition,
          color == 'White' ? 'white' : 'black',
        );

        pawn.moveTo(new Position(getPositionNotEq(x), y + added));
        expect(pawn.position).toEqual(currentPosition);
      }
    },
  );

  test('Pawn should be displayed correctly', () => {
    const blackPawn: Pawn = new Pawn(new Position(1, 0), 'black');
    const whitePawn: Pawn = new Pawn(new Position(1, 0), 'white');

    expect(blackPawn.display()).toEqual(SquareElementImagePaths.BLACK_PAWN);
    expect(whitePawn.display()).toEqual(SquareElementImagePaths.WHITE_PAWN);
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
