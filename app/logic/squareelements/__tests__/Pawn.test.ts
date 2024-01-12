import { describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import Pawn from '../Pawn';

describe('Pawn', () => {
  test('Constructor throws TypeError when undefined as SquareElementType is Parsed', () => {
    expect(() => new Pawn(new Position(2, 3), undefined)).toThrow(TypeError);
  });

  test('IsPiece should be true', () => {
    const pawnWhite: Pawn = new Pawn(new Position(0, 1), 'white');
    expect(pawnWhite.isPiece()).toBeTruthy();

    const pawnBlack: Pawn = new Pawn(new Position(0, 1), 'black');
    expect(pawnBlack.isPiece()).toBeTruthy();
  });

  test.each([
    ['Black', 0, 6, 1],
    ['White', 1, 7, -1],
  ])(
    '%s Pawn is Moveable',
    (color: string, min: number, max: number, added: number) => {
      for (let i: number = 0; i < 10; i++) {
        const x = randomIntFromInterval(0, 7);
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
    '%s Pawn is Moveable',
    (color: string, min: number, max: number, added: number) => {
      for (let i = 0; i < 10; i++) {
        const x = randomIntFromInterval(0, 7);
        const y = randomIntFromInterval(min, max);
        const pawn: Pawn = new Pawn(
          new Position(x, y),
          color == 'White' ? 'white' : 'black',
        );

        let newX;
        do {
          newX = randomIntFromInterval(0, 7);
        } while (newX === x);

        expect(pawn.isMoveableTo(new Position(newX, y + added))).toBeFalsy();
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
        const x = randomIntFromInterval(0, 7);
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
        const x = randomIntFromInterval(0, 7);
        const y = randomIntFromInterval(min, max);
        const currentPosition = new Position(x, y);
        const pawn: Pawn = new Pawn(
          currentPosition,
          color == 'White' ? 'white' : 'black',
        );

        let newX;
        do {
          newX = randomIntFromInterval(0, 7);
        } while (newX === x);

        pawn.moveTo(new Position(newX, y + added));
        expect(pawn.position).toEqual(currentPosition);
      }
    },
  );
});

const randomIntFromInterval = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
