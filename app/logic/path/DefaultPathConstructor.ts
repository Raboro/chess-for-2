import Position from '../Position';
import Path from './Path';
import PathConstructor from './PathConstructor';

export default class DefaultPathConstructor implements PathConstructor {
  construct(current: Position, destination: Position): Path {
    return new Path();
  }
}
