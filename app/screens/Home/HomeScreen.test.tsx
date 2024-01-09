import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import React from 'react';

describe('HomeScreen', () => {
  test('render without error', () => {
    const rend = render(
        <NavigationContainer>
          <HomeScreen />
        </NavigationContainer>
      );    
      expect(rend).not.toBe(null);
  });
});
