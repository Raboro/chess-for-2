import { describe, expect, test } from "@jest/globals";
import Position from "../Position";

describe("Position", () => {

    test("Position X invalid throw error" , () => {
        expect(() => new Position(-1, 1)).toThrow(RangeError);
        expect(() => new Position(-5, 2)).toThrow(RangeError);
        expect(() => new Position(10, 3)).toThrow(RangeError);
        expect(() => new Position(8, 6)).toThrow(RangeError);
    });

    test("Position Y invalid throw error" , () => {
        expect(() => new Position(5, -5)).toThrow(RangeError);
        expect(() => new Position(1, -1)).toThrow(RangeError);
        expect(() => new Position(0, 8)).toThrow(RangeError);
        expect(() => new Position(3, 10)).toThrow(RangeError);

    });

    test("Position valid throw no error", () => {
        expect(() => new Position(2, 5)).not.toThrow(RangeError);
    });

    test("is not same line", () => {
        const p: Position = new Position(0, 2);
        expect(p.notSameLine(new Position(1, 2))).toBeTruthy();
        expect(p.notSameLine(new Position(2, 3))).toBeTruthy();
        expect(p.notSameLine(new Position(7, 1))).toBeTruthy();
    });

    test("is same line", () => {
        const p: Position = new Position(0, 2);
        expect(p.notSameLine(new Position(0, 2))).not.toBeTruthy();
        expect(p.notSameLine(new Position(0, 7))).not.toBeTruthy();
        expect(p.notSameLine(new Position(0, 1))).not.toBeTruthy();
    });
});