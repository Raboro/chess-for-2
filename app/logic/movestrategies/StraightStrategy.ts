import Position from '../Position';

export default function straightStrategy(
  currentPosition: Position,
  newPosition: Position,
): boolean {
  if (currentPosition.same(newPosition)) {
    return false;
  }
  return (
    currentPosition.x == newPosition.x || currentPosition.y == newPosition.y
  );
}
