import { describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react-native";
import GameOverModal from "./GameOverModal";

describe('GameOverModal', () => {
    test('Restart Game should be triggered', () => {
        const gameRestart = jest.fn();
        const rend = render(
            <GameOverModal gameRestart={gameRestart}/>
        );
        fireEvent(rend.getByText('Again'), 'press');
        expect(gameRestart).toHaveBeenCalled();
    });

    test('Stop App should be triggered', () => {
        const rend = render(
            <GameOverModal gameRestart={() => {}}/>
        );
        fireEvent(rend.getByText('Quit'), 'press');
    })
});