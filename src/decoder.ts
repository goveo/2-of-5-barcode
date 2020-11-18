export class Decoder {

    static startSymbol = '110';
    static stopSymbol = '101';

    static decodeSymbol = (symbol: string): string => {
        if (symbol === Decoder.startSymbol || symbol === Decoder.stopSymbol) {
            return '';
        }
        if (symbol.length !== 5) {
            throw new Error('Incorrect symbol');
        }
        if (symbol.split('1').length - 1 !== 2) {
            throw new Error('Some symbol in code is broken');
        }
        const weights = [1, 2, 4, 7];
        return symbol.split('').reduce((acc, value, index) => {
            if (value !== '0' && value !== '1') {
                throw new Error(`Data must be in binary form. Received symbol: ${symbol}`);
            }
            if (acc > 10) return 0;
            if (index === symbol.length - 1) return acc;
            return value === '1'
                ? acc + weights[index]
                : acc;
        }, 0).toString();
    }

    static decode = (barcode: string[]): string => {
        if (barcode.length < 3) {
            throw new Error('Incorrect barcode length. Check if you have added start and stop symbols');
        }
        if (barcode[0] !== Decoder.startSymbol) {
            throw new Error(`Incorrect start symbol. Should be ${Decoder.startSymbol}`);
        }
        if (barcode[barcode.length - 1] !== Decoder.stopSymbol) {
            throw new Error(`Incorrect stop symbol. Should be ${Decoder.stopSymbol}`);
        }
        return barcode.map((symbol) => Decoder.decodeSymbol(symbol)).join('');
    }
}

export default Decoder;
