import { SIZE } from '../constants/Size';

export default class Position {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    if (
      x < SIZE.POSITION_MIN ||
      x > SIZE.POSITION_MAX ||
      y < SIZE.POSITION_MIN ||
      y > SIZE.POSITION_MAX
    ) {
      throw new RangeError(
        `x or y get to valid input range [${SIZE.POSITION_MIN},${SIZE.POSITION_MAX}]`,
      );
    }
    this.x = x;
    this.y = y;
  }

  notSameLine(p: Position): boolean {
    return this.x != p.x;
  }

  same(p: Position): boolean {
    return this.x == p.x && this.y == p.y;
  }

  differenceOfOneX(p: Position): boolean {
    return this.differenceOf(this.x, p.x, 1);
  }

  private differenceOf(n1: number, n2: number, difference: number): boolean {
    return n1 == n2 + difference || n1 == n2 - difference;
  }

  differenceOfOneY(p: Position): boolean {
    return this.differenceOf(this.y, p.y, 1);
  }

  differenceOfTwoX(p: Position): boolean {
    return this.differenceOf(this.x, p.x, 2);
  }

  differenceOfTwoY(p: Position): boolean {
    return this.differenceOf(this.y, p.y, 2);
  }
}
