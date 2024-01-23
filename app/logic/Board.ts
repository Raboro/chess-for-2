import Moveable from './Moveable';
import Position from './Position';
import SquareElement from './SquareElement';
import Bishop from './squareelements/Bishop';
import Empty from './squareelements/Empty';
import King from './squareelements/King';
import Knight from './squareelements/Knight';
import Pawn from './squareelements/Pawn';
import Queen from './squareelements/Queen';
import Rook from './squareelements/Rook';
import SquareElementType from './SquareElementType';

export class Board {
  private pieces: SquareElement[] = [];
  private currentPiece: Moveable | undefined;

  constructor() {
    this.initBoard();
  }

  private initBoard(): void {
    this.initPiecesOf(0, 'black', 1);
    this.initPiecesOf(7, 'white', 6);
  }

  private initPiecesOf(
    y: number,
    squareElementType: SquareElementType,
    pawnY: number,
  ): void {
    this.pieces.push(new Rook(new Position(0, y), squareElementType));
    this.pieces.push(new Knight(new Position(1, y), squareElementType));
    this.pieces.push(new Bishop(new Position(2, y), squareElementType));
    this.pieces.push(new Queen(new Position(3, y), squareElementType));
    this.pieces.push(new King(new Position(4, y), squareElementType));
    this.pieces.push(new Bishop(new Position(5, y), squareElementType));
    this.pieces.push(new Knight(new Position(6, y), squareElementType));
    this.pieces.push(new Rook(new Position(7, y), squareElementType));

    for (let i = 0; i < 8; i++) {
      this.pieces.push(new Pawn(new Position(i, pawnY), squareElementType));
    }
  }

  getAtPosition(position: Position): SquareElement {
    for (const piece of this.pieces) {
      if (piece.position.same(position)) {
        return piece;
      }
    }
    return new Empty(position);
  }

  selectSquare(squareElement: SquareElement): boolean {
    // eslint rules can be disabled because every SquareElement implements Moveable
    if (
      !squareElement.isPiece() ||
      this.currentPiece === (squareElement as any as Moveable) // eslint-disable-line
    ) {
      this.currentPiece = undefined;
      return false;
    }
    this.currentPiece = squareElement as any as Moveable; // eslint-disable-line
    return true;
  }

  isMoveableTo(position: Position): boolean {
    if (!this.currentPiece) {
      return false;
    }
    return this.currentPiece.isMoveableTo(position);
  }

  movePiece(squareElement: SquareElement): boolean {
    if (!this.currentPiece || this.sameElementTypeAsCurrent(squareElement)) {
      return false;
    }

    const newPosition: Position = squareElement.position;
    this.pieces = this.pieces.filter((piece) => piece !== squareElement);
    this.currentPiece.moveTo(newPosition);
    return true;
  }

  private sameElementTypeAsCurrent(squareElement: SquareElement): boolean {
    return (
      squareElement.squareElementType ===
      (this.currentPiece as any as SquareElement).squareElementType // eslint-disable-line
    );
  }

  removeSelection(): void {
    this.currentPiece = undefined;
  }
}
