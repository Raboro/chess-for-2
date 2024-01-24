import Path from './Path';
import Position from '../Position';

export default interface PathConstructor {
  construct(current: Position, destination: Position): Path;
} // eslint-disable-line
