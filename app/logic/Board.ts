import { SIZE } from '../constants/Size';
import Moveable from './Moveable';
import Path from './path/Path';
import PathConstructorFactory from './path/PathConstructorFactory';
import Position from './Position';
import PromotionFactory from './promotion/PromotionFactory';
import PromotionType from './promotion/PromotionType';
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
  private currentSquareElement: SquareElement | undefined;

  constructor() {
    this.initBoard();
  }

  private initBoard(): void {
    this.initPiecesOf(SIZE.POSITION_MIN, 'black', SIZE.POSITION_MIN + 1);
    this.initPiecesOf(SIZE.POSITION_MAX, 'white', SIZE.POSITION_MAX - 1);
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

    for (let i = 0; i < SIZE.LINE_SIZE; i++) {
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

  selectSquare(
    squareElement: SquareElement,
    currentType: SquareElementType,
  ): boolean {
    if (
      !squareElement.isPiece() ||
      this.currentSquareElement === squareElement ||
      squareElement.squareElementType !== currentType
    ) {
      this.currentPiece = undefined;
      this.currentSquareElement = undefined;
      return false;
    }
    this.currentPiece = squareElement as any as Moveable; // eslint-disable-line
    this.currentSquareElement = squareElement;
    return true;
  }

  isMoveableTo(position: Position): boolean {
    if (!this.currentPiece) {
      return false;
    }
    return this.currentPiece.isMoveableTo(position);
  }

  movePiece(squareElement: SquareElement): boolean {
    if (
      !this.currentPiece ||
      !this.isMoveableTo(squareElement.position) ||
      this.sameElementTypeAsCurrent(squareElement) ||
      this.isPieceInTheWay(squareElement)
    ) {
      return false;
    }

    if (this.isCurrentlyPawn() && this.pawnNotMoveableTo(squareElement)) {
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
      this.currentSquareElement?.squareElementType
    );
  }

  private isPieceInTheWay(squareElement: SquareElement): boolean {
    const path: Path = this.constructPath(
      this.currentSquareElement as SquareElement,
      squareElement,
    );

    for (const position of path) {
      for (const piece of this.pieces) {
        if (piece.position.same(position)) {
          return true;
        }
      }
    }

    return false;
  }

  private constructPath(
    current: SquareElement,
    destination: SquareElement,
  ): Path {
    const pathConstructor = PathConstructorFactory.create(current);
    return pathConstructor.construct(current.position, destination.position);
  }

  private isCurrentlyPawn(): boolean {
    return this.currentSquareElement instanceof Pawn;
  }

  private pawnNotMoveableTo(squareElement: SquareElement): boolean {
    return squareElement.isPiece()
      ? !this.pawnOneDifferenceOnXTo(squareElement)
      : this.pawnOneDifferenceOnXTo(squareElement);
  }

  private pawnOneDifferenceOnXTo(squareElement: SquareElement): boolean {
    return (
      this.currentSquareElement as SquareElement
    ).position.differenceOfOneX(squareElement.position);
  }

  isPromotable(): boolean {
    if (this.isCurrentlyPawn()) {
      return (this.currentSquareElement as Pawn).isPromotable();
    }
    return false;
  }

  removeSelection(): void {
    this.currentPiece = undefined;
  }

  handlePromotion(promotionType: PromotionType): SquareElement {
    const position = this.currentSquareElement?.position ?? new Position(0, 0);
    const elementType = this.currentSquareElement?.squareElementType ?? 'white';
    this.pieces = this.pieces.filter(
      (piece) => piece !== this.currentSquareElement,
    );

    const piece = PromotionFactory.createPieceByType(
      promotionType,
      position,
      elementType,
    );
    this.pieces.push(piece);
    return piece;
  }
}
