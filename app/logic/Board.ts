import { SIZE } from '../constants/Size';
import Moveable from './Moveable';
import MoveablePiece from './MoveablePiece';
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
import SquareElementType, { isWhite } from './SquareElementType';

export class Board {
  private pieces: MoveablePiece[] = [];
  private currentPiece: Moveable | undefined;
  private currentSquareElement: SquareElement | undefined;
  private inCheck: boolean;

  constructor() {
    this.initBoard();
    this.inCheck = false;
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

    if (this.currentSquareElement instanceof King) {
      return this.isKingMoveableTo(position);
    }

    if (this.currentSquareElement instanceof Pawn) {
      const conditionsWithoutCheck =
        this.currentPiece.isMoveableTo(position) &&
        !this.pawnNotMoveableTo(this.getAtPosition(position));

      if (!this.inCheck) {
        return conditionsWithoutCheck;
      }

      return (
        // need to consider the case if pawn can take check given piece
        conditionsWithoutCheck &&
        !this.isKingInCheck(
          this.currentSquareElement?.squareElementType,
          position,
        )
      );
    }

    const elementOnSquareToMove = this.getAtPosition(position);
    const isSquareNotOfSameType =
      elementOnSquareToMove instanceof Empty ||
      !this.sameElementTypeAsCurrent(elementOnSquareToMove);

    const noPieceShouldBlocking = !this.isPieceInTheWay(
      this.currentSquareElement as SquareElement,
      this.constructPath(
        this.currentSquareElement as SquareElement,
        new Empty(position),
      ),
    );

    const conditionsWithoutCheck =
      this.currentPiece.isMoveableTo(position) &&
      isSquareNotOfSameType &&
      noPieceShouldBlocking;

    if (!this.inCheck) {
      return conditionsWithoutCheck;
    }

    return (
      conditionsWithoutCheck &&
      !this.isKingInCheck(
        this.currentSquareElement?.squareElementType,
        position,
      )
    );
  }

  private isKingMoveableTo(position: Position): boolean {
    if (!this.currentPiece?.isMoveableTo(position)) {
      return false;
    }

    return !this.pieces.some((piece) => {
      return this.isPositionKingToMoveBlocked(piece, position);
    });
  }

  private isPositionKingToMoveBlocked(
    piece: MoveablePiece,
    position: Position,
  ): boolean {
    return (
      this.isSameTypeBlocking(piece, position) ||
      this.isOtherTypeBlocking(piece, position)
    );
  }

  private isSameTypeBlocking(piece: MoveablePiece, position: Position) {
    return this.sameTypeAsCurrent(piece) && piece.position.same(position);
  }

  private sameTypeAsCurrent(piece: MoveablePiece): boolean {
    return (
      piece.squareElementType === this.currentSquareElement?.squareElementType
    );
  }

  private isOtherTypeBlocking(piece: MoveablePiece, position: Position) {
    if (this.sameTypeAsCurrent(piece)) {
      return false;
    }

    if (piece instanceof Pawn) {
      const offset = isWhite(piece.squareElementType) ? -1 : 1;
      return (
        piece.position.differenceOfOneX(position) &&
        piece.position.y + offset === position.y
      );
    }

    if (this.isQueenRookOrBishop(piece)) {
      return (
        piece.isMoveableTo(position) &&
        this.isPieceBlockingMoveablePosition(piece, position)
      );
    }

    return piece.isMoveableTo(position);
  }

  private isQueenRookOrBishop(piece: MoveablePiece): boolean {
    return (
      piece instanceof Queen || piece instanceof Rook || piece instanceof Bishop
    );
  }

  private isPieceBlockingMoveablePosition(
    piece: MoveablePiece,
    position: Position,
  ): boolean {
    const path: Path = this.constructPath(piece, new Empty(position));
    return !this.isPieceInTheWay(piece, path, [
      this.currentPiece as MoveablePiece,
    ]);
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
    this.pieces = this.pieces
      .filter((piece) => piece !== squareElement)
      .map((piece) => {
        if (this.isPieceSameAsCurrent(piece)) {
          piece.moveTo(newPosition);
        }
        return piece;
      });

    this.currentPiece.moveTo(newPosition);
    return true;
  }

  private isPieceSameAsCurrent(piece: MoveablePiece) {
    return (
      piece.position.same(
        this.currentSquareElement?.position ?? new Position(0, 0),
      ) && this.sameElementTypeAsCurrent(piece)
    );
  }

  private sameElementTypeAsCurrent(squareElement: SquareElement): boolean {
    return (
      squareElement.squareElementType ===
      this.currentSquareElement?.squareElementType
    );
  }

  private isPieceInTheWay(
    squareElement: SquareElement,
    pathAsParam?: Path,
    piecesToIgnore?: MoveablePiece[],
    positionBlocked?: Position,
  ): boolean {
    const path =
      pathAsParam ??
      this.constructPath(
        this.currentSquareElement as SquareElement,
        squareElement,
      );

    for (const position of path) {
      if (positionBlocked && position.same(positionBlocked)) {
        return true;
      }
      for (const piece of this.pieces) {
        if (!piecesToIgnore?.includes(piece) && piece.position.same(position)) {
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

  isKingInCheck(
    currentType: SquareElementType,
    positionBlocked?: Position,
  ): boolean {
    const king = this.getKingOfType(currentType);

    if (!king) {
      return false;
    }

    if (positionBlocked) {
      return this.pieces.some((piece) =>
        this.isPieceGivingCheck(piece, currentType, king, positionBlocked),
      );
    }

    this.inCheck = this.pieces.some((piece) => {
      return this.isPieceGivingCheck(piece, currentType, king, positionBlocked);
    });

    return this.inCheck;
  }

  private isPieceGivingCheck(
    piece: MoveablePiece,
    currentType: string | undefined,
    king: MoveablePiece,
    positionBlocked?: Position,
  ): boolean {
    return (
      piece.squareElementType !== currentType &&
      piece.isMoveableTo(king.position) &&
      !this.isPieceInTheWay(
        king,
        this.constructPath(piece, king),
        [],
        positionBlocked,
      )
    );
  }

  private getKingOfType(
    currentType: SquareElementType,
  ): MoveablePiece | undefined {
    for (const piece of this.pieces) {
      if (this.isKingOfType(piece, currentType)) {
        return piece;
      }
    }
    return undefined; // should never be the case, because king of other type always exists
  }

  isKingOfType(piece: MoveablePiece, currentType: SquareElementType): boolean {
    return piece instanceof King && piece.squareElementType === currentType;
  }
}
