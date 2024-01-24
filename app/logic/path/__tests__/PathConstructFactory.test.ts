import { describe, expect, test } from '@jest/globals';
import SquareElement from '../../SquareElement';
import Position from '../../Position';
import Pawn from '../../squareelements/Pawn';
import King from '../../squareelements/King';
import Knight from '../../squareelements/Knight';
import Empty from '../../squareelements/Empty';
import Queen from '../../squareelements/Queen';
import PathConstructorFactory from '../PathConstructorFactory';
import Rook from '../../squareelements/Rook';
import StraightPathConstructor from '../StraightPathConstructor';
import Bishop from '../../squareelements/Bishop';
import DiagonalPathConstructor from '../DiagonalPathConstructor';
import SquareElementType from '../../SquareElementType';

describe('PathConstructorFactory', () => {
  const position: Position = new Position(1, 1);
  const squareElementType: SquareElementType = 'black';
  const pathConstructorFactory: PathConstructorFactory =
    new PathConstructorFactory();

  test('No Rook or Bishop should be undefined', () => {
    const elements: SquareElement[] = [
      new Pawn(position, squareElementType),
      new King(position, squareElementType),
      new Knight(position, squareElementType),
      new Queen(position, squareElementType),
      new Empty(position),
    ];

    for (const element of elements) {
      expect(pathConstructorFactory.create(element)).toEqual(undefined);
    }
  });

  test('Rook should create StraightPathConstructor', () => {
    expect(
      pathConstructorFactory.create(new Rook(position, squareElementType)),
    ).toBeInstanceOf(StraightPathConstructor);
  });

  test('Bishop should create DiagonalPathConstructor', () => {
    expect(
      pathConstructorFactory.create(new Bishop(position, squareElementType)),
    ).toBeInstanceOf(DiagonalPathConstructor);
  });
});
