import Position from '../Position';

export default function diagonalStrategy(
  currentPosition: Position,
  newPosition: Position,
): boolean {
  if (currentPosition.same(newPosition)) {
    return false;
  }

  const differenceOfX = getPositiveDifferenceOf(
    currentPosition.x,
    newPosition.x,
  );

  const differenceOfY = getPositiveDifferenceOf(
    currentPosition.y,
    newPosition.y,
  );

  return differenceOfX === differenceOfY || differenceOfX === -differenceOfY;
}

function getPositiveDifferenceOf(n1: number, n2: number): number {
  return n1 >= n2 ? n1 - n2 : n2 - n1;
}
