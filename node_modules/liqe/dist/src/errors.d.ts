import { ExtendableError } from 'ts-error';
export declare class LiqeError extends ExtendableError {
}
export declare class SyntaxError extends LiqeError {
    message: string;
    offset: number;
    line: number;
    column: number;
    constructor(message: string, offset: number, line: number, column: number);
}
