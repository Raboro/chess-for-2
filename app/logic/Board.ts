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
  private piecesGivinCheck: Set<MoveablePiece>;

  constructor() {
    this.initBoard();
    this.inCheck = false;
    this.piecesGivinCheck = new Set();
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

  /**
   * Get SquareElement at parsed Position.
   * Returns Empty if no SquareElement at parsed position
   * @param position
   * @returns
   */
  getAtPosition(position: Position): SquareElement {
    for (const piece of this.pieces) {
      if (piece.position.same(position)) {
        return piece;
      }
    }
    return new Empty(position);
  }

  /**
   * Select parsed SquareElement to use
   * this as current for further actions
   * @param squareElement
   * @param currentType
   * @returns boolean - if SquareElement was selected or not
   */
  selectSquare(
    squareElement: SquareElement,
    currentType: SquareElementType,
  ): boolean {
    const notSelectable = this.notSelectable(squareElement, currentType);
    this.currentPiece = notSelectable
      ? undefined
      : (squareElement as unknown as Moveable);
    this.currentSquareElement = notSelectable ? undefined : squareElement;
    return !notSelectable;
  }

  private notSelectable(
    squareElement: SquareElement,
    currentType: SquareElementType,
  ): boolean {
    const noPiece = !squareElement.isPiece();
    const samePieceAsCurrent = this.currentSquareElement === squareElement;
    const notSameType = squareElement.squareElementType !== currentType;
    return noPiece || samePieceAsCurrent || notSameType;
  }

  /**
   * Is current before selected SquareElement (with selectSquare())
   * moveable to parsed position
   * @param position
   * @returns boolean
   */
  isMoveableTo(position: Position): boolean {
    if (!this.currentPiece) {
      return false;
    }

    if (this.currentSquareElement instanceof King) {
      return this.isKingMoveableTo(position);
    }

    if (this.isCurrentPiecePinned()) {
      return this.canPinnedPieceTakePinningPiece(position);
    }

    if (this.currentSquareElement instanceof Pawn) {
      const conditionsWithoutCheck =
        this.currentPiece.isMoveableTo(position) &&
        !this.pawnNotMoveableTo(this.getAtPosition(position));

      if (
        this.isPawnTwoMovesBlockedByPiece(
          conditionsWithoutCheck,
          position,
          this.currentSquareElement,
        )
      ) {
        return false;
      }

      return !this.inCheck
        ? conditionsWithoutCheck
        : this.isMoveableToWith(conditionsWithoutCheck, position);
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

    return this.isMoveableToWith(conditionsWithoutCheck, position);
  }

  private isMoveableToWith(
    conditionsWithoutCheck: boolean,
    position: Position,
  ): boolean {
    return (
      conditionsWithoutCheck &&
      (!this.isKingInCheck(
        this.currentSquareElement?.squareElementType,
        position,
      ) ||
        (this.piecesGivinCheck.size === 1 &&
          (
            this.piecesGivinCheck.values().next().value as MoveablePiece
          ).position.same(position)))
    );
  }

  private isCurrentPiecePinned(): boolean {
    const ownKing = this.getKingOfType(
      this.currentSquareElement?.squareElementType,
    );

    for (const piece of this.pieces) {
      if (
        this.sameElementTypeAsCurrent(piece) ||
        !piece.isMoveableTo(ownKing.position)
      ) {
        continue;
      }
      if (
        this.isPieceInTheWay(piece, this.constructPath(piece, ownKing)) &&
        piece.isMoveableTo(ownKing.position) !==
          this.isPieceInTheWay(piece, this.constructPath(piece, ownKing), [
            this.currentSquareElement as MoveablePiece,
          ])
      ) {
        return true;
      }
    }

    return false;
  }

  private canPinnedPieceTakePinningPiece(position: Position): boolean {
    const ownKing = this.getKingOfType(
      this.currentSquareElement?.squareElementType,
    );

    for (const piece of this.pieces) {
      if (
        this.sameElementTypeAsCurrent(piece) ||
        !piece.isMoveableTo(ownKing.position)
      ) {
        continue;
      }
      if (
        this.isPieceInTheWay(piece, this.constructPath(piece, ownKing)) &&
        piece.isMoveableTo(ownKing.position) &&
        this.currentPiece?.isMoveableTo(piece.position) &&
        piece.position.same(position)
      ) {
        return true;
      }
    }

    return false;
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

  private isPawnTwoMovesBlockedByPiece(
    conditionsWithoutCheck: boolean,
    position: Position,
    currentSquareElement: SquareElement,
  ): boolean {
    const twoSteps = currentSquareElement.position.differenceOfTwoY(position);
    const piece = this.getAtPosition(
      new Position(
        position.x,
        isWhite(currentSquareElement.squareElementType)
          ? currentSquareElement.position.y - 1
          : currentSquareElement.position.y + 1,
      ),
    );
    return conditionsWithoutCheck && twoSteps && piece.isPiece();
  }

  /**
   * Move current to parsed
   * @param squareElement
   * @returns boolean - if moved or not
   */
  movePiece(squareElement: SquareElement): boolean {
    if (
      !this.currentPiece ||
      !this.isMoveableTo(squareElement.position) ||
      this.sameElementTypeAsCurrent(squareElement) ||
      this.isPieceInTheWay(squareElement)
    ) {
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
        if (piecesToIgnore && this.isPieceIgnorable(piecesToIgnore, piece)) {
          continue;
        }
        if (piece.position.same(position)) {
          return true;
        }
      }
    }

    return false;
  }

  private isPieceIgnorable(
    piecesToIgnore: MoveablePiece[],
    piece: MoveablePiece,
  ): boolean {
    for (const p of piecesToIgnore) {
      if (
        p.position.same(piece.position) &&
        p.squareElementType === piece.squareElementType
      ) {
        return true;
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

  private pawnNotMoveableTo(
    squareElement: SquareElement,
    pawn?: MoveablePiece,
  ): boolean {
    if (
      squareElement.isPiece() &&
      this.sameElementTypeAsCurrent(squareElement)
    ) {
      return true;
    }
    return squareElement.isPiece()
      ? !this.pawnOneDifferenceOnXTo(squareElement, pawn)
      : this.pawnOneDifferenceOnXTo(squareElement);
  }

  private pawnOneDifferenceOnXTo(
    squareElement: SquareElement,
    pawn?: MoveablePiece,
  ): boolean {
    if (pawn) {
      return pawn.position.differenceOfOneX(squareElement.position);
    }
    return (
      this.currentSquareElement as SquareElement
    ).position.differenceOfOneX(squareElement.position);
  }

  /**
   * Is Pawn promotable
   * @returns boolean
   */
  isPromotable(): boolean {
    if (this.isCurrentlyPawn()) {
      return (this.currentSquareElement as Pawn).isPromotable();
    }
    return false;
  }

  /**
   * removed selection to current SquareElement
   */
  removeSelection(): void {
    this.currentPiece = undefined;
  }

  /**
   * Handel promotion of current to parsed type
   * @param promotionType
   * @returns new promoted Piece
   */
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

  /**
   * Is King of parsed type in check
   * @param currentType
   * @param positionBlocked
   * @returns boolean
   */
  isKingInCheck(
    currentType: SquareElementType,
    positionBlocked?: Position,
  ): boolean {
    const king = this.getKingOfType(currentType);

    if (positionBlocked) {
      return this.pieces.some((piece) => {
        if (
          this.isPieceGivingCheck(piece, currentType, king, positionBlocked)
        ) {
          this.piecesGivinCheck.add(piece);
          return true;
        }
        return false;
      });
    }

    this.inCheck = this.pieces.some((piece) => {
      if (this.isPieceGivingCheck(piece, currentType, king, positionBlocked)) {
        if (piece instanceof Pawn && this.pawnNotMoveableTo(king, piece)) {
          return false;
        }

        this.piecesGivinCheck.add(piece);
        return true;
      }
      return false;
    });

    if (!this.inCheck) {
      this.piecesGivinCheck.clear();
    }

    return this.inCheck;
  }

  private isPieceGivingCheck(
    piece: MoveablePiece,
    currentType: SquareElementType,
    king: MoveablePiece,
    positionBlocked?: Position,
  ): boolean {
    const notSameType = piece.squareElementType !== currentType;
    const isMoveableToKing = piece.isMoveableTo(king.position);
    const noPieceBlocking = !this.isPieceInTheWay(
      king,
      this.constructPath(piece, king),
      [],
      positionBlocked,
    );
    return notSameType && isMoveableToKing && noPieceBlocking;
  }

  private getKingOfType(currentType: SquareElementType): MoveablePiece {
    for (const piece of this.pieces) {
      if (this.isKingOfType(piece, currentType)) {
        return piece;
      }
    }
    return new King(
      currentType === 'white' ? new Position(4, 7) : new Position(4, 0),
      currentType,
    ); // should never be the case, because king of other type always exists
  }

  /**
   * Is parsed piece a king of parsed type
   * @param piece
   * @param currentType
   * @returns boolean
   */
  isKingOfType(piece: MoveablePiece, currentType: SquareElementType): boolean {
    return piece instanceof King && piece.squareElementType === currentType;
  }

  /**
   * Is King of parsed type in check and
   * no further moves to prevent it are possible.
   * If so game is over and other type wins
   * @param squareElementType
   * @returns boolean
   */
  isCheckmate(squareElementType: SquareElementType): boolean {
    if (!this.isKingInCheck(squareElementType)) {
      return false;
    }

    for (const piece of this.pieces) {
      if (piece.squareElementType !== squareElementType) {
        continue;
      }
      this.selectSquare(piece, squareElementType);
      for (let i = 0; i < SIZE.LINE_SIZE; i++) {
        for (let j = 0; j < SIZE.LINE_SIZE; j++) {
          if (this.isMoveableTo(new Position(i, j))) {
            this.removeSelection();
            return false;
          }
        }
      }
    }
    this.removeSelection();
    return true;
  }
}
