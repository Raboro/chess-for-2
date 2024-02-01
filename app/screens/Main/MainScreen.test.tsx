import { describe, expect, test } from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import MainScreen from './MainScreen';

describe('MainScreen', () => {
  test('render without error', () => {
    const rend = render(
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>,
    );
    expect(rend).not.toBe(null);
  });

  test('Should trigger Promotion for white', () => {
    const rend = render(
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>,
    );

    const whitePositions = [
      [55, 47],
      [47, 39],
      [39, 31],
      [31, 23],
      [23, 14],
    ];
    const blackPositions = [
      [8, 16],
      [16, 24],
      [24, 32],
      [32, 40],
      [9, 17],
    ];

    let whitePawn;
    let whiteMoveSquare;
    let blackPawn;
    let blackMoveSquare;
    for (let i = 0; i < 5; i++) {
      whitePawn = rend.getAllByTestId('SquareImage')[whitePositions[i][0]];
      fireEvent(whitePawn, 'press');
      whiteMoveSquare =
        rend.getAllByTestId('SquareImage')[whitePositions[i][1]];
      fireEvent(whiteMoveSquare, 'press');

      blackPawn = rend.getAllByTestId('SquareImage')[blackPositions[i][0]];
      fireEvent(blackPawn, 'press');
      blackMoveSquare =
        rend.getAllByTestId('SquareImage')[blackPositions[i][1]];
      fireEvent(blackMoveSquare, 'press');
    }

    whitePawn = rend.getAllByTestId('SquareImage')[14];
    fireEvent(whitePawn, 'press');
    whiteMoveSquare = rend.getAllByTestId('SquareImage')[5];
    fireEvent(whiteMoveSquare, 'press');

    fireEvent(rend.getAllByTestId('Square')[67], 'press');
  });

  test('Should trigger Promotion for black', () => {
    const rend = render(
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>,
    );

    const whitePositions = [
      [55, 47],
      [47, 39],
      [39, 31],
      [31, 23],
      [54, 46],
      [46, 38],
    ];
    const blackPositions = [
      [8, 16],
      [16, 24],
      [24, 32],
      [32, 40],
      [40, 49],
      [49, 58],
    ];

    let whitePawn;
    let whiteMoveSquare;
    let blackPawn;
    let blackMoveSquare;
    for (let i = 0; i < 6; i++) {
      whitePawn = rend.getAllByTestId('SquareImage')[whitePositions[i][0]];
      fireEvent(whitePawn, 'press');
      whiteMoveSquare =
        rend.getAllByTestId('SquareImage')[whitePositions[i][1]];
      fireEvent(whiteMoveSquare, 'press');

      blackPawn = rend.getAllByTestId('SquareImage')[blackPositions[i][0]];
      fireEvent(blackPawn, 'press');
      blackMoveSquare =
        rend.getAllByTestId('SquareImage')[blackPositions[i][1]];
      fireEvent(blackMoveSquare, 'press');
    }

    fireEvent(rend.getAllByTestId('Square')[67], 'press');
  });
});
