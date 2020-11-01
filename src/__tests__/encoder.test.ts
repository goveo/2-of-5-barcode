import Encoder from '../encoder';

describe('encodeSymbol method', () => {
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

    test('Should handle wrong values', () => {
        expect(() => Encoder.encodeSymbol(10)).toThrow();
        expect(() => Encoder.encodeSymbol(-1)).toThrow();
        expect(() => Encoder.encodeSymbol(NaN)).toThrow();
        expect(() => Encoder.encodeSymbol('')).toThrow();
        expect(() => Encoder.encodeSymbol('1.1')).toThrow();
        expect(() => Encoder.encodeSymbol('11')).toThrow();
        expect(() => Encoder.encodeSymbol('a')).toThrow();
        expect(() => Encoder.encodeSymbol('test')).toThrow();
        expect(() => Encoder.encodeSymbol('NaN')).toThrow();
    });
});

describe('encodeString method', () => {
    test('Should encode correct values', () => {
        expect(Encoder.encodeString('123')).toEqual(['10001', '01001', '11000']);
        expect(Encoder.encodeString('0870')).toEqual(['00110', '10010', '00011', '00110']);
        expect(Encoder.encodeString('763')).toEqual(['00011', '01100', '11000']);
        expect(Encoder.encodeString('0')).toEqual(['00110']);
        expect(Encoder.encodeString('')).toEqual([]);
    });
    test('Should handle wrong values', () => {
        expect(() => Encoder.encodeString('a')).toThrow();
        expect(() => Encoder.encodeString('-1')).toThrow();
        expect(() => Encoder.encodeString('1.1')).toThrow();
        expect(() => Encoder.encodeString('NaN')).toThrow();
        expect(() => Encoder.encodeString('@')).toThrow();
    });
});
