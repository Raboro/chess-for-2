import { beforeEach, describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import { SquareElementImagePaths } from '../../SquareElementImagePaths';
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
    '%s Pawn should be moveable to and should moveTo valid',
    (color: string, min: number, max: number, added: number) => {
      for (let i: number = 0; i < 10; i++) {
        const y = randomIntFromInterval(min, max);
        const pawn: Pawn = new Pawn(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );
        const newPosition = new Position(x, y + added);
        expect(pawn.isMoveableTo(newPosition)).toBeTruthy();
        pawn.moveTo(newPosition);
        expect(pawn.position).toEqual(newPosition);
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

  test.each([
    ['Black', 1, 0],
    ['White', 6, 7],
  ])(
    '%s Pawn should not be moveable behind',
    (color: string, y: number, newY: number) => {
      const pawn: Pawn = new Pawn(
        new Position(1, y),
        color == 'White' ? 'white' : 'black',
      );
      expect(pawn.isMoveableTo(new Position(1, newY))).toBeFalsy();
    },
  );

  test.each([
    ['Black', 0, 6, 1],
    ['White', 1, 7, -1],
  ])(
    '%s Pawn should be moveable one diagonal up right/left',
    (color: string, min: number, max: number, added: number) => {
      for (let i: number = 0; i < 10; i++) {
        const y = randomIntFromInterval(min, max);
        const currentPosition = new Position(2, y);
        const pawn: Pawn = new Pawn(
          currentPosition,
          color == 'White' ? 'white' : 'black',
        );
        expect(pawn.isMoveableTo(new Position(3, y + added))).toBeTruthy(); // diagonal right
        expect(pawn.isMoveableTo(new Position(1, y + added))).toBeTruthy(); // diagonal left
      }
    },
  );

  test.each([
    ['Black', 0, 6],
    ['White', 1, 7],
  ])(
    '%s Pawn should not be promotable',
    (color: string, min: number, max: number) => {
      for (let i: number = 0; i < 10; i++) {
        const y = randomIntFromInterval(min, max);
        const pawn: Pawn = new Pawn(
          new Position(randomIntFromInterval(0, 7), y),
          color == 'White' ? 'white' : 'black',
        );
        expect(pawn.isPromotable()).toBeFalsy();
      }
    },
  );

  test.each([
    ['Black', 7],
    ['White', 0],
  ])('%s Pawn should be promotable', (color: string, y: number) => {
    const pawn: Pawn = new Pawn(
      new Position(randomIntFromInterval(0, 7), y),
      color == 'White' ? 'white' : 'black',
    );
    expect(pawn.isPromotable()).toBeTruthy();
  });

  test.each([
    ['Black', 1, 3],
    ['White', 6, 4],
  ])(
    '%s Pawn should have moved two squares true',
    (color: string, y: number, newY: number) => {
      const pawn: Pawn = new Pawn(
        new Position(4, y),
        color === 'White' ? 'white' : 'black',
      );
      const newPosition = new Position(4, newY);
      expect(pawn.hasMovedTwoSquares()).toBeFalsy();
      expect(pawn.isMoveableTo(newPosition)).toBeTruthy();
      pawn.moveTo(newPosition);
      expect(pawn.hasMovedTwoSquares()).toBeTruthy();
    },
  );

  test.each([
    ['Black', 1, 2],
    ['White', 6, 5],
  ])(
    '%s Pawn should have moved two squares false, if only one square move',
    (color: string, y: number, newY: number) => {
      const pawn: Pawn = new Pawn(
        new Position(4, y),
        color === 'White' ? 'white' : 'black',
      );
      const newPosition = new Position(4, newY);
      expect(pawn.hasMovedTwoSquares()).toBeFalsy();
      expect(pawn.isMoveableTo(newPosition)).toBeTruthy();
      pawn.moveTo(newPosition);
      expect(pawn.hasMovedTwoSquares()).toBeFalsy();
    },
  );
});

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min); //NOSONAR because random is okay here
};

const getPositionNotEq = (element: number): number => {
  let newPosElement;
  do {
    newPosElement = randomIntFromInterval(0, 7);
  } while (
    newPosElement === element ||
    newPosElement + 1 === element ||
    newPosElement - 1 === element
  );
  return newPosElement;
};
