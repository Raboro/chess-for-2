import { describe, expect, test } from '@jest/globals';
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
});

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min); //NOSONAR because random is okay here
};
