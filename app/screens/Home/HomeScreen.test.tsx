import { describe, expect, test } from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';
import React from 'react';
import HomeScreen from './HomeScreen';

describe('HomeScreen', () => {
  test('render without error', () => {
    const rend = render(
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>,
    );
    expect(rend).not.toBe(null);
  });
});
