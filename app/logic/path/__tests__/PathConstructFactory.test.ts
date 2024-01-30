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
import StraightAndDiagonalPathConstructor from '../StraightAndDiagonalPathConstructor';
import StraightPathConstructor from '../StraightPathConstructor';

describe('PathConstructorFactory', () => {
  const position: Position = new Position(1, 1);
  const squareElementType: SquareElementType = 'black';

  test('No Rook or Bishop should be DefaultPathConstructor', () => {
    const elements: SquareElement[] = [
      new Pawn(position, squareElementType),
      new King(position, squareElementType),
      new Knight(position, squareElementType),
      new Empty(position),
    ];

    for (const element of elements) {
      expect(PathConstructorFactory.create(element)).toBeInstanceOf(
        DefaultPathConstructor,
      );
    }
  });

  test('Rook should create StraightPathConstructor', () => {
    expect(
      PathConstructorFactory.create(new Rook(position, squareElementType)),
    ).toBeInstanceOf(StraightPathConstructor);
  });

  test('Bishop should create DiagonalPathConstructor', () => {
    expect(
      PathConstructorFactory.create(new Bishop(position, squareElementType)),
    ).toBeInstanceOf(DiagonalPathConstructor);
  });

  test('Queen should create StraightAndDiagonalPathConstructor', () => {
    expect(
      PathConstructorFactory.create(new Queen(position, squareElementType)),
    ).toBeInstanceOf(StraightAndDiagonalPathConstructor);
  });
});
