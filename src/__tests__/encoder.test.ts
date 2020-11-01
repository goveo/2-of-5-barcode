import Encoder from '../encoder';

describe('Encoder should encode one symbol correct', () => {
    test('Encoding digits', () => {
        expect(Encoder.encodeSymbol(0)).toBe('00110');
        expect(Encoder.encodeSymbol(1)).toBe('10001');
        expect(Encoder.encodeSymbol(2)).toBe('01001');
        expect(Encoder.encodeSymbol(3)).toBe('11000');
        expect(Encoder.encodeSymbol(4)).toBe('00101');
        expect(Encoder.encodeSymbol(5)).toBe('10100');
        expect(Encoder.encodeSymbol(6)).toBe('01100');
        expect(Encoder.encodeSymbol(7)).toBe('00011');
        expect(Encoder.encodeSymbol(8)).toBe('10010');
        expect(Encoder.encodeSymbol(9)).toBe('01010');
    });

    test('Encoding chars', () => {
        expect(Encoder.encodeSymbol('0')).toBe('00110');
        expect(Encoder.encodeSymbol('1')).toBe('10001');
        expect(Encoder.encodeSymbol('2')).toBe('01001');
        expect(Encoder.encodeSymbol('3')).toBe('11000');
        expect(Encoder.encodeSymbol('4')).toBe('00101');
        expect(Encoder.encodeSymbol('5')).toBe('10100');
        expect(Encoder.encodeSymbol('6')).toBe('01100');
        expect(Encoder.encodeSymbol('7')).toBe('00011');
        expect(Encoder.encodeSymbol('8')).toBe('10010');
        expect(Encoder.encodeSymbol('9')).toBe('01010');
    });

    test('Encoding special symbols', () => {
        expect(Encoder.encodeSymbol('start')).toBe('110');
        expect(Encoder.encodeSymbol('stop')).toBe('101');
    });

    test('Should handle wrong values', () => {
        expect(() => Encoder.encodeSymbol(10)).toThrow();
        expect(() => Encoder.encodeSymbol(-1)).toThrow();
        expect(() => Encoder.encodeSymbol(NaN)).toThrow();
        expect(() => Encoder.encodeSymbol('')).toThrow();
        expect(() => Encoder.encodeSymbol('11')).toThrow();
        expect(() => Encoder.encodeSymbol('test')).toThrow();
    });
});
