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
  private hasPawnMovedTwoSquares: boolean;
  private positionOfTwoSquaresMove: Position | undefined;
  private twoSquaresMovePawn: Pawn | undefined;

  constructor() {
    this.initBoard();
    this.inCheck = false;
    this.piecesGivinCheck = new Set();
    this.hasPawnMovedTwoSquares = false;
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
      return (
        this.isKingMoveableTo(position) ||
        this.isCastlingPossible(position, this.currentSquareElement)
      );
    }

    if (this.isCurrentPiecePinned()) {
      return (
        this.canPinnedPieceTakePinningPiece(position) ||
        this.canPinnedPieceMoveAndKeepPin(position)
      );
    }

    if (this.currentSquareElement instanceof Pawn) {
      if (this.isEnPassantPossible(position, this.currentSquareElement)) {
        return true;
      }

      return this.isPawnMoveableTo(
        this.currentPiece,
        position,
        this.currentSquareElement,
      );
    }
    return this.isPieceNoPawnNoKingMoveableTo(this.currentPiece, position);
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

  private constructPath(
    current: SquareElement,
    destination: SquareElement,
  ): Path {
    const pathConstructor = PathConstructorFactory.create(current);
    return pathConstructor.construct(current.position, destination.position);
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
      if (this.isPieceOnPosition(position, piecesToIgnore)) {
        return true;
      }
    }

    return false;
  }

  private isPieceOnPosition(
    position: Position,
    piecesToIgnore?: MoveablePiece[],
  ): boolean {
    for (const piece of this.pieces) {
      if (piecesToIgnore && this.isPieceIgnorable(piecesToIgnore, piece)) {
        continue;
      }
      if (piece.position.same(position)) {
        return true;
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

  private isCastlingPossible(position: Position, king: King): boolean {
    if (
      this.hasKingMovedOrPositionInvalid(position, king) ||
      this.isKingInCheck(king.squareElementType)
    ) {
      return false;
    }

    if (
      this.pieces.some((piece) => {
        return this.isPositionKingToMoveBlocked(piece, position);
      })
    ) {
      return false;
    }

    const castlingRight = this.isCastlingRight(position, king.position.y);
    const range = castlingRight ? [1, 2] : [-1, -2, -3];
    const bias = castlingRight ? 1 : -2;

    return this.noRookOrMovedRook(new Position(position.x + bias, position.y))
      ? false
      : this.onlyEmptyInRange(range, king.position.x, position.y);
  }

  private onlyEmptyInRange(range: number[], x: number, y: number): boolean {
    for (const xChange of range) {
      if (
        !(this.getAtPosition(new Position(x + xChange, y)) instanceof Empty)
      ) {
        return false;
      }
    }
    return true;
  }

  private hasKingMovedOrPositionInvalid(
    position: Position,
    king: King,
  ): boolean {
    return (
      !king.isCastlingPossible() ||
      !(
        this.isCastlingLeft(position, king.position.y) ||
        this.isCastlingRight(position, king.position.y)
      )
    );
  }

  private isCastlingLeft(position: Position, kingY: number): boolean {
    return position.same(new Position(2, kingY));
  }

  private isCastlingRight(position: Position, kingY: number): boolean {
    return position.same(new Position(6, kingY));
  }

  private noRookOrMovedRook(rookPosition: Position): boolean {
    const rook = this.getAtPosition(rookPosition);
    return (
      !(rook instanceof Rook) ||
      (rook instanceof Rook && !rook.isCastlingPossible())
    );
  }

  private isCurrentPiecePinned(): boolean {
    const king = this.getKingOfType(
      this.currentSquareElement?.squareElementType,
    );

    for (const piece of this.pieces) {
      if (this.isPieceIgnorableForPinnedCheck(piece, king)) {
        continue;
      }
      if (this.isCurrentPinnedBy(piece, king)) {
        return true;
      }
    }

    return false;
  }

  private getKingOfType(currentType: SquareElementType): King {
    for (const piece of this.pieces) {
      if (this.isKingOfType(piece, currentType)) {
        return piece as King;
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

  private isPieceIgnorableForPinnedCheck(
    piece: MoveablePiece,
    king: King,
  ): boolean {
    return (
      this.sameElementTypeAsCurrent(piece) || !piece.isMoveableTo(king.position)
    );
  }

  private sameElementTypeAsCurrent(squareElement: SquareElement): boolean {
    return (
      squareElement.squareElementType ===
      this.currentSquareElement?.squareElementType
    );
  }

  private isCurrentPinnedBy(piece: MoveablePiece, king: King): boolean {
    const withPieceInTheWay = this.isPieceInTheWay(
      piece,
      this.constructPath(piece, king),
    );
    const withoutPieceCheck =
      piece.isMoveableTo(king.position) !==
      this.isPieceInTheWay(piece, this.constructPath(piece, king), [
        this.currentSquareElement as MoveablePiece,
      ]);
    return withPieceInTheWay && withoutPieceCheck;
  }

  private canPinnedPieceTakePinningPiece(position: Position): boolean {
    const king = this.getKingOfType(
      this.currentSquareElement?.squareElementType,
    );

    for (const piece of this.pieces) {
      if (this.isPieceIgnorableForPinnedCheck(piece, king)) {
        continue;
      }

      if (this.currentlyPawnWouldTakeInFront(position, piece)) {
        return false;
      }

      if (
        this.isPieceInTheWay(piece, this.constructPath(piece, king)) &&
        piece.isMoveableTo(king.position) &&
        this.currentPiece?.isMoveableTo(piece.position) &&
        piece.position.same(position)
      ) {
        return true;
      }
    }

    return false;
  }

  private currentlyPawnWouldTakeInFront(
    position: Position,
    piece?: MoveablePiece,
  ): boolean {
    return (
      this.isCurrentlyPawn() &&
      (!this.isPawnMoveableTo(
        this.currentPiece as Moveable,
        position,
        this.currentSquareElement as SquareElement,
      ) ||
        position.differenceOfOneY(piece?.position ?? position))
    );
  }

  private canPinnedPieceMoveAndKeepPin(position: Position): boolean {
    const king = this.getKingOfType(
      this.currentSquareElement?.squareElementType,
    );
    let pinningPiece: MoveablePiece | undefined;
    for (const piece of this.pieces) {
      if (this.isPieceIgnorableForPinnedCheck(piece, king)) {
        continue;
      }
      if (this.isCurrentPinnedBy(piece, king)) {
        pinningPiece = piece;
        break;
      }
    }

    const moveableTo = this.currentPiece?.isMoveableTo(position) ?? false;

    if (this.currentlyPawnWouldTakeInFront(position, pinningPiece)) {
      return false;
    }

    return (
      moveableTo &&
      this.isPieceInTheWay(
        pinningPiece ?? king,
        this.constructPath(pinningPiece ?? king, king),
        [this.currentPiece as MoveablePiece],
        position,
      )
    );
  }

  private isEnPassantPossible(
    position: Position,
    currentSquareElement: SquareElement,
  ): boolean {
    if (
      !this.hasPawnMovedTwoSquares ||
      !position.differenceOfOneX(currentSquareElement.position)
    ) {
      return false;
    }
    const bias = this.determineBias();

    const positionOutOfRange = !(
      bias + position.y >= 0 && bias + position.y <= 7
    );

    if (positionOutOfRange) {
      return false;
    }

    if (
      position.differenceOfOneY(currentSquareElement.position) &&
      this.positionOfTwoSquaresMove &&
      this.positionOfTwoSquaresMove.same(
        new Position(position.x, position.y + bias),
      )
    ) {
      return this.currentSquareElement?.position.y === position.y + bias;
    }
    return false;
  }

  private determineBias(): 1 | -1 {
    return isWhite(this.currentSquareElement?.squareElementType) ? 1 : -1;
  }

  private isPawnMoveableTo(
    currentPiece: Moveable,
    position: Position,
    currentSquareElement: SquareElement,
  ): boolean {
    const conditionsWithoutCheck =
      currentPiece.isMoveableTo(position) &&
      !this.pawnNotMoveableTo(this.getAtPosition(position));

    if (
      this.isPawnTwoMovesBlockedByPiece(
        conditionsWithoutCheck,
        position,
        currentSquareElement,
      )
    ) {
      return false;
    }

    return !this.inCheck
      ? conditionsWithoutCheck
      : this.isMoveableToWith(conditionsWithoutCheck, position);
  }

  private pawnNotMoveableTo(
    squareElement: SquareElement,
    pawn?: MoveablePiece,
  ): boolean {
    if (
      squareElement.isPiece() &&
      this.sameElementTypeAsCurrent(squareElement) &&
      pawn &&
      pawn.squareElementType === squareElement.squareElementType
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

  private isMoveableToWith(
    conditionsWithoutCheck: boolean,
    position: Position,
  ): boolean {
    const isMoveBlockingCheck = !this.isKingInCheck(
      this.currentSquareElement?.squareElementType,
      position,
    );
    return (
      conditionsWithoutCheck &&
      (isMoveBlockingCheck || this.isMoveTakingCheckGivingPiece(position))
    );
  }

  private isMoveTakingCheckGivingPiece(position: Position): boolean {
    return (
      this.piecesGivinCheck.size === 1 &&
      (
        this.piecesGivinCheck.values().next().value as MoveablePiece
      ).position.same(position)
    );
  }

  private isPieceNoPawnNoKingMoveableTo(
    currentPiece: Moveable,
    position: Position,
  ): boolean {
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
      currentPiece.isMoveableTo(position) &&
      isSquareNotOfSameType &&
      noPieceShouldBlocking;

    if (!this.inCheck) {
      return conditionsWithoutCheck;
    }

    return this.isMoveableToWith(conditionsWithoutCheck, position);
  }

  /**
   * Move current to parsed
   * @param squareElement
   * @returns boolean - if moved or not
   */
  movePiece(squareElement: SquareElement): boolean {
    if (this.isNotMoveable(squareElement)) {
      return false;
    }

    const pawnMovementBefore = this.hasPawnMovedTwoSquares;

    let pawnToRemove: Pawn | undefined;

    const newPosition: Position = squareElement.position;
    this.pieces = this.pieces
      .filter((piece) => piece !== squareElement)
      .map((piece) => {
        if (this.isPieceSameAsCurrent(piece)) {
          if (this.isMoveCastling(piece, newPosition)) {
            return this.moveCastling(piece as King, newPosition);
          }
          piece.moveTo(newPosition);

          if (!(piece instanceof Pawn)) {
            return piece;
          }

          if (this.isEnPassantMoveCurrently(newPosition)) {
            pawnToRemove = this.twoSquaresMovePawn;
          }
          this.switchEnPassantFields(false, piece);
        }
        return piece;
      });

    if (this.enPassantMoveWasPlayed(pawnToRemove, squareElement)) {
      this.pieces = this.pieces.filter((p) => p !== pawnToRemove);
    }

    if (pawnMovementBefore) {
      this.switchEnPassantFields(true, new Pawn(new Position(0, 0), 'black'));
    }

    this.currentPiece?.moveTo(newPosition);
    return true;
  }

  private isNotMoveable(squareElement: SquareElement): boolean {
    return (
      !this.currentPiece ||
      !this.isMoveableTo(squareElement.position) ||
      this.sameElementTypeAsCurrent(squareElement) ||
      this.isPieceInTheWay(squareElement)
    );
  }

  private isPieceSameAsCurrent(piece: MoveablePiece) {
    return (
      piece.position.same(
        this.currentSquareElement?.position ?? new Position(0, 0),
      ) && this.sameElementTypeAsCurrent(piece)
    );
  }

  private isMoveCastling(piece: MoveablePiece, newPosition: Position): boolean {
    return piece instanceof King && !piece.isMoveableTo(newPosition);
  }

  private moveCastling(king: King, newPosition: Position): MoveablePiece {
    king.castleTo(newPosition);

    const castlingRight = this.isCastlingRight(newPosition, king.position.y);
    const rookPosition = new Position(castlingRight ? 7 : 0, king.position.y);
    const castleTo = new Position(
      newPosition.x + (castlingRight ? -1 : 1),
      newPosition.y,
    );
    (this.getAtPosition(rookPosition) as Rook).castleTo(castleTo);

    return king;
  }

  private isEnPassantMoveCurrently(newPosition: Position): boolean {
    if (!this.positionOfTwoSquaresMove) {
      return false;
    }
    return this.positionOfTwoSquaresMove.same(
      new Position(newPosition.x, newPosition.y + this.determineBias()),
    );
  }

  private switchEnPassantFields(cleanup: boolean, pawn: Pawn) {
    this.hasPawnMovedTwoSquares = cleanup ? false : pawn.hasMovedTwoSquares();
    this.positionOfTwoSquaresMove = cleanup ? undefined : pawn.position;
    this.twoSquaresMovePawn = cleanup ? undefined : pawn;
  }

  private enPassantMoveWasPlayed(
    pawnToRemove: Pawn | undefined,
    squareElement: SquareElement,
  ): boolean {
    if (!pawnToRemove) {
      return false;
    }
    return (
      pawnToRemove.squareElementType !== squareElement.squareElementType &&
      pawnToRemove.hasMovedTwoSquares()
    );
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

  private isCurrentlyPawn(): boolean {
    return this.currentSquareElement instanceof Pawn;
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
      return this.isInCheck(king, currentType, positionBlocked);
    }

    this.inCheck = this.isInCheck(king, currentType);
    if (!this.inCheck) {
      this.piecesGivinCheck.clear();
    }
    return this.inCheck;
  }

  private isInCheck(
    king: King,
    currentType: SquareElementType,
    positionBlocked?: Position,
  ): boolean {
    return this.pieces.some((piece) => {
      if (this.isPieceGivingCheck(piece, currentType, king, positionBlocked)) {
        if (
          !positionBlocked &&
          piece instanceof Pawn &&
          this.pawnNotMoveableTo(king, piece)
        ) {
          return false;
        }

        this.piecesGivinCheck.add(piece);
        return true;
      }
      return false;
    });
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
      if (!piece.isSameType(squareElementType)) {
        continue;
      }
      if (this.isMoveableToAnyPosition(piece)) {
        return false;
      }
    }
    this.removeSelection();
    return true;
  }

  private isMoveableToAnyPosition(piece: MoveablePiece): boolean {
    this.selectSquare(piece, piece.squareElementType);
    for (let i = 0; i < SIZE.LINE_SIZE; i++) {
      for (let j = 0; j < SIZE.LINE_SIZE; j++) {
        if (this.isMoveableTo(new Position(i, j))) {
          this.removeSelection();
          return true;
        }
      }
    }
    return false;
  }
}
