import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MainScreen from './MainScreen';

describe('MainScreen', () => {
  test('render without error', () => {
    const rend = render(
        <NavigationContainer>
          <MainScreen />
        </NavigationContainer>
      );    
      expect(rend).not.toBe(null);
  });
});
