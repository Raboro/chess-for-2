import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import PressableButton from './PressableButton';

describe('PressableButton', () => {
  test('render without error', () => {
    const rend = render(<PressableButton text="" onPress={() => {}} />);
    expect(rend).not.toBeNull();
  });

  test('valid button press', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <PressableButton text="" onPress={mockOnPress} />,
    );
    const button = getByTestId('PressableButton');
    fireEvent(button, 'press');
    expect(mockOnPress).toHaveBeenCalled();
  });
});
