import Position from '../Position';
import Path from './Path';

export default interface PathConstructor {
  construct(current: Position, destination: Position): Path;
} // eslint-disable-line
