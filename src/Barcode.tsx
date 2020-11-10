import React, { useRef, useEffect, useState, useCallback } from 'react';
import Encoder from './encoder';

export interface Props {
    number: number;
    height?: number;
    barWidth?: number;
}

export interface DrawingOptions {
    width: number;
    height: number;
    lineWidth: number;
}

export const Barcode: React.FC<Props> = ({ number, height = 150, barWidth = 4 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>();

    const symbolsNum = number.toString().length;
    const encodedDigitWidth = 13 * barWidth;
    const startStopWidth = 19 * barWidth;
    const width = (encodedDigitWidth * symbolsNum) + startStopWidth;

    const clearCanvas = useCallback(() => {
        if (canvasContext) {
            canvasContext.clearRect(0, 0, width, height);
            canvasContext.beginPath();
        }
    }, [canvasContext, width, height]);

    const setDrawingOptions = useCallback(({ width, height, lineWidth }: DrawingOptions) => {
        if (canvasContext) {
            canvasContext.canvas.setAttribute('height', height.toString());
            canvasContext.canvas.setAttribute('width', width.toString());
            canvasContext.lineWidth = lineWidth;
        }
    }, [canvasContext]);

    const drawLine = useCallback((fromX: number, fromY: number, toX: number, toY: number) => {
        if (canvasContext) {
            canvasContext.moveTo(fromX, fromY);
            canvasContext.lineTo(toX, toY);
            canvasContext.stroke();
        }
    }, [canvasContext]);

    const drawBar = useCallback((x: number) => {
        drawLine(x, 0, x, height);
    }, [drawLine, height]);

    const drawDigit = useCallback((code: string, leftPadding: number) => {
        const spacing = barWidth;
        let x = leftPadding;
        if (canvasContext) {
            code.split('').map((symbol) => {
                x += spacing;

                if (symbol === '0') {
                    drawBar(x);
                    x += spacing;
                }
                if (symbol === '1') {
                    drawBar(x);
                    x += spacing;
                    drawBar(x);
                    x += spacing;
                }
            });
        }
        return x;
    }, [drawBar, barWidth, canvasContext]);

    const drawBarcode = useCallback((code: string[]) => {
        let x = barWidth;
        x = drawDigit(Encoder.startSymbol, x);
        code.forEach((digit) => {
            x = drawDigit(digit, x);
        });
        x = drawDigit(Encoder.endSymbol, x);
    }, [drawDigit, barWidth]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas && canvas.getContext('2d');
        if (ctx) {
            setCanvasContext(ctx);
            setDrawingOptions({ width, height, lineWidth: barWidth });
            drawBarcode(Encoder.encodeNumber(number));
        }
    }, [canvasContext, width, height, barWidth, drawBarcode, number, setDrawingOptions]);

    useEffect(() => {
        clearCanvas();
        drawBarcode(Encoder.encodeNumber(number));
    }, [number, clearCanvas, drawBarcode]);

    if (number == null || isNaN(number)) return null;
    return (
        <canvas ref={canvasRef}></canvas>
    );
};

export default Barcode;
