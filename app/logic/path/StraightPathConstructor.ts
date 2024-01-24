import Path from './Path';
import PathConstructor from './PathConstructor';
import Position from '../Position';

export default class StraightPathConstructor implements PathConstructor {
  construct(current: Position, destination: Position): Path {
    const path: Path = new Path();
    let moveX;
    let moveY;
    let necessaryMoves;

    if (current.x === destination.x) {
      moveX = 0;
      moveY = destination.y < current.y ? -1 : 1;
      necessaryMoves =
        destination.y < current.y
          ? current.y - destination.y
          : destination.y - current.y;
    } else {
      moveX = destination.x < current.x ? -1 : 1;
      moveY = 0;
      necessaryMoves =
        destination.x < current.x
          ? current.x - destination.x
          : destination.x - current.x;
    }

    for (let i = 1; i < necessaryMoves; i++) {
      path.add(new Position(current.x + moveX * i, current.y + moveY * i));
    }

    return path;
  }
}
