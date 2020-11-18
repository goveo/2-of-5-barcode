import Decoder from '../decoder';

describe('decodeSymbol method', () => {
    test('Should process correct data', () => {
        expect(Decoder.decodeSymbol('00110')).toBe('0');
        expect(Decoder.decodeSymbol('10001')).toBe('1');
        expect(Decoder.decodeSymbol('01001')).toBe('2');
        expect(Decoder.decodeSymbol('11000')).toBe('3');
        expect(Decoder.decodeSymbol('00101')).toBe('4');
        expect(Decoder.decodeSymbol('10100')).toBe('5');
        expect(Decoder.decodeSymbol('01100')).toBe('6');
        expect(Decoder.decodeSymbol('00011')).toBe('7');
        expect(Decoder.decodeSymbol('10010')).toBe('8');
        expect(Decoder.decodeSymbol('01010')).toBe('9');
    });

    test('Should throw an error on invalid data', () => {
        expect(() => Decoder.decodeSymbol('12345')).toThrow();
        expect(() => Decoder.decodeSymbol('00000')).toThrow();
        expect(() => Decoder.decodeSymbol('00001')).toThrow();
        expect(() => Decoder.decodeSymbol('test')).toThrow();
        expect(() => Decoder.decodeSymbol('11111')).toThrow();
        expect(() => Decoder.decodeSymbol('0101')).toThrow();
    });
});

test('decode method', () => {
    expect(Decoder.decode(['110', '00110', '101'])).toBe('0');
    expect(Decoder.decode(['110', '10001', '01001', '11000', '00101', '10100', '101'])).toBe('12345');
    expect(Decoder.decode(['110', '00110', '00110', '10001', '101'])).toBe('001');
});
