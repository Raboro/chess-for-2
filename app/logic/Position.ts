export default class Position {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    if (x < 0 || x > 7 || y < 0 || y > 7) {
      throw new RangeError('x or y get to valid input range [0,7]');
    }
    this.x = x;
    this.y = y;
  }

  notSameLine(p: Position): boolean {
    return this.x != p.x;
  }
}
