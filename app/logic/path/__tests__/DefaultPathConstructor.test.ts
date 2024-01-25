import { describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import DefaultPathConstructor from '../DefaultPathConstructor';

describe('DefaultPathConstructor', () => {
  test('Should always be empty', () => {
    const constructor: DefaultPathConstructor = new DefaultPathConstructor();

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        for (let i2 = 0; i2 < 8; i2++) {
          for (let j2 = 0; j2 < 8; j2++) {
            const path = constructor.construct(
              new Position(i, j),
              new Position(i2, j2),
            );

            let counter = 0;

            for (const _ of path) {
              console.log(_);
              counter++;
            }

            expect(counter).toEqual(0);
          }
        }
      }
    }
  });
});
