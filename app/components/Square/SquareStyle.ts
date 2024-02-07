import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: '7%',
    paddingBottom: '5%',
  },

  isMoveableTo: {
    borderColor: '#423A3B',
    borderWidth: 2,
    paddingLeft: '3%',
    borderRadius: 25,
  },

  moveableToPiece: {
    borderColor: 'black',
  },

  inCheck: {
    borderColor: 'red',
    borderWidth: 2,
    paddingRight: '5%',
  },
});
