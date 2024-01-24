import Position from '../Position';

export default class Path {
  private elements: Position[] = [];

  add(position: Position): boolean {
    if (this.elements.includes(position)) {
      return false;
    }
    this.elements.push(position);
    return true;
  }

  [Symbol.iterator](): Iterator<Position> {
    let index = 0;

    return {
      next: (): IteratorResult<Position> => {
        if (index < this.elements.length) {
          return { value: this.elements[index++], done: false };
        }
        return { value: this.elements[index], done: true };
      },
    };
  }
}
