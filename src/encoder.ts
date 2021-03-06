export class Encoder {

    static startSymbol = '110';
    static stopSymbol = '101'

    static encodeSymbol(symbol: string | number): string {
        if (typeof symbol === 'string') {
            if (symbol.length > 1) {
                throw new Error('Allow encoding only one char');
            }
            if (symbol.length === 0) {
                throw new Error('Symbol can not be empty');
            }
        }
        if (typeof symbol === 'number') {
            if (symbol < 0 || symbol > 9 || isNaN(symbol)) {
                throw new Error('Allow encoding only digits in 0-9 range');
            }
            if (!Number.isInteger(symbol)) {
                throw new Error('Allow encoding only integer');
            }
        }

        const digit = typeof symbol === 'string'
            ? parseInt(symbol)
            : symbol;

        if (isNaN(digit)) {
            throw new Error('Allowed only digits');
        }

        if (digit === 0) {
            return '00110';
        }

        let temp = digit;
        const result = [7, 4, 2, 1]
            .reduce((acc: number[], key) => {
                if (temp >= key) {
                    acc.push(1);
                    temp = temp - key;
                } else {
                    acc.push(0);
                }
                return acc;
            }, [])
            .reverse();

        result.filter((digit) => digit === 1).length === 1 // parity
            ? result.push(1)
            : result.push(0);
        return result.join('');
    }

    static encodeString(str: string): string[] {
        if (str == null) return [];
        return str.split('').map((char) => Encoder.encodeSymbol(char));
    }

    static encodeNumber(num: number): string[] {
        if (num == null) return [];
        return num.toString().split('').map((char) => Encoder.encodeSymbol(char));
    }
}

export default Encoder;
