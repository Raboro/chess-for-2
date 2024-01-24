import Position from '../Position';
import Path from './Path';
import PathConstructor from './PathConstructor';

export default class DiagonalPathConstructor implements PathConstructor {
  construct(current: Position, destination: Position): Path {
    const path: Path = new Path();
    path.add(current);
    path.add(destination);
    return path;
  }
}
