import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/ColorStyle';

export const styles = StyleSheet.create({
    button: {
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 3,
        backgroundColor: COLORS.tertiary,
      },
    
      pressedButton: {
        opacity: 0.9,
        transform: [{ scaleX: 1.05 }, { scaleY: 1.05 }],
      },
    
      text: {
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'black',
      },
});