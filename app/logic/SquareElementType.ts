type SquareElementType = 'white' | 'black' | undefined;

export function isWhite(squareElementType: SquareElementType): boolean {
  return squareElementType === 'white';
}

export default SquareElementType;
