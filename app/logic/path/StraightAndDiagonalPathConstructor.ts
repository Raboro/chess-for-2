import Position from '../Position';
import DiagonalPathConstructor from './DiagonalPathConstructor';
import Path from './Path';
import PathConstructor from './PathConstructor';
import StraightPathConstructor from './StraightPathConstructor';

export default class StraightAndDiagonalPathConstructor
  implements PathConstructor
{
  construct(current: Position, destination: Position): Path {
    const pathConstructor = this.oneSame(current, destination)
      ? new StraightPathConstructor()
      : new DiagonalPathConstructor();
    return pathConstructor.construct(current, destination);
  }

  private oneSame(current: Position, destination: Position): boolean {
    return current.x === destination.x || current.y === destination.y;
  }
}
