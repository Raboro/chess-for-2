import { StyleSheet } from 'react-native';
import { COLORS } from './ColorStyle';

export const BORDER = StyleSheet.create({
    default: {
        borderColor: COLORS.primary,
        borderRadius: 15,
        borderWidth: 3,
      },
});