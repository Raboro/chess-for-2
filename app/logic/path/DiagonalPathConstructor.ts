import Path from './Path';
import PathConstructor from './PathConstructor';
import Position from '../Position';

export default class DiagonalPathConstructor implements PathConstructor {
  construct(current: Position, destination: Position): Path {
    const path: Path = new Path();
    path.add(current);
    path.add(destination);
    return path;
  }
}
