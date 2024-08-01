export class ErrorException extends Error {
    public errors: { message: string; campo: string }[];
    public statusCode: number;

    constructor(errors: { message: string; campo: string }[], statusCode: number) {
        super('Validation errors');
        this.errors = errors;
        this.statusCode = statusCode;
        this.name = 'ErrorException';
    }
}
