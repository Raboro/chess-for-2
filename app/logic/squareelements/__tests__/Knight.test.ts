import { describe, expect, test } from '@jest/globals';
import { PieceImagePaths } from '../../PieceImagePaths';
import Position from '../../Position';
import Knight from '../Knight';

describe('Knight', () => {
  test.each([['White'], ['Black']])(
    '%s Knight should not be moveable to same position',
    (color: string) => {
      const knight: Knight = new Knight(
        new Position(1, 0),
        color == 'White' ? 'white' : 'black',
      );
      expect(knight.isMoveableTo(new Position(1, 0))).toBeFalsy();
    },
  );

  test('Black Knight should be moveable from start position to 0,2 and 2,2', () => {
    const leftKnight: Knight = new Knight(new Position(1, 0), 'black');
    expect(leftKnight.isMoveableTo(new Position(2, 2))).toBeTruthy();
    expect(leftKnight.isMoveableTo(new Position(0, 2))).toBeTruthy();

    const rightKnight: Knight = new Knight(new Position(6, 0), 'black');
    expect(rightKnight.isMoveableTo(new Position(7, 2))).toBeTruthy();
    expect(rightKnight.isMoveableTo(new Position(5, 2))).toBeTruthy();
  });

  test('White Knight should be moveable from start position to 0,2 and 2,2', () => {
    const leftKnight: Knight = new Knight(new Position(1, 7), 'white');
    expect(leftKnight.isMoveableTo(new Position(0, 5))).toBeTruthy();
    expect(leftKnight.isMoveableTo(new Position(2, 5))).toBeTruthy();

    const rightKnight: Knight = new Knight(new Position(6, 7), 'white');
    expect(rightKnight.isMoveableTo(new Position(7, 5))).toBeTruthy();
    expect(rightKnight.isMoveableTo(new Position(5, 5))).toBeTruthy();
  });

  test('Black Knight should be moveable with only one difference on y', () => {
    const knight: Knight = new Knight(new Position(2, 2), 'black');
    expect(knight.isMoveableTo(new Position(4, 3))).toBeTruthy();
    expect(knight.isMoveableTo(new Position(0, 3))).toBeTruthy();
  });

  test('White Knight should be moveable with only one difference on y', () => {
    const knight: Knight = new Knight(new Position(2, 5), 'white');
    expect(knight.isMoveableTo(new Position(4, 4))).toBeTruthy();
    expect(knight.isMoveableTo(new Position(0, 4))).toBeTruthy();
  });

  test.each([['White'], ['Black']])(
    '%s Knight should not be moveable to',
    (color: string) => {
      const knight: Knight = new Knight(
        new Position(1, 0),
        color == 'White' ? 'white' : 'black',
      );
      expect(knight.isMoveableTo(new Position(4, 3))).toBeFalsy();
      expect(knight.isMoveableTo(new Position(2, 1))).toBeFalsy();
      expect(knight.isMoveableTo(new Position(6, 5))).toBeFalsy();
      expect(knight.isMoveableTo(new Position(1, 1))).toBeFalsy();
      expect(knight.isMoveableTo(new Position(2, 0))).toBeFalsy();
    },
  );

  test('Knight move to valid', () => {
    const knight: Knight = new Knight(new Position(1, 0), 'black');
    const newPosition: Position = new Position(2, 2);
    knight.moveTo(newPosition);
    expect(knight.position).toEqual(newPosition);
  });

  test('Knight move to invalid', () => {
    const knight: Knight = new Knight(new Position(1, 0), 'black');
    const newPosition: Position = new Position(1, 1);
    knight.moveTo(newPosition);
    expect(knight.position).not.toEqual(newPosition);
  });

  test('Knight should be displayed correctly', () => {
    const blackKnight: Knight = new Knight(new Position(1, 0), 'black');
    const whiteKnight: Knight = new Knight(new Position(1, 0), 'white');

    expect(blackKnight.display()).toEqual(PieceImagePaths.BLACK_KNIGHT);
    expect(whiteKnight.display()).toEqual(PieceImagePaths.WHITE_KNIGHT);
  });
});
