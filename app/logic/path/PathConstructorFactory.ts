import SquareElement from '../SquareElement';
import Bishop from '../squareelements/Bishop';
import Rook from '../squareelements/Rook';
import DiagonalPathConstructor from './DiagonalPathConstructor';
import PathConstructor from './PathConstructor';
import StraightPathConstructor from './StraightPathConstructor';

export default class PathConstructorFactory {
  create(squareElement: SquareElement): PathConstructor | undefined {
    if (squareElement instanceof Rook) {
      return new StraightPathConstructor();
    } else if (squareElement instanceof Bishop) {
      return new DiagonalPathConstructor();
    }
    return undefined;
  }
}
