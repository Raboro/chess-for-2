import Position from '../Position';
import Path from './Path';
import PathConstructor from './PathConstructor';

export default class DiagonalPathConstructor implements PathConstructor {
  construct(current: Position, destination: Position): Path {
    const path: Path = new Path();

    const moveX = current.x > destination.x ? -1 : 1;
    const moveY = current.y > destination.y ? -1 : 1;

    const necessaryMoves =
      current.x > destination.x
        ? current.x - destination.x
        : destination.x - current.x;

    for (let i = 1; i < necessaryMoves; i++) {
      path.add(new Position(current.x + moveX * i, current.y + moveY * i));
    }

    return path;
  }
}
