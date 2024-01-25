import { describe, expect, test } from '@jest/globals';
import Position from '../../Position';
import SquareElement from '../../SquareElement';
import Bishop from '../../squareelements/Bishop';
import Empty from '../../squareelements/Empty';
import King from '../../squareelements/King';
import Knight from '../../squareelements/Knight';
import Pawn from '../../squareelements/Pawn';
import Queen from '../../squareelements/Queen';
import Rook from '../../squareelements/Rook';
import SquareElementType from '../../SquareElementType';
import DefaultPathConstructor from '../DefaultPathConstructor';
import DiagonalPathConstructor from '../DiagonalPathConstructor';
import PathConstructorFactory from '../PathConstructorFactory';
import StraightPathConstructor from '../StraightPathConstructor';
import StraightAndDiagonalPathConstructor from '../StraightAndDiagonalPathConstructor';

describe('PathConstructorFactory', () => {
  const position: Position = new Position(1, 1);
  const squareElementType: SquareElementType = 'black';
  const pathConstructorFactory: PathConstructorFactory =
    new PathConstructorFactory();

  test('No Rook or Bishop should be DefaultPathConstructor', () => {
    const elements: SquareElement[] = [
      new Pawn(position, squareElementType),
      new King(position, squareElementType),
      new Knight(position, squareElementType),
      new Empty(position),
    ];

    for (const element of elements) {
      expect(pathConstructorFactory.create(element)).toBeInstanceOf(
        DefaultPathConstructor,
      );
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

  test('Queen should create StraightAndDiagonalPathConstructor', () => {
    expect(
      pathConstructorFactory.create(new Queen(position, squareElementType)),
    ).toBeInstanceOf(StraightAndDiagonalPathConstructor);
  });
});
