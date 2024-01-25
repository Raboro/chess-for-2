import SquareElement from '../SquareElement';
import Bishop from '../squareelements/Bishop';
import Queen from '../squareelements/Queen';
import Rook from '../squareelements/Rook';
import DefaultPathConstructor from './DefaultPathConstructor';
import DiagonalPathConstructor from './DiagonalPathConstructor';
import PathConstructor from './PathConstructor';
import StraightAndDiagonalPathConstructor from './StraightAndDiagonalPathConstructor';
import StraightPathConstructor from './StraightPathConstructor';

export default class PathConstructorFactory {
  create(squareElement: SquareElement): PathConstructor {
    if (squareElement instanceof Rook) {
      return new StraightPathConstructor();
    } else if (squareElement instanceof Bishop) {
      return new DiagonalPathConstructor();
    } else if (squareElement instanceof Queen) {
      return new StraightAndDiagonalPathConstructor();
    }
    return new DefaultPathConstructor();
  }
}
