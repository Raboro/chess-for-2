import Position from '../Position';

export default function aroundStrategy(
  currentPosition: Position,
  newPosition: Position,
): boolean {
  if (currentPosition.same(newPosition)) {
    return false;
  }

  const oneUpOrDown =
    currentPosition.differenceOfOneX(newPosition) &&
    currentPosition.y == newPosition.y;
  const oneLeftOrRight =
    currentPosition.differenceOfOneY(newPosition) &&
    currentPosition.x == newPosition.x;
  const oneDiagonal =
    currentPosition.differenceOfOneX(newPosition) &&
    currentPosition.differenceOfOneY(newPosition);

  return oneUpOrDown || oneLeftOrRight || oneDiagonal;
}
