import { ImageSourcePropType } from 'react-native';

export default interface Displayable {
  /**
   * used to render Piece on the board by returning the image of the Piece
   */
  display(): ImageSourcePropType;
} // eslint-disable-line
