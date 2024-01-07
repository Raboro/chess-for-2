import { describe, expect, test } from '@jest/globals';
import { render } from '@testing-library/react-native';
import App from './App';

describe('App', () => {
    test(`render without error`, () => {
        const rend = render(<App />);
        expect(rend).not.toBe(null);
    });
});