import { ImageSourcePropType } from 'react-native';

interface PieceImagePaths {
  BLACK_BISHOP: ImageSourcePropType;
  BLACK_KING: ImageSourcePropType;
  BLACK_KNIGHT: ImageSourcePropType;
  BLACK_PAWN: ImageSourcePropType;
  BLACK_QUEEN: ImageSourcePropType;
  BLACK_ROOK: ImageSourcePropType;
  WHITE_BISHOP: ImageSourcePropType;
  WHITE_KING: ImageSourcePropType;
  WHITE_KNIGHT: ImageSourcePropType;
  WHITE_PAWN: ImageSourcePropType;
  WHITE_QUEEN: ImageSourcePropType;
  WHITE_ROOK: ImageSourcePropType;
  EMPTY_IMAGE_PATH: ImageSourcePropType;
}

export const PieceImagePaths: PieceImagePaths = {
  BLACK_BISHOP: require('../assets/Black_Bishop.png'),
  BLACK_KING: require('../assets/Black_King.png'),
  BLACK_KNIGHT: require('../assets/Black_Knight.png'),
  BLACK_PAWN: require('../assets/Black_Pawn.png'),
  BLACK_QUEEN: require('../assets/Black_Queen.png'),
  BLACK_ROOK: require('../assets/Black_Rook.png'),
  WHITE_BISHOP: require('../assets/White_Bishop.png'),
  WHITE_KING: require('../assets/White_King.png'),
  WHITE_KNIGHT: require('../assets/White_Knight.png'),
  WHITE_PAWN: require('../assets/White_Pawn.png'),
  WHITE_QUEEN: require('../assets/White_Queen.png'),
  WHITE_ROOK: require('../assets/White_Rook.png'),
  EMPTY_IMAGE_PATH: require('../assets/Empty.png'),
};
